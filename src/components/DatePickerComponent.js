import moment from 'moment';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import DatePicker from 'react-native-datepicker';
/**
 * Component
 * 
 */
const DatePickerComponent = ({ option, previousWeekAnswer, question_id, type_code, getAnswers, selectedValue, getVaccinatedDate, optionFiltered, dependableListFiltered, optionFilteredTwo, dependableListFilteredTwo, previousWeekAnswerTwo }) => {

    const [vaccinatedDate, setVaccinatedDate] = useState();
    const [vaccinatedDateTwo, setVaccinatedDateTwo] = useState();
    const [date, setDate] = useState();

    let dose = option.option_id === '50' ? 1 : 2;

    useEffect(() => {
        setDate();
        setVaccinatedDate(previousWeekAnswer);
        setVaccinatedDateTwo(previousWeekAnswerTwo);
    }, [option]);

    useEffect(() => {
        setDate();
    }, [selectedValue]);

    return (
        <View style={styles.container}>
            <DatePicker
                style={styles.datePickerStyle}
                date={date ? date : dose === 1 ? vaccinatedDate : vaccinatedDateTwo}
                value={date ? date : dose === 1 ? vaccinatedDate : vaccinatedDateTwo} 
                mode="date" 
                placeholder="select date"
                format="DD-MM-YYYY"
                minDate="01-01-2021"
                maxDate={moment(new Date()).format("DD-MM-YYYY")}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                    },
                    dateInput: {
                        marginLeft: 36,
                        color: 'red'
                    },
                }}
                onDateChange={(date) => {
                    dose === 1 ? (
                        setVaccinatedDate(null),
                        getAnswers(option || optionFiltered , question_id, type_code, 0, selectedValue || dependableListFiltered, date, "", ""),
                        getVaccinatedDate(option, date, selectedValue || dependableListFiltered)
                        )
                        :
                        (
                        setVaccinatedDateTwo(null),
                        getAnswers(option || optionFilteredTwo , question_id, type_code, 0, selectedValue || dependableListFilteredTwo, date, "", ""),
                        getVaccinatedDate(option, date, selectedValue || dependableListFilteredTwo)
                        );
                    setDate(date);
                }}
            />
        </View>
    );
};

export default DatePickerComponent;

const styles = StyleSheet.create({
    datePickerStyle: {
        width: 200,
        marginTop: 20,
        marginLeft: 30,
        alignItems: 'center',
        justifyContent: 'center',

    },
});