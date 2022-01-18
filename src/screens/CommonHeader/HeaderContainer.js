import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView
} from 'react-native';
import {
  Menu,
  MenuItem,
  Position
} from '@breeffy/react-native-popup-menu';

import { DatabaseManager } from '../../utilities/databaseManager';
/**
 * Header Container
 * 
 */
const ElementToStick = React.forwardRef(({ style }, ref) => {
  return (
    <SafeAreaView>
    <View
      ref={ref}
      style={[
        {
          padding: 10,

          borderWidth: -0.55,
          justifyContent: 'center',
          alignItems: 'center'
        },
        style
      ]}
    >
    </View>
    </SafeAreaView>
  );
});

const HeaderContainer = ({props, isReportScreen}) => {

  const [empName , setEmpName] = useState('');
  const [visibility, setVisibility] = useState('');

  const getDetails = async() => {
    const userDetails = await DatabaseManager.fetchUserRecords();
    const user = userDetails ? userDetails[0].employee_details : {};
    const employeName = user.EmployeeName;
    const DashboardVisibility = user.DashboardVisibility;
    setEmpName(employeName);
    setVisibility(DashboardVisibility);
  }

  useEffect(()=> {
    getDetails();
  }, []);

  const menuOpen = () => {
    menuRef?.show(elementRef.current, Position.BOTTOM_LEFT);
  };

   let elementRef = React.createRef();
   let menuRef = null;
   const setMenuRef = ref => (menuRef = ref);
  
   const hideMenu = async () => {
     Alert.alert(
       'Logout',
       'Are you sure you want Logout?',
       [
         {
           text: 'Yes',
           onPress: async () => {
            
             await DatabaseManager.deleteUserRecords();
              props.navigation.navigate('Login') ;
           }
         },
         {
           text: 'No',
           onPress: () => console.log('No Pressed'), style: 'cancel'
         },
       ],
       { cancelable: false },
     );
   }
  
   const handleNavigation = () => {
    props.navigation.navigate('GenerateReport');
  };

  return (
   <View>
      <StatusBar barStyle="default" hidden={Platform.OS === 'ios' ? false :false} backgroundColor="#208e8f"  />
      <View style={Platform.OS === 'ios' ? styles.rectStackios : styles.rectStack}>
        <ImageBackground
          source={require('../../assets/images/dashboard/dashboard_bg.png')}
          style={styles.image}
        >
          <Image
            source={require('../../assets/images/dashboard/logo.png')}
            style={styles.dashboardlogo}
          />
          <View style={styles.toplogo}>
            <Image
              source={require('../../assets/images/dashboard/profile.png')}
              style={styles.headerlogo}
            />
            <TouchableOpacity 
              onPress={()=>menuOpen()}
            >
              <Image
                source={require('../../assets/images/dashboard/menu-svg.png')}
                style={styles.headerlogo1}
              />
            </TouchableOpacity>
            <ElementToStick ref={elementRef} />
              <Menu ref={setMenuRef}>
                {
                  visibility === 'Yes' && !isReportScreen &&
                  <MenuItem onPress={() => handleNavigation()}>Report</MenuItem>
                }
                <MenuItem onPress={()=> hideMenu()}>Logout</MenuItem>
              </Menu>
          </View>
          <View style={Platform.OS === 'ios'?styles.toplogobelowios : styles.toplogobelow}>
              <Text 
                style={styles.welcomeText}>Welcome</Text>
              <Text
                style={styles.empNameText}>{empName}</Text>
          </View>
        </ImageBackground>
      </View>
   </View>
  )
};

const styles = StyleSheet.create({
  rectStack: {
    width: '100%',
    height: 165,
  },
  rectStackios:{
    width: '100%',
    height:155,
  },
  image: {
    flex: 1,
    resizeMode: "cover"
  },
  dashboardlogo: {
    width: 120,
    height: 120,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  toplogo: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    width: "70%",
    height: '70%',
    marginRight: 5,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  headerlogo: {
    width: 45,
    height: 45,
    marginLeft: 10
  },
  headerlogo1: {
    resizeMode: 'stretch',
    width: 45,
    height: 45,
    marginLeft: 10
  },
  toplogobelow: {
    flexDirection: 'column',
    height: 30,
    alignItems:'flex-end',
    bottom: 5,
    padding: 5
  },
  toplogobelowios: {
    flexDirection: 'column',
    height: 30,
    alignItems:'flex-end',
    bottom: 10,
    padding: 5
  },
  welcomeText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    fontSize: 16
  },
  empNameText:{
    fontFamily: 'Montserrat-SemiBold',
    color: "#fff",
    fontSize: 15,
    fontWeight: '400'
  }
});

export default HeaderContainer;