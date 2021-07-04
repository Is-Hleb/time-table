import React, {Component, useState} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import {NavBarItem} from "./NavBarItem";
import {theme} from "../../frontend/Theme";
import {getLinks} from "../../storage/Storage";

class NavBar extends Component {
    state = {
        links: [],
    }

    constructor(props) {
        super(props);
        this.getData().then(r => console.log(r));
    }

    getData = async () => {
        try {
            const value = await getLinks();
            this.setState({links: value});
        } catch (e) {
            console.log(e.message)
        }
    }

    render() {
        return (
            <View style={styles.navbar}>
                <FlatList
                    keyExtractor={item => item.date}
                    data={this.state.links}
                    renderItem={({item}) => <NavBarItem title={item.dayOfWeek + '.\n' + item.date}/>}
                />
            </View>
        )
    }
}

export default NavBar;


const styles = StyleSheet.create({
    navbar: {
        width: '25%',
        height: '100%',
        backgroundColor: theme.colors.primary,
        alignContent: 'center',
    }
})
