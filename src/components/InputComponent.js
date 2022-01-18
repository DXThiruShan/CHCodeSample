import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
/**
 * Component
 * 
 */
const InputComponent = ({ option, previousWeekAnswer, question_id, type_code, getAnswers }) => {

    let previouslySelectedOption = previousWeekAnswer;

    const [noOfMembers, setNoOfMembers] = useState();
    const [previouslySelected, setPreviouslySelected] = useState(previouslySelectedOption);

    const onChangeNoOfMembers = (value) => {
        setNoOfMembers(value);
    }

    return (
        <View>
            <TextInput
                selectionColor={'green'}
                style={styles.input}
                placeholder="No of Members affected"
                placeholderTextColor="#000"
                autoCapitalize="none"
                keyboardType="numeric"
                value={previouslySelected !== undefined ? previouslySelected.toString() : noOfMembers}
                onChangeText={(value) => {
                    onChangeNoOfMembers(value);
                    setPreviouslySelected();
                    getAnswers(option, question_id, type_code, value, {}, "", "", "");
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: '80%',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        left: 40,
        fontSize: 11,
        fontFamily: 'Montserrat-light',
        padding: 13
    }
});

export default InputComponent;