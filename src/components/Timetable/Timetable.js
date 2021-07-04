import React, {Component} from "react";
import {FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import Group from "./Group";
import {theme} from "../../frontend/Theme";
import {Col, Row, Rows, Table, TableWrapper} from 'react-native-table-component';

class Timetable extends Component {


    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Час', 'Предмет', 'Кабинет'],
            tableData: [],
            activeGroup: '25-п',
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.timetable !== this.props.timetable) {
            this.showTimetable(this.state.activeGroup)
        }
    }

    showTimetable = (group) => {
        let timetable = this.props.timetable
        let cur_timetable = timetable.filter(item => (Object.keys(item)[0] === group))

        console.log(cur_timetable);
        if (cur_timetable === undefined || !cur_timetable.length) {
            cur_timetable = timetable[0]
            console.log(cur_timetable)
            if (!cur_timetable || !cur_timetable.length)
                return;
            console.log(group);
        }
        console.log(cur_timetable)
        cur_timetable = cur_timetable[0][group]
        let table_data = []
        for (let index = 0; index < cur_timetable.length; index++)
            table_data.push([
                cur_timetable[index].hour,
                cur_timetable[index].subject,
                cur_timetable[index].cabinet
            ])
        this.setState({activeGroup: group});
        this.setState({tableData: table_data});

    }

    componentDidMount() {
        this.showTimetable(this.state.activeGroup);
    }

    render() {
        return (
            <View style={styles.timetable}>
                <View style={styles.content}>
                    <ScrollView style={{width: '100%'}} horizontal>
                        {
                            this.props.timetable.map((item, index) => {
                                return (
                                    <Group active={this.state && this.state.activeGroup === Object.keys(item)[0]}
                                           Press={this.showTimetable} key={index.toString()}
                                           title={Object.keys(item)[0]}/>
                                )
                            })
                        }
                    </ScrollView>
                    <View style={styles.container}>
                        <ScrollView>

                            <Table borderStyle={{borderWidth: 1}}>
                                <Row data={this.state.tableHead} flexArr={[1, 4, 3]} style={styles.head}
                                     textStyle={styles.text}/>
                                <TableWrapper style={styles.wrapper}>
                                    <Rows data={this.state.tableData} flexArr={[1, 4, 3]} style={styles.row}
                                          textStyle={styles.text}/>
                                </TableWrapper>
                            </Table>
                        </ScrollView>

                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    timetable: {
        width: '75%',
        height: '100%',
        flexDirection: 'row',
        backgroundColor: theme.colors.backgroundColor,
    },
    content: {
        flexDirection: 'row',
        flexWrap: "wrap",
        width: '100%',
        height: '100%',
    },
    groups: {
        flexDirection: "row",
        flexWrap: "wrap",
        height: '3%',
        width: '100%',
    },
    container: {flex: 1, paddingRight: 1, backgroundColor: theme.colors.backgroundColor, marginBottom: '20%',},
    head: {height: 40, backgroundColor: theme.colors.primary},
    wrapper: {flexDirection: 'row'},
    title: {flex: 1, backgroundColor: '#f6f8fa'},
    row: {minHeight: 70, paddingHorizontal: 5},
    text: {textAlign: 'center', color: theme.colors.text, ...theme.fonts.light}
});

export default Timetable;
