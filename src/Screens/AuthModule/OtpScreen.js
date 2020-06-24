// =======>>>>>>>> LIBRARIES <<<<<<<<=======

import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, StatusBar, Image, SafeAreaView, Keyboard, Platform } from 'react-native';
import authStyle from './authStyle';
import { connect } from 'react-redux'
import AppHeader from '../../Assets/Components/AppHeader';
import { ApplicationStyles } from '../../CommonConfig/ApplicationStyle';
import { s } from 'react-native-size-matters';
import { Colors, ImagesPath, LoadWheel } from '../../CommonConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import {
    checkOtpRequest,
    getSellerProductListRequest,
    sendOtpRequest,
    testEncryptionRequest
} from '../../Redux/Actions'
import { CommonActions } from '@react-navigation/native';

// =======>>>>>>>> ASSETS <<<<<<<<=======


// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======

export class OtpScreen extends React.Component {


    // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
    state = {
        code: '',
        verifyloading: false,
        verify: false,
        sellerProductLoading: false,
        sendOtploading: false,
        testEncryptionLoading: false
    }

    // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======

    componentDidMount() {
        this.setHeader();
    }
    componentDidUpdate(prevProps) {
        if (this.state.verify) {
            this.onVerify()
        }

        // send otp api responce
        if (this.props.auth.sendOtpSuccess && this.props.auth.sendOtpResponce.Status == 1 && this.state.sendOtploading) {
            if (this.props.auth != prevProps.auth) {
                this.setState({ sendOtploading: false })
                alert(this.props.auth.sendOtpResponce.Data.otp_code)
                setTimeout(() => { }, 3000)
                this.testEncryption(this.props.auth.sendOtpResponce.Data.guid)
            }
        } else if (this.props.auth.sendOtpSuccess  && this.props.auth.sendOtpResponce.Status !== 1 && this.state.sendOtploading) {
            if (this.props.auth != prevProps.auth) {
                this.setState({ sendOtploading: false })
                alert(this.props.auth.sendOtpResponce.Message)
            }
        }  else if (this.props.auth.sendOtpSuccess === false && this.state.sendOtploading) {
            if (this.props.auth != prevProps.auth) {
                this.setState({ sendOtploading: false })
                alert('Something went wrong, Please try again')
            }
        }

        // testEncryption api responce
        if (this.props.auth.sendOtpSuccess && ((this.props.auth.sendOtpResponce.Status == 1 && this.props.auth.testEncryptionSuccess) && this.state.testEncryptionLoading)) {
            if (this.props.auth != prevProps.auth) {
                this.setState({ testEncryptionLoading: false })
            }
        } else if (this.props.auth.testEncryptionSuccess === false && this.state.testEncryptionLoading) {
            if (this.props.auth != prevProps.auth) {
                this.setState({ testEncryptionLoading: false })
                alert('Something went wrong, Please try again')
            }
        }

        // check otp responce
        if (this.state.verifyloading && this.props.auth.checkOtpSuccess && this.props.auth.checkOtpResponce.Status === 1) {
            if (this.props.auth != prevProps.auth) {
                this.setState({ verifyloading: false })
                alert(this.props.auth.checkOtpResponce.Message);
                this.setState({ verify: true })
            }
        } else if (this.state.verifyloading && this.props.auth.checkOtpSuccess && this.props.auth.checkOtpResponce.Status !== 1) {
            if (this.props.auth != prevProps.auth) {
                this.setState({ verifyloading: false, code: '' })
                alert(this.props.auth.checkOtpResponce.Message);
            }
        } else if (this.props.auth.checkOtpSuccess === false) {
            if (this.props.auth != prevProps.auth) {
                this.setState({ verifyloading: false, code: '' })
                alert('Something went wrong');
            }
        }
    }

    // =======>>>>>>>> FUNCTIONS DECLARATION <<<<<<<<=======

    setHeader() {
        this.props.navigation.setOptions({
            headerShown: false
        })
    }

