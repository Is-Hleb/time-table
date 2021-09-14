import getParameter from "../../settings/getParameter";
import Parameter from "../models/Parametr";

const axios = require('axios')

export default async function getToken() {
    const url = getParameter("APIUrl")
    try {
        let record = await Parameter.findBy({name_eq: 'api_token'})
        return record.value;
    } catch (e) {
        let response = await axios.get(url + "/get-token")
        let token = response.data;

        await Parameter.createTable()

        let parameter = new Parameter({
            name: 'api_token',
            value: token,
        });

        parameter.save()
        return token;
    }



}