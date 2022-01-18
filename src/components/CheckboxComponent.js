import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable
} from 'react-native';

import LoaderContext from '../context/LoaderContext';
import ToastContext from '../context/ToastContext';
import { CheckBox } from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';

import DatePickerComponent from './DatePickerComponent';
import DocumentPicker from 'react-native-document-picker';
import SubDropdownComponent from './SubDropdownComponent';


/**
 * Component
 * 
 */
const CheckboxComponent = ({ question, previousWeekAnswer, getAnswers }) => {

    let previouslyChecked,
        previouslySelectedOption,
        previouslySelectedOptionTwo,
        previouslySelectedOptionNo,
        values;
    if (question.question_id === '15' && previousWeekAnswer && previousWeekAnswer.option_id != undefined) {
        if (previousWeekAnswer.option_id.includes("-")) {
            values = previousWeekAnswer.option_id.split("-");
            if (values) {
                previouslySelectedOption = values[0].split(",");
                previouslySelectedOptionTwo = values[1].split(",");
            }
        } else if (previousWeekAnswer.option_id.includes("50") === true) {
            previouslySelectedOption = previousWeekAnswer.option_id.split(",");
        } else if (previousWeekAnswer.option_id.includes("51") === true) {
            previouslySelectedOptionTwo = previousWeekAnswer.option_id.split(",");
        } else if (previousWeekAnswer) {
            previouslySelectedOptionNo = previousWeekAnswer.option_id;
        }
    } else if (question.question_id !== '15') {
        if (previousWeekAnswer && previousWeekAnswer.option_id != undefined) {
            previouslyChecked = previousWeekAnswer &&
                previousWeekAnswer.option_id.split(",");
        }
    }

    const loader = useContext(LoaderContext);
    const toast = useContext(ToastContext);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptionTwo, setSelectedOptionTwo] = useState('');

    const [vaccineTypeOption, setVaccineTypeOption] = useState('');
    const [vaccineTypeOptionTwo, setVaccineTypeOptionTwo] = useState('');

    const [vaccinationDate, setVaccinationDate] = useState('');
    const [vaccinationDateTwo, setVaccinationDateTwo] = useState('');

    const [singleFileName, setSingleFileName] = useState('');
    const [singleFileNameTwo, setSingleFileNameTwo] = useState('');

    const [previousSelectedOptions, setPreviousSelectedOptions] = useState(previouslySelectedOption && previouslySelectedOption[0]);
    const [previousSelectedOptionsTwo, setPreviousSelectedOptionsTwo] = useState(previouslySelectedOptionTwo && previouslySelectedOptionTwo[0]);

    const [previousVaccineTypeOption, setPreviousVaccineTypeOption] = useState(previouslySelectedOption && previouslySelectedOption[1]);
    const [previousVaccineTypeOptionTwo, setPreviousVaccineTypeOptionTwo] = useState(previouslySelectedOptionTwo && previouslySelectedOptionTwo[1]);

    const [previousVaccinationDate, setPreviousVaccinationDate] = useState(previousWeekAnswer && previousWeekAnswer.vaccinated_date && previousWeekAnswer.vaccinated_date.slice(0, 11));
    const [previousVaccinationDateTwo, setPreviousVaccinationDateTwo] = useState(previousWeekAnswer && previousWeekAnswer.vaccinated_date_dose2 && previousWeekAnswer.vaccinated_date_dose2.slice(0, 11));

    const [previousSingleFileName, setPreviousSingleFileName] = useState(previousWeekAnswer !== undefined && previousWeekAnswer.file_name);
    const [previousSingleFileNameTwo, setPreviousSingleFileNameTwo] = useState(previousWeekAnswer !== undefined && previousWeekAnswer.file_name_dose2);

    let optionFiltered, dependableListFiltered, optionFilteredTwo, dependableListFilteredTwo;

    if ((question.question_id === '15') && previouslySelectedOption && previouslySelectedOption.length > 0 && previouslySelectedOption[1]) {

        question.choice_list.map((item) => {
            if (item.option_id === (previouslySelectedOption && previouslySelectedOption.length > 0 && previouslySelectedOption[0])) {
                optionFiltered = item;
                item.dependable_list.map(data => {
                    if (data.option_id === (previouslySelectedOption && previouslySelectedOption.length > 0 && previouslySelectedOption[1])) {
                        dependableListFiltered = data;
                    }
                })
            }
        });
    }
    if ((question.question_id === '15') && previouslySelectedOptionTwo && previouslySelectedOptionTwo.length > 0 && previouslySelectedOptionTwo[1]) {

        question.choice_list.map((item) => {
            if (item.option_id === (previouslySelectedOptionTwo && previouslySelectedOptionTwo.length > 0 && previouslySelectedOptionTwo[0])) {
                optionFilteredTwo = item;
                item.dependable_list.map(data => {
                    if (data.option_id === (previouslySelectedOptionTwo && previouslySelectedOptionTwo.length > 0 && previouslySelectedOptionTwo[1])) {
                        dependableListFilteredTwo = data;
                    }
                })
            }
        })
    }

    const settingPreviousAnswerValue = (() => {
        const items = question && question.type_code === "check_box" && question.choice_list;
        if (question.question_id !== '15' && previouslyChecked) {
            const list = question && question.type_code === "check_box" && question.choice_list;
            previouslyChecked.map((data) => {
                const currentIndex = list && list.findIndex((item) => item.option_id === data);
                if (currentIndex > -1) {
                    list[currentIndex].value = true
                }
            });
        } else if (question.question_id === '15' && (previouslySelectedOption || previouslySelectedOptionTwo)) {
            if (previouslySelectedOption) {
                previouslySelectedOption.map((data) => {
                    const currentIndex = items && items.findIndex((item) => item.option_id === data);
                    if (currentIndex > -1) {
                        items[currentIndex].value = true
                    }
                });
            }
            if (previouslySelectedOptionTwo) {
                previouslySelectedOptionTwo.map((data) => {
                    const currentIndex = items && items.findIndex((item) => item.option_id === data);
                    if (currentIndex > -1) {
                        items[currentIndex].value = true
                    }
                });
            }
        } else if (question.question_id === '15' && previouslySelectedOptionNo) {
            const currentIndex = items && items.findIndex((item) => item.option_id === previouslySelectedOptionNo);
            if (currentIndex > -1) {
                items[currentIndex].value = true
            }
        }
    })

    useEffect(() => {
        settingPreviousAnswerValue();
    }, [question]);


    const toggleCheckBox = (option) => {

        const items = question && question.type_code === "check_box" && question.choice_list;
        const currentIndex = items && items.findIndex((item) => item.option_id === option.option_id);
        const isNoneOfAbove = (option.option_label === "None of the above" ||
            option.option_label === "No") ? true : false;
        const lastIndex = items.length - 1;
        if (currentIndex > -1) {
            items[currentIndex].value = !items[currentIndex].value;
        }

        items.map((data, key) => {
            if (isNoneOfAbove && key != currentIndex) {
                items[key].value = false;
            }
            if (!isNoneOfAbove && key === lastIndex) {
                items[key].value = false;
            }
        })
        if (question.question_id === '15') {
            checkDoseDetails(option);
        }
    };

    const checkDoseDetails = (option) => {

        const items = question && question.type_code === "check_box" && question.choice_list;
        const selected = items && items.filter((item) => item.option_id === '50' && item.value === true );
        const isFirstDoseSelected = (selected.length > 0  && (selectedOption || optionFiltered) && (vaccineTypeOption ||previousVaccineTypeOption) && (vaccinationDate || previousVaccinationDate) && (singleFileName|| previousSingleFileName)) ? true : false;
        const isSecondDoseIndex = items && items.findIndex((item) => item.option_id === '51');
        if (option.option_id === '51' && option.value === true) {
            items.map((data, key) => {
                if (!isFirstDoseSelected && key === isSecondDoseIndex) {
                    toast({ message: "Please complete dose 1 details" });
                    items[key].value = false;
                } else if(isFirstDoseSelected && key === isSecondDoseIndex) {
                    items[key].value = true;
                }
            })
        }
    }
    const getDependableoption = (list, dose, option) => {
        if (option !== undefined && list !== undefined && dose === 1) {
            setVaccineTypeOption('');
            setVaccinationDate('');
            setSingleFileName('');
            setPreviousVaccineTypeOption();
            setPreviousVaccinationDate();
            setPreviousSingleFileName();

            setSelectedOption(option);
            setTimeout(() => {
                setVaccineTypeOption(list);
            }, 100);
        }
        if (option !== undefined && list !== undefined && dose === 2) {
            setVaccineTypeOptionTwo('');
            setVaccinationDateTwo('');
            setSingleFileNameTwo('');
            setPreviousVaccineTypeOptionTwo();
            setPreviousVaccinationDateTwo();
            setPreviousSingleFileNameTwo();

            setSelectedOptionTwo(option);
            setTimeout(() => {
                setVaccineTypeOptionTwo(list);
            }, 100);
        };
    }

    const getVaccinatedDate = (option, date, dependableOption) => {
        if (date !== '' && option !== '' && dependableOption !== '' && option.option_id === "50") {
            setSelectedOption(option);
            setVaccineTypeOption(dependableOption);
            setVaccinationDate(date);
            setSingleFileName('');
            setPreviousSingleFileName();
        } else if (date !== '' && option !== '' && dependableOption !== '' && option.option_id === "51") {
            setSelectedOptionTwo(option);
            setVaccineTypeOptionTwo(dependableOption);
            setVaccinationDateTwo(date);
            setSingleFileNameTwo('');
            setPreviousSelectedOptionsTwo();
        };
    };

    const selectOneFile = async (option) => {
        loader.setLoader(true);
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            let path = (Platform.OS == 'ios') ?
                res.uri.replace('file://', '') :
                res.uri;
            setTimeout(async function () {
                await RNFetchBlob.fs
                    .readFile(path, 'base64')
                    .then((data) => {
                        if (selectedOption && selectedOptionTwo === '' && optionFiltered === undefined && optionFilteredTwo === undefined) {
                            selectedOption.option_id === '50' ? setSingleFileName(res.name) : null;
                            getAnswers(selectedOption, question.question_id, question.type_code, 0, vaccineTypeOption, vaccinationDate, res.name, data);
                        }

                        if(selectedOption === '' && selectedOptionTwo === '' && optionFiltered && optionFilteredTwo === undefined) {
                            setPreviousSingleFileName(res.name);
                            getAnswers(optionFiltered, question.question_id, question.type_code, 0, dependableListFiltered, previousVaccinationDate, res.name, data);
                        }

                        if(selectedOption && selectedOptionTwo === '' && optionFiltered && optionFilteredTwo === undefined) {
                            selectedOption.option_id === '50' ? setSingleFileName(res.name) : null;
                            getAnswers(selectedOption, question.question_id, question.type_code, 0, vaccineTypeOption , vaccinationDate, res.name, data);
                        }

                        if(selectedOption === '' && selectedOptionTwo && optionFiltered && optionFilteredTwo === undefined) {
                            if(option.option_id === '51') {
                                selectedOptionTwo.option_id === '51' ? setSingleFileNameTwo(res.name) : null;
                                getAnswers(selectedOptionTwo, question.question_id, question.type_code, 0, vaccineTypeOptionTwo, vaccinationDateTwo, res.name, data);
                            }

                            if(option.option_id === '50' && selectedOption === '' && optionFiltered && optionFilteredTwo === undefined) {
                                setPreviousSingleFileName(res.name);
                                getAnswers(optionFiltered, question.question_id, question.type_code, 0, dependableListFiltered, previousVaccinationDate, res.name, data);
                            }
                        }

                        if(option.option_id === '50' && selectedOption && selectedOptionTwo && optionFiltered && optionFilteredTwo === undefined) {
                                selectedOption.option_id === '50' ? setSingleFileName(res.name) : null;
                                getAnswers(selectedOption, question.question_id, question.type_code, 0, vaccineTypeOption, vaccinationDate, res.name, data);
                        }

                        if(selectedOption && selectedOptionTwo && optionFiltered === undefined &&optionFilteredTwo === undefined) {
                            if (option.option_id === '51') {
                                selectedOptionTwo.option_id === '51' ? setSingleFileNameTwo(res.name) : null;
                                getAnswers(selectedOptionTwo, question.question_id, question.type_code, 0, vaccineTypeOptionTwo, vaccinationDateTwo, res.name, data);
                            }
                            if (option.option_id === '50') {
                                selectedOption.option_id === '50' ? setSingleFileName(res.name) : null;
                                getAnswers(selectedOption, question.question_id, question.type_code, 0, vaccineTypeOption, vaccinationDate, res.name, data);
                            }
                        }

                         if(selectedOption === '' && selectedOptionTwo === '' && optionFiltered && optionFilteredTwo) {
                            if (option.option_id === '51') {
                                setPreviousSingleFileNameTwo(res.name);
                                getAnswers(optionFilteredTwo, question.question_id, question.type_code, 0, dependableListFilteredTwo, previousVaccinationDateTwo, res.name, data);
                            }
                            if (option.option_id === '50') {
                                setPreviousSingleFileName(res.name);
                                getAnswers(optionFiltered, question.question_id, question.type_code, 0, dependableListFiltered, previousVaccinationDate, res.name, data);
                            }   
                        }

                         if(selectedOption && selectedOptionTwo === '' && optionFiltered && optionFilteredTwo) {
                            if (option.option_id === '51') {
                                setPreviousSingleFileNameTwo(res.name);
                                getAnswers(optionFilteredTwo, question.question_id, question.type_code, 0, dependableListFilteredTwo, previousVaccinationDateTwo, res.name, data);
                            }
                            if (option.option_id === '50') {
                                selectedOption.option_id === '50' ? setSingleFileName(res.name) : null;
                                getAnswers(selectedOption, question.question_id, question.type_code, 0, vaccineTypeOption, vaccinationDate, res.name, data);
                            }   
                        }

                        if(selectedOption === '' && selectedOptionTwo && optionFiltered && optionFilteredTwo) {
                            if (option.option_id === '51') {
                                selectedOptionTwo.option_id === '51' ? setSingleFileNameTwo(res.name) : null;
                                getAnswers(selectedOptionTwo, question.question_id, question.type_code, 0, vaccineTypeOptionTwo, vaccinationDateTwo, res.name, data);
                            }
                            if (option.option_id === '50') {
                                setPreviousSingleFileName(res.name);
                                getAnswers(optionFiltered, question.question_id, question.type_code, 0, dependableListOption, previousVaccinationDate, res.name, data);
                            }   
                        }

                        if(selectedOption && selectedOptionTwo && optionFiltered && optionFilteredTwo) {
                            if (option.option_id === '51') {
                                selectedOptionTwo.option_id === '51' ? setSingleFileNameTwo(res.name) : null;
                                getAnswers(selectedOptionTwo, question.question_id, question.type_code, 0, vaccineTypeOptionTwo, vaccinationDateTwo, res.name, data);
                            }
                            if (option.option_id === '50') {
                                selectedOption.option_id === '50' ? setSingleFileName(res.name) : null;
                                getAnswers(selectedOption, question.question_id, question.type_code, 0, vaccineTypeOption, vaccinationDate, res.name, data);
                            }   
                        }
                        loader.setLoader(false);
                    })
                    .catch((err) => { console.log("Error is ", err) });
            }, 1000);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                alert('File browse cancelled..!');
                loader.setLoader(false);
            } else {
                alert('Error: ' + JSON.stringify(err));
                loader.setLoader(false);
                throw err;
            }
        }
    };

    return (
        <View>
            {
                question.choice_list.map((option) => {
                    return (
                        <View key={option.option_id}>
                            <CheckBox key={option.option_id}
                                title={option.option_label}
                                checkedIcon={
                                    <Image
                                        style={styles.img}
                                        source={require('../assets/images/questions/checkbox-after.png')}
                                    />}
                                uncheckedIcon={
                                    <Image
                                        style={styles.img}
                                        source={require('../assets/images/questions/checkbox-before.png')}
                                    />}
                                checked={option.value}
                                onPress={() => {
                                    toggleCheckBox(option);
                                    option.option_id === "50" ? (
                                        option.value === true ? setSelectedOption(option) : setSelectedOption(''),
                                        setVaccineTypeOption(''),
                                        setVaccinationDate(''),
                                        setSingleFileName(''),
                                        setPreviousSelectedOptions(),
                                        setPreviousVaccineTypeOption(),
                                        setPreviousVaccinationDate(),
                                        setPreviousSingleFileName()
                                    ) : null;
                                    option.option_id === "51" ? (
                                        option.value === true ? setSelectedOptionTwo(option) : setSelectedOptionTwo(''),
                                        setVaccineTypeOptionTwo(''),
                                        setVaccinationDateTwo(''),
                                        setSingleFileNameTwo(''),
                                        setPreviousSelectedOptionsTwo(),
                                        setPreviousVaccineTypeOptionTwo(),
                                        setPreviousVaccinationDateTwo(),
                                        setPreviousSingleFileNameTwo()
                                    ) : null;
                                    if (question.question_id === "15") {
                                        getAnswers(option, question.question_id, question.type_code, 0, {}, '', '', '');
                                    } else if (question.question_id !== "15") {
                                        getAnswers(question, question.question_id, question.type_code, 0, {}, '', '', '');
                                    }      
                                }
                                }
                            />
                            {
                                (
                                    question.question_id === "15" &&
                                    option.is_dependable === "Yes" &&
                                    option.value &&
                                    (
                                        (option.option_id === '50' && selectedOption) ||
                                        (option.option_id === '51' && selectedOptionTwo)
                                        ||
                                        (option.option_id === '50' && previousSelectedOptions) ||
                                        (option.option_id === '51' && previousSelectedOptionsTwo)
                                    )
                                ) ?
                                    (
                                        <View>
                                            <SubDropdownComponent
                                                option={option}
                                                previousWeekAnswer={previousVaccineTypeOption}
                                                question_id={question.question_id}
                                                type_code={question.type_code}
                                                getAnswers={
                                                    (option, question_id, type_code, count, dependableListOption, vaccinatedDate, fileName, downloadString) => {
                                                        getAnswers(option, question_id, type_code, count, dependableListOption, vaccinatedDate, fileName, downloadString)
                                                    }
                                                }
                                                getDependableoption={(list, dose, option) => { getDependableoption(list, dose, option) }}
                                                vaccinatedDate={null}
                                                previousWeekAnswerTwo={previousVaccineTypeOptionTwo}
                                            />
                                            {
                                                (
                                                    question.question_id === "15" &&
                                                    option.is_dependable === "Yes" &&
                                                    option.value &&
                                                    (
                                                        (option.option_id === '50' && selectedOption && vaccineTypeOption) ||
                                                        (option.option_id === '51' && selectedOptionTwo && vaccineTypeOptionTwo)
                                                        ||
                                                        (option.option_id === '50' && previousSelectedOptions && previousVaccineTypeOption) ||
                                                        (option.option_id === '51' && previousSelectedOptionsTwo && previousVaccineTypeOptionTwo)
                                                    )
                                                ) ? (
                                                    <DatePickerComponent
                                                        option={option}
                                                        previousWeekAnswer={previousVaccinationDate}
                                                        question_id={question.question_id}
                                                        type_code={question.type_code}
                                                        getAnswers={
                                                            (option, question_id, type_code, count, dependableListOption, vaccinatedDate, fileName, downloadString) => {
                                                                getAnswers(option, question_id, type_code, count, dependableListOption, vaccinatedDate, fileName, downloadString)
                                                            }
                                                        }
                                                        selectedValue={option.option_id === '50' ? vaccineTypeOption : vaccineTypeOptionTwo}
                                                        getVaccinatedDate={(option, date, dependableOption) => getVaccinatedDate(option, date, dependableOption)}
                                                        optionFiltered={optionFiltered}
                                                        dependableListFiltered={dependableListFiltered}
                                                        optionFilteredTwo={optionFilteredTwo}
                                                        dependableListFilteredTwo={dependableListFilteredTwo}
                                                        previousWeekAnswerTwo={previousVaccinationDateTwo}
                                                    />
                                                ) : null
                                            }
                                            {
                                                (question.question_id === "15" &&
                                                    option.is_dependable === "Yes" &&
                                                    option.value &&
                                                    (
                                                        (option.option_id === '50' && selectedOption && vaccineTypeOption && vaccinationDate) ||
                                                        (option.option_id === '51' && selectedOptionTwo && vaccineTypeOptionTwo && vaccinationDateTwo)
                                                        ||
                                                        (option.option_id === '50' && previousSelectedOptions && previousVaccineTypeOption && previousVaccinationDate) ||
                                                        (option.option_id === '51' && previousSelectedOptionsTwo && previousVaccineTypeOptionTwo && previousVaccinationDateTwo)
                                                    )
                                                )
                                                    ? (
                                                        <View style={styles.uploadContainer}>
                                                            <Text
                                                                style={styles.fileText}
                                                                numberOfLines={1}
                                                            >
                                                                {
                                                                    option.option_id === '50' && previousSelectedOptions && previousVaccineTypeOption && previousVaccinationDate && previousSingleFileName !== undefined ?
                                                                        `Vaccination certificate: ${previousSingleFileName}`
                                                                        :
                                                                        option.option_id === '50' && singleFileName ?
                                                                            `Vaccination certificate: ${singleFileName}` : null
                                                                }

                                                                {
                                                                    option.option_id === '51' && previousSelectedOptionsTwo && previousVaccineTypeOptionTwo && previousVaccinationDateTwo && previousSingleFileNameTwo !== undefined ?
                                                                        `Vaccination certificate: ${previousSingleFileNameTwo}`
                                                                        :
                                                                        option.option_id === '51' && singleFileNameTwo ?
                                                                            `Vaccination certificate: ${singleFileNameTwo}` : null
                                                                }
                                                            </Text>
                                                            <View style={styles.uploadSection}>
                                                                <Pressable
                                                                    style={styles.upload}
                                                                    onPress={() => { selectOneFile(option) }}
                                                                >
                                                                    <Text style={styles.uploadText}>Browse File</Text>
                                                                </Pressable>
                                                            </View>
                                                        </View>
                                                    )
                                                    : null
                                            }
                                        </View>
                                    ) : null
                            }
                        </View>
                    )
                })
            }
        </View>
    );
};

const styles = StyleSheet.create({
    img: {
        height: 15,
        width: 15,
        marginHorizontal: 5
    },
    uploadContainer: {
        padding: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    uploadSection: {
        height: 55,
        width: '80%',
        borderRadius: 5,
        flex: 1,
        marginTop: 10,
        flexDirection: 'row',
        padding: 10,
    },
    upload: {
        backgroundColor: '#208e8f',
        borderWidth: 0,
        height: 55,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        position: 'absolute'
    },
    uploadText: {
        color: "white",
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Montserrat-Light'
    },
    fileText: {
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Montserrat-Light',

    }
});

export default CheckboxComponent;