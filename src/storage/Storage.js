import {AsyncStorage} from "react-native";
import {getLinks as ParseLinks} from "../parser/getLinks";
import {getTimeTable as ParseTimetable} from "../parser/getTimetable";

export const getLinks = async () => {
    let parsed_links_json = JSON.stringify(await ParseLinks());
    if (!await AsyncStorage.getItem('links')) {
        await AsyncStorage.setItem('links', parsed_links_json);
    }
    if (JSON.stringify(await AsyncStorage.getItem('links')) !== parsed_links_json) {
        await AsyncStorage.setItem('links', parsed_links_json);
    }
    return JSON.parse(await AsyncStorage.getItem('links'));
}

export const getTimetableByUrl = async url => {
    //if (!await AsyncStorage.getItem(url)) {
       let loaded_timetable = JSON.stringify(await ParseTimetable(url));
        await AsyncStorage.setItem(url, loaded_timetable);
    //}
    let data = await AsyncStorage.getItem(url);
    return JSON.parse(data)
}

