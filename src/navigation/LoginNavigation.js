import {createStackNavigator} from 'react-navigation-stack';
import  Login from '../screens/Login/Login';
/**
 * LoginNavigation
 * 
 */
export const LoginNavigation = createStackNavigator({
    Login: {
        screen: Login,    
         navigationOptions: {
          headerShown: false
         },
      }
});



