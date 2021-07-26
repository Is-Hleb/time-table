import * as FileSystem from 'expo-file-system';
import {getLinks as ParseLinks} from "../parser/getLinks";
import {getTimeTable as ParseTimetable} from "../parser/getTimetable";

const LINKS_JSON_FILE_PATH = FileSystem.documentDirectory + 'links.json';

export const getOldLinks = async () => JSON.parse(await FileSystem.readAsStringAsync(LINKS_JSON_FILE_PATH));

export const getLinks = async () => {
    let links;
    try {
        links = JSON.parse(await FileSystem.readAsStringAsync(LINKS_JSON_FILE_PATH));
    } catch (e) {
        await uploadLinks();
        links = JSON.parse(await FileSystem.readAsStringAsync(LINKS_JSON_FILE_PATH));
    }
    return links;
}

export const uploadLinks = async () => {
    let parsed_links_json, storage_links_json, output;
    parsed_links_json = JSON.stringify(await ParseLinks())

    try {
        storage_links_json = await FileSystem.readAsStringAsync(LINKS_JSON_FILE_PATH);
    } catch (e) {
        await FileSystem.writeAsStringAsync(LINKS_JSON_FILE_PATH, parsed_links_json);
    }

    if (parsed_links_json !== storage_links_json) {
        await FileSystem.writeAsStringAsync(LINKS_JSON_FILE_PATH, parsed_links_json);
    }
}

export const getTimetableByUrl = async url => {
    //if (!await AsyncStorage.getItem(url)) {
    let data = JSON.stringify(await ParseTimetable(url));
    //await AsyncStorage.setItem(url, loaded_timetable);
    //}
    //let data = await AsyncStorage.getItem(url);
    return JSON.parse(data)
}

