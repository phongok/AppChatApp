// components/dashboard.js
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { auth } from '../../database/firebase';

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            uid: ''
        }
    }
    signOut = () => {
        auth.auth().signOut().then(() => {
            this.props.navigation.navigate('Login')
        })
            .catch(error => this.setState({ errorMessage: error.message }))
    }
    render() {
        this.state = {
            displayName: auth.auth().currentUser.displayName,
            uid: auth.auth().currentUser.uid
        }
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>
                    Hello, {this.state.displayName}
                </Text>
                <Button
                    color="#3740FE"
                    title="Logout"
                    onPress={() => this.signOut()}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 35,
        backgroundColor: '#fff'
    },
    textStyle: {
        fontSize: 15,
        marginBottom: 20
    }
});