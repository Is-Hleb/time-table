import getToken from "./get_token";
import getParameter from "../../settings/getParameter";

const axios = require('axios')

export default async function getTimetable(pages) {
    let api_token = await getToken()
    let url = getParameter("APIUrl") + '/timetable'
    let body = new FormData()

    body.append('api_token', api_token)
    body.append('pages', pages)

    try {
        let response = await axios.post(url, body)
        return response.data;
    } catch (e) {
        console.log(e.messages)
    }


}