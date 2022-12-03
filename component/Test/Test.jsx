import React from "react";
import { Component } from "react";
import { View, Text, TextInput, Image, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const AppTest = ({navigation }) => {
    return (
        <View>
            <Text>
                Hello các bạn nhá hahahah
            </Text>
            <Button title="Trang call api" onPress={()=>navigation.navigate('CallAll')}></Button>
        </View>
    )
}
export default AppTest