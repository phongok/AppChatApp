import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../database/firebase";
import { Button, Input } from "@rneui/themed";
import logo from '../../assets/icon.png'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if (authUser) {
                navigation.replace("Home");
            }
        });
        return unsubscribe;
    }, []);

    const signIn = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error));
    };
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50, fontSize: 28 }}>
                Trang Đăng Ký Tài Khoản
            </Text>
            <View style={styles.inputContainer}>

                <Input
                    style={styles.inputContainer}
                    placeholder="Nhập email"
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    style={styles.inputContainer}
                    placeholder="Nhập mật khẩu"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="Login" />

            <Button
                onPress={() => navigation.navigate("Register")}
                containerStyle={styles.button}
                title="Register"
                type="outline"
            />
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    inputContainer: { width: 300 },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: 200,
        marginTop: 10,
    },
});

