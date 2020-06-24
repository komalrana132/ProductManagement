// =======>>>>>>>> LIBRARIES <<<<<<<<=======

import * as React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TouchableOpacity, Image, FlatList, Platform, } from 'react-native';
import { connect } from 'react-redux';

// =======>>>>>>>> ASSETS <<<<<<<<=======
import { Colors, Scale, ImagesPath, LoadWheel, ShineLoader } from '../../CommonConfig';
import homeStyle from '../HomeModule/homeStyle'
import { ApplicationStyles } from '../../CommonConfig/ApplicationStyle';
import { screenHeight } from '../../CommonConfig/HelperFunctions/functions';
import AppHeader from '../../Assets/Components/AppHeader';
import dealsStyle from './dealsStyle';
import { DATA, cartDATA } from '../.././DATA';
import { s, ms } from 'react-native-size-matters';
import {
    getDealDetailRequest
} from '../../Redux/Actions'
import { becomeSellerStyles } from '../BecomeSellerModule/becomeSellerStyle';
import scannerStyle from '../ScannerModule/scannerStyle';


// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======

class DetailDealScreen extends React.Component {
    // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
    state = {
        tabSelected: 'deals',
        cartdata: [],
        billamount: 0,
        dealDetailLoading: false
    }
    // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======

    componentWillMount() {
        this.setState({ cartdata: cartDATA })
    }

    componentDidMount() {
        console.disableYellowBox = true //warning disable line
        this.dealDetail();
        this.setHeader();
    }
    componentDidUpdate(prevProps) {
        if (this.props.home.dealsDetailSuccess && this.props.home.dealsDetailResponce.Status === 1 && this.state.dealDetailLoading) {
            if (this.props.home !== prevProps.home) {
                let total = 0;
                this.props.home.dealsDetailResponce.Data.map((item) => {
                    total = total + (parseFloat(item.quantity) * parseFloat(item.product_price));
                })
                this.setState({
                    dealDetailLoading: false,
                    cartdata: this.props.home.dealsDetailResponce.Data,
                    billamount: total,
                })
            }
        } else if (this.props.home.dealsDetailSuccess && this.props.home.dealsDetailResponce.Status !== 1 && this.state.dealDetailLoading) {
            if (this.props.home !== prevProps.home) {
                this.setState({ dealDetailLoading: false })
                alert(this.props.home.dealsDetailResponce.Message)
            }
        } else if (this.props.home.dealsDetailSuccess === false && this.state.dealDetailLoading) {
            if (this.props.home !== prevProps.home) {
                this.setState({ dealDetailLoading: false })
                alert('Something went wrong')
            }
        }
    }

    // =======>>>>>>>> FUNCTIONS DECLARATION <<<<<<<<=======
    setHeader() {
        const { deal } = this.props.route.params;
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
                            <Text style={[ApplicationStyles.headerTitleStyle, { fontWeight: '600', textAlign: 'left' }]}>{deal.firstname} {deal.lastname}</Text>
                        </View>
                        <View style={[dealsStyle.imageViewContainerStyle, { paddingTop: s(0), alignSelf: 'center' }]}>
                            <Image source={deal.document_url ? { uri: deal.document_url, name: deal.document_name } : ImagesPath.profilePictureIcon} style={dealsStyle.detaildealthumbnailStyle} />
                        </View>
                    </SafeAreaView>
                );
            },
        })
    }


    dealDetail() {
        const { sellerid, createdAt } = this.props.route.params.deal;
        let requestedParams = {
            "sellerid": sellerid,
            "purchaseDate": createdAt,
            "userid": this.props.auth.userData.Data.userId,
            "access_key": this.props.access_key,
            "secret_key": this.props.secret_key,
            "device_type": Platform.OS === 'android' ? "1" : "0",
            "device_token": ""
        }
        this.setState({ dealDetailLoading: true })
        this.props.getDealDetailRequest(requestedParams)
    }

    // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
    renderCartItem(item) {
        return (
            <View style={{ flexDirection: 'row', paddingVertical: s(10), borderTopWidth: 0.5, borderColor: Colors.GRAY }}>
                <View style={[dealsStyle.cartImageContainerStyle]}>
                    <Image source={{ uri: item.image_url, name: item.image }} resizeMode={'contain'} style={{ height: s(80), width: s(80) }} />
                </View>
                <View style={dealsStyle.dealsViewContainerStyle}>
                    <Text style={{ fontSize: s(16), fontWeight: '500', paddingVertical: s(5) }}>{item.product_name}</Text>
                    <Text style={{ fontSize: s(15), fontWeight: '500', paddingBottom: s(5), color: Colors.GRAY }}>{item.weight}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: s(15), fontWeight: '500', color: Colors.GRAY }}>Purchase -</Text>
                        <Text style={{ fontWeight: '600', fontSize: s(16), color: Colors.BLACK }}> {item.quantity}</Text>
                        <View style={{ marginHorizontal: s(5), justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={ImagesPath.CloseIcon} style={{ height: s(12), width: s(7), padding: s(2), tintColor: Colors.BLACK }} />
                        </View>
                        <Text style={{ fontWeight: '600', fontSize: s(16), color: Colors.BLACK }}>{item.product_price}</Text>
                    </View>
                    {/* 
                            
                    </Text> */}
                </View>
            </View>
        )
    }

    renderBillItem(item) {
        let amount = (item.quantity * item.product_price).toFixed(2);
        return (
            <View style={{ padding: s(10), flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: s(16), fontWeight: '500', paddingVertical: s(5), color: Colors.BLACKSHADE }}>{item.product_name}</Text>
                <Text style={{ fontSize: s(16), fontWeight: '500', paddingVertical: s(5), color: Colors.APPCOLOR }}>${amount}</Text>
            </View>
        )
    }
    render() {
        let createDate = new Date(this.props.route.params.deal.createdAt)
        let createDateStart = createDate.toDateString().replace(/^\S+\s/, '').split(' ')
        createDateStart = `${createDateStart[1]} ${createDateStart[0]}, ${createDateStart[2]}`
        return (
            <SafeAreaView style={dealsStyle.container}>
                {
                    this.state.dealDetailLoading
                        ? (<View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }} >
                            <LoadWheel visible={this.state.dealDetailLoading} />
                        </View >)
                        : <ScrollView style={{ flexGrow: 1 }}>
                            <View style={dealsStyle.CartViewStyle}>
                                <View style={{paddingBottom: s(10) }}>
                                    <View><Text style={{ fontSize: s(15), fontWeight: '500', paddingVertical: s(5), color: Colors.GRAY }}>Deal Date:</Text></View>
                                    <View style={{ flexDirection: 'row', paddingVertical: s(5), paddingHorizontal: s(6) }}>
                                        <Image source={ImagesPath.calenderIcon} resizeMode='cover' style={{ height: s(13), width: s(12), alignSelf: 'center', tintColor: Colors.APPCOLOR }} />
                                        <Text style={{ fontSize: s(14), color: Colors.LIGHT_GRAY2, paddingHorizontal: s(10), alignSelf: 'center' }}>{createDateStart} at  {createDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
                                    </View>
                                </View>
                                <FlatList
                                    data={this.state.cartdata}
                                    renderItem={({ item }) => this.renderCartItem(item)}
                                    keyExtractor={(item) => item.id}
                                />
                            </View>
                            <View style={dealsStyle.CartViewStyle}>

                                <View style={{ borderBottomWidth: 0.5, borderColor: Colors.GRAY, paddingBottom: s(10) }}>
                                    <FlatList
                                        data={this.state.cartdata}
                                        renderItem={({ item }) => this.renderBillItem(item)}
                                        keyExtractor={(item) => item.id}
                                    />
                                </View>
                                <View style={{ padding: s(10), flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: s(16), fontWeight: '500', paddingVertical: s(5), color: Colors.BLACKSHADE }}>Total</Text>
                                    <Text style={{ fontSize: s(16), fontWeight: '500', paddingVertical: s(5), color: Colors.APPCOLOR }}>${this.state.billamount}</Text>
                                </View>
                            </View>
                        </ScrollView>
                }
            </SafeAreaView>
        );
    };
}

// =======>>>>>>>> PROPS CONNECTION <<<<<<<<=======
const mapStateToProps = (state) => {
    return {
        auth: state.Auth,
        home: state.Home,
        secret_key: state.Auth.sendOtpSuccess && state.Auth.sendOtpResponce && state.Auth.sendOtpResponce.userToken,
        access_key: state.Auth.testEncryptionSuccess && state.Auth.testEncryptionResponce && state.Auth.testEncryptionResponce.encrypted_value
    };
}

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(mapStateToProps,
    {
        getDealDetailRequest
    }
)(DetailDealScreen);