import React from 'react';
import { StyleSheet } from 'react-native'
import { Scale, Colors } from '../../CommonConfig';
import { screenHeight } from '../../CommonConfig/HelperFunctions/functions';
import { s , vs} from 'react-native-size-matters';

const dealsStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUD,
      
    },
    tabViewStyle: {
        flexDirection: 'row',
        backgroundColor: Colors.WHITE,
        margin: s(10),
        borderRadius: 7,
    },
    tabView: {
        width: '50%',
        padding: s(10),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: s(10),
        borderColor: Colors.WHITE,
        borderWidth: 5
    },
    dealsViewStyle: {
        flex: 1,
    },
    disputesViewStyle: {
        flex: 1,
    },
    imageViewContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.GRAY, 
        shadowOpacity: 0.7, 
        shadowOffset: { x: 2, y: 2 } ,
        elevation: 3,
        alignSelf: 'flex-start',
        paddingTop: s(5)
    },
    imageStyle:{
        height: s(50), 
        width: s(50),
        borderWidth: 3,
        borderColor: Colors.WHITE,
        borderRadius: 25 
    },
    CartViewStyle:{
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        margin: s(10),
        padding: s(10),
    },
    dealsViewContainerStyle:{
        flex: 1,
        paddingHorizontal: s(10)
    },
    detaildealthumbnailStyle:{
        height: s(35),
        width: s(35),
        borderWidth: 2,
        borderColor: Colors.WHITE,
        borderRadius: s(13),  
        right: s(15),
    },
    cartImageContainerStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: s(5), 
        alignSelf: 'center', 
        height: s(100), 
        width: s(90), 
    }
})
export default dealsStyle;