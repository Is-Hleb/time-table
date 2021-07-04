import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Provider as PaperProvider, Button} from 'react-native-paper';
import {theme} from "./src/frontend/Theme";
import Timetable from "./src/components/Timetable/Timetable";
import {Header} from './src/components/Header'
import NavBar from "./src/components/navbar/NavBar";
import {getLinks, getTimetableByUrl} from "./src/storage/Storage";

const config = require('./config.json');

class App extends Component {

    state = {
        timetable: [],
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
