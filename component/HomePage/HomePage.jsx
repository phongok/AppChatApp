import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import React from "react";
import CustomListItem from "../List/ListItems";
import { useLayoutEffect } from "react";
import { Avatar } from "@rneui/themed";
import { auth, db } from "../../database/firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([]);
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        });
    };
    useEffect(() => {
        const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
            setChats(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );
        return unsubscribe;
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat App",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={signOutUser}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 80,
                        marginRight: 20,
                    }}
                >
                    <TouchableOpacity onPress={pickImage}>
                        <AntDesign name="camerao" size={24} color="black"></AntDesign>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("AddChat")}>
                        <SimpleLineIcons
                            name="pencil"
                            size={24}
                            color="black"
                        ></SimpleLineIcons>
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);
    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
            id: id,
            chatName: chatName,
        });
    };
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem
                        key={id}
                        id={id}
                        chatName={chatName}
                        enterChat={enterChat}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: { height: "100%" },
});
