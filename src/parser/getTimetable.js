import {getPage} from "./getPage";
import * as FileSystem from "expo-file-system";

const cheerio = require('cheerio-without-node-native')

const getKeys = async () => {
    try {
        let data = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'timetable/keys.json');
        // console.log(data)
        return JSON.parse(data);
    } catch (e) {
        try {
            await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'timetable');
            await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'timetable/keys.json', JSON.stringify(Object.assign({}, {})));
            return false;
        } catch (e) {
            return false;
        }
    }
}

const loadTimeTable = async (timetable_url) => {

    const keys = await getKeys();
    if (timetable_url in keys) {
        let data = await FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'timetable/' + keys[timetable_url] + '.json');
        return JSON.parse(data);
    }
}

const setNewTimeTable = async (timetable_url, timetable) => {
    let keys = await getKeys();
    let new_key = Date.now();

    Object.assign(keys, {[timetable_url]: new_key});

    await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'timetable/' + new_key + '.json', JSON.stringify(timetable));
    await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'timetable/keys.json', JSON.stringify(Object.assign({}, keys)));
}

export const getTimeTable = async (timetable_url) => {
    let data;
    try {
        return await loadTimeTable(timetable_url);
    } catch (e) {
        data = await getPage(timetable_url)
    }
    const htmlString = data;
    const $ = cheerio.load(htmlString)
    const trTags = $('tr')
    const tableData = []

    trTags.each(function () {
        let tdTags = $(this).children()
        let tds_data = []

        tdTags.each(function () {
            let td = $(this)
            tds_data.push(
                td.text()
            )
        })
        tableData.push(tds_data);
    })

    let table_left_side = [], table_right_side = []

    let left_cur_group = "", right_cur_group = "";

    let setGroup = () => {
        if (table_left_side.length)
            output.push({
                [`${left_cur_group}`]: table_left_side
            })
        if (table_right_side.length)
            output.push({
                [`${right_cur_group}`]: table_right_side
            })
    }

    let output = [];

    for (let index in tableData) {
        let row = tableData[index]
        if (!row[0].trim()) {
            setGroup()
            left_cur_group = row[1]
            right_cur_group = row[2]

            table_left_side = []
            table_right_side = []
            continue
        }

        if (row[1].trim() && row[2].trim())
            table_left_side.push({
                hour: row[0],
                subject: row[1],
                cabinet: row[2],
            })

        if (row[3].trim() && row[4].trim())
            table_right_side.push({
                hour: row[0],
                subject: row[3],
                cabinet: row[4],
            })
    }
    setGroup()

    await setNewTimeTable(timetable_url, output);

    return output;
}
