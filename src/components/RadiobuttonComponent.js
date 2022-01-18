import React, { useEffect, useState,useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Pressable
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import LoaderContext from '../context/LoaderContext';
import InputComponent from './InputComponent';
import SubDropdownComponent from './SubDropdownComponent';
import DatePickerComponent from './DatePickerComponent';
import DocumentPicker from 'react-native-document-picker';

/**
 * Component
 * 
 */
const RadioButtonComponent = ({ question, previousWeekAnswer, getAnswers }) => {

    let previouslySelectedOption = [];
    if (previousWeekAnswer && previousWeekAnswer.option_id !== undefined) {
        previouslySelectedOption = previousWeekAnswer &&
            previousWeekAnswer.option_id.includes(",") ?
            previousWeekAnswer.option_id.split(",") :
            previousWeekAnswer.option_id.split("-");
    }

    const previouslySelectedVaccinatedDate = previousWeekAnswer && previousWeekAnswer.vaccinated_date && previousWeekAnswer.vaccinated_date.slice(0, 11);
    const name = previousWeekAnswer !== undefined && previousWeekAnswer.file_name;
    const [checked, setChecked] = useState();
    const [previouslySelected, setPreviouslySelected] = useState(previouslySelectedOption);
    const [previouslyVaccinatedDate, setPreviouslyVaccinatedDate] = useState(previouslySelectedVaccinatedDate);
    const [singleFile, setSingleFile] = useState('');
    const [selectedOption, setSelectedOption] = useState();
    const [fileUploadSelectedOption, setFileUploadSelectedOption] = useState();
    const [selectedFileName, setSelectedFileName] = useState(name);
    const [selectedVaccinatedDate, setSelectedVaccinatedDate] = useState();
    const loader = useContext(LoaderContext);

    useEffect(() => {
        setSelectedOption();
        setSelectedVaccinatedDate();
        setChecked();
        setFileUploadSelectedOption();
        setSingleFile();
        setPreviouslySelected(previouslySelectedOption);
        setPreviouslyVaccinatedDate(previouslySelectedVaccinatedDate);
        setSelectedFileName(name);
    }, [question]);

    let optionFiltered, dependableListFiltered;

    if ((question.question_id === '15' || question.question_id === '9') && previouslySelected && previouslySelected.length >0 && previouslySelected[1]) {

        question.choice_list.map((option) => {
            if (option.option_id === (previouslySelected && previouslySelected.length > 0 && previouslySelected[0])) {
                optionFiltered = option;
                option.dependable_list.map(data => {
                    if (data.option_id === (previouslySelected && previouslySelected.length > 0 && previouslySelected[1])) {
                        dependableListFiltered = data;
                    }
                })
            }
        })
    }


    const selectOneFile = async () => {
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
                        getAnswers(fileUploadSelectedOption || optionFiltered, question.question_id, question.type_code, 0, selectedOption || dependableListFiltered, selectedVaccinatedDate || previouslyVaccinatedDate, res.name, data);
                        loader.setLoader(false);
                    })
                    .catch((err) => { console.log("Error is ",err)});

            }, 1000);
            setSingleFile(res);
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

    const getDependableoption = (list) => {
        if (list !== undefined) {
            setSelectedOption(list);
            setSelectedFileName();
            setSingleFile();
        }
    }

    const getVaccinatedDate = (option, date) => {
        if (date !== '' && option !== '') {
            setFileUploadSelectedOption(option);
            setSelectedVaccinatedDate(date);
            setSelectedFileName();
            setSingleFile();
        }      
    }

    return (
        <View>
            {
                question.choice_list.map((option, key) => {
                    return (
                        <View key={option.option_id}>
                            {
                                checked == option.option_id || (previouslySelected &&
                                    previouslySelected.length > 0 &&
                                    previouslySelected[0] === option.option_id) ? (
                                    <TouchableOpacity style={styles.btn}
                                        onPress={() => {
                                            setChecked(option.option_id);
                                            setPreviouslySelected();
                                            setPreviouslyVaccinatedDate();
                                            setSelectedOption();
                                            setSelectedVaccinatedDate();
                                            setSingleFile();
                                            setSelectedFileName();
                                            question.is_file_upload === "Yes" ? setFileUploadSelectedOption(option) : setFileUploadSelectedOption();
                                            getAnswers(option, question.question_id, question.type_code, 0, {}, "", "", "")
                                        }}
                                    >
                                        <Image
                                            style={styles.img}
                                            source={require('../assets/images/questions/bullet-after.png')}
                                        />
                                        <Text
                                            style={styles.optionText}
                                        >
                                            {option.option_label}
                                        </Text>
                                    </TouchableOpacity>
                                )
                                    :
                                    (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setChecked(option.option_id);
                                                setPreviouslySelected();
                                                setPreviouslyVaccinatedDate();
                                                setSelectedOption();
                                                setSelectedVaccinatedDate();
                                                setSingleFile();
                                                setSelectedFileName();
                                                question.is_file_upload === "Yes" ? setFileUploadSelectedOption(option) : setFileUploadSelectedOption();
                                                getAnswers(option, question.question_id, question.type_code, 0, {}, "", "", "");
                                            }}
                                            style={styles.btn}>
                                            <Image
                                                style={styles.img}
                                                source={require('../assets/images/questions/bullet-before.png')}
                                            />
                                            <Text
                                                style={styles.optionText}
                                            >
                                                {option.option_label}
                                            </Text>
                                        </TouchableOpacity>
                                    )

                            }
                            {
                                (checked === option.option_id ||
                                    (previouslySelected &&
                                        previouslySelected.length > 0 &&
                                        previouslySelected[0] === option.option_id)) &&
                                option.dependable_type_code === "text_box" && (
                                    <InputComponent
                                        option={option}
                                        previousWeekAnswer={previouslySelected &&
                                            previouslySelected.length > 0 &&
                                            previouslySelected[1]
                                        }
                                        question_id={question.question_id}
                                        type_code={question.type_code}
                                        getAnswers={
                                            (option, question_id, type_code, count, dependableListOption, vaccinatedDate, fileName, downloadString) => {
                                                getAnswers(option, question_id, type_code, count, dependableListOption, vaccinatedDate, fileName, downloadString)
                                            }
                                        }
                                    />
                                )
                            }
                            {
                                (checked === option.option_id ||
                                    (previouslySelected &&
                                        previouslySelected.length > 0 &&
                                        previouslySelected[0] === option.option_id)) &&
                                option.is_dependable === "Yes" &&
                                option.dependable_type_code === "radio_button" && (
                                    <View>
                                        <SubDropdownComponent
                                            option={option}
                                            previousWeekAnswer={previouslySelected &&
                                                previouslySelected.length > 0 &&
                                                previouslySelected[1]
                                            }
                                            question_id={question.question_id}
                                            type_code={question.type_code}
                                            getAnswers={
                                                (option, question_id, type_code, count, dependableListOption, vaccinatedDate, fileName, downloadString) => {
                                                    getAnswers(option, question_id, type_code, count, dependableListOption, vaccinatedDate, fileName, downloadString)
                                                }
                                            }
                                            getDependableoption={(list) => { getDependableoption(list)}}
                                            vaccinatedDate={null}
                                        />
                                    </View>
                                )
                            }
                            {
                                (checked === option.option_id ||
                                    (previouslySelected &&
                                        previouslySelected.length > 0 &&
                                        previouslySelected[0] === option.option_id)) &&
                                option.is_dependable === "Yes" &&
                                option.dependable_type_code === "drop_down" &&
                                (
                                    <View>
                                        <SubDropdownComponent
                                            option={option}
                                            previousWeekAnswer={previouslySelected &&
                                                previouslySelected.length > 0 &&
                                                previouslySelected[1]
                                            }
                                            question_id={question.question_id}
                                            type_code={question.type_code}
                                            getAnswers={
                                                (option, question_id, type_code, count, dependableListOption, vaccinatedDate, fileName, downloadString) => {
                                                    getAnswers(option, question_id, type_code, count, dependableListOption, vaccinatedDate, fileName, downloadString)
                                                }
                                            }
                                            getDependableoption={(list) => { getDependableoption(list)}}
                                            vaccinatedDate={previouslyVaccinatedDate || selectedVaccinatedDate }
                                        />
                                        {
                                            (selectedOption !== undefined || previouslyVaccinatedDate !== undefined) && (
                                                <DatePickerComponent
                                                    option={option}
                                                    previousWeekAnswer={previouslyVaccinatedDate}
                                                    question_id={question.question_id}
                                                    type_code={question.type_code}
                                                    getAnswers={
                                                        (option, question_id, type_code, count, dependableListOption, vaccinatedDate, fileName, downloadString) => {
                                                            getAnswers(option, question_id, type_code, count, dependableListOption, vaccinatedDate, fileName, downloadString)
                                                        }
                                                    }
                                                    selectedValue={selectedOption !== undefined ? selectedOption : null}
                                                    getVaccinatedDate={(option, date) => getVaccinatedDate(option, date)}
                                                    previousOption={dependableListFiltered}
                                                />
                                            )
                                        }
                                    </View>
                                )
                            }
                        </View>
                    );
                })
            }
            {
                (question.is_file_upload === "Yes" && (
                    (selectedOption !== undefined ||
                        (previouslySelectedVaccinatedDate && (previouslySelected && previouslySelected.length > 0)) ||
                        (selectedFileName && selectedFileName.length > 0))))  ?
                    <View style={styles.uploadContainer}>
                        { question.question_id === "9" ?
                           (
                               <Text
                                style={styles.fileText}
                                numberOfLines={1}
                                >
                                    {singleFile !== undefined && singleFile.name ?
                                    `RTPCR/Blood/CT Scan Report: ${singleFile.name}` :
                                    selectedFileName && selectedFileName.length > 0 ? `RTPCR/Blood/CT Scan Report: ${selectedFileName}` : ''}
                                </Text>)
                            :
                            (
                                <Text
                                    style={styles.fileText}
                                    numberOfLines={1}
                                >
                                    {singleFile !== undefined && singleFile.name ?
                                    `Vaccination certificate: ${singleFile.name}` :
                                    selectedFileName && selectedFileName.length > 0 ? `Vaccination certificate: ${selectedFileName}` : ''}
                                </Text>
                            )
                        }
                        <View style={styles.uploadSection}>
                            <Pressable
                                style={styles.upload}
                                onPress={() => { selectOneFile() }}
                            >
                                <Text style={styles.uploadText}>Browse File</Text>
                            </Pressable>
                        </View>
                    </View>
                :
                null
            }
        </View>
    )
};

const styles = StyleSheet.create({
    optionText: {
        color: '#000',
        fontSize: 11,
        fontFamily: 'Montserrat-light'
    },
    img: {
        height: 15,
        width: 15,
        marginHorizontal: 5
    },
    btn: {
        flexDirection: 'row',
        padding: 10
    },
    subRadio: {
        flexDirection: 'row',
        padding: 10
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
        fontFamily: 'Montserrat-Light'
    }
})

export default RadioButtonComponent;
