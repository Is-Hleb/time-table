import React from "react";
import {Button, StyleSheet, View} from "react-native";
import {DarkTheme, Text} from "react-native-paper";
import {theme} from "../../frontend/Theme";

export const NavBarItem = ({title, href}) => {
    console.log(title);
    return (
        <View style={styles.navbar_item}>
            <Button style={styles.navbar_item_button} title={title}/>
        </View>
    )
};

const styles = StyleSheet.create({
    navbar_item: {
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
    },
    navbar_item_button: {
        width: '100%',
        height: '5%',
        alignContent: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
    }
})
