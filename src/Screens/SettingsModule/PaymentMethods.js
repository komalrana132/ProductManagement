// =======>>>>>>>> LIBRARIES <<<<<<<<=======

import * as React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TextInput,Checkbox, StatusBar, TouchableOpacity, Image, FlatList, } from 'react-native';
import { connect } from 'react-redux';

// =======>>>>>>>> ASSETS <<<<<<<<=======
import { Colors, Scale, ImagesPath, LoadWheel, ShineLoader } from '../../CommonConfig';
import { ApplicationStyles } from '../../CommonConfig/ApplicationStyle';
import { screenHeight, screenWidth } from '../../CommonConfig/HelperFunctions/functions';
import homeStyle from '../HomeModule/homeStyle'
import AppHeader from '../../Assets/Components/AppHeader';
import { s, vs } from 'react-native-size-matters';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { becomeSellerStyles } from '../BecomeSellerModule/becomeSellerStyle'
import settingScreenStyle from './settingScreenStyle';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======

class PaymentMethods extends React.Component {
    // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
    state = {
        checked: this.props.home.getProfileSuccess && this.props.home.getProfileResponce.Data.userData.payment_type_name  ? this.props.home.getProfileResponce.Data.userData.payment_type_name : null,
        // Apple, Google, Cash, Card
    }
    // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======

    componentDidMount() {
        console.disableYellowBox = true //warning disable line
        this.setHeader();
        
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.state.checked !== prevState.checked){
            global.Payment = this.state.checked
            console.log("payment method", global.Payment );

        }
        
    }

    // =======>>>>>>>> FUNCTIONS DECLARATION <<<<<<<<=======
    setHeader() {
        this.props.navigation.setOptions({
            header: () => {
                return (
                    <SafeAreaView style={[ApplicationStyles.headerStyle, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <TouchableOpacity
                            style={homeStyle.touchStyle}
                            onPress={() => { this.props.navigation.goBack() }}>
                            <Image source={ImagesPath.backIcon} style={becomeSellerStyles.backIconStyle} />
                        </TouchableOpacity>
                        <View>
                            <Text style={[ApplicationStyles.headerTitleStyle, { fontWeight: '600' }]}>CHANGE PAYMENT METHODS</Text>
                        </View>
                        <View
                            style={homeStyle.touchStyle}>
                        </View>
                    </SafeAreaView>
                );
            },
        })
    }

    // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.BACKGROUD }}>
                <View style={{ padding: s(15) }}>
                    <Text style={{ fontSize: s(15), color: Colors.GRAY }}>Payment Methods</Text>
                </View>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('AddCardScreen') }} style={settingScreenStyle.tabView}>
                    <View style={[settingScreenStyle.center, { paddingLeft: s(7) }]}><Image source={ImagesPath.addCardIcon} resizeMode="contain" style={{ height: s(19), width: s(25) }} /></View>
                    <View style={[settingScreenStyle.center, { padding: s(7), paddingHorizontal: s(25) }]}><Text style={{ fontSize: s(14), fontWeight: '600', color: Colors.BLACK }}>Add Card</Text></View>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('AddCardScreen') }} style={[settingScreenStyle.center, { position: 'absolute', right: s(20), alignSelf: 'center' }]}>
                        <Image source={ImagesPath.rightArrowIcon} style={{ height: s(13), width: s(13) }} />
                    </TouchableOpacity>
                </TouchableOpacity>
                
                <View style={settingScreenStyle.tabView}>
                    <View style={[settingScreenStyle.center, { paddingLeft: s(7) }]}><Image source={ImagesPath.gPayIcon} resizeMode="contain" style={{ height: s(20), width: s(40) }} /></View>
                    <View style={[settingScreenStyle.center, { padding: s(7), paddingHorizontal: s(25) }]}><Text style={{ fontSize: s(14), fontWeight: '600', color: Colors.BLACK }}>Google</Text></View>
                    <TouchableOpacity onPress={() => {this.setState({checked : 'Google'})}} style={[settingScreenStyle.center, { position: 'absolute', right: s(20), alignSelf: 'center' }]}>
                        <Image source={this.state.checked === 'Google' ? ImagesPath.checkedIcon : ImagesPath.uncheckedIcon} style={{height: s(22),tintColor: Colors.APPCOLOR, width: s(22)}}/>
                    </TouchableOpacity>
                </View>
                <View style={settingScreenStyle.tabView}>
                    <View style={[settingScreenStyle.center, { paddingLeft: s(7) }]}><Image source={ImagesPath.applePayIcon} resizeMode="contain" style={{ height: s(20), width: s(40) }} /></View>
                    <View style={[settingScreenStyle.center, { padding: s(7), paddingHorizontal: s(25) }]}><Text style={{ fontSize: s(14), fontWeight: '600', color: Colors.BLACK }}>Apple Pay</Text></View>
                    <TouchableOpacity onPress={() => {this.setState({checked : 'Apple'})}} style={[settingScreenStyle.center, { position: 'absolute', right: s(20), alignSelf: 'center' }]}>
                        <Image source={this.state.checked === 'Apple' ? ImagesPath.checkedIcon : ImagesPath.uncheckedIcon} style={{height: s(22),tintColor: Colors.APPCOLOR, width: s(22)}}/>
                    </TouchableOpacity>
                </View>
                <View style={settingScreenStyle.tabView}>
                    <View style={[settingScreenStyle.center, { paddingLeft: s(7) }]}><Image resizeMode="contain" source={ImagesPath.cashPayIcon} style={{ height: s(19), width: s(30) }} /></View>
                    <View style={[settingScreenStyle.center, { padding: s(7), paddingHorizontal: s(25) }]}><Text style={{ fontSize: s(14), fontWeight: '600', color: Colors.BLACK }}>Pay Cash</Text></View>
                    <TouchableOpacity onPress={() => {this.setState({checked : 'Cash'})}} style={[settingScreenStyle.center, { position: 'absolute', right: s(20), alignSelf: 'center' }]}>
                        <Image source={this.state.checked === 'Cash' ? ImagesPath.checkedIcon : ImagesPath.uncheckedIcon} style={{height: s(22),tintColor: Colors.APPCOLOR, width: s(22)}}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    };
}

// =======>>>>>>>> PROPS CONNECTION <<<<<<<<=======
const mapStateToProps = (state) => {
    return {
        scannerMode: state.Common.scannerMode,
        home : state.Home,
    };
}

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(mapStateToProps,
    {}
)(PaymentMethods);