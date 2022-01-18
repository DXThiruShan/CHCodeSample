import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
/**
 * Component
 * 
 */
const DropdownComponent = ({ question,previousWeekAnswer, statesList, districtsList, citiesList, getAnswers }) => {

    let  previouslySelectedOption = [];
    previouslySelectedOption = previousWeekAnswer != undefined && previousWeekAnswer && previousWeekAnswer.option_id.split(","); 
    const [previouslySelected, setPreviouslySelected] = useState(previouslySelectedOption);
    const [showDistrict, setShowDistrict] = useState(false);
    const [showCity, setShowCity] = useState(false);
    const [stateId, setStateId] = useState();
    const [districtId, setDistrictId] = useState();
    const [stateName, setStateName] = useState(statesList.filter(data=> data.state_id == previouslySelected[0]));
    const [districtName, setDistrictName] = useState(districtsList.filter(data=> data.state_id == previouslySelected[0] && data.district_id == previouslySelected[1]));
    const [cityName, setCityName] = useState(citiesList.filter(data=> data.state_id == previouslySelected[0] && data.district_id == previouslySelected[1] && data.city_id == previouslySelectedOption[2]));

    useEffect(() => {
        setPreviouslySelected(previouslySelectedOption);
        if (previouslySelected !== undefined && previouslySelected.length >0){
            if (stateName !== undefined && stateName.length > 0) {
                setStateId(stateName[0].state_id);
            }
            if (districtName !== undefined && districtName.length > 0) {
                setStateId(districtName[0].state_id);
                setDistrictId(districtName[0].district_id)
            }
        }
    }, [question, previousWeekAnswer,showDistrict,districtName]);

    const handleStateDropdownSelect = (value) => {
        const selectedState = statesList[value];
        setStateId(value + 1);
        setTimeout(()=> {
            setShowDistrict(true);
        },100);
        setShowCity(false);
        getAnswers(selectedState, question.question_id, question.type_code, 0, {}, '', '', '');
    }

    const handleDistrictDropdownSelect = (value) => {
        const districtNames = districtsList.filter(
            (data) => { 
                return data.state_id == stateId }).map(list => list.district_name);
        const selectedDistrictName = districtNames[value];
        const selectedDistrict = districtsList.filter(
            (data) => { 
                return data.state_id == stateId && data.district_name == selectedDistrictName
            }
        );
        setDistrictId(selectedDistrict[0].district_id);
        let cityCount = citiesList.filter((data) => { return data.state_id == stateId && data.district_id == selectedDistrict[0].district_id });
        setTimeout(()=> {
            cityCount.length > 0 ? setShowCity(true): setShowCity(false);
        },100);
        getAnswers(selectedDistrict, question.question_id, question.type_code, cityCount.length , {}, '', '', '');
    }

    const handleCityDropdownSelect = (value) => {
        const cityNames = citiesList.filter((data) => { 
            return data.state_id == stateId && data.district_id == districtId }).map(list => list.city_name);
        const selectedCityName = cityNames[value];
        const selectedCity = citiesList.filter(
            (data) => { 
                return data.state_id == stateId && data.district_id == districtId && data.city_name == selectedCityName });
        getAnswers(selectedCity, question.question_id, question.type_code, 0, {}, '', '', '');
    }


    return (
        <View>
            <View>
                <ModalDropdown
                    style={styles.dropdown}
                    dropdownStyle={styles.dropdownOption}
                    defaultTextStyle ={styles.dropdownTextStyle}
                    dropdownTextStyle={styles.dropdownTextStyle}
                    dropdownTextHighlightStyle = {styles.dropdownTextHighlightStyles}
                    showsVerticalScrollIndicator={true}
                    defaultValue= {(stateName != undefined && stateName.length > 0) ? stateName[0].state_name : "Please Select State"}   
                    onSelect ={(value)=> {
                        setShowDistrict(false);
                        setStateId();
                        setDistrictId();
                        setStateName();
                        setDistrictName();
                        setCityName();
                        handleStateDropdownSelect(value);                    
                    }}
                    renderRightComponent={() => (
                        <Image
                        style= {styles.img}
                        source={require('../assets/images/questions/down-arrow.png')}
                        />
                    )}
                    options={statesList.map((data)=> data.state_name)}
                />
            </View>

            <View>
                   
                {
                    
                    (showDistrict === true || (districtName && districtName.length > 0)) &&
                    (
                    
                        <ModalDropdown
                            style={styles.dropdown}
                            dropdownStyle={styles.dropdownOption}
                            defaultTextStyle ={styles.dropdownTextStyle}
                            dropdownTextStyle={styles.dropdownTextStyle}
                            dropdownTextHighlightStyle = {styles.dropdownTextHighlightStyles}
                            showsVerticalScrollIndicator={true}
                            defaultValue={(districtName != undefined && districtName.length > 0) ? districtName[0].district_name : "Please Select District"}
                            renderRightComponent={() => (
                                <Image
                                    style= {styles.img}
                                    source={require('../assets/images/questions/down-arrow.png')}
                                />
                            )}
                            onSelect={(value) => {
                                setShowCity(false);
                                setCityName();
                                handleDistrictDropdownSelect(value);
                            }
                            }
                            options={
                                districtsList.filter((data) => { return data.state_id == stateId }).map(list => list.district_name)
                            }
                        />

                    )
                }
            </View>

            <View>
                {
                    (showCity === true || (cityName && cityName.length > 0)) &&
                    (
                        <ModalDropdown
                            style={styles.dropdown}
                            dropdownStyle={styles.dropdownOption}
                            defaultTextStyle ={styles.dropdownTextStyle}
                            dropdownTextStyle={styles.dropdownTextStyle}
                            dropdownTextHighlightStyle = {styles.dropdownTextHighlightStyles}
                            showsVerticalScrollIndicator={true}
                            defaultValue={(cityName != undefined && cityName.length > 0) ? cityName[0].city_name : "Please Select City"}
                            renderRightComponent={() => (
                                <Image
                                    style= {styles.img}
                                    source={require('../assets/images/questions/down-arrow.png')}
                                />
                            )}
                            options={
                                citiesList.filter((data) => { return data.state_id == stateId && data.district_id == districtId }).map(list => list.city_name)
                            }
                            onSelect={
                                (value) => {
                                    handleCityDropdownSelect(value);
                                }
                            }                            
                        />
                    )
                }
            </View>
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
        fontFamily: 'Montserrat-Bold',
        padding: 13
    },
    dropdownOption: {
        marginTop: 10,
        width: '65%',
        height: 180,
        borderWidth: 1,
        borderColor: '#208e8f',
        position: 'absolute',
        fontSize: 11,
        fontFamily: 'Montserrat-Bold',
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
    },
    dropdownTextHighlightStyles: {
        color: '#208e8f'
    }
})

export default DropdownComponent;