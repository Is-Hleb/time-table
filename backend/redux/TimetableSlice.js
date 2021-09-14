import { createSlice } from '@reduxjs/toolkit'
import getTimetable from "../api-requests/post_timetable";

const pages = 1;

export const Timetable = createSlice({
    name: 'timetable',
    initialState: {
        value: undefined
    },
    reducers: {
        load: state => {
            state.value = getTimetable(pages)
        },
    }
})

// Action creators are generated for each case reducer function
export const { load } = Timetable.actions

export default Timetable.reducer