import {StyleSheet} from 'react-native';


export const APP_BG_COLOR = '#f29272';
export const APP_HEADER_BG_COLOR = '#f15c24';

export const commonStyles = StyleSheet.create({
  rootContainer: {
      width: '100%',
      minHeight: '100%',
      backgroundColor: '#FFF',
  }
});

export const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});