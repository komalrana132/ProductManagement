import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Scale, Sizes} from '../../CommonConfig';
import {s, ms} from 'react-native-size-matters';
import {screenHeight} from '../../CommonConfig/HelperFunctions/functions';

const authStyle = StyleSheet.create({
  loginBodyViewStyle: {
    justifyContent: 'center',
    paddingVertical: s(15),
    alignItems: 'center',
    flex: 1,
    marginHorizontal: s(10),
  },
  profileIconStyle:{
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.GRAY, 
    shadowOpacity: 0.7, 
    shadowOffset: { x: 2, y: 2 } ,
    elevation: 3,
    alignSelf: 'flex-start',
    paddingTop: s(5)
},

  loginHeaderTextContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: screenHeight / 4,

  },

  registertabStyle: {
    // backgroundColor: Colors.black,
    flexDirection : 'row',
    marginTop: s(20)
  },

  textInputBoxStyle: {
    padding: s(10),
    width: '100%',
    // backgroundColor : Colors.black
  },

  loginScreeContainer: {
    // backgroundColor: Colors.WHITE,
    flex: 1,
  },

  imageStyle:{
    height: s(50), 
    width: s(50),
    borderWidth: 3,
    borderColor: Colors.WHITE,
    borderRadius: 25 
},

  loginBodyInnerViewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: s(5),
    // borderBottomWidth: 0.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray2,
    borderRadius: Sizes.radius,
  },

  loginFotterInnerView: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '80%',
    marginTop: s(15),
  },

  loginFooterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '88%',
  },

  otpBodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBoxHeaderTextStyle: {
    fontWeight: '600',
    fontSize: s(22),
    color: Colors.APPCOLOR,
  },
  loginBoxCard: {
    width: '100%',
    borderRadius: s(5),
    justifyContent: 'center',
    paddingVertical: s(15),
    alignItems: 'center',
    // backgroundColor: Colors.WHITE
  },
  textInputStyle: {
    borderBottomColor: Colors.BLACK,
    height: s(40),
    borderWidth: 1,
    marginVertical: s(25),
  },
  labelTextStyle: {
    fontSize: ms(15, 1.5),
    color: Colors.LIGHT_GRAY2,
    fontWeight: 'bold',
  },
  loginButtonContainer: {
    height: s(40),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButtonTextStyle: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontSize: s(18),
    padding: s(15),
  },
  optbackbuttonView: {
    margin: s(15),
    padding: s(7),
    alignSelf: 'flex-start',
  },
  otpInnerView: {
    marginTop: s(10),
    padding: s(15),
    justifyContent: 'center',
    alignItems: 'center',
  },

  codeInputFieldStyle: {
    width: s(30),
    height: s(45),
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: Colors.GRAY,
    color: Colors.BLACKSHADE,
    fontSize: s(15),
  },
});
export default authStyle;
