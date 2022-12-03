import React from "react";
import { Component } from "react";
import { View, Text, Button, TextInput, Image } from "react-native";
import UseFetch from "../Config/UseFetch";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
const SinhVien = ({ sinhvien: { firstname, lastname, age } }) => {
    return (
        <View>
            <Text>Lay danh sach sinh vien va cac nam</Text>
            <Text>{firstname}</Text>
            <Text>{lastname}</Text>
            <Text>{age}</Text>
        </View>
    )
}
const CallAll = ({navigation}) => {
    const url = 'https://636bb0e6ad62451f9fb90f70.mockapi.io/duong'
    const data = UseFetch(url)
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('test')}>
            <View>
                <Text>So sinh vien lay duoc la:{data.length}</Text>
                <Text>Dang on tap react native de mai kiem tra nha b</Text>
                <View>
                    {
                        data.map((sinhvien) => (
                            <SinhVien sinhvien={sinhvien} />
                        ))
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}
export default CallAll