import fetch from 'cross-fetch'
import getTimetable from "../../api-requests/post_timetable";

export const FETCH_TIMETABLE = 'FETCH_TIMETABLE'

function fetchTimetable(subreddit, timtebla) {
    return {
        type: FETCH_TIMETABLE,
        subreddit,
        timetable
    }
}

export function loadTimetable(subreddit) {
    return function (dispatch) {
        dispatch(fetchTimetable(subreddit))
        return getTimetable(1).then(data => {
            console.log(data)
        })
    }
}