import React from 'react';
import { StyleSheet } from 'react-native'
import { Scale, Colors } from '../../CommonConfig';
import { screenHeight } from '../../CommonConfig/HelperFunctions/functions';
import { s, vs } from 'react-native-size-matters';

const homeStyle = StyleSheet.create({
    homeScreeContainer: {
        flex: 1,
        paddingVertical: s(10)
    },
    rightIconStyle :{
        height: s(14),
        width: s(18),
        tintColor : Colors.white
    },
    barcodeIconStyle: {
        height: s(20),
        width: s(27),
    },
    drawerMenuIconStyle: {
        height: s(18),
        width: s(25),
        marginLeft: s(15),
        tintColor: Colors.BLACK
    },
    touchStyle: {
        height: vs(35),
        width: s(35),
        paddingHorizontal: s(25),
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContainer: {
        elevation: 3,
        width: '95%',
        borderLeftColor: Colors.APPCOLOR,
        borderLeftWidth: s(4),
        marginVertical: s(10),
        alignSelf: 'center',
        borderRadius: s(5),
        shadowOffset: { height: s(5), width: s(0) },
        shadowOpacity: 0.1,
        shadowColor: Colors.GRAY,
        backgroundColor: Colors.WHITE
    },
    cardInnerContainer: {
        padding: s(15),
        flex: 1
    },
    cardHeaderStyle: {
        flex: 0.5,
        justifyContent: 'center',
    },
    cardHeaderTextStyle: {
        color: Colors.MATEBLACK,
        fontSize: s(17),
        fontWeight: '600'
    },
    cardDescriptionTextStyle: {
        fontSize: s(12),
        marginTop: s(5),
        color: Colors.GRAY
    },
    listEmptyTextStyle: {
        color: Colors.GRAY
    },
    listEmptyContainer: {
        width: '100%',
        flex: 1,
        height: screenHeight - s(200),
        justifyContent: 'center',
        alignItems: 'center'
    },
    floatingButton: {
        height: s(55),
        width: s(55),
        backgroundColor: Colors.GREEN,
        position: 'absolute',
        bottom: s(20),
        right: s(20),
        borderRadius: s(55),
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.GRAY,
        shadowOpacity: 0.5,
        shadowOffset: { x: 5, y: 0 },
        elevation: 5,
        zIndex: 99
    },
    floatingBuyButton: {
        height: s(55),
        width: '90%',
        backgroundColor: Colors.GREEN,
        position: 'absolute',
        bottom: s(25),
        right: s(25),
        borderRadius: s(15),
        alignItems: 'center',
        shadowColor: Colors.GRAY,
        justifyContent: 'center',
        shadowOpacity: 1,
        shadowOffset: { x: 5, y: 0 },
        elevation: 5,
        zIndex: 99,
        flexDirection: 'row'
    },
    bannerViewStyle: {
        width: '100%',
    },
    noVerificationContainer: {
        height: '17%',
        width: '100%',
        backgroundColor: Colors.LIGHT_GRAY2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatingtextStyle: {
        fontSize: s(16),
        color: Colors.WHITE,
        fontWeight: '700'
    },
    addButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: s(7),
        paddingVertical: s(4),
        borderWidth: s(1),
        borderColor: Colors.APPCOLOR,
        borderRadius: s(4),
        right: s(5)
    },
    addText: {
        fontSize: s(14),
        fontWeight: '500',
        textAlign: 'center',
        alignSelf: 'center',
    },

    // product manage style
    closeIconStyle: {
        height: s(17),
        width: s(17),
        right: s(15)
    },
    searchIconStyle: {
        height: s(15),
        width: s(15),
        right: s(10),
        tintColor : Colors.white
    },
    headerClose :{
            height: s(12),
            width: s(12),
            tintColor : Colors.white
    },
    productItemContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.WHITE
    }
})
export default homeStyle;