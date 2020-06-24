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
    Clipboard
} from 'react-native';
import { connect } from 'react-redux';
import homeStyle from '../HomeModule/homeStyle'
// =======>>>>>>>> ASSETS <<<<<<<<=======
import { Colors, Scale, ImagesPath, LoadWheel, ShineLoader } from '../../CommonConfig';
import { ApplicationStyles } from '../../CommonConfig/ApplicationStyle';
import { s } from 'react-native-size-matters';
import inviteStyle from './inviteScreenStyle';
import { color } from 'react-native-reanimated';
import { becomeSellerStyles } from '../BecomeSellerModule/becomeSellerStyle';
import Share from 'react-native-share';

// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======

export class InviteScreen extends React.Component {
    // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
    state = {
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
            header: () => {
                return (
                    <SafeAreaView style={[ApplicationStyles.headerStyle, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.openDrawer() }}
                            style={homeStyle.touchStyle}
                        >
                            <Image source={ImagesPath.menuIcon} style={homeStyle.drawerMenuIconStyle} />
                        </TouchableOpacity>
                        <View>
                            <Text style={[ApplicationStyles.headerTitleStyle, { fontWeight: '700' }]}>INVITE</Text>
                        </View>
                        <View
                            style={scannerStyle.touchStyle}>
                        </View>
                    </SafeAreaView>
                );
            },
        })
    }

    async onCopyPress() {
        Clipboard.setString('AHDBDHDBH%&#')
        let copyString = await Clipboard.getString();
        alert(`You copied \n ${copyString}`)


    }

    // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
                <View style={[inviteStyle.viewStyle, { height: '20%' }]}>
                    <Image source={ImagesPath.invite} style={{ height: s(85), width: s(85) }} />
                </View>
                <View style={[inviteStyle.viewStyle, { height: '30%' }]}>

                    <Text style={inviteStyle.text2}>Invite Friends</Text>
                    <Text style={inviteStyle.text1}>Invite a friend and earn $2</Text>
                    <View style={inviteStyle.view3}>
                        <TouchableOpacity onPress={() => {
                            const shareOptions = {
                                title: 'Share via',
                                url: 'www.gmail.com',
                                message: 'some message',
                                social: Share.Social.EMAIL,
                                filename: 'test', // only for base64 file in Android 
                            };
                            Share.shareSingle(shareOptions)
                                // .then((res) => { console.log(res) })
                                // .catch((err) => { err && console.log(err); });
                        }}>
                            <Image source={ImagesPath.emailIcon} style={{ height: s(29), width: s(29), marginLeft: s(20) }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            const shareOptions = {
                                title: 'Share via',
                                message: 'some message',
                                url: 'www.whatapp.com',
                                social: Share.Social.WHATSAPP,
                                whatsAppNumber: "9199999999",  // country code + phone number
                                filename: 'test' , // only for base64 file in Android 
                            };
                            Share.shareSingle(shareOptions);
                        }}>
                            <Image source={ImagesPath.whatsappIcon} style={{ height: s(29), width: s(29), marginLeft: s(20) }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                             const shareOptions = {
                                title: 'Share via',
                                message: 'some message',
                                url: 'www.facebook.com',
                                social: Share.Social.FACEBOOK,
                                whatsAppNumber: "9199999999",  // country code + phone number
                                filename: 'test' , // only for base64 file in Android 
                            };
                            Share.shareSingle(shareOptions);
                        }}>
                            <Image source={ImagesPath.facebookIcon} style={{ height: s(29), width: s(29), marginLeft: s(20) }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            // const shareOptions = {
                            //     title: 'Share via',
                            //     message: 'some message',
                            //     url: 'some share url',
                            //     social: Share.Social.INSTAGRAM,
                            //     whatsAppNumber: "9199999999",  // country code + phone number
                            //     filename: 'test' , // only for base64 file in Android 
                            // };
                            // Share.shareSingle(shareOptions);
                            alert('share via telegram')
                        }}>
                            <Image source={ImagesPath.telegramIcon} style={{ height: s(29), width: s(29), marginLeft: s(20) }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            const shareOptions = {
                                title: 'Share via',
                                message: 'some message',
                                url: 'www.instagram.com',
                                social: Share.Social.INSTAGRAM,
                            };
                            Share.shareSingle(shareOptions);
                        }}>
                            <Image source={ImagesPath.instagramIcon} style={{ height: s(29), width: s(29), marginLeft: s(20) }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={inviteStyle.text1}>Share Invite Via</Text>
                </View>
                <View style={[inviteStyle.viewStyle, { height: '35%' }]}>
                    <Text style={inviteStyle.text2}>Invite Driver</Text>
                    <Text style={inviteStyle.text1}>Invite a friend and earn $5</Text>
                    <View style={inviteStyle.view3}>
                        <Image source={ImagesPath.scan_inviteIcon} style={{ height: s(70), width: s(70) }} />
                    </View>
                </View>
                <View style={[inviteStyle.viewStyle, { height: '15%', borderBottomWidth: s(0) }]}>
                    <TouchableOpacity onPress={() => this.onCopyPress()} style={inviteStyle.view2}>
                        <View style={{ paddingRight: s(5) }}><Image source={ImagesPath.copyIcon} style={{ height: s(18), width: s(16), tintColor: Colors.WHITE }} /></View>
                        <Text style={[inviteStyle.text2, { color: Colors.WHITE, paddingVertical: s(0) }]}>Copy</Text>
                    </TouchableOpacity>
                </View>

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
    {}
)(InviteScreen);