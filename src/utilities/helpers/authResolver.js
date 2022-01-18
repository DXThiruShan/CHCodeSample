
import { useLayoutEffect } from 'react';
import { DatabaseManager } from '../databaseManager';
import {  setUserData } from '../../utilities/helpers/authConst';

export const checkAuth = (props) => {

    useLayoutEffect(() => {
        checkSignIn(props);
    }, [])

    const checkSignIn = async (props) => {
        const userDetails = await DatabaseManager.fetchUserRecords();
        const user = userDetails ? userDetails[0] : {};
        if (user && user.hasOwnProperty('employee_details') && user.employee_details.EmpID != '') {
            setUserData(user.employee_details);
            props.navigation.navigate('HomePage');
        } else {
            props.navigation.navigate('Login');
        }
    }
    return null;
}