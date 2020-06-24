import React from 'react';
import { StyleSheet, Platform } from 'react-native'
import { Colors, Scale } from '../../CommonConfig';
import { vs, s, ms } from 'react-native-size-matters';
import { screenHeight, screenWidth } from '../../CommonConfig/HelperFunctions/functions';

export default scannerStyle = StyleSheet.create({
    scannerContainer: {
        flex: 1,
        // backgroundColor: 'rgb(37,36,34)',
        // backgroundColor:'white'

    },
    closeIconStyle: {
        height: s(17),
        width: s(17),
        right: s(15)
    },
    searchIconStyle: {
        height: s(15),
        width: s(15),
        right: s(15),
        tintColor : Colors.white
    },
    headerClose :{
            height: s(12),
            width: s(12),
            tintColor : Colors.white
    },
    scanLine: {
        backgroundColor: Colors.APPCOLOR,
        height: s(1),
        width: s(220),
        alignSelf: 'center',
        shadowOpacity: 2,
        elevation: 50,
        shadowOffset: {x: 12, y: 13},
        shadowColor: Colors.APPCOLOR
    },
    touchStyle: {
        height: s(35),
        width: s(35),
        justifyContent: 'center',
        alignItems: 'center',
    },
    scannerView: {
        alignSelf: 'center',
        height: s(250) ,
        width: s(250),
        padding: s(5),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: s(5),
    },
    cameraStyle: {
       
        flex: 1,

    },
    innerViewStyle: {
        // backgroundColor: 'red',
        // backgroundColor: 'green',
        // height: screenHeight / 3 ,
        // width: screenWidth / 1.5,
        alignSelf: "center",
       
    },
    switchViewStyle: {
        width: '85%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        padding: s(17),
        flexWrap:'wrap',
        color: 'black',
        alignSelf: 'center',
        borderRadius: s(10),
        backgroundColor: Colors.LIGHT_GRAY2,
        margin: s(15),
        
    },
    switchtextStyle: {
        fontSize: ms(15, 0.7),
        color: 'white',
        paddingHorizontal: s(10),
        fontWeight: Platform.OS === 'ios' ? '600' : 'bold'
    },
    textStyle: {fontSize: ms(14, 0.7), color: Colors.WHITESHADE, textAlign: 'center', fontWeight: Platform.OS === 'ios' ? '600' : 'bold', marginHorizontal: s(25) },

    bottomViewStyle: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: s(10)
    },
    manualinputStyle: {
        color: Colors.APPCOLOR,
        paddingVertical: s(5),
        paddingBottom: s(10),
        fontSize: s(15),
    },
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.50)',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
    },
    modalinnerView: {
        backgroundColor: Colors.WHITE,
        borderTopLeftRadius: s(25),
        borderTopRightRadius: s(25),
         alignItems: 'center',
         justifyContent: 'center',
         height: '30%',
         width: '100%',
    },
    modalinnerView2:{
        width: '80%',
        height: s(50),
        flexDirection: 'row',
        backgroundColor: Colors.APPCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginTop: s(10)
        
    },
    AddItemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.WHITE
    }
});