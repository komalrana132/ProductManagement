// =======>>>>>>>> LIBRARIES <<<<<<<<=======

import * as React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TextInput, Checkbox, StatusBar, TouchableOpacity, Image, FlatList, Platform, ActivityIndicator, } from 'react-native';
import { connect } from 'react-redux';

// =======>>>>>>>> ASSETS <<<<<<<<=======
import { Colors, Scale, ImagesPath, LoadWheel, ShineLoader } from '../../CommonConfig';
import { ApplicationStyles } from '../../CommonConfig/ApplicationStyle';
import { screenHeight, screenWidth } from '../../CommonConfig/HelperFunctions/functions';
import homeStyle from '../HomeModule/homeStyle'
import AppHeader from '../../Assets/Components/AppHeader';
import { s, vs } from 'react-native-size-matters';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import settingScreenStyle from '../SettingsModule/settingScreenStyle';
import { becomeSellerStyles } from '../BecomeSellerModule/becomeSellerStyle';
import { productPurchaseRequest } from '../../Redux/Actions'


// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======
class CartPaymentMethod extends React.Component {
    // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
    state = {
        checked: global.Payment ? global.Payment : "",
        purchaseLoading: false
    }
    // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======

    componentDidMount() {
        console.disableYellowBox = true //warning disable line
        this.setHeader()
    }
    componentDidUpdate(prevProps) {
        if (this.state.purchaseLoading && this.props.home.productPurchaseSuccess && this.props.home.productPurchaseResponce.Status === 1) {
            if (this.props.home !== prevProps.home) {
                this.setState({purchaseLoading: false})
                this.props.navigation.navigate('PaymentSuccessfull')
            }
        } else if (this.state.purchaseLoading && this.props.home.productPurchaseSuccess && this.props.home.productPurchaseResponce.Status !== 1 ) {
            if (this.props.home !== prevProps.home) {
                this.setState({purchaseLoading: false})
                alert(his.props.home.productPurchaseResponce.Message)
            }
        } else if (this.props.home.productPurchaseSuccess === false ) {
            if (this.props.home !== prevProps.home) {
                this.setState({purchaseLoading: false})
                alert('Something went wrong')
            }
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
                            <Text style={[ApplicationStyles.headerTitleStyle, { fontWeight: '600' }]}>PAYMENT METHODS</Text>
                        </View>
                        <View
                            style={homeStyle.touchStyle}>
                        </View>
                    </SafeAreaView>
                );
            },
        })
    }

    requestProductPurchase() {

        let productList = [];
        this.props.home.addedItems.map(item => {
            let tempjson = { productId: '', quantity: '', price: '', discount: 0 }
            tempjson.productId = item.product_id;
            tempjson.quantity = item.cartquantity;
            tempjson.price = item.product_price * item.cartquantity;
            tempjson.discount = 0;
            productList = [...productList, tempjson]
        })


        let requestParams = {
            "userid": this.props.auth.userData.Data.userId,
            "sellerid": this.props.home.addedItems[0].userid,
            "paymentTypeName": this.state.checked,
            "paymentid": "25a2288a-000f-5000-a000-17776454d022248",
            "status": "succeeded",
            "amount": this.props.total,
            "currency": "RUB",
            "description": "Test Payment",
            "capturedAt": "2020-01-07T04:36:05.880Z",
            "createdAt": "2020-01-07T04:36:02.608Z",
            "recipient_accountid": "663020",
            "recipient_gatewayid": "1663004",
            "refundable": "true",
            "productList":productList,
            "access_key": this.props.access_key,
            "secret_key": this.props.secret_key,
            "device_type": Platform.OS === 'android' ? "1" : "0",
            "device_token": ""
        }
        if (!productList) {
            alert('noProduct List')
        } else if (!this.state.checked) {
            alert('check payment Mode')
        } else {
            this.setState({ purchaseLoading: true })
            this.props.productPurchaseRequest(requestParams)
            console.log(requestParams);
        }
    }

    // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.BACKGROUD }}>
                {/* promo code view */}
                <View style={{ width: '100%', backgroundColor: Colors.APPCOLOR, flexDirection: 'row', paddingVertical: s(20) }}>
                    <View style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ alignItems: 'center', width: '100%', justifyContent: 'center', marginLeft: s(10) }}>
                            <TextInput
                                placeholder="Enter Promocode"
                                placeholderTextColor={Colors.WHITE}
                                style={{ fontSize: s(16), color: Colors.GRAY, paddingVertical: s(7), borderBottomWidth: s(0.5), borderColor: Colors.WHITE, width: '80%', textAlign: 'center' }}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 0.4, justifyContent: 'center', alignItems: 'center', }}>
                        <TouchableOpacity style={{ backgroundColor: Colors.WHITE, padding: s(10), paddingHorizontal: s(20), borderRadius: s(7), shadowColor: Colors.BLACK, overflow: 'hidden', shadowRadius: 5, shadowOpacity: 1, elevation: 5 }}>
                            <Text style={{ color: Colors.APPCOLOR, fontSize: s(15), fontWeight: '700' }}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                        <View style={[settingScreenStyle.center, { padding: s(7), paddingHorizontal: s(25) }]}><Text style={{ fontSize: s(14), fontWeight: '600', color: Colors.BLACK }}>Google Pay</Text></View>
                        <TouchableOpacity onPress={() => { this.setState({ checked: 'Google' }) }} style={[settingScreenStyle.center, { position: 'absolute', right: s(20), alignSelf: 'center' }]}>
                            <Image source={this.state.checked === 'Google' ? ImagesPath.checkedIcon : ImagesPath.uncheckedIcon} style={{ height: s(22), tintColor: Colors.APPCOLOR, width: s(22) }} />
                        </TouchableOpacity>
                    </View>
                    <View style={settingScreenStyle.tabView}>
                        <View style={[settingScreenStyle.center, { paddingLeft: s(7) }]}><Image source={ImagesPath.applePayIcon} resizeMode="contain" style={{ height: s(20), width: s(40) }} /></View>
                        <View style={[settingScreenStyle.center, { padding: s(7), paddingHorizontal: s(25) }]}><Text style={{ fontSize: s(14), fontWeight: '600', color: Colors.BLACK }}>Apple Pay</Text></View>
                        <TouchableOpacity onPress={() => { this.setState({ checked: 'Apple' }) }} style={[settingScreenStyle.center, { position: 'absolute', right: s(20), alignSelf: 'center' }]}>
                            <Image source={this.state.checked === 'Apple' ? ImagesPath.checkedIcon : ImagesPath.uncheckedIcon} style={{ height: s(22), tintColor: Colors.APPCOLOR, width: s(22) }} />
                        </TouchableOpacity>
                    </View>
                    <View style={settingScreenStyle.tabView}>
                        <View style={[settingScreenStyle.center, { paddingLeft: s(7) }]}><Image resizeMode="contain" source={ImagesPath.cashPayIcon} style={{ height: s(19), width: s(30) }} /></View>
                        <View style={[settingScreenStyle.center, { padding: s(7), paddingHorizontal: s(25) }]}><Text style={{ fontSize: s(14), fontWeight: '600', color: Colors.BLACK }}>Pay Cash</Text></View>
                        <TouchableOpacity onPress={() => { this.setState({ checked: 'Cash' }) }} style={[settingScreenStyle.center, { position: 'absolute', right: s(20), alignSelf: 'center' }]}>
                            <Image source={this.state.checked === 'Cash' ? ImagesPath.checkedIcon : ImagesPath.uncheckedIcon} style={{ height: s(22), tintColor: Colors.APPCOLOR, width: s(22) }} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {/* Button view */}
                <TouchableOpacity onPress={this.requestProductPurchase.bind(this)} style={homeStyle.floatingBuyButton} >
                    
                        {
                            this.state.purchaseLoading
                                ? <ActivityIndicator size="small" visible={this.state.purchaseLoading} />
                                : <Text style={[homeStyle.floatingtextStyle, { textAlign: 'center' }]}>Buy</Text>
                        }
                   
                    <Text style={[homeStyle.floatingtextStyle, { right: s(10), position: 'absolute', textAlign: 'center' }]}>${this.props.total}</Text>

                </TouchableOpacity>
            </SafeAreaView>
        );
    };
}

// =======>>>>>>>> PROPS CONNECTION <<<<<<<<=======
const mapStateToProps = (state) => {
    return {
        scannerMode: state.Common.scannerMode,
        auth: state.Auth,
        home: state.Home,
        total: state.Home.total,
        secret_key: state.Auth.sendOtpSuccess && state.Auth.sendOtpResponce && state.Auth.sendOtpResponce.userToken,
        access_key: state.Auth.testEncryptionSuccess && state.Auth.testEncryptionResponce && state.Auth.testEncryptionResponce.encrypted_value
    };
}

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(mapStateToProps,
    { productPurchaseRequest }
)(CartPaymentMethod);