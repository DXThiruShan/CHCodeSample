import {createStackNavigator} from 'react-navigation-stack';
import  HomePage from '../screens/Dashboard/HomePage';
/**
 * HomeNavigation
 * 
 */
export const HomeNavigation = createStackNavigator({
    HomePage: {
        screen: HomePage,    
         navigationOptions: {
          headerShown: false
         },
      }
});



