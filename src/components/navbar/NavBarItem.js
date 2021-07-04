import React, {useState} from "react";
import {Button, StyleSheet, Pressable} from "react-native";
import {DarkTheme, Text} from "react-native-paper";
import {theme} from "../../frontend/Theme";

export const NavBarItem = ({title, Press, active}) => {

    return (
        <Pressable
            style={({pressed}) => [
                {backgroundColor: (pressed ? theme.colors.backgroundButtonPressed : theme.colors.backgroundButton)},
                styles.button,
                (active ? styles.selected : {})
            ]}
            onPress={Press}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '20%',
        borderBottomColor: '#cfd3ca',
        borderBottomWidth: 1,
    },
    selected: {
      backgroundColor: '#5c5f5c',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: theme.colors.text,
        ...theme.fonts.regular
    },
})
