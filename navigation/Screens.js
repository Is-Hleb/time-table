import React from "react";
import { Easing, Animated, Dimensions } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Block } from "galio-framework";

// screens
import Home from "../screens/Home";
import Pro from "../screens/Pro";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import Booker from '../screens/Booker'
import Onboarding from '../screens/Onboarding'
// drawer
import CustomDrawerContent from "./Menu";

// header for screens
import { Icon, Header } from "../components";
import { argonTheme, tabs } from "../constants";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();



function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true
        }}
      />
            <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function POITStack(props) {
    return (
        <Stack.Navigator initialRouteName="Pro" mode="card" headerMode="screen">
            <Stack.Screen
                name="Pro"
                component={Profile}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            transparent
                            white
                            title="Pro"
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#FFFFFF" },
                    headerTransparent: true
                }}
            />
        </Stack.Navigator>
    );
}

function BookerStack(props) {
    return (
        <Stack.Navigator initialRouteName="Booker" mode="card" headerMode="screen">
            <Stack.Screen
                name="Booker"
                component={Booker}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            transparent
                            white
                            title="Меню
                            "
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#FFFFFF" },
                    headerTransparent: true
                }}
            />
        </Stack.Navigator>
    );
}

function SettingsStack(props) {
    return (
        <Stack.Navigator initialRouteName="Onboarding" mode="card" headerMode="screen">
            <Stack.Screen
                name="Onboarding"
                component={Onboarding}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header
                            transparent
                            white
                            title="Настройки
                            "
                            navigation={navigation}
                            scene={scene}
                        />
                    ),
                    cardStyle: { backgroundColor: "#FFFFFF" },
                    headerTransparent: true
                }}
            />
        </Stack.Navigator>
    );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="Расписание"
              search
              options
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" }
        }}
      />
      <Stack.Screen
        name="Pro"
        component={Pro}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title=""
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}


function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Расписание" component={HomeStack} />
      <Drawer.Screen name="Профиль (разработка)" component={ProfileStack} />
      <Drawer.Screen name="Отзывы о преподавателях (разработка)" component={Register} />
      <Drawer.Screen name="POIT" component={POITStack} />
      <Drawer.Screen name="Booker" component={BookerStack} />
      <Drawer.Screen name="Onboarding" component={SettingsStack} />
    </Drawer.Navigator>
  );
}

