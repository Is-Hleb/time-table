import {getPage} from "./getPage";

const cheerio = require('cheerio-without-node-native')

export const getLinks = async () => {
    const htmlString = await getPage('http://bgaek.by/category/%d1%80%d0%b0%d1%81%d0%bf%d0%b8%d1%81%d0%b0%d0%bd%d0%b8%d0%b5/buh-otdel/');
    const $ = cheerio.load(htmlString)
    let outputData = []
    let cheerioDataH2 = $('h2.entry-title')
    cheerioDataH2.each(function () {
        let tagA = $(this).children()
        let dayOfWeek = $(this).text().split(/[()]/)[1];

        switch (dayOfWeek) {
            case 'понедельник':
                dayOfWeek = 'пн'
                break;
            case 'вторник':
                dayOfWeek = 'вт'
                break;
            case 'среда':
                dayOfWeek = 'ср'
                break;
            case 'четверг':
                dayOfWeek = 'чт'
                break;
            case 'пятница':
                dayOfWeek = 'пт'
                break;
            case 'суббота':
                dayOfWeek = 'сб'
                break;
        }

        let date = $(this).text().split(' ').filter(value => (value.split('.').length === 3))[0]
        outputData.push({
            href: tagA.attr('href'),
            dayOfWeek,
            date,
        })
    })
    return outputData;
}
