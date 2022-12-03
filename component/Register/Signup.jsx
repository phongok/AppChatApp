import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../database/firebase";
import { Input, Button } from "@rneui/themed";

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUri, setImageUri] = useState("");

    const register = () => {
        //Tạo tài khoản nhá các bạn ơi
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                //Gửi email xác thực nhá
                auth()
                    .currentUser.sendEmailVerification({
                        handleCodeInApp: true,
                        url: 'https://loginreactnative-e75d1.firebaseapp.com',
                    })
                    .then(() => {
                        alert("Vui lòng xem email để xác thực")
                    })
                    .catch((error) => {
                        alert(error.message)
                    })
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL:
                        imageUri ||
                        "https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png",
                });
                navigation.navigate("Login")
            })
            .catch((error) => alert(error.message));
    };
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50, fontSize: 28 }}>
                Trang Đăng Ký Tài Khoản
            </Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Nhập tên của bạn"
                    autoFocus
                    type=""
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder="Nhập Email"
                    textContentType="emailAddress"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder="Nhập mật khẩu"
                    secureTextEntry
                    textContentType="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input
                    placeholder="Profile Picture URL (optional)"
                    value={imageUri}
                    onChangeText={(text) => setImageUri(text)}
                    onSubmitEditing={register}
                />
            </View>
            <Button onPress={register} style={styles.button} title="Register" />
        </KeyboardAvoidingView>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    button: { width: 200, marginTop: 10 },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: { width: 300 },
});