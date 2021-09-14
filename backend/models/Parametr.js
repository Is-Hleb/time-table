import * as SQLite from 'expo-sqlite'
import {BaseModel, types} from 'expo-sqlite-orm'

export default class Parameter extends BaseModel {
    constructor(obj) {
        super(obj)
    }

    static get database() {
        return async () => SQLite.openDatabase('database.db')
    }

    static get tableName() {
        return 'parameters'
    }


    static get columnMapping() {
        return {
            id: {type: types.INTEGER, primary_key: true}, // For while only supports id as primary key
            name: {type: types.TEXT, not_null: true},
            value: {type: types.TEXT, not_null: false},
        }
    }
}