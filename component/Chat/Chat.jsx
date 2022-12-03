import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
} from 'firebase/firestore';
import { firebase } from '../../database/firebase';
import { database } from '../../database/firebase';
export default function Chats({ navigation }) {
    const [messages, setMessages] = useState([]);
    const onSignOut = () => {
        signOut(firebase).catch(error => console.log('Error logging out: ', error));
      };
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{
                        marginRight: 10
                    }}
                    onPress={onSignOut}
                >
                    <Text>Logout</Text>
                </TouchableOpacity>
            )
        });
    }, [navigation]);
    useEffect(() => {
        const collectionRef = collection(database, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            );
        });

        return () => unsubscribe();
    }, []);


    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(database, 'chats'), {
            _id,
            createdAt,
            text,
            user
        });
    }, []);
    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: firebase?.currentUser?.email,
                avatar: 'https://i.pravatar.cc/300'
            }}
        />
    );
}

// // useChatClient.js

// import { useEffect, useState } from 'react';
// import { StreamChat } from 'stream-chat';
// import { chatApiKey, chatUserId, chatUserName, chatUserToken } from '../Config/ConfigStreamChat';

// const user = {
//     id: chatUserId,
//     name: chatUserName,
// };

// const chatClient = StreamChat.getInstance(chatApiKey);

// export const useChatClient = () => {
//     const [clientIsReady, setClientIsReady] = useState(false);

//     useEffect(() => {
//         const setupClient = async () => {
//             try {
//                 chatClient.connectUser(user, chatUserToken);
//                 setClientIsReady(true);

//                 // connectUser is an async function. So you can choose to await for it or not depending on your use case (e.g. to show custom loading indicator)
//                 // But in case you need the chat to load from offline storage first then you should render chat components
//                 // immediately after calling `connectUser()`.
//                 // BUT ITS NECESSARY TO CALL connectUser FIRST IN ANY CASE.
//             } catch (error) {
//                 if (error instanceof Error) {
//                     console.error(`An error occurred while connecting the user: ${error.message}`);
//                 }
//             }
//         };

//         // If the chat client has a value in the field `userID`, a user is already connected
//         // and we can skip trying to connect the user again.
//         if (!chatClient.userID) {
//             setupClient();
//         }
//     }, []);

//     return {
//         clientIsReady,
//     };
// };
