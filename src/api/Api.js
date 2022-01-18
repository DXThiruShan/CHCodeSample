import axios from 'axios';
import { navigate } from '../utilities/helpers/navigationRef';
import { APP_CONFIG } from '../config/appConfig';
import { USER_DATA } from '../utilities/helpers/authConst';
import { Alert } from 'react-native';

const instance = axios.create({
    baseURL: APP_CONFIG.BASE_URL,
});
/**
 * Binding Authorization Token
 * 
 */
instance.interceptors.request.use(config => {
    if (USER_DATA && USER_DATA.access_token) {

    }
    return config;
}, err => {
    return Promise.reject(err);
});


/**
 * Check error state and handling token expiry
 * 
 */
instance.interceptors.response.use(response => {
    return response.data;
}, err => {

    return new Promise(async (resolve, reject) => {
        if (err.response.status === 404 || err.response.status === 500) {
            Alert.alert(
                "Error Occured",
                "Please Contact eConnect Team",
                [
                    {
                        text: "OK", onPress: async () => {
                            navigate('Home');
                        }
                    }
                ],
                { cancelable: false }
            );
        }
        let error = '';
        if (err && err.hasOwnProperty('response') && err.response.hasOwnProperty('request') && err.response.request.hasOwnProperty('_response')) {
            error = (err.response.request._response)
        }
        return reject(error);
    });
})

export default instance;