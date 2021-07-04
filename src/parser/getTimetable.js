import {getPage} from "./getPage";

const cheerio = require('cheerio-without-node-native')

export const getTimeTable = async (timetable_url) => {
    const htmlString = await getPage(timetable_url)
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

        if (row[1] && row[2])
            table_left_side.push({
                hour: row[0],
                subject: row[1],
                cabinet: row[2],
            })

        if (row[3] && row[4])
            table_right_side.push({
                hour: row[0],
                subject: row[3],
                cabinet: row[4],
            })
    }
    setGroup()
    return output;
}
