import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const Navbar = () => {
    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>Выберите номер группы и дату</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 85,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#3949ab',
        paddingBottom: 10
    },
    text: {
        color: 'white',
        fontSize: 20,
        marginBottom: 30
    }
})
