
import { StyleSheet } from 'react-native';

export const homePageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  rectStack: {
    width: '100%',
    height: 130,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  toplogo: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    width: "70%",
    height: '90%',
    marginRight: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  toplogobelow: {
    flexDirection: 'column',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerlogo: {
    width: 45,
    height: 45,
    marginLeft: 10,
  },
  headerlogo1: {
    resizeMode: 'stretch',
    width: 45,
    height: 45,
    marginLeft: 10,
  },
  dashboardlogo: {
    width: 120,
    height: 120,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dash_category: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dash_inside_category: {
    height: 30,
    width: '50%',
    flexDirection: 'row',
  },

  dash_category_text_on: {
    fontFamily: 'Montserrat-SemiBold',
    color: "green",
    fontSize: 18,
  },
  dash_category_text_off: {
    fontFamily: 'Montserrat-SemiBold',
    color: "gray",
    fontSize: 18,
  },
  dash_category_survey_left_img: {
    width: 35,
    height: 35,
    marginLeft: 10
  },
  dash_category_survey_right_img: {
    width: 35,
    height: 35,
    marginRight: 10
  },
  dash_category_survey_image: {
    width: 40,
    height: 40,
    marginLeft: 15,
    marginRight: 15
  },
  sosview: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 75,
    height: 75,
    marginBottom: 150,
    marginRight: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.34,
    shadowRadius: 3.27,
  },
  floatingImageStyle: {
    resizeMode: 'contain',
    width: 75,
    height: 75,

  },
  sosImageStyle: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
    marginTop: 5,
    alignSelf: 'center',
    alignItems: 'center'
  },
  sosswipeImageStyle: {
    resizeMode: 'stretch',
    width: 250,
    height: 50,

  },
  sosdescroptionStyle: {
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
    fontSize: 18,
    marginTop: 2,
    alignSelf: 'center',
    alignItems: 'center'
  },
  soscontactnoStyle: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 2,
    textAlign: 'center',
  },
  sosSwipeText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#ffffff'
  },
  dashcontainer: {
    flex: 1,
  },
  TextInputStyleClass: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    borderRadius: 20,
    backgroundColor: "#94ce9b",
    alignItems: 'center'
  },
  totalemployee: {
    fontFamily: 'Montserrat-SemiBold',
    color: "white",
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 15
  },
  totalemployee_count: {
    fontFamily: 'Montserrat-SemiBold',
    color: "white",
    fontSize: 16,
    textAlign: 'center',
    marginRight: 15
  },
  piechartrect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    borderRadius: 10,
    borderBottomColor: '#BEBEBE',
    borderBottomWidth: 1,
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
    height: 150,
  },
  piechart_lay1_left: {

    alignSelf: 'center',
    alignItems: 'center',
  },
  piechart_lay1_right_survey_submit_box: {
    width: 20,
    height: 20,
    backgroundColor: '#208e8f',
    borderRadius: 1,
  },
  piechart_lay1_right_survey_submit_box1: {
    width: 20,
    height: 20,
    backgroundColor: '#ff9e1f',
    borderRadius: 1,
  },
  piechart_lay1_right_survey_submit_box2: {
    width: 20,
    height: 20,
    backgroundColor: '#28c9c1',
    borderRadius: 1,
  },
  piechart_lay1_right_survey_submit_box3: {
    width: 20,
    height: 20,
    backgroundColor: '#3bb300',
    borderRadius: 1,
  },
  piechart_lay1_right_survey_notsubmit_box: {
    width: 20,
    height: 20,
    backgroundColor: '#C70039',
    borderRadius: 1,
  },
  piechart_lay1_right_survey_notsubmit_box1: {
    width: 20,
    height: 20,
    backgroundColor: '#f52105',
    borderRadius: 1,
  },
  piechart_lay1_right_survey_notsubmit_box2: {
    width: 20,
    height: 20,
    backgroundColor: '#c46092',
    borderRadius: 1,
  },
  piechart_lay1_right_survey_notsubmit_box3: {
    width: 20,
    height: 20,
    backgroundColor: '#ff4d4d',
    borderRadius: 1,
  },
  barChartLegendContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: '48%'
  },
  piechart_lay1_right_layout: {
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: '52%'
  },
  piechart_lay1_left_layout: {
    alignSelf: 'center',
    alignSelf: 'center',
    marginLeft: 15,
    height: 125,
    width: 110,
  },
  barChartInside: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginRight: 10
  },
  piechart_lay1_inside: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 5
  },
  piechart_lay1_right_layout_submit_text: {
    fontFamily: 'Montserrat-Medium',
    color: "#000",
    fontSize: 13,
    marginLeft: 10

  },
  piechart_lay1_right_layout_notsubmit_text: {
    fontFamily: 'Montserrat-Medium',
    color: "#000",
    fontSize: 13,
    marginLeft: 10,
    textDecorationLine: 'underline',
    flexShrink: 1
  },
  piechart_lay1_right_layout_notsubmit_text1: {
    fontFamily: 'Montserrat-Medium',
    color: "#000",
    fontSize: 13,
    marginLeft: 10,
    flexShrink: 1
  },
  piechartrect2: {
    flexDirection: 'column',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    borderRadius: 10,
    borderBottomColor: '#BEBEBE',
    borderBottomWidth: 1,
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 5,
    height: 300
  },
  piechartrect3: {
    flexDirection: 'column',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    borderRadius: 10,
    borderBottomColor: '#BEBEBE',
    borderBottomWidth: 1,
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
    height: 180,
    justifyContent: 'center',
  },
  piechartrect3_lay1: {
    marginTop: 15,
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: 'bold',
    color: "#000",
    alignSelf: 'center',

  },
  piechartrect3_lay2: {
    marginTop: 10,
    marginRight: 25,
    marginLeft: 25,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f3f3f5',
    height: 80,

  },
  piechartrect3_lay2_inside: {
    flexDirection: 'row',
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
    height: 50,
    backgroundColor: 'gray'
  },
  piechartrect3_lay2_inside_leftlayout: {
    flexDirection: 'column',
    height: 45,
    width: '50%',
  },
  piechartrect3_lay2_inside_left_bg: {
    backgroundColor: '#208e8f',
    height: 25,
  },
  piechartrect3_lay2_inside_rightlayout: {
    backgroundColor: '#208e8f',
    flexDirection: 'column',
    height: 45,
    width: '50%'
  },
  piechartrect4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '98%',
    height: 50,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: '#208e8f',
    position: 'absolute', 
    bottom: 0,     
  },

  flatlisttext: {
    fontSize: 12,
    height: 15,
    marginTop: 2,
    letterSpacing: 0.5,
    fontFamily: 'Montserrat-SemiBold',
    color: "#fff",
  },
  master_dashboardstyle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
  },
  bottomview: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  bottomselectview: {
    flexDirection: 'column',
    backgroundColor: '#98cd75',
    alignItems: 'center',
    justifyContent: 'center',
    width: 75
  },
  dash_bottom_week_text: {
    fontSize: 14,
    height: 18,
    fontFamily: 'Montserrat-SemiBold',
    color: "#fff",

  },
  chartTitleText: {
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
    alignSelf: 'center',
    zIndex: 4,
    marginTop: 15
  },
  sosCloseImageStyle: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
    marginTop:2,
    marginRight:5,
    borderRadius: 20,
    alignSelf: 'flex-end',
  },
});