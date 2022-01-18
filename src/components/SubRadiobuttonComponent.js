import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
/**
 * Component
 * 
 */
const SubRadiobuttonComponent = ({ option, question_id, type_code, getAnswers }) => {

    const [checked, setChecked] = useState();

    useEffect(() => {
        setChecked();
    }, [option]);

    return (
        <View style={styles.container}> 
            {
                option.dependable_list.map((data, key) => {
                    <View
                        key={data.option_id}
                    >
                        {
                            checked == key ? (
                                <TouchableOpacity style={styles.btn}
                                    onPress={() => {
                                        setChecked(option.option_id);
                                        getAnswers(option, question_id, type_code, 0, option, '', '', '')
                                    }}
                                >
                                    <Image
                                        style={styles.img}
                                        source={require('../assets/images/questions/bullet-after.png')}
                                    />
                                    <Text
                                        style={styles.optionText}
                                    >
                                        {data.option_label}
                                    </Text>
                                </TouchableOpacity>
                            )
                            :
                            (
                                <TouchableOpacity
                                    onPress={() => {
                                        setChecked(data.option_id);
                                        getAnswers(option, question_id, type_code, 0, option, '', '', '');
                                    }}
                                    style={styles.btn}>
                                    <Image
                                        style={styles.img}
                                        source={require('../assets/images/questions/bullet-before.png')}
                                    />
                                    <Text
                                        style={styles.optionText}
                                    >
                                        {data.option_label}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        borderColor: 'red',
        borderWidth: 5,
        height: 100,
        left: 10
    },
    optionText: {
        color: '#000',
        fontSize: 11,
        fontFamily: 'Montserrat-light'
    },
    img: {
        height: 15,
        width: 15,
        marginHorizontal: 10
    },
    btn: {
        flexDirection: 'row',
        padding: 20
    }
}

)

export default SubRadiobuttonComponent;