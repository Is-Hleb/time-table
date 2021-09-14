import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Platform, Dimensions, View, ScrollView, Alert } from 'react-native';
import { Button, Block, NavBar, Text, theme } from 'galio-framework';
import { Table, Row, Rows } from 'react-native-table-component';

import Icon from './Icon';
import Input from './Input';
import Tabs from './Tabs';
import argonTheme from '../constants/Theme';


const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const BellButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      family="ArgonExtra"
      size={16}
      name="bell"
      color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const BasketButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      family="ArgonExtra"
      size={16}
      name="basket"
      color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

const SearchButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      size={16}
      family="Galio"
      name="search-zoom-in"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.state = {
      buttons: this.props.store.getState().readyToShow ? Object.keys(this.props.store.getState()["timetable"]) : [],
      tableHead: ['№', 'Предмет', 'Кабинет'],
      tableData: [
        ['1ч\n(9:15-10:00)', '-', '-'],
        ['2ч\n(10:15-11:00)', '-', '-'],
        ['3ч\n(11:15-12:00)', '-', '-'],
        ['4ч\n(12:15-13:00)', '-', '-'],
        ['5ч\n(13:40-14:25)', 'Кураторский час', '21-с'],
        ['6ч\n(14:40-15:25)', 'Физ.культура', 'с/з'],
        ['7ч\n(15:40-16:25)', 'Физика', '32-б'],
        ['8ч\n(16:40-17:25)', 'Физика', '32-б'],
        ['9ч\n(17:40-18:25)', 'Астраномия', '32-б'],
        ['10ч\n(18:40-19:25)', 'Белорусская литература', '32-б'],
        ['11ч\n(20:40-21:25)', 'Белорусская литература', '32-б'],
      ]
    }
  }

   componentDidMount() {
     let store = this.store.getState();
     let unsubscribe = this.store.subscribe(listener)
     function listener() {
       if(this.store.getState().readyToShow) {
         store = this.store.getState()
         console.log(store)
       }
     }

     if(store.readyToShow) {
       unsubscribe(listener)
       this.setState((state) => {
         state.buttons = Object.keys(store["timetable"])
       })
     }
   }

  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }
  renderRight = () => {
    const { white, title, navigation } = this.props;

    if (title === 'Title') {
      return [
        <BellButton key='chat-title' navigation={navigation} isWhite={white} />,
        <BasketButton key='basket-title' navigation={navigation} isWhite={white} />
      ]
    }

    switch (title) {
      case 'Главная':
        return ([
          <BellButton key='chat-home' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-home' navigation={navigation} isWhite={white} />
        ]);
      case 'Deals':
        return ([
          <BellButton key='chat-categories' navigation={navigation} />,
          <BasketButton key='basket-categories' navigation={navigation} />
        ]);
      case 'Categories':
        return ([
          <BellButton key='chat-categories' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-categories' navigation={navigation} isWhite={white} />
        ]);
      case 'Category':
        return ([
          <BellButton key='chat-deals' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-deals' navigation={navigation} isWhite={white} />
        ]);
      case 'Profile':
        return ([
          <BellButton key='chat-profile' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-deals' navigation={navigation} isWhite={white} />
        ]);
      case 'Product':
        return ([
          <SearchButton key='search-product' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-product' navigation={navigation} isWhite={white} />
        ]);
      case 'Search':
        return ([
          <BellButton key='chat-search' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-search' navigation={navigation} isWhite={white} />
        ]);
      case 'Settings':
        return ([
          <BellButton key='chat-search' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-search' navigation={navigation} isWhite={white} />
        ]);
      default:
        break;
    }
  }

  renderOptions = () => {

    function onAlert() {
      Alert.alert(
          'Подсказка!',
          'Сменить группу и количество показываемых дней можно в настройках',
          [
            {text: 'Перейти в настройки', onPress: () => navigation.navigate("Onboarding")},
            {text: 'Окей', onPress: () => console.log('OK Pressed')},
          ]
      )
    }
    const { navigation, optionLeft, optionRight } = this.props;
    const state = this.state;


    return (
        <View>
          <Block row style={styles.options}>

            <Button shadowless style={[styles.tab, styles.divider]} onPress={() => {setTimeout(onAlert, 100)} }>
              <Block row middle>
                <Text size={13} style={styles.tabTitle}>{optionLeft || 'Ваша группа: 25-П'}</Text>
              </Block>
            </Button>
            <Button shadowless style={styles.tab} onPress={() => {setTimeout(onAlert, 100)} } >
              <Block row middle>
                <Text size={13} style={styles.tabTitle}>{optionRight || 'Расписание на 360 дней'}</Text>
              </Block>
            </Button>
          </Block>

          <ScrollView>
              <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                <ScrollView horizontal={true}>
                  {
                    this.state.buttons.map(item =>
                        <Button style={styles.btn} textStyle={{ fontSize: 14, textAlign: 'center' }}>{item}</Button>
                    )
                  }
                  {/*<Button style={styles.btn} textStyle={{ fontSize: 14, textAlign: 'center' }}>13.04.21 (ВТ)</Button>*/}
                  {/*<Button style={styles.btn} textStyle={{ fontSize: 14, textAlign: 'center' }}>14.04.21 (СР)</Button>*/}
                  {/*<Button style={styles.btn} textStyle={{ fontSize: 14, textAlign: 'center' }}>15.04.21 (ЧТ)</Button>*/}
                  {/*<Button style={styles.btn} textStyle={{ fontSize: 14, textAlign: 'center' }}>16.04.21 (ПТ)</Button>*/}
                  {/*<Button style={styles.btn} textStyle={{ fontSize: 14, textAlign: 'center' }}>17.04.21 (СБ)</Button>*/}
                  {/*<Button style={styles.btn} textStyle={{ fontSize: 14, textAlign: 'center' }}>18.04.21 (ПН)</Button>*/}
                  {/*<Button style={styles.btn} textStyle={{ fontSize: 14, textAlign: 'center' }}>19.04.21 (ВТ)</Button>*/}
                  {/*<Button style={styles.btn} textStyle={{ fontSize: 14, textAlign: 'center' }}>20.04.21 (СР)</Button>*/}
                </ScrollView>
                <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                <Rows data={state.tableData} textStyle={styles.text}/>
              </Table>
          </ScrollView>

        </View>

    );
  }
  renderTabs = () => {
    const { tabs, tabIndex, navigation } = this.props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;
    
    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={id => navigation.setParams({ tabId: id })} />
    )
  }
  renderHeader = () => {
    const { search, options, tabs } = this.props;
    if (search || tabs || options) {
      return (
        <Block center>
          {options ? this.renderOptions() : null}
          {tabs ? this.renderTabs() : null}
        </Block>
      );
    }
  }
  render() {
    const { back, title, white, transparent, bgColor, iconColor, titleColor, navigation, ...props } = this.props;

    const noShadow = ['Search', 'Categories', 'Deals', 'Pro', 'Profile'].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor }
    ];

    return (
      <Block style={{headerStyles, marginTop: 50}}>
        <NavBar
          back={false}
          title={title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center' }}
          left={
            <Icon
              name={back ? 'chevron-left' : "menu"} family="entypo"
              size={20} onPress={this.handleLeftPress}
              color={iconColor || (white ? argonTheme.COLORS.WHITE : argonTheme.COLORS.ICON)}
            />

          }
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: argonTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor }
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.45,
    borderRadius: 0,
    borderWidth: 0,
    height: 18,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '600',
    color: argonTheme.COLORS.HEADER
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, textAlign: 'center' },
  btn: {
    width: 65,
    height: 39,
  }
});

export default withNavigation(Header);
