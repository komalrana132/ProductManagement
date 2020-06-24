// =======>>>>>>>> LIBRARIES <<<<<<<<=======

import React from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StatusBar,
    SafeAreaView,
    Image,
    Platform,
    ActivityIndicator
} from 'react-native';
import { connect } from "react-redux";
import { s, ms } from 'react-native-size-matters';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import authStyle from '../AuthModule/authStyle';
import scannerStyle from '../ScannerModule/scannerStyle';
import { ApplicationStyles } from '../../CommonConfig/ApplicationStyle';
import { ImagesPath, Colors, LoadWheel } from '../../CommonConfig';
import { becomeSellerStyles } from './becomeSellerStyle';
import { addCardRequest, getCardRequest } from "../../Redux/Actions";
import homeStyle from '../HomeModule/homeStyle';

// =======>>>>>>>> ASSETS <<<<<<<<=======


// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======

export class AddCard extends React.Component {

    // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
    state = {
        cardTypeShow: false,
        expiryDate: '',
        cardNumber: '',
        cvv: '',
        cardHolder: '',
        addCardLoading: false,
        getCardLoading: false,
    }

    // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======

    componentDidMount() {
        this.setHeader();
        if (this.props.loginSuccess && this.props.auth.userData.Data) {
            this.requestCardDetail()
        }
    }
    componentDidUpdate(prevProps) {
        if (this.state.addCardLoading && this.props.home.addCardSuccess && this.props.home.addCardResponce.Status === 1) {
            if (this.props.home != prevProps.home) {
                this.setState({ addCardLoading: false })
                alert(this.props.home.addCardResponce.Message)
                this.props.navigation.goBack()
            }
        } else if (this.state.addCardLoading && this.props.home.addCardSuccess && this.props.home.addCardResponce.Status !== 1) {
            if (this.props.home != prevProps.home) {
                this.setState({ addCardLoading: false })
                alert(this.props.home.addCardResponce.Message)
            }
        } else if (!this.state.addCardLoading && this.props.home.addCardSuccess === false) {
            if (this.props.home != prevProps.home) {
                this.setState({ addCardLoading: false })
                alert('Something went wrong')
            }
        }

        // getCard Responce
        if (this.state.getCardLoading && this.props.home.getCardSuccess && this.props.home.getCardResponce.Status === 1) {
            if (this.props.home !== prevProps.home) {
                this.convertExpiryDate(this.props.home.getCardResponce.Data.expiredate),
                    this.setState({
                        getCardLoading: false,
                        cardNumber: this.props.home.getCardResponce.Data.card_number,
                        cardHolder: this.props.home.getCardResponce.Data.card_holder_name,
                        cvv: this.props.home.getCardResponce.Data.cvv,
                    })
            }
        } else if (this.state.getCardLoading && this.props.home.getCardSuccess && this.props.home.getCardResponce.Status !== 1) {
            if (this.props.home !== prevProps.home) {
                this.setState({ getCardLoading: false })
                alert(this.props.home.getCardResponce.Message)
            }
        } else if (this.props.home.getCardSuccess === false) {
            if (this.props.home !== prevProps.home) {
                this.setState({ getCardLoading: false })
                alert('Something went wrong')
            }
        }
    }
    requestCardDetail() {
        this.setState({ getCardLoading: true })
        this.props.getCardRequest({
            "userid": this.props.auth.userData.Data.userId,
            "access_key": this.props.access_key,
            "secret_key": this.props.secret_key,
            "device_type": Platform.OS === 'android' ? "1" : "0",
            "device_token": ""
        })
    }



    // =======>>>>>>>> FUNCTIONS DECLARATION <<<<<<<<=======
    onSaveClick() {
        let currentYear = new Date().getFullYear()
        let currentMonth = new Date().getMonth() + 1

        if (!this.props.loginSuccess) {
            this.props.navigation.navigate('Login')
        } else if (this.state.cardNumber === "") {
            alert('please provide card Number')
        } else if (!this.validateCardNumber(this.state.cardNumber)) {
            alert('please provide valid card Number')
        } else if (this.state.cardHolder === '') {
            alert('please provide card Holder name')
        } else if (/^[a-zA-Z ]{2,30}$/.test(this.state.cardHolder) === false) {
            alert('please valid card Holder name')
        } else if (this.state.expiryDate === '') {
            alert('please provide expiry date')
        } else if (!/^(\d{1,2})\/(\d{4})$/.test(this.state.expiryDate)) {
            alert('please provide valid date')
        } else if (this.state.expiryDate.substr(3, 7) < currentYear) {
            alert('please provide valid expiry year')
        } else if (this.state.expiryDate.substr(0, 2) < currentMonth) {
            alert('please provide valid expiry month')
        } else if (this.state.cvv === '') {
            alert('please provide cvv')
        } else if (this.state.cvv.length != 3) {
            alert('please provide full length cvv')
        } else {
            this.setState({ addCardLoading: true })
            this.props.addCardRequest({
                "userid": this.props.auth.checkOtpResponce.Data.userId,
                "cardNumber": this.state.cardNumber,
                "cardHolderName": this.state.cardHolder,
                "expireDate": this.state.expiryDate,
                "cvv": this.state.cvv,
                "access_key": this.props.access_key,
                "secret_key": this.props.secret_key,
                "device_type": Platform.OS === 'android' ? "1" : "0",
                "device_token": ""
            })
        }
    }

    convertExpiryDate(date) {
        this.setState({ expiryDate: `${date.substr(5, 2)}/${date.substr(0, 4)}` })
    }

