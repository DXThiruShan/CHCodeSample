import React, { useState } from 'react';
import { View,Image, StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
/**
 * Component
 * 
 */
const SubDropdownComponent = ({ option, previousWeekAnswer, question_id, type_code, getAnswers, getDependableoption, vaccinatedDate, previousWeekAnswerTwo }) => {
    const previouslySelectedOption = previousWeekAnswer;
    const [dose1OptionName , setDose1OptionName] = useState(option.dependable_list.filter((data) => data.option_id == previousWeekAnswer));
    const [dose2OptionName , setDose2OptionName] = useState(option.dependable_list.filter((data) => data.option_id == previousWeekAnswerTwo));
    
    const [optionName , setOptionName] = useState(option.dependable_list.filter((data) => data.option_id === previouslySelectedOption));

    let dose = option.option_id === '50' ? 1: 2;
    const handleDropdownSelect = (value) => {
        const selectedValue = option.dependable_list[value];
        getDependableoption(selectedValue, dose, option);
        getAnswers(option, question_id, type_code, 0, selectedValue, vaccinatedDate, "", "");
    }

    return (
        <View>
            <ModalDropdown
                style={styles.dropdown}
                dropdownStyle={styles.subDropdownOption}
                dropdownTextStyle={styles.dropdownTextStyle}
                defaultValue={ 
                    question_id === '15'?
                    (dose === 1 ?
                    dose1OptionName && dose1OptionName.length > 0 ?
                    dose1OptionName[0].option_label :
                    option.dependable_type_code == "radio_button" ?
                    'Select your option' :'Select vaccination name' : 
                    dose2OptionName && dose2OptionName.length > 0 ?
                    dose2OptionName[0].option_label :
                    option.dependable_type_code == "radio_button" ?
                    'Select your option' :'Select vaccination name')
                    :
                    (
                    optionName && optionName.length > 0 ?
                    optionName[0].option_label :
                    option.dependable_type_code == "radio_button" ?
                    'Select your option' :'Select vaccination name'
                    )
                }
                options={option.dependable_list.map((data) => data.option_label)}
                onSelect={(value) => {
                    dose === 1? setDose1OptionName() : setDose2OptionName();
                    handleDropdownSelect(value);
                }}
                renderRightComponent={() => (
                    <Image
                        style= {styles.img}
                        source={require('../assets/images/questions/down-arrow.png')}
                    />
                )}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    dropdown: {
        marginTop: 5,
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#208e8f',
        borderRadius: 5,
        left: 40,
        fontSize: 11,
        fontFamily: 'Montserrat-light',
        padding: 13
    },
    subDropdownOption: {
        marginTop: 10,
        width: '65%',
        height: 100,
        borderWidth: 1,
        borderColor: '#208e8f',
        position: 'absolute',
        fontSize: 11,
        fontFamily: 'Montserrat-light',
        left: 20
    },
    dropdownTextStyle: {
        fontSize: 11,
        fontFamily: 'Montserrat-Bold'
    },
    img: {
        height: 15,
        width: 15,
        position: 'absolute',
        right: 10
    }
})

export default SubDropdownComponent;