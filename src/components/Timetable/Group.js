import React, {Component} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {theme} from "../../frontend/Theme";

class Group extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Pressable onPress={() => this.props.Press(this.props.title)}>
                <Text style={
                    [
                        styles.group,
                        (this.props.active ? styles.active : {})
                    ]
                }>{this.props.title.trim()}</Text>
            </Pressable>
        )
    }
}

const styles = StyleSheet.create({
    group: {
        backgroundColor: theme.colors.navbarBackgroundColor,
        fontSize: 27,
        paddingHorizontal: 5,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderRightColor: theme.colors.border,
    },
    active: {
        backgroundColor: 'yellow',
    }
});

export default Group;
