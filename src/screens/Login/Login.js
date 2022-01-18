import React, { useState, useContext, useRef, useEffect } from 'react';
import { loginStyles } from './LoginStyle';
import { commonStyles } from '../../styles/Style';
import ToastContext from '../../context/ToastContext';
import {  StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import LoaderContext from '../../context/LoaderContext';
import AsyncStorage from '@react-native-community/async-storage';
import {
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  BackHandler
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NetInfo from "@react-native-community/netinfo";
/**
 * Login page
 * 
 */
const WIDTH = Dimensions.get('screen').width;
const { width, height } = Dimensions.get('window');
const LoginScreen = props => {
  let [userName, setUserName] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [disableBtn, setDisableBtn] = useState(true);
  const [userFocus, setUserFocus] = useState(0);
  const [passwordFocus, setPasswordFocus] = useState(0);
  let [Bearer, setBearer] = useState('sample');
  let tapFocusUsername = useRef(null);
  let tapFocusPassword = useRef(null);
  const toast = useContext(ToastContext);
  const loader = useContext(LoaderContext);
  const [isOffline, setOfflineStatus] = useState(false);
  const [deviceType, setDeviceType] = useState('1');

  const [versionName, setversionName] = useState('');
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const [firebaseToken, setFirebaseToken] = useState('');

  AsyncStorage.getItem("fcmToken").then((value) => {
    setFirebaseToken(value)
  });

  const onSubmit = async () => {
    let Token = DeviceInfo.getUniqueId();
    let AppVersion = Platform.Version;

    let userData = {


      username: userName,
      userpassword: userPassword,
      sessionStatus: "1",
      appVersion: "v0.0.02",
      DeviceUDID: firebaseToken,
      DeviceType: deviceType
    };

    try {

      setDisableBtn(true);
      if (!isOffline) {

        loader.setLoader(true);

          await props.navigation.navigate('HomePage');

      } else {
        setDisableBtn(false);
        toast({ message: 'Check Your Internet Connection' });
      }
    } catch (err) {
      loader.setLoader(false);
      setUserFocus(2);
      setPasswordFocus(2);
      setDisableBtn(false);
      toast({ message: 'UserName or password is incorrect.' });
    }
  }



  useEffect(() => {
    setversionName(DeviceInfo.getVersion());
    Platform.OS === 'android' ? setDeviceType(1) : setDeviceType(2)
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);

      setOfflineStatus(offline);
      if (offline) {
        Platform.OS === 'android' ?
          toast({ message: 'Check Your Internet Connection' }) : null
      } else {
        setOfflineStatus(false);
      }
    });
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => removeNetInfoSubscription();



  }, [isOffline]);

  const backAction = () => {
    BackHandler.exitApp()
    return true;
  };

  const checkStatus = (field, state) => {
    if (field === 'userName') {
      setUserFocus(state);
    }
    if (field === 'password') {
      setPasswordFocus(state);
    }
    if (userName && userPassword) {
      setDisableBtn(false)
    } else {
      const isIos = Platform.OS === 'ios' ? setDisableBtn(true) : setDisableBtn(false);

    }
  }
  const Button = ({ children, ...props }) => (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );

  const NoInternetModal = ({ show, onRetry, isRetrying }) => (
    <Modal isVisible={show} style={styles.modal} animationInTiming={600}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Connection Error</Text>
        <Text style={styles.modalText}>
          Oops! Looks like your device is not connected to the Internet.
        </Text>
        <Button onPress={onRetry} disabled={isRetrying}>
          Try Again
        </Button>
      </View>
    </Modal>
  );


  return (

    <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      <StatusBar barStyle="default" hidden={Platform.OS === 'ios' ? false : false} backgroundColor="#208e8f" />
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} enableOnAndroid={true} enableAutomaticScroll={true} keyboardShouldPersistTaps={'handled'} viewIsInsideTabBar={true} extraScrollHeight={0}>
        <View style={[commonStyles.rootContainer]}>
          <Image source={require('../../assets/images/login/login-bg.png')} style={loginStyles.headerlogo} />
          <View style={loginStyles.container}>

            <View style={loginStyles.bgimageContainertop}>
            </View>
            <View style={loginStyles.form}>
              <View style={[loginStyles.action, (userFocus === 1 ? loginStyles.focus : (userFocus === 2 ? loginStyles.error : ''))]} >
                <TextInput
                  ref={(input) => { tapFocusUsername = input }}
                  placeholder="User Name"
                  selectionColor='#000'
                  placeholderTextColor="#FFFFFF"
                  style={[loginStyles.textInput, {
                    color: "#FFFFFF"
                  }]}
                  onFocus={() => checkStatus('userName', 1)}
                  onBlur={() => checkStatus('userName', 0)}
                  onKeyPress={() => checkStatus('userName', 0)}
                  onSubmitEditing={() => { tapFocusPassword.focus(); }}
                  autoCapitalize="none"
                  returnKeyType="next"
                  onChangeText={UserName => setUserName(UserName)}
                />
                <Image source={require('../../assets/images/login/login-un-icon.png')}
                  style={loginStyles.rightTextLogoStyle} />

              </View>

              <View style={[loginStyles.action, (passwordFocus === 1 ? loginStyles.focus : (passwordFocus === 2 ? loginStyles.error : ''))]}>

                <TextInput
                  ref={(input) => { tapFocusPassword = input }}
                  placeholder="Password"
                  placeholderTextColor="#fff"
                  selectionColor='#000'
                  secureTextEntry={data.secureTextEntry ? true : false}
                  style={[loginStyles.textInput, {
                    color: "#fff"
                  }]}
                  onFocus={() => checkStatus('password', 1)}
                  onBlur={() => checkStatus('password', 0)}
                  onKeyPress={() => checkStatus('', 0)}
                  autoCapitalize="none"
                  onChangeText={UserPassword => setUserPassword(UserPassword)} />

                <Image source={require('../../assets/images/login/login-pw-icon.png')}
                  style={loginStyles.rightTextLogoStyle} />

              </View>

              <View style={loginStyles.loginBtnWrapper}>
                <TouchableOpacity
                  style={loginStyles.loginBtn}
                  onPress={onSubmit}
                  activeOpacity={0.5}   >
                  <Text style={[loginStyles.textSign, {
                    color: '#fff'
                  }]}>Sign In</Text>
                </TouchableOpacity>
              </View>

              <View style={loginStyles.bottomView}>
                <Text style={loginStyles.powderby}>Powered By</Text>
                <Text style={loginStyles.version_txt}>Version {versionName}</Text>
              </View>

            </View>
          </View>

        </View>
      </KeyboardAwareScrollView>

    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

});
export default LoginScreen;