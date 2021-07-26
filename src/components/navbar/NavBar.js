import React, {Component, useState} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {NavBarItem} from "./NavBarItem";
import {theme} from "../../frontend/Theme";
import {getLinks, getTimetableByUrl, UploadLinks} from "../../storage/Storage";

class NavBar extends Component {
    state = {
        links: [],
    }

    componentDidMount() {
        // fetch the project name, once it retrieves resolve the promsie and update the state.
        getLinks().then(links => this.setState({
            links: links
        }))
    }


    onPress = async (url) => {
        try {
            const value = await getTimetableByUrl(url);
            this.setState({active_button_url: url})
            this.setState({[url]: value})
            this.props.onStateChange(value);
        } catch (e) {
            console.log(e.message)
        }
    }

    render() {
        return (
            <View style={styles.navbar}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.links}
                    renderItem={({item, index}) => <NavBarItem key={Date.now().toString()}
                                                               active={this.state.active_button_url === item.href}
                                                               Press={() => this.onPress(item.href)}
                                                               title={`${item.dayOfWeek} (${item.date.substr(0, 5)})`}/>}
                />
            </View>
        )
    }
}

export default NavBar;


const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'column',
        width: '25%',
        height: '100%',
        alignContent: 'center',
        backgroundColor: theme.colors.navbarBackgroundColor,
        borderRightColor: theme.colors.border,
        borderRightWidth: 2,
    }
})
