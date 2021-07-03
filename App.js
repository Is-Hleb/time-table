import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {getLinks} from './src/parser/getLinks'
import {getTimeTable} from "./src/parser/getTimetable";

export default function App() {

    const parseData = async () => {
        let data = await getLinks();
        console.log(data)
        await getTimeTable(data[0].href)
    }

    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <Button onPress={parseData} title="Парсить"/>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
