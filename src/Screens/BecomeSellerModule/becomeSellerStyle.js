import { s, vs, ms } from "react-native-size-matters";
import { StyleSheet } from "react-native";
import { Colors } from "../../CommonConfig";

export const becomeSellerStyles = StyleSheet.create({
    backIconStyle: {
        height: s(18),
        width: s(12),
    },
    container: {
        flexGrow: 1,
    },
    headerlabelStyle: {
        fontSize: s(15),
        color: Colors.GRAY,
        fontWeight: 'bold'
    },
    selfieWithPassportViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection:'row',
        padding: s(15),
        width: '100%'
    },
    innerTextStyle: {
        fontSize: ms(15, 1.2),
        color: Colors.LIGHT_GRAY2,
        alignSelf: 'flex-start',
        fontWeight: '600'
    }
})