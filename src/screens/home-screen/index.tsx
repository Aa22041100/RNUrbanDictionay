import React, {Component} from 'react';
import {Platform, Text, View} from 'react-native';

import styles from './styles';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface Props {}

export default class HomeScreen extends Component<Props> {
    // config header
    static navigationOptions = {
        title: 'Home Screen'
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.instructions}>To get started, edit App.tsx</Text>
                <Text style={styles.instructions}>{instructions}</Text>
            </View>
        );
    }
}