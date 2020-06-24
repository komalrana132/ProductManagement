// =======>>>>>>>> LIBRARIES <<<<<<<<=======

import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, StatusBar, Image, Platform, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import scannerStyle from './scannerStyle';
import { ApplicationStyles } from '../../CommonConfig/ApplicationStyle';
import { ImagesPath, Colors, LoadWheel } from '../../CommonConfig';
import homeStyle from '../HomeModule/homeStyle';
import { connect } from 'react-redux';
import AppHeader from '../../Assets/Components/AppHeader';
import { s } from 'react-native-size-matters';
import { RNCamera } from 'react-native-camera';
import {
} from '../../Redux/Actions'
import ScannerModal from './Component/ScannerModal';
import { screenWidth } from '../../CommonConfig/HelperFunctions/functions';
import dealsStyle from '../DealsModule/dealsStyle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    addItemToShopRequest,
    getSellerProductListRequest
} from '../../Redux/Actions'

// =======>>>>>>>> ASSETS <<<<<<<<=======



// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======

class AddItem extends React.Component {

    // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
    state = {
        changetik: false,
        scannerModalVisible: false,
        addItemLoading: false,
        hasItem: this.props.home.barcodeSuccess && this.props.home.barcodeResponce.Status == 1 ? true : false,
        quantity: 1,
        sellerProductLoading: false,
        price: '1.00',
    }

    // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======
    componentDidMount() {
        this.setHeader()
        this.props.home.barcodeSuccess && this.props.home.barcodeResponce.Status === 1 &&  this.setState({ price: this.props.home.barcodeResponce.Data.actual_price })
        !this.props.loginSuccess || !this.props.sellerVerification ? global.hasItem = true : global.hasItem = false
    }
    componentDidUpdate(prevProps) {
        if (!this.props.loginSuccess || !this.props.sellerVerification) {
            if (this.props.auth !== prevProps.auth)
                global.hasItem = true
        } else {
            if (this.props.auth !== prevProps.auth)
                global.hasItem = false
        }

        if (this.props.home.addItemSuccess && this.state.addItemLoading && this.props.home.addItemResponce.Status === 1) {
            if (this.props.home !== prevProps.home) {
                this.setState({ addItemLoading: false })
                this.requestSellerProductList()
            }
        } else if (this.props.home.addItemLoading && this.state.addItemLoading && this.props.home.addItemResponce.Status !== 1) {
            if (this.props.home !== prevProps.home) {
                this.setState({ addItemLoading: false })
                alert(this.props.home.addItemResponce.Message)
            }
        }else if (this.props.home.addItemLoading === false && this.state.addItemLoading) {
            if (this.props.home !== prevProps.home) {
                this.setState({ addItemLoading: false })
            }
        }

        // sellerlist responce
        if (this.props.home.sellerProductListSuccess && this.props.home.sellerProductListresponce.Status === 1 && this.state.sellerProductLoading) {
            if (this.props.home !== prevProps.home) {
                this.setState({ sellerProductLoading: false })
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                })
            }
        } else if (this.props.home.sellerProductListSuccess && this.state.sellerProductLoading && this.props.home.sellerProductListresponce.Status !== 1) {
            if (this.props.home !== prevProps.home) {
                this.setState({ sellerProductLoading: false })
                alert(this.props.home.sellerProductListresponce.Message)
            }
        } else if (this.props.home.sellerProductListSuccess === false && this.state.sellerProductLoading) {
            if (this.props.home !== prevProps.home) {
                this.setState({ sellerProductLoading: false })
                alert('Something went wrong')
            }
        }
    }
    // =======>>>>>>>> FUNCTIONS DECLARATION <<<<<<<<=======
    setHeader() {
        this.props.navigation.setOptions({
            header: () => {
                return (
                    this.state.hasItem
                        ? <SafeAreaView style={[ApplicationStyles.headerStyle, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <TouchableOpacity
                                style={homeStyle.touchStyle}
                                onPress={() => { this.props.navigation.openDrawer() }}>
                                <Image source={ImagesPath.menuIcon} style={homeStyle.drawerMenuIconStyle} />
                            </TouchableOpacity>
                            <View>
                                <AppHeader />
                            </View>
                            <TouchableOpacity
                                style={scannerStyle.touchStyle}>
                                {/* <Image source={ImagesPath.CloseIcon} style={scannerStyle.closeIconStyle} /> */}
                            </TouchableOpacity>
                        </SafeAreaView>
                        : <SafeAreaView style={[ApplicationStyles.headerStyle, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]} />
                )
            },
        })
    }

    onAddtoStockPress() {
        if (!this.props.loginSuccess) {
            global.hasItem = true;
            this.props.navigation.reset({
                index: 1,
                routes: [{ name: 'Login' }],
            })
        } else if(this.state.price <= 0){
            alert('enter price')
        }else {
            this.requestAddItemToShop()

        }
    }

    requestAddItemToShop() {
        this.setState({ addItemLoading: true })
        let requestParams = {
            "productList": [
                {
                    "userid": this.props.auth.userData.Data.userId,
                    "productid": this.props.home.barcodeResponce.Data.product_id,
                    "quantity": this.state.quantity,
                    "productPrice": parseFloat(this.state.price).toFixed(2),
                    "isEdit": true
                }
            ],
            "access_key": this.props.access_key,
            "secret_key": this.props.secret_key,
            "device_type": Platform.OS == 'android' ? "1" : "0",
            "device_token": ""
        }
        this.props.addItemToShopRequest(requestParams)
    }

    requestSellerProductList() {
        if (this.props.loginSuccess) {
            this.setState({ sellerProductLoading: true })
            let requestParams = {
                "userid": this.props.auth.userData.Data.userId,
                "access_key": this.props.access_key,
                "secret_key": this.props.secret_key,
                "device_type": Platform.OS == 'android' ? "1" : "0",
                "device_token": ""
            }
            this.props.getSellerProductListRequest(requestParams);
        }
    }



    // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
    hasItemView() {
        const { weight, actual_price, recommended_price, product_name, image_url, image } = this.props.home.barcodeResponce.Data
        return (
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={'handled'}
                enableAutomaticScroll={true}
                showsVerticalScrollIndicator={false}
                enableOnAndroid={true}
                contentContainerStyle={{ flexGrow: 1 }}>

                <View style={[scannerStyle.AddItemContainer, { margin: s(15), borderRadius: s(15) }]}>
                    <View style={[dealsStyle.cartImageContainerStyle,]}>
                        <Image source={{ uri: image_url, name: image }} resizeMode={'contain'} style={{ height: s(80), width: s(80) }} />
                    </View>
                    <Text style={{ fontSize: s(22), fontWeight: '500', color: Colors.BLACK, marginTop: s(10) }}>{product_name}</Text>
                    <Text style={{ fontSize: s(18), fontWeight: '500', color: Colors.GRAY, marginTop: s(10) }}>{weight}</Text>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', width: '85%', paddingVertical: s(10), marginTop: s(25) }}>
                        <View>
                            <Text style={{ fontSize: s(16), fontWeight: '500', textAlign: 'center', padding: s(10) }}>Quantity</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { this.state.quantity <= 1 ? null : this.setState({ quantity: --this.state.quantity }) }} style={{ padding: s(5), paddingHorizontal: s(7) }}>
                                <Text style={{ fontSize: s(19), color: Colors.BLACKSHADE, fontWeight: '500', textAlign: 'center', padding: s(5) }}> - </Text>
                            </TouchableOpacity>
                            <View style={{ paddingHorizontal: s(8), borderRadius: s(7), borderColor: Colors.GRAY, borderWidth: 0.5 }}>
                                <TextInput
                                    value={this.state.quantity.toString()}
                                    keyboardType={'decimal-pad'}
                                    onChange={(text) => {
                                        if (isNaN(text) || text === '') { }
                                        else { this.setState({ quantity: parseInt(text) }) }
                                    }}
                                    style={{ fontSize: s(15), fontWeight: '500', textAlign: 'center', padding: s(5) }}

                                />
                            </View>
                            <TouchableOpacity onPress={() => { this.setState({ quantity: ++this.state.quantity }) }} style={{ padding: s(5), paddingHorizontal: s(7) }}>
                                <Text style={{ fontSize: s(19), color: Colors.BLACKSHADE, fontWeight: '500', textAlign: 'center', padding: s(5) }}> + </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', width: '85%', paddingVertical: s(10) }}>
                        <View>
                            <Text style={{ fontSize: s(16), fontWeight: '500', textAlign: 'center', padding: s(10) }}>Price</Text>
                        </View>
                        <View style={{ flexDirection: 'row', borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginRight: s(20), borderRadius: s(5), borderColor: Colors.GRAY }}>
                            <View style={{ paddingHorizontal: s(10), borderRightWidth: 0.5, borderColor: Colors.GRAY }}>
                                <Text style={{ paddingVertical: s(3), paddingHorizontal: s(0), fontSize: s(15) }}>$</Text>
                            </View>
                            <View style={{ paddingHorizontal: s(10) }}>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="numeric"
                                    // placeholder={this.state.price}
                                    value={this.state.price}
                                    onChangeText={(text) => { this.setState({ price: text }) }}
                                    style={{ paddingVertical: s(5), paddingHorizontal: s(5), fontSize: s(15) }}
                                />
                            </View>
                        </View>
                    </View>
                    <Text style={{ fontSize: s(17), fontWeight: '500', color: Colors.LIGHT_GRAY, marginTop: s(10) }}>Recomended Price ${recommended_price}</Text>

                </View>
                <TouchableOpacity onPress={this.onAddtoStockPress.bind(this)} style={[scannerStyle.modalinnerView2, { backgroundColor: Colors.LIGHT_APPCOLOR, marginBottom: s(25), alignSelf: 'center' }]}>
                    <Text style={{ color: Colors.WHITE, fontSize: s(18), fontWeight: 'bold' }}>+ Add to Stock</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        );
    }

    noItemView() {
        return (
            <>
                <View style={[scannerStyle.AddItemContainer]}>
                    <Image source={ImagesPath.qrCodeFailIcon} style={{ height: s(200), width: s(200) }} />
                    <Text style={{ fontSize: s(25), fontWeight: '500', color: Colors.APPCOLOR, marginTop: s(10) }}>Sorry!</Text>
                    <Text style={{ fontSize: s(16), fontWeight: '500', color: Colors.LIGHT_GRAY2, marginTop: s(10) }}>This item is not approved</Text>
                    <Text style={{ fontSize: s(16), fontWeight: '500', color: Colors.LIGHT_GRAY2 }}>by ShopiRide</Text>
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={[scannerStyle.modalinnerView2, { backgroundColor: Colors.LIGHT_APPCOLOR, marginBottom: s(25), alignSelf: 'center' }]}>
                    <Text style={{ color: Colors.WHITE, fontSize: s(18), fontWeight: 'bold' }}>Try Again</Text>
                </TouchableOpacity>
            </>
        );
    }


    render() {
        let loading = this.state.addItemLoading || this.state.sellerProductLoading
        return (
            loading
                ?
                (<View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                    <LoadWheel visible={loading} />
                </View>)
                :
                (<SafeAreaView style={[scannerStyle.scannerContainer, { backgroundColor: this.state.hasItem ? Colors.BACKGROUD : Colors.WHITE }]}>
                    {this.state.hasItem
                        ? this.props.home.barcodeSuccess && this.props.home.barcodeResponce.Data && this.hasItemView()
                        : this.noItemView()
                    }
                </SafeAreaView>)
        );
    };
}

const mapStateToProps = (state) => {
    return {
        auth: state.Auth,
        home: state.Home,
        secret_key: state.Auth.sendOtpSuccess && state.Auth.sendOtpResponce && state.Auth.sendOtpResponce.userToken,
        access_key: state.Auth.testEncryptionSuccess && state.Auth.testEncryptionResponce && state.Auth.testEncryptionResponce.encrypted_value,
        sellerVerification: (state.Auth.signUpSuccess && state.Auth.signUpResponce.Status === 1) 
        || (state.Auth.checkOtpSuccess && state.Auth.checkOtpResponce.Status == 1 && state.Auth.checkOtpResponce.Data.userverificationstatus == 1 && state.Auth.checkOtpResponce.Data.documentverificationstatus == 1),
        loginSuccess: state.Auth.checkOtpSuccess && state.Auth.checkOtpResponce.Status == 1 && state.Auth.checkOtpResponce.Data.userverificationstatus == 1,
    }
}

export default connect(mapStateToProps, { addItemToShopRequest, getSellerProductListRequest })(AddItem);