    onSkipPress() {
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'root' }],
        });
    }

    async testEncryption(guid) {
        this.setState({ testEncryptionLoading: true })
        this.props.testEncryptionRequest({ guid: guid })
    }

    async resendOtpRequest() {
        this.setState({ sendOtploading: true, code: '' })
        await this.props.sendOtpRequest({
            "mobile_number": `${this.props.auth.sendOtpResponce.Data.mobile_number}`,
            "sms_mode": "Other",
            "user_type": `${this.props.scannerMode}`,
            "access_key": "nousername",
            "secret_key": `${this.props.token}`,
            "device_type": Platform.OS === 'android' ? "1" : '0',
            "device_token": ""
        })
    }

    onVerify() {
        console.log("nckshfjcokdsnfmdv", this.props.sellerVerification);
        
        const { plateNumber } = this.props.route.params;
        if (this.props.scannerMode === 'buyer') {
            if (this.props.home.total > 0) {
                this.props.navigation.navigate('Cart')
            } else {
                this.props.navigation.navigate('Home')
            }
        } else if (this.props.scannerMode === 'seller' && this.props.sellerVerification) {
            if (global.hasItem) {
                this.props.navigation.reset({
                    index: 1,
                    routes: [{ name: 'AddItem' }],
                })
            } else {
                this.props.navigation.navigate('Home')
            }
        } else if(this.props.scannerMode === 'seller' && !this.props.sellerVerification) {
            CommonActions.setParams({ plateNumber: plateNumber })
            this.props.navigation.reset({
                index: 1,
                routes: [{ name: 'BecomeSeller' }],
                params: {plateNumber: plateNumber}
            })
        }
    }

    async SubmitOtp(code) {
        const { userid, mobile_number } = this.props.auth.sendOtpResponce.Data;
        this.setState({ verifyloading: true });
        await this.props.checkOtpRequest({
            "userid": userid,
            "mobile_number": mobile_number,
            "verificationCode": code,
            "sms_mode": "Other",
            "access_key": this.props.access_key,
            "secret_key": this.props.secret_key,
            "device_type": Platform.OS === 'android' ? "1" : Platform.OS === 'ios' ? '0' : "3",
            "device_token": ""
        })
    }

    // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
    render() {
        const { phone } = this.props.route.params;
        let loading = this.state.verifyloading || this.state.testEncryptionLoading || this.state.sendOtploading
        return (
            <SafeAreaView style={authStyle.loginScreeContainer}>

                {
                    loading
                        // ? (<View style={{ flex: 1, backgroundColor: Colors.WHITE, justifyContent: 'center', alignItems: 'center', border }}>
                            ? <LoadWheel visible={loading} />
                        // </View>)
                        : (
                            <KeyboardAwareScrollView
                                keyboardShouldPersistTaps={'handled'}
                                enableAutomaticScroll={true}
                                showsVerticalScrollIndicator={false}
                                enableOnAndroid={true}
                                contentContainerStyle={{ flexGrow: 1 }}
                            >
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')} style={authStyle.optbackbuttonView}>
                                    <Image source={ImagesPath.backIcon} style={{ height: s(20), width: s(12) }} />
                                </TouchableOpacity>
                                <View style={authStyle.otpBodyContainer}>
                                    <View style={{ padding: s(15) }}>
                                        <Text style={{ fontSize: s(20), color: Colors.BLACKSHADE, fontWeight: 'bold' }}>OTP Verification</Text>
                                    </View>
                                    <View style={authStyle.otpInnerView}>
                                        <Text style={{ fontSize: s(16), color: Colors.GRAY }}>Enter The OTP Sent to</Text>
                                        <Text style={{ fontSize: s(14), color: Colors.BLACK, paddingVertical: s(12) }}>+{phone}</Text>
                                    </View>
                                    <View style={[authStyle.otpInnerView, { flexDirection: 'row', }]}>

                                        <OTPInputView
                                            style={{ width: '80%', height: s(100) }}
                                            pinCount={4}
                                            code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                                            onCodeChanged={code => { this.setState({ code }) }}
                                            autoFocusOnLoad={false}
                                            codeInputFieldStyle={authStyle.codeInputFieldStyle}
                                            codeInputHighlightStyle={{ borderColor: Colors.BLACKSHADE }}
                                            onCodeFilled={(code) => this.SubmitOtp(code)}
                                        />
                                    </View>
                                    <View style={authStyle.otpInnerView}>
                                        <View style={authStyle.otpInnerView}>
                                            <Text style={{ fontSize: s(14), color: Colors.GRAY }}>Don't Receive the OTP?</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => this.resendOtpRequest()} style={[authStyle.loginFotterInnerView], { borderBottomColor: Colors.APPCOLOR, borderBottomWidth: 1 }}>
                                            <Text style={{ fontSize: s(16), color: Colors.APPCOLOR, textAlign: 'center' }}>Resend OTP</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                                <View style={[authStyle.otpInnerView]}>
                                    <TouchableOpacity onPress={this.onSkipPress.bind(this)} style={[authStyle.loginFotterInnerView], { borderBottomColor: Colors.APPCOLOR, borderBottomWidth: 1 }}>
                                        <Text style={{ fontSize: s(16), color: Colors.APPCOLOR, textAlign: 'center' }}>Skip</Text>
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAwareScrollView>
                        )
                }
            </SafeAreaView>

        );
    };
}
// =======>>>>>>>> PROPS CONNECTION <<<<<<<<=======
const mapStateToProps = (state) => {
    return {
        scannerMode: state.Common.scannerMode,
        token: state.Common.refreshTokenSuccess && state.Common.refreshTokenResponce && state.Common.refreshTokenResponce.tempToken,
        auth: state.Auth,
        home: state.Home,
        secret_key: state.Auth.sendOtpSuccess && state.Auth.sendOtpResponce && state.Auth.sendOtpResponce.userToken,
        access_key: state.Auth.testEncryptionSuccess && state.Auth.testEncryptionResponce && state.Auth.testEncryptionResponce.encrypted_value,
        sellerVerification: (state.Auth.signUpSuccess && state.Auth.signUpResponce.Status === 1) 
        || (state.Auth.checkOtpSuccess && state.Auth.checkOtpResponce.Status == 1 && state.Auth.checkOtpResponce.Data.userverificationstatus == 1 && state.Auth.checkOtpResponce.Data.documentverificationstatus == 1)

    };
}

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(mapStateToProps,
    {
        checkOtpRequest, getSellerProductListRequest, sendOtpRequest, testEncryptionRequest
    }
)(OtpScreen);
