
import { StyleSheet, Dimensions, StatusBar } from 'react-native';
const { height, width } = Dimensions.get("screen");
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  action: {
    flexDirection: 'row',
    height: 50,
    width: "95%",
    backgroundColor: "#208e8f",
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 25,
    marginBottom: 10,
    alignItems: 'center',
    fontSize: 12,
    fontFamily: 'Montserrat',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  textSign: {
    color: "white",
    fontSize: 18,
    fontWeight: 'bold'
  },
  bgimageContainertop: {
    width: width,
    height:130,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: 150,
    height: 120,
    marginRight:15,
  },
  loginBtnWrapper: {
    marginTop: 15,
    alignItems: 'center',
    marginBottom:10
  },
  loginBtn: {
    backgroundColor: '#94ce9b',
    height: 50,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  disableBtnStyle:{
    backgroundColor: "#adcbd8",
  },
  textInput: {
    flex: 1,
    paddingLeft: 15,
    height: 50,
    fontSize:14,
    letterSpacing:0.6,
    color:'#FFFFFF',
    fontFamily: 'Montserrat',
  },
  form:{
    marginHorizontal:15,
    marginVertical:15,
    flexDirection: 'column',
  },
  label:{
    width:100,
    paddingLeft:15,
    fontFamily:'sfprodisplay-regular',
    fontSize:17,
    letterSpacing:0.6,
    color:'#252525'
  },

  focus:{
    borderBottomColor:'#4A99B2',
    borderBottomWidth:0.5
  },
  error:{
  },
  rightTextLogoStyle:{
    padding: 10,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    marginRight: 15,
    
  },
  headerlogo: {
    width: width,
    height:height/4,
  }, 
  bottomView: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  
  },
  powderby: {
    color: "#080e14",
    fontSize: 18,
  },

  version_txt: {
    color: "#080e14",
    fontSize: 10,
    fontStyle: 'italic'
  },
  bottomlogo: {
    width: 100,
    height: 50,
    marginTop:5,
    marginBottom: 5,
    resizeMode: 'stretch',
  },
});