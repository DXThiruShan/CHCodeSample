import React, { useEffect, useState, useCallback } from 'react';
import { Image, View, SafeAreaView, StyleSheet, Alert, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { ToastContextProvider } from './context/ToastContext';
import { LoaderContextProvider } from './context/LoaderContext';
import RootNavigator from './navigation';
import { DatabaseManager } from './utilities/databaseManager';
import { splashStyles } from './styles/Style';
import { Appbar } from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';

import { setNavigator } from './utilities/helpers/navigationRef';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { useNotification } from 'react-native-internal-notification';
import PushNotification from "react-native-push-notification";






const App = createAppContainer(RootNavigator);


export default () => {
  const [appState, setAppState] = useState(true);
  const notification = useNotification();
  let notificationListener;

  useEffect(() => {
    Platform.OS === checkPermission() ? iosDeviceID :
      checkPermission();
    createNotificationListeners();
    Platform.OS === 'ios' ? setAppState(false) : setAppState(true)

  }, [])

  const iosDeviceID = PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },

    
    /**
     * (required) Called when a remote or local notification is opened or received
     */
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
      if (Platform.OS === 'ios') {
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      }
    },
    senderID: "1090501687137",
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },
    popInitialNotification: true,
    requestPermissions: true
  });

  const handleNotificationTestClick = useCallback(() => {
    notification.showNotification({
      title: 'My first notification',
      message: 'Hello from my first message',
      onPress: () => {
      },
    });
  }, [notification]);

  const checkPermission = async () => {
    DeviceInfo.getAndroidId().then((androidId) => {

    });
    const enabled = await firebase.messaging().hasPermission();

    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  }

  const getToken = async () => {
    console.log('Token----Call')
    firebase.messaging().getToken().then(async (token) => {
      console.log('Token----' + token)
      await AsyncStorage.setItem('fcmToken', token);
    }).catch(err => {

    })
  }

  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      getToken();
    } catch (error) {
    }
  }

  const createNotificationListeners = async () => {

    notificationListener = firebase.notifications().onNotification((notification) => {
    });
  }

  const displayNotification = (title, body) => {
    Alert.alert(
      title, body,
      [
        { text: 'Ok', onPress: () => console.log('ok') },
      ],
      { cancelable: false },
    );
  }

  DatabaseManager.setDatabaseConfiguration();
  setTimeout(() => {
    setAppState(false);
  }, 1500)
  return (


    <ToastContextProvider>
      <LoaderContextProvider>
        {(appState) ?
          <View style={splashStyles.container}>
            <Image
              source={require('./assets/images/login/ehealth-logo-new.jpg')}
              style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
            />
          </View>
          :
          <SafeAreaView style={styles.bottomSafeArea}>
            <App ref={navigator => {
              setNavigator(navigator)
            }} />
          </SafeAreaView>
        }
      </LoaderContextProvider>
    </ToastContextProvider>

  )
}

const styles = StyleSheet.create({
  bottomSafeArea: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});