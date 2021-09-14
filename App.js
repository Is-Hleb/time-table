import React, {useState} from "react";
import {Image} from "react-native";
import AppLoading from "expo-app-loading";
import {useFonts} from '@use-expo/font';
import {Asset} from "expo-asset";
import {Block, GalioProvider} from "galio-framework";
import {NavigationContainer} from "@react-navigation/native";
import getToken from "./backend/api-requests/get_token";
import {enableScreens} from "react-native-screens";
import {fetchTimetable} from "./backend/redux/Storage";

enableScreens();

import Screens from "./navigation/Screens";
import {Images, articles, argonTheme} from "./constants";
import getTimetable from "./backend/api-requests/post_timetable";
import {useDispatch, useSelector} from "react-redux";
import {store} from './backend/redux/Storage'
import {Provider} from "react-native-paper";
// cache app images
const assetImages = [
    Images.Onboarding,
    Images.LogoOnboarding,
    Images.Logo,
    Images.Pro,
    Images.ArgonLogo,
    Images.iOSLogo,
    Images.androidLogo
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
    return images.map(image => {
        if (typeof image === "string") {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

export default props => {
    getTimetable().then(data => console.log(data)).catch(e => {
        console.log(e.message)
    })


    const [isLoadingComplete, setLoading] = useState(false);
    let [fontsLoaded] = useFonts({
        'ArgonExtra': require('./assets/font/argon.ttf'),
    });

    function _loadResourcesAsync() {
        return Promise.all([...cacheImages(assetImages), getToken()]);
    }

    function _handleLoadingError(error) {
        /* Не нужная функция, забей на нее, она отправляет в Sentry все ошибки, анализируют
         и фиксят, но пусть будет, лишним не будет */
        console.warn(error);
    };

    function _handleFinishLoading() {
        setLoading(true);
    };

    if (!fontsLoaded && !isLoadingComplete) {
        return (
            <AppLoading
                startAsync={_loadResourcesAsync}
                onError={_handleLoadingError}
                onFinish={_handleFinishLoading}
            />
        );
    } else if (fontsLoaded) {
        return (
            <NavigationContainer >
                <GalioProvider theme={argonTheme}>
                    <Block flex>
                        <Screens/>
                    </Block>
                </GalioProvider>
            </NavigationContainer>
        );
    } else {
        return null
    }
}
