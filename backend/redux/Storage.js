import getTimetable from "../api-requests/post_timetable";
import thunk from 'redux-thunk'
import {applyMiddleware} from "redux";


const redux = require('redux')
const getToken = require("../api-requests/get_token");


const initialState = {
    api_token: undefined,
    timetable: undefined,
}

function setTimetable(timetable) {
    return {
        type: 'setTimetable',
        timetable
    }
}

export function fetchTimetable() {
    return (dispatch) => {
        getTimetable(4).then(data => {
            // console.log(data)
            dispatch(setTimetable(data))
        })
    }
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'setTimetable':
            return {
                timetable: action.timetable,
                readyToShow: true,
            }
    }

    return {
        timetable: "timetable",
        readyToShow: false,
    }
}

export const loadTimetableAction = {
    type: 'loadTimetable',
}

export const store = redux.createStore(reducer, applyMiddleware(thunk))
store.dispatch(fetchTimetable())
