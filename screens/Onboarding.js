import React, {useState} from 'react';
import {
    ImageBackground,
    Image,
    StyleSheet,
    StatusBar,
    Dimensions,
    View,
    Picker,
    Text,
    Alert
} from "react-native";
import {Button, Block, theme} from "galio-framework";
import {Menu, Divider, Provider, Dialog, Portal, RadioButton, Switch} from 'react-native-paper';

const {height, width} = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";
import {Navbar} from "../components/Navbar";

function Onboarding(props) {
    const [selectedValueGroups, setSelectedValueGroups] = useState("21-П");
    const [selectedValueDays, setSelectedValueDays] = useState("1day");

    function onAlert() {
        Alert.alert(
            'Внимание!',
            'Выберите свою группу и количество дней, которое будет отображаться в расписании. В случае чего настройки можно будет изменить.',
            [
                {text: 'ОК', onPress: () => console.log('OK Pressed')},
            ]
        )
    }

    return (
        <Provider>

            <Block flex center>
                <ImageBackground
                    source={Images.RegisterBackground}
                    style={{height, width, zIndex: 1}}
                    onLoad={() => {
                        setTimeout(onAlert, 500)
                    }}
                    // onLoad={() => navigation.navigate("App") }
                />
            </Block>

            <View style={styles.container}>

                <Picker
                    selectedValue={selectedValueGroups}
                    style={{height: 50, width: 150}}
                    onValueChange={(itemValue, itemIndex) => setSelectedValueGroups(itemValue)}
                    itemStyle={{color: 'white'}}
                >
                    <Picker.Item label="21-П" value="21-П"/>
                    <Picker.Item label="22-П" value="22-П"/>
                    <Picker.Item label="23-П" value="23-П"/>
                    <Picker.Item label="24-П" value="24-П"/>
                    <Picker.Item label="25-П" value="25-П"/>
                    <Picker.Item label="26-П" value="26-П"/>
                    <Picker.Item label="27-П" value="27-П"/>
                    <Picker.Item label="28-П" value="28-П"/>
                    <Picker.Item label="187-Б" value="187-Б"/>
                    <Picker.Item label="188-Б" value="188-Б"/>
                    <Picker.Item label="189-Б" value="189-Б"/>
                    <Picker.Item label="96-Б" value="96-Б"/>
                    <Picker.Item label="97-Б" value="97-Б"/>
                </Picker>
                <Picker
                    selectedValue={selectedValueDays}
                    style={{height: 50, width: 150}}
                    onValueChange={(itemValue, itemIndex) => setSelectedValueDays(itemValue)}
                    itemStyle={{color: 'white'}}
                >
                    <Picker.Item label="1 день" value="1day"/>
                    <Picker.Item label="3 дня" value="3days"/>
                    <Picker.Item label="5 дней" value="5days"/>
                    <Picker.Item label="7 дней" value="7days"/>
                    <Picker.Item label="14 дней" value="14days"/>
                    <Picker.Item label="30 дней" value="30days"/>
                    <Picker.Item label="60 дней" value="60days"/>
                    <Picker.Item label="90 дней" value="90days"/>
                    <Picker.Item label="180 дней" value="180days"/>
                    <Picker.Item label="360 дней" value="360days"/>
                </Picker>

            </View>

            <Button style={{marginLeft: '29%', marginBottom: '18%'}} onPress={() => {
                // console.log(props)
                const {navigation} = props
                navigation.navigate("App")
            }}>Применить</Button>
        </Provider>
    )
}

export default Onboarding;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: 350
    },
    padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        position: "relative",
        bottom: theme.SIZES.BASE,
        zIndex: 2,
    },
    button: {
        width: width - theme.SIZES.BASE * 4,
        height: theme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0
    },
    logo: {
        width: 200,
        height: 60,
        zIndex: 2,
        position: 'relative',
        marginTop: '-50%'
    },
    title: {
        marginTop: '-5%'
    },
    subTitle: {
        marginTop: 20
    },
    navbar: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 100
    }
});


/*import React from "react";
import {
    ImageBackground,
    Image,
    StyleSheet,
    StatusBar,
    Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

class Onboarding extends React.Component {
    render() {
        const { navigation } = this.props;

        return (
            <Block flex style={styles.container}>
                <StatusBar hidden />
                <Block flex center>
                    <ImageBackground
                        source={Images.Onboarding}
                        style={{ height, width, zIndex: 1 }}
                    />
                </Block>
                <Block center>
                    <Image source={Images.LogoOnboarding} style={styles.logo} />
                </Block>
                <Block flex space="between" style={styles.padded}>
                    <Block flex space="around" style={{ zIndex: 2 }}>
                        <Block style={styles.title}>
                            <Block>
                                <Text color="white" size={60}>
                                    Design
                                </Text>
                            </Block>
                            <Block>
                                <Text color="white" size={60}>
                                    System
                                </Text>
                            </Block>
                            <Block style={styles.subTitle}>
                                <Text color="white" size={16}>
                                    Fully coded React Native components.
                                </Text>
                            </Block>
                        </Block>
                        <Block center>
                            <Button
                                style={styles.button}
                                color={argonTheme.COLORS.SECONDARY}
                                onPress={() => navigation.navigate("App")}
                                textStyle={{ color: argonTheme.COLORS.BLACK }}
                            >
                                Get Started
                            </Button>
                        </Block>
                    </Block>
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLORS.BLACK
    },
    padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        position: "relative",
        bottom: theme.SIZES.BASE,
        zIndex: 2,
    },
    button: {
        width: width - theme.SIZES.BASE * 4,
        height: theme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0
    },
    logo: {
        width: 200,
        height: 60,
        zIndex: 2,
        position: 'relative',
        marginTop: '-50%'
    },
    title: {
        marginTop:'-5%'
    },
    subTitle: {
        marginTop: 20
    }
});

export default Onboarding;*/
