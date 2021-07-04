import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider as PaperProvider, Button} from 'react-native-paper';
import {theme} from "./src/frontend/Theme";
import {Header} from './src/components/Header'
import {getLinks, getTimetableByUrl} from "./src/storage/Storage";
import NavBar from "./src/components/navbar/NavBar";

const config = require('./config.json');

export default function App() {
    return (
        <PaperProvider theme={theme}>
            <View style={styles.body}>
                <Header title={config.appName}/>
                <NavBar/>
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start',
        backgroundColor: theme.colors.background,
    },
});
