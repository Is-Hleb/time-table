import React from "react";
import {
  ScrollView,
  StyleSheet,
  Image
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import Images from "../constants/Images";
import { DrawerItem as DrawerCustomItem } from '../components';

function CustomDrawerContent({ drawerPosition, navigation, profile, focused, state, ...rest }) {
  const screens = [
    "Расписание",
    "Профиль (разработка)",
    "Отзывы о преподавателях (разработка)",
  ];
  return (
    <Block
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <Block flex={0.06} style={styles.header}>
        <Image styles={styles.logo} source={Images.Logo} />
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
              return (
                <DrawerCustomItem
                  title={item}
                  key={index}
                  navigation={navigation}
                  focused={state.index === index ? true : false}
                />
              );
            })}
            <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
              <Block style={{ borderColor: "rgba(0,0,0,0.2)", width: '100%', borderWidth: StyleSheet.hairlineWidth }}/>
              <Text color="#8898AA" style={{ marginTop: 16, marginLeft: 8 }}>ДРУГОЕ</Text>
            </Block>
            <DrawerCustomItem title="Настройки" navigation={navigation} />
        </ScrollView>
      </Block>
    </Block>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center',
    marginBottom: 11
  }
});

export default CustomDrawerContent;
