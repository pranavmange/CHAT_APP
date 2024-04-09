import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { auth, database } from '../../../misc/firebase';
import { transformToArrayWithId } from '../../../misc/helpers';
import MessageItem from './MessageItem';
import { Alert } from 'rsuite';

const Messages = () => {
  const { chatId } = useParams();

  const [messages, setMessages] = useState(null);

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  useEffect(() => {
    const messagesRef = database.ref('/messages');

    messagesRef
      .orderByChild('roomId')
      .equalTo(chatId)
      .on('value', snap => {
        const data = transformToArrayWithId(snap.val());
        setMessages(data);
      });

    return () => {
      messagesRef.off('value');
    };
  }, [chatId]);

  const handleAdmin = useCallback(
    async uid => {
      const msgRef = database.ref(`/rooms/${chatId}/msg`);

      let alertMsg;

      await msgRef.transaction(msg => {
        if (msg) {
          if (msg[uid]) {
            msg[uid] = null;
            alertMsg = 'Admin permission removed';
          } else {
            msg[uid] = true;
            alertMsg = 'Admin permission granted';
          }
        }
        return msg;
      });

      Alert.info(alertMsg, 400);
    },
    [chatId]
  );

  const handleLike = useCallback(async msgId => {
    const { uid } = auth.currentUser;
    const messageRef = database.ref(`/messages/${msgId}`);

    let alertMessage;

    await messageRef.transaction(msg => {
      if (msg) {
        if (msg.likes && msg.likes[uid]) {
          msg.likeCount--;
          msg.likes[uid] = null;
          alertMessage = 'Unliked';
        } else {
          msg.likeCount++;

          if (!msg.likes) {
            msg.likes = {};
          }

          msg.likes[uid] = true;
          alertMessage = 'Liked <3';
        }
      }
      return msg;
    });

    Alert.info(alertMessage, 4000);
  }, []);

  const handleDelete = useCallback(
    async (msgId, file) => {
      // eslint-disable-next-line no-alert
      if (!window.confirm('Delete this message?')) {
        return;
      }

      const isLast = messages[messages.length - 1].id === msgId;
      const updates = {};

      // delete the original message
      updates[`/messages/${msgId}`] = null;

      if (isLast && messages.length > 1) {
        updates[`/rooms/${chatId}/lastMessage`] = {
          ...messages[messages.length - 2],
          msgId: messages[messages.length - 2].id,
        };
      }

      if (isLast && messages.length === 1) {
        updates[`/rooms/${chatId}/lastMessage`] = null;
      }

      try {
        await database.ref().update(updates);
        Alert.info('Message has been deleted');
      } catch (error) {
        return Alert.error(error.message);
      }

      // if (file) {
      //   try {
      //     const fileRef = storage.refFromURL(file.url);
      //     fileRef.delete();
      //   } catch (error) {
      //     Alert.error(error.message);
      //   }
      // }
    },
    [chatId, messages]
  );

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No messages yet</li>}
      {canShowMessages &&
        messages.map(msg => (
          <MessageItem
            key={msg.id}
            message={msg}
            handleAdmin={handleAdmin}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        ))}
    </ul>
  );
};

export default Messages;
