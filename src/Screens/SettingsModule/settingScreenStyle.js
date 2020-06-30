import React from 'react';
import { StyleSheet } from 'react-native'
import { Scale, Colors } from '../../CommonConfig';
import { screenHeight } from '../../CommonConfig/HelperFunctions/functions';
import { s, vs } from 'react-native-size-matters';

const settingScreenStyle = StyleSheet.create({
    settingContainer:{

    },
    profileContainerView:{
        borderColor: Colors.WHITE, shadowColor: Colors.GRAY,
        shadowOpacity: 0.7,
        shadowOffset: { x: 2, y: 2 },
        elevation: 6,
         borderWidth: 5, 
        borderRadius: s(27)
    },
    imageStyle:{
        height: s(50), 
        width: s(50),
        borderWidth: 3,
        borderColor: Colors.WHITE,
        borderRadius: 25 
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabView:{
        margin: s(10),
        borderRadius: s(10),
        backgroundColor: Colors.WHITE,
        flexDirection: 'row',
        padding: s(12)
    }
})
export default settingScreenStyle;