import Colors from "./Colors";
import Scale from "./Matrics";
import { s, vs } from "react-native-size-matters";
import { StyleSheet, Platform } from "react-native";
import './Fonts';
import { screenWidth } from "./HelperFunctions/functions";
import Sizes from "./commonSize";

export const ApplicationStyles = StyleSheet.create({
    shadowOpt: {
        color: "#000",
        borderWidth: 2,
        borderRadius: 3,
        shadowOpacity: 0.2,
        shadowOffset :{x: 0,y: 3,},
    },
    headerTitleStyle: {
        fontSize: Sizes.header,
        color: Colors.WHITE,
        textAlign: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight : 'bold'
    },
    headerTitle1Style: {
        color: Colors.APPCOLOR,
        fontSize: s(23),
        fontWeight: 'bold',
    },
    headerTitle2Style: {
        color: Colors.BLACK,
        fontWeight: 'bold',
        fontSize: s(23),
    },

    headerStyle: {
        shadowOffset: { height: Scale(2), width: Scale(0) },
        shadowOpacity: s(1),
        borderBottomEndRadius : Platform.OS == 'android' ? Scale(20) : Scale(15),
        borderBottomStartRadius : Platform.OS == 'android' ? Scale(20) : Scale(15),
        height: Sizes.base * vs(3.3),
        backgroundColor: Colors.APPCOLOR, // or 'white'
        borderBottomColor: "transparent",
        elevation: 4, // for android
        borderBottomWidth: s(0.5)
    }
})