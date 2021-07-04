import AsyncStorage from '@react-native-async-storage/async-storage';

export const getPage = async (url) => {
    const data = await fetch(url);
    return data.text()
}
