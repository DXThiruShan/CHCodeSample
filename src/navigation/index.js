import { createSwitchNavigator } from 'react-navigation';
import { checkAuth } from '../utilities/helpers/authResolver';
import { LoginNavigation } from './LoginNavigation';
import { HomeNavigation } from './HomeNavigation';

/**
 * Rootnavigator
 * 
 */

const RootNavigator = createSwitchNavigator(
  {
    
   ResolveAuth: checkAuth,
  
   HomePage: {
    screen: HomeNavigation
  },
    Login: {
      screen: LoginNavigation
    },

    HomePage: {
        screen: HomeNavigation
    },
  }
);

export default RootNavigator;