/**
 * Use for a load parametrs from settings files
 * @param {string} name
 **/
import urls from "./urls.json"
export default function getParameter(name) {
    if(name === "APIUrl") {
        return urls.protocol + urls.apiHost + urls.apiPort + '/api'
    }
    return urls[name]
}
