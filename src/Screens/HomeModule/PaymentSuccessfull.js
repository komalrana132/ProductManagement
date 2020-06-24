// =======>>>>>>>> LIBRARIES <<<<<<<<=======

import * as React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TouchableOpacity, Image, FlatList, } from 'react-native';
import { connect } from 'react-redux';
import { CardStyleInterpolators } from '@react-navigation/stack';

// =======>>>>>>>> ASSETS <<<<<<<<=======
import { Colors, Scale, ImagesPath, LoadWheel, ShineLoader } from '../../CommonConfig';
import { ApplicationStyles } from '../../CommonConfig/ApplicationStyle';
import { screenHeight } from '../../CommonConfig/HelperFunctions/functions';
import homeStyle from '../HomeModule/homeStyle'
import AppHeader from '../../Assets/Components/AppHeader';
import { becomeSellerStyles } from '../BecomeSellerModule/becomeSellerStyle';
import { s } from 'react-native-size-matters';
import dealsStyle from '../DealsModule/dealsStyle';
import {
   resetCartRequest
} from '../../Redux/Actions'
import settingScreenStyle from '../SettingsModule/settingScreenStyle';



// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======
class PaymentSuccessfull extends React.Component {
    // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
    state = {
        temp: true
    }
    // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======

    componentDidMount() {
        console.disableYellowBox = true //warning disable line
        this.setHeader()
    }
    componentDidUpdate(prevProps) {
       
    }

    // =======>>>>>>>> FUNCTIONS DECLARATION <<<<<<<<=======
    setHeader() {
        this.props.navigation.setOptions({
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            header: () => {
                return (
                    <SafeAreaView style={[ApplicationStyles.headerStyle,{ borderBottomWidth: s(0) }]}>
                        
                    </SafeAreaView>
                );
            },
        })
    }


    // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
    


    render() {
        return (
            <SafeAreaView style={[{ flex: 1, backgroundColor: Colors.WHITE }]}>
                <View style={{ marginBottom: s(75), justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Text style={{fontWeight: '400', fontSize: s(20)}}>Payment Successfull</Text>
                    <Image source={ImagesPath.paymentSuccessFullIcon} style={{ height: s(300), width: s(300) , resizeMode: 'contain'}} />
                </View>
                <TouchableOpacity onPress={() => { 
                    this.props.resetCartRequest();
                    this.props.navigation.navigate('HomeScreen');
                 }} style={[homeStyle.floatingBuyButton, { alignSelf: 'center' }]} >
                    <Text style={[homeStyle.floatingtextStyle, { textAlign: 'center' }]}>Continue Shopping</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    };
}

// =======>>>>>>>> PROPS CONNECTION <<<<<<<<=======
const mapStateToProps = (state) => {
    return {

    };
}

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(mapStateToProps,
    {
        resetCartRequest
    }
)(PaymentSuccessfull);