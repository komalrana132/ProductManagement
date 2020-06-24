// =======>>>>>>>> LIBRARIES <<<<<<<<=======

import * as React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Image,
    FlatList,
    Platform,
    Clipboard,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import homeStyle from '../HomeModule/homeStyle'
// =======>>>>>>>> ASSETS <<<<<<<<=======
import { Colors, Scale, ImagesPath, LoadWheel, ShineLoader } from '../../CommonConfig';
import { ApplicationStyles } from '../../CommonConfig/ApplicationStyle';
import { s } from 'react-native-size-matters';
import { color } from 'react-native-reanimated';
import inviteStyle from '../InviteModule/inviteScreenStyle';
import { becomeSellerStyles } from '../BecomeSellerModule/becomeSellerStyle';
import scannerStyle from '../ScannerModule/scannerStyle';
import {generateRefralRequest} from '../../Redux/Actions';
import Share from 'react-native-share'


// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======
class RefralScreen extends React.Component {
    // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
    state = {
        credit: 0,
        refralCode: this.props.home.generateRefralSuccess && this.props.home.generateRefralResponce.Status === 1  ? this.props.home.generateRefralResponce.Data.referalCode : "0000",
        generateLoading: false
    }


    // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======
    componentDidMount() {
        console.disableYellowBox = true //warning disable line
        this.setHeader()
    }

    componentDidUpdate(prevProps) {
        if(this.state.generateLoading && this.props.home.generateRefralSuccess && this.props.home.generateRefralResponce.Status === 1){
            if(this.props.home !== prevProps.home){
                this.setState({
                    generateLoading: false,
                    refralCode: this.props.home.generateRefralResponce.Data.referalCode,
                })
            }
        }else if(this.state.generateLoading && this.props.home.generateRefralSuccess && this.props.home.generateRefralResponce.Status !== 1){
            if(this.props.home !== prevProps.home){
                this.setState({generateLoading: false})
                alert(this.props.home.generateRefralResponce.Message)
            }
        }else if(this.state.generateLoading && this.props.home.generateRefralSuccess === false){
            if(this.props.home !== prevProps.home){
                this.setState({generateLoading: false})
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
                            onPress={() => { this.props.navigation.goBack() }}
                            style={homeStyle.touchStyle}
                        >
                            <Image source={ImagesPath.backIcon} style={becomeSellerStyles.backIconStyle} />
                        </TouchableOpacity>
                        <View>
                            <Text style={ApplicationStyles.headerTitleStyle}>REFER A FRIEND</Text>
                        </View>
                        <View
                            style={scannerStyle.touchStyle}>
                        </View>
                    </SafeAreaView>
                );
            },
        })
    }

    onGetCodePress(){
        if(this.props.loginSuccess && this.props.auth.userData.Data){
            let requestParams = {
                "userid": this.props.auth.userData.Data.userId,
                "access_key": this.props.access_key,
                "secret_key": this.props.secret_key,
                "device_type": Platform.OS === 'android' ? "1" : "0",
                "device_token": ""
            }
            this.setState({generateLoading: true})
            this.props.generateRefralRequest(requestParams)
        }else{
            this.props.navigation.navigate('Login')
        }
    }

    // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
                <View style={[inviteStyle.viewStyle, { borderColor: Colors.LIGHT_GRAY, height: '15%', borderTopWidth: 0.4 }]}>
                    <Text style={{ fontSize: s(22), fontWeight: '600', color: Colors.BLACK }}>Current Credit : <Text style={{ color: Colors.APPCOLOR, fontSize: s(24) }}>${this.state.credit}</Text></Text>
                </View>
                <View style={[inviteStyle.viewStyle, { borderColor: Colors.LIGHT_GRAY, flex: 1 }]}>
                    <View style={inviteStyle.view3}>
                        <Image source={ImagesPath.inviteReferIcon} style={{ height: s(150), width: s(200), resizeMode: "cover" }} />
                    </View>
                    <TouchableOpacity onPress={this.onGetCodePress.bind(this)} style={[scannerStyle.modalinnerView2,
                    { justifyContent: 'center', width: '90%', paddingHorizontal: s(5), backgroundColor: Colors.WHITE, borderColor: Colors.APPCOLOR, borderWidth: 1 }]}>
                            {
                                this.state.generateLoading
                                ? <ActivityIndicator visible={this.state.generateLoading}  size="small"/>
                                : <Text style={{ color: Colors.APPCOLOR, fontSize: s(18), fontWeight: '500', paddingHorizontal: s(10) }}>Get Invite Code</Text>
                            }
                    </TouchableOpacity>
                    <View style={[inviteStyle.view3, {marginTop: s(15)}]}>
                        <Text style={{ fontSize: s(26), fontWeight: '700', color: Colors.BLACK }}>{this.state.refralCode[0]}    {this.state.refralCode[1]}   {this.state.refralCode[2]}   {this.state.refralCode[3]}</Text>
                    </View>
                </View>
                <View style={[inviteStyle.viewStyle, { borderColor: Colors.LIGHT_GRAY, height: '25%', borderBottomWidth: 0 }]}>
                    <Text style={inviteStyle.text2}>Share Invite Via</Text>
                    <Text style={[inviteStyle.text1, {fontWeight: '400'}]}>Invite a friend and earn $2</Text>
                    <View style={[inviteStyle.view3, { marginTop: s(18) }]}>
                        <TouchableOpacity onPress={() => {
                            const shareOptions = {
                                title: 'Share via',
                                message: `refral code ${this.state.refralCode}`,
                                url: 'www.email.com',
                                social: Share.Social.EMAIL,
                            };
                            Share.shareSingle(shareOptions);
                        }}>
                            <Image source={ImagesPath.emailIcon} style={{ height: s(31), width: s(31), marginLeft: s(20) }} />
                            </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            const shareOptions = {
                                title: 'Share via',
                                message: `refral code ${this.state.refralCode}`,
                                url: 'www.facebook.com',
                                social: Share.Social.WHATSAPP,
                            };
                            Share.shareSingle(shareOptions);
                        }}>
                            <Image source={ImagesPath.whatsappIcon} style={{ height: s(31), width: s(31), marginLeft: s(20) }} />
                            </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            const shareOptions = {
                                title: 'Share via',
                                message: `refral code ${this.state.refralCode}`,
                                url: 'www.facebook.com',
                                social: Share.Social.FACEBOOK,
                            };
                            Share.shareSingle(shareOptions);
                        }}>
                            <Image source={ImagesPath.facebookIcon} style={{ height: s(31), width: s(31), marginLeft: s(20) }} />
                            </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            const url = 'https://awesome.contents.com/';
                            const title = 'Sharing thorught telegram';
                            const message = 'Please check this out.';
                            const icon = 'data:<data_type>/<file_extension>;base64,<base64_data>';
                            const options = Platform.select({
                              ios: {
                                activityItemSources: [
                                  { // For sharing url with custom title.
                                    placeholderItem: { type: 'url', content: url },
                                    item: {
                                      default: { type: 'url', content: url },
                                    },
                                    subject: {
                                      default: title,
                                    },
                                    linkMetadata: { originalUrl: url, url, title },
                                  },
                                  { // For sharing text.
                                    placeholderItem: { type: 'text', content: message },
                                    item: {
                                      default: { type: 'text', content: message },
                                      message: null, // Specify no text to share via Messages app.
                                    },
                                    linkMetadata: { // For showing app icon on share preview.
                                       title: message
                                    },
                                  },
                                  { // For using custom icon instead of default text icon at share preview when sharing with message.
                                    placeholderItem: {
                                      type: 'url',
                                      content: icon
                                    },
                                    item: {
                                      default: {
                                        type: 'text',
                                        content: `${message} ${url}`
                                      },
                                    },
                                    linkMetadata: {
                                       title: message,
                                       icon: icon
                                    }
                                  },
                                ],
                              },
                              default: {
                                title,
                                subject: title,
                                message: `${message} ${url}`,
                              },
                            });
                            
                            Share.open(options);
                        }}>
                            <Image source={ImagesPath.telegramIcon} style={{ height: s(31), width: s(31), marginLeft: s(20) }} />
                            </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            const shareOptions = {
                                title: 'Share via',
                                message: `refral code ${this.state.refralCode}`,
                                url: 'www.instagram.com',
                                social: Share.Social.INSTAGRAM,
                            };
                            Share.shareSingle(shareOptions);
                        }}>
                            <Image source={ImagesPath.instagramIcon} style={{ height: s(31), width: s(31), marginLeft: s(20) }} />
                            </TouchableOpacity>
                    </View>
                </View>

            </SafeAreaView>
        );
    };
}

// =======>>>>>>>> PROPS CONNECTION <<<<<<<<=======
const mapStateToProps = (state) => {
    return {
        auth: state.Auth,
        home: state.Home,
        scannerMode : state.Common.scannerMode,
        secret_key: state.Auth.sendOtpSuccess && state.Auth.sendOtpResponce && state.Auth.sendOtpResponce.userToken,
        access_key: state.Auth.testEncryptionSuccess && state.Auth.testEncryptionResponce && state.Auth.testEncryptionResponce.encrypted_value,
        loginSuccess: state.Auth.checkOtpSuccess && state.Auth.checkOtpResponce.Status == 1 && state.Auth.checkOtpResponce.Data.userverificationstatus == 1,
    };
}

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(mapStateToProps,
    {
        generateRefralRequest
    }
)(RefralScreen);