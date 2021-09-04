import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, Linking, ScrollView, View } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { Navbar } from "../components/Navbar";

const { height, width } = Dimensions.get('screen');
import { Images, argonTheme } from '../constants/';
import { HeaderHeight } from "../constants/utils";

export default class Pro extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
        <View>
            <Navbar></Navbar>
            <ScrollView horizontal={true} style={{marginTop: 10}}>
                <Button style={styles.btn} onPress={ () => {} }>10.07.21 (СБ)</Button>
                <Button style={styles.btn} onPress={ () => {} }>09.07.21 (ПТ)</Button>
                <Button style={styles.btn} onPress={ () => {} }>08.07.21 (ЧТ)</Button>
                <Button style={styles.btn} onPress={ () => {} }>07.07.21 (СР)</Button>
                <Button style={styles.btn} onPress={ () => {} }>06.07.21 (ВТ)</Button>
                <Button style={styles.btn} onPress={ () => {} }>05.07.21 (ПН)</Button>

            </ScrollView>
            <ScrollView horizontal={true} style={{marginTop: 10}}>
                    <Button style={styles.btn} onPress={ () => {} }>21-П</Button>
                    <Button style={styles.btn} onPress={ () => {} }>22-П</Button>
                    <Button style={styles.btn} onPress={ () => {} }>23-П</Button>
                    <Button style={styles.btn} onPress={ () => {} }>24-П</Button>
                    <Button style={styles.btn} onPress={ () => {} }>25-П</Button>
                    <Button style={styles.btn} onPress={ () => {} }>26-П</Button>
                    <Button style={styles.btn} onPress={ () => {} }>27-П</Button>
                    <Button style={styles.btn} onPress={ () => {} }>28-П</Button>
            </ScrollView>
        </View>
      //Расписание ПОИТ
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
  },
  button: {
    width: width - theme.SIZES.BASE * 2,
    height: theme.SIZES.BASE * 2,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  pro: {
    backgroundColor: argonTheme.COLORS.INFO,
    paddingHorizontal: 8,
    marginLeft: 3,
    borderRadius: 4,
    height: 22,
    marginTop: 15
  },
  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
  },
  btn: {
      width: 63,
      height: 39
  }
});
