import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider as PaperProvider, Button} from 'react-native-paper';
import {theme} from "./src/frontend/Theme";
import Timetable from "./src/components/Timetable/Timetable";
import {Header} from './src/components/Header'
import NavBar from "./src/components/navbar/NavBar";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import {getLinks, uploadLinks} from "./src/storage/Storage";

const config = require('./config.json');
const BACKGROUND_FETCH_TASK = 'background_parse_data';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, () => {
    try {
        uploadLinks().then(() => {
            console.log("completed")
        });
        let receivedNewData;
        return receivedNewData ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
    } catch (error) {
        return BackgroundFetch.Result.Failed;
    }
})


async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 30, // 15 minutes
        stopOnTerminate: false, // android only,
        startOnBoot: true, // android only
    });
}

async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

class App extends Component {

    state = {
        timetable: [],
    }

    componentDidMount() {
        // unregisterBackgroundFetchAsync().then(r => console.log(r));
        registerBackgroundFetchAsync().then(r => console.log(1));
    }

    constructor(props) {
        super(props);
    }

    render() {
        const onNavbarStateChange = (data) => {
            this.setState({timetable: data});
            this.render()
        };

        return (
            <PaperProvider theme={theme}>
                <Header title={config.appName}/>
                <View style={styles.body}>
                    <NavBar onStateChange={onNavbarStateChange}/>
                    <Timetable timetable={this.state.timetable}/>
                </View>
            </PaperProvider>
        )
    }
}

export default App;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: theme.colors.backgroundColor,
    },
});
