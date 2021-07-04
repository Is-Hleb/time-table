import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {theme} from "../frontend/Theme";

export const Header = ({title}) => (
    <View style={styles.header}>
        <Text style={styles.header_text}>{title}</Text>
    </View>
)

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '10%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: '5%',
        borderBottomColor: theme.colors.border,
        borderBottomWidth: 2,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
        backgroundColor: theme.colors.backgroundHeaderColor,
    },
    header_text: {
        marginTop: '7%',
        color: theme.colors.text,
        ...theme.fonts.medium,
        fontSize: 25,
    }
})
