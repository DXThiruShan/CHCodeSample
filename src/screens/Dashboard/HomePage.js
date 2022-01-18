import React, { useEffect, useState, useContext, useRef } from 'react';
import { Animated } from 'react-native';
import { View, Alert } from 'react-native';
import { homePageStyles } from './HomePageStyle';
import { DatabaseManager } from '../../utilities/databaseManager';
import LoaderContext from '../../context/LoaderContext';
import ToastContext from '../../context/ToastContext';
import HeaderContainer from '../CommonHeader/HeaderContainer';
import {  Position} from '@breeffy/react-native-popup-menu';
/**
 * Homepage
 * 
 */

const ElementToStick = React.forwardRef(({ style }, ref) => {
  return (
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
  );
});



const HomePage = (props) => {

  let scrollview = useRef(false);
  const [width, setWidth] = useState(null);
  const [number, setNumber] = useState(0);
  const [isEndScreen, setIsEndScreen] = useState(false);
  const [switchopen, setswitchopen] = useState(false);
  const [switch_left_text, setSwitchlefttext] = useState('');
  const [switch_right_text, setSwitch_right_text] = useState('');
  const [QuestionList, setQuestionList] = useState({});
  const [Statelist, setStatelist] = useState([]);
  const [Districtlist, setDistrictlist] = useState([]);
  const [Citylist, setCitylist] = useState([]);
  const [dashBoardData, setDashBoardData] = useState([]);
  const [employee_name, setemployee_name] = useState('');
  const [barLabel, setBarLabel] = useState([]);
  const loader = useContext(LoaderContext);
  const [dashboardDepartmentData, setDashboardDepartmentData] = useState([]);
  const [BUnitesTypes, setBUnitsType] = useState();
  const [buSurveySubmittedData, setBuSurveySubmittedData] = useState();

  const [departmentTypes, setDepartmentTypes] = useState();
  const [departmentSubmittedData, setDepartmentSubmittedData] = useState();


  const [practiceTypes, setPracticeType] = useState();
  const [practiceSubmittedData, setPracticeSubmittedData] = useState();

  const [pieChartData, setPieChartData] = useState([]);
  const [pieChartColor, setPieChartColor] = useState();

  const [weekarray, setweekarray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52]);
  const [currentWeekNo, setcurrentWeekNo] = useState('');
  const [scrollWeekNo, setScrollWeekNo] = useState('');
  const [_scrollView, set_scrollView] = useState('');
  let weekNo_scroll = '';
  const [isScrollable, setIsScrollable] = useState(false)

  const [isModalVisible, setModalVisible] = useState(false);

  const [animatePress, setAnimatePress] = useState(new Animated.Value(1))
  const toast = useContext(ToastContext);
  const [firstTimeLoading, setfirstTimeLoading] = useState(true);


  const [isDisabled, setIsDisabled] = useState(false);

  let elementRef = React.createRef();
  let menuRef = null;

  const setMenuRef = ref => (menuRef = ref);
  const hideMenu = async () => {
    Alert.alert(
      'Logut',
      'Are you sure you want Logout?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            await DatabaseManager.deleteUserRecords();
            setTimeout(function () { props.navigation.navigate('Login') }, 2000);

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
  const showMenu = () => {
    menuRef?.show(elementRef.current, Position.BOTTOM_LEFT);
  };
  const closemodal = () => {
    setModalVisible(!isModalVisible);
  };

 

  useEffect(() => {
  }, );


  useEffect(() => {
  });




  return (
    <View style={homePageStyles.container}>
      <HeaderContainer
        props={props}
        isReportScreen={false}
      />
    
   

      <View style={homePageStyles.sosview}>

        
      </View>

      
    </View>
  )
}
export default HomePage;