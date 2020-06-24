import React from 'react';
import { StyleSheet } from 'react-native'
import { Scale, Colors } from '../../CommonConfig';
import { screenHeight } from '../../CommonConfig/HelperFunctions/functions';
import { s , vs} from 'react-native-size-matters';

const inviteStyle = StyleSheet.create({
    viewStyle: {
        height: '25%',
        borderColor: Colors.GRAY,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        padding: s(10)
    },
    view2: {
        width: '60%',
        height: s(50),
        flexDirection: 'row',
        backgroundColor: Colors.APPCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        
    },
    text1:{
        fontWeight: Platform.OS === 'android' ? 'bold' : '500',
        fontSize: s(16),
        color: Colors.GRAY
    },
    view3: {   
        paddingVertical: s(15),
        flexDirection: 'row',
    },
    text2: {
        fontSize: s(21),
        color: Colors.APPCOLOR,
        fontWeight: 'bold',
        paddingVertical: s(5),
    }
})
export default inviteStyle;