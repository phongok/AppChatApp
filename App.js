// //Làm với stream chat nhé

// // import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createStackNavigator } from '@react-navigation/stack';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { Text } from 'react-native';
// // import { useChatClient } from './component/Chat/Chat';
// // import { AppProvider } from './component/AppContext/AppContext';
// // import { StreamChat } from 'stream-chat';
// // import { chatApiKey, chatUserId } from './component/Config/ConfigStreamChat';
// // import {
// //   OverlayProvider,
// //   Chat,
// //   ChannelList,
// //   MessageList,
// //   MessageInput,
// //   Channel
// // } from 'stream-chat-react-native'; // Or stream-chat-expo
// // import { useAppContext } from './component/AppContext/AppContext';
// // const Stack = createStackNavigator();
// // const chatClient = StreamChat.getInstance(chatApiKey);
// // const HomeScreen = () => <Text>Home Screen</Text>;
// // const filters = {
// //   members: {
// //     '$in': [chatUserId]
// //   },
// // };
// // const sort = {
// //   last_message_at: -1,
// // };
// // const ChannelListScreen = props => {
// //   const { setChannel } = useAppContext();
// //   return (
// //     <ChannelList
// //       onSelect={(channel) => {
// //         const { navigation } = props;
// //         setChannel(channel);
// //         navigation.navigate('ChannelScreen');
// //       }}
// //       filters={filters}
// //       sort={sort}
// //     />
// //   );
// // };
// // const ChannelScreen = props => {
// //   const { channel } = useAppContext();

// //   return null;
// //   return (
// //     <Channel channel={channel}>
// //       <MessageList />
// //       <MessageInput />
// //     </Channel>
// //   );
// // };
// // const NavigationStack = () => {
// //   const { clientIsReady } = useChatClient();

// //   if (!clientIsReady) {
// //     return <Text>Loading chat ...</Text>
// //   }
// //   return (
// //     <OverlayProvider>
// //       <Chat client={chatClient}>
// //         <Stack.Navigator>
// //           <Stack.Screen name="ChannelListScreen" component={ChannelListScreen} />
// //           <Stack.Screen name="ChannelScreen" component={ChannelScreen} />
// //         </Stack.Navigator>
// //       </Chat>
// //     </OverlayProvider>
// //   );
// // };

// // const App = () => {
// //   return (
// //     <AppProvider>
// //       <NavigationContainer>
// //         <NavigationStack />
// //       </NavigationContainer>
// //     </AppProvider>
// //   );
// // };
// // export default App


// //Trang page react native với firebase nhé b

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './component/Login/Login';
import RegisterScreen from './component/Register/Signup';
import Dashboard from './component/LogOut/Logout';
import AddChat from './component/Chat/AddChat';
import Chat from './component/Chat/ChatOne';
import HomeScreen from './component/HomePage/HomePage';
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#3740FE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={
          { title: 'Login' }
        }
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Register' }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={
          { title: 'Home' }
        }
      />
      <Stack.Screen
        name="AddChat"
        component={AddChat}
        options={
          { title: 'AddChat' }
        }
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ title: 'Chat' }} />
    </Stack.Navigator>
  );
}
export default function App() {

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
