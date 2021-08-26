import * as FileSystem from 'expo-file-system';
const PATH_TO_LINKS_KEYS = FileSystem.documentDirectory + 'keys.json';

export const getPage = async (url) => {
    let keys = [], key = Date.now();
    try {
        keys = JSON.parse(await FileSystem.readAsStringAsync(PATH_TO_LINKS_KEYS));
    } catch (e) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'pages');
        // console.log(e.message)
    }

    console.log(keys)

    if(url in keys) {

        console.log(data);
        return await FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'pages/' + keys[url] + '.txt');
    }

    const data = await fetch(url);
    let text = await data.text()

    // console.log({[url] : key})

    keys[url] = key;
    Object.assign(keys, {[url]: key});
    // console.log(keys);

    await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'pages/' + key + '.txt', text);
    await FileSystem.writeAsStringAsync(PATH_TO_LINKS_KEYS, JSON.stringify(Object.assign({}, keys)));

    return text
}