    setHeader() {
        this.props.navigation.setOptions({
            header: () => {
                return (

                    <SafeAreaView style={[ApplicationStyles.headerStyle, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <View style={scannerStyle.touchStyle} />
                        <View>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            style={scannerStyle.touchStyle}>
                            <Image source={ImagesPath.CloseIcon} style={scannerStyle.closeIconStyle} />
                        </TouchableOpacity>

                    </SafeAreaView>
                );
            },
        })
    }

    //validation of card number returns true or false 
    validateCardNumber(num) {
        let arr = (num + '')
            .split('')
            .reverse()
            .map(x => parseInt(x));
        let lastDigit = arr.splice(0, 1)[0];
        let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
        sum += lastDigit;
        return sum % 10 === 0;
    };

    handleChange = (text) => {
        let textTemp = text;

        if (textTemp[0] !== '1' && textTemp[0] !== '0') {

            textTemp = '';
        }
        if (textTemp.length === 2) {
            if (parseInt(textTemp.substring(0, 2)) > 12 || parseInt(textTemp.substring(0, 2)) == 0) {
                textTemp = textTemp[0];
            } else if (this.state.expiryDate.length === 1) {
                textTemp += '/';
            } else {
                textTemp = textTemp[0];
            }
        }
        this.setState({ expiryDate: textTemp })
    }

    // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======

    render() {
        return (
            <SafeAreaView style={authStyle.loginScreeContainer}>
                {
                    this.state.getCardLoading
                        ? (<View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                            <LoadWheel visible={this.state.getCardLoading} />
                        </View>)
                        : (
                            <KeyboardAwareScrollView
                                keyboardShouldPersistTaps={'handled'}
                                enableAutomaticScroll={true}
                                showsVerticalScrollIndicator={false}
                                enableOnAndroid={true}
                                automaticallyAdjustContentInsets={true}
                                contentContainerStyle={{ flexGrow: 1 }}
                            >
                                <View style={[becomeSellerStyles.container, { padding: s(15), backgroundColor: Colors.WHITE }]}>
                                    <View style={[authStyle.textInputBoxStyle, { paddingVertical: s(7), width: '100%' }]}>
                                        <Text style={[authStyle.labelTextStyle, { color: Colors.BLACKSHADE }]}>Card Number</Text>
                                        <View style={[authStyle.loginBodyInnerViewContainer, { marginVertical: s(2) }]}>
                                            <TextInput
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                maxLength={16}
                                                keyboardType="number-pad"
                                                onChangeText={text => {
                                                    this.setState({ cardNumber: text })
                                                }}
                                                value={this.state.cardNumber}
                                                onSubmitEditing={(text) => {

                                                }}
                                                placeholder="Eg. 1234 5678 9999 9999"
                                                placeholderTextColor={Colors.LIGHT_GRAY}
                                                style={{ flex: 1, fontSize: ms(16, 0.5), paddingHorizontal: s(10), paddingVertical: s(7) }} />
                                            {
                                                this.state.cardTypeShow
                                                    ? <Image source={ImagesPath.visaIcon} style={{ height: s(13), width: s(38) }} />
                                                    : null
                                            }
                                        </View>
                                    </View>
                                    <View style={[authStyle.textInputBoxStyle, { paddingVertical: s(7), width: '100%' }]}>
                                        <Text style={[authStyle.labelTextStyle, { color: Colors.BLACKSHADE }]}>Name on Card</Text>
                                        <View style={[authStyle.loginBodyInnerViewContainer, { marginVertical: s(2) }]}>
                                            <TextInput
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                placeholder="Enter Card Holder Name"
                                                onChangeText={text => { this.setState({ cardHolder: text }) }}
                                                value={this.state.cardHolder}
                                                placeholderTextColor={Colors.LIGHT_GRAY}
                                                style={{ flex: 1, fontSize: ms(16, 0.5), paddingHorizontal: s(10), paddingVertical: s(7) }} />
                                        </View>
                                    </View>
                                    <View style={[authStyle.textInputBoxStyle, { paddingVertical: s(7), width: '100%' }]}>
                                        <Text style={[authStyle.labelTextStyle, { color: Colors.BLACKSHADE }]}>Expiry Date</Text>
                                        <View style={[authStyle.loginBodyInnerViewContainer, { marginVertical: s(2) }]}>
                                            <TextInput
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                keyboardType="decimal-pad"
                                                maxLength={7}
                                                placeholder="MM/YYYY"
                                                onChangeText={text => this.handleChange(text)}
                                                value={this.state.expiryDate}
                                                placeholderTextColor={Colors.LIGHT_GRAY}
                                                style={{ flex: 1, fontSize: ms(16, 0.5), paddingHorizontal: s(10), paddingVertical: s(7) }} />
                                        </View>
                                    </View>
                                    <View style={[authStyle.textInputBoxStyle, { paddingVertical: s(7), width: '100%' }]}>
                                        <Text style={[authStyle.labelTextStyle, { color: Colors.BLACKSHADE }]}>CVV</Text>
                                        <View style={[authStyle.loginBodyInnerViewContainer, { marginVertical: s(2) }]}>
                                            <TextInput
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                maxLength={3}
                                                keyboardType="decimal-pad"
                                                onChangeText={text => { this.setState({ cvv: text }) }}
                                                value={this.state.cvv}
                                                placeholder="Enter CVV No."
                                                placeholderTextColor={Colors.LIGHT_GRAY}
                                                style={{ flex: 1, fontSize: ms(16, 0.5), paddingHorizontal: s(10), paddingVertical: s(7) }} />
                                        </View>
                                    </View>


                                </View>
                                {
                                    this.state.addCardLoading
                                        ? <TouchableOpacity style={[scannerStyle.modalinnerView2, { width: '90%', alignSelf: 'center', marginBottom: s(10) }]}>
                                            <ActivityIndicator size="small" color={Colors.WHITE} visible={this.state.addCardLoading} />
                                        </TouchableOpacity>
                                        : <TouchableOpacity onPress={this.onSaveClick.bind(this)} style={[scannerStyle.modalinnerView2, { width: '90%', alignSelf: 'center', marginBottom: s(10) }]}>
                                            <Text style={{ color: Colors.WHITE, fontSize: s(18), fontWeight: 'bold' }}>Save</Text>
                                        </TouchableOpacity>
                                }

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
        auth: state.Auth,
        home: state.Home,
        secret_key: state.Auth.sendOtpSuccess && state.Auth.sendOtpResponce && state.Auth.sendOtpResponce.userToken,
        access_key: state.Auth.testEncryptionSuccess && state.Auth.testEncryptionResponce && state.Auth.testEncryptionResponce.encrypted_value,
        loginSuccess: state.Auth.checkOtpSuccess && state.Auth.checkOtpResponce.Status == 1 && state.Auth.checkOtpResponce.Data.userverificationstatus == 1
    };
}

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(
    mapStateToProps,
    {
        addCardRequest,
        getCardRequest

    })(AddCard);
