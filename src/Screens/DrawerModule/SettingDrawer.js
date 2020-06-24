import * as React from 'react';
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, Image, Platform, SafeAreaView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import { ImagesPath, Colors, Scale } from '../../CommonConfig';
import { screenHeight } from '../../CommonConfig/HelperFunctions/functions';
import { CommonActions } from '@react-navigation/native';
import { s, vs } from 'react-native-size-matters';
import { resetAuthRequest } from '../../Redux/Actions'
import dealsStyle from '../DealsModule/dealsStyle';
import settingScreenStyle from '../SettingsModule/settingScreenStyle';

class SettingDrawer extends React.Component {
    state = { profile: '', fname: '', lname: '' }
    componentDidMount() {
        console.disableYellowBox = true
        if (this.props.loginSuccess && this.props.auth.userData.Data) {
            this.setState({
                fname: this.props.auth.userData.Data.firstname !== null ? this.props.auth.userData.Data.firstname : "user",
                lname: this.props.auth.userData.Data.lastname !== null ? this.props.auth.userData.Data.lastname : "",
                profile: this.props.auth.userData.Data.Documents.find(data => data.document_type === "Profile") ? {
                    uri: this.props.auth.userData.Data.Documents.find(data => data.document_type === "Profile").document_url,
                    name: this.props.auth.userData.Data.Documents.find(data => data.document_type === "Profile").document_name,
                } : ImagesPath.profilePictureIcon
            })
        }

    }
    componentDidUpdate(prevProps) {
        if (this.props.loginSuccess && this.props.auth.userData.Data) {
            if (this.props.auth !== prevProps.auth) {
                this.setState({
                    fname: this.props.auth.userData.Data.firstname ? this.props.auth.userData.Data.firstname : "user",
                    lname: this.props.auth.userData.Data.lastname ? this.props.auth.userData.Data.lastname : "",
                    profile: this.props.auth.userData.Data.Documents.find(data => data.document_type === "Profile") ? {
                        uri: this.props.auth.userData.Data.Documents.find(data => data.document_type === "Profile").document_url,
                        name: this.props.auth.userData.Data.Documents.find(data => data.document_type === "Profile").document_name,
                    } : ImagesPath.profilePictureIcon
                })
            }
        }
    }

    logOut() {
        this.props.navigation.closeDrawer()
        alert("Are You Sure You Want to logout?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    }


    capital_letter(s) {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    render() {
        const { progress, ...rest } = this.props;
        const translateX = Animated.interpolate(progress, {
            inputRange: [0, 1],
            outputRange: [-100, 0],
        });
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => rest.navigation.navigate('Home')}
                    style={{ width: '100%', backgroundColor: Colors.APPCOLOR, height: vs(200), justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={this.state.profile ? this.state.profile : ImagesPath.profilePictureIcon} resizeMode="cover" style={[dealsStyle.imageStyle, { marginTop: s(25), height: s(80), width: s(80) }]} />
                    <Text style={{ fontSize: s(18), padding: s(10), color: Colors.WHITE, fontWeight: 'bold', width: s(200), textAlign: 'center', alignContent: 'center' }} numberOfLines={1}>{this.capital_letter(this.state.fname)} {this.capital_letter(this.state.lname)}</Text>
                </TouchableOpacity>
                <DrawerContentScrollView {...rest} showsVerticalScrollIndicator={false}>
                    <Animated.View style={{ transform: [{ translateX }], backgroundColor: Colors.WHITE, marginTop: s(0) }}>
                        {/* <DrawerItemList {...rest} /> */}
                        {/* <DrawerItem label="Help" onPress={() => alert('Link to help')} /> */}
                        <TouchableOpacity onPress={() => rest.navigation.navigate('Invite')} style={{ flexDirection: 'row', paddingLeft: s(25), alignItems: 'center', borderBottomWidth: 0.5, borderColor: Colors.LIGHT_GRAY, paddingVertical: Platform.OS === 'android' ? s(15) : s(15), paddingBottom: s(15) }}>
                            <Image source={ImagesPath.inviteIcon} style={{ height: s(20), width: s(18), resizeMode: 'cover', tintColor: Colors.APPCOLOR }} />
                            <Text includeFontPadding={false} style={{ fontSize: s(15), paddingHorizontal: s(10), color: 'rgb(47,47,47)', fontWeight: 'bold' }}>Invite</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => rest.navigation.navigate('Home')} style={{ flexDirection: 'row', paddingLeft: s(25), alignItems: 'center', borderBottomWidth: 0.5, borderColor: Colors.LIGHT_GRAY, paddingVertical: s(15) }}>
                            <Image source={ImagesPath.HomeIcon} style={{ height: s(17), width: s(17), resizeMode: 'cover', tintColor: Colors.APPCOLOR }} />
                            <Text style={{ fontSize: s(15), paddingHorizontal: s(10), color: 'rgb(47,47,47)', fontWeight: 'bold' }}>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => rest.navigation.navigate('BecomeSeller')} style={{ flexDirection: 'row', paddingLeft: s(25), alignItems: 'center', borderBottomWidth: 0.5, borderColor: Colors.LIGHT_GRAY, paddingVertical: s(15) }}>
                            <Image source={ImagesPath.sellerIcon} style={{ height: s(16), width: s(18), resizeMode: 'cover', tintColor: Colors.APPCOLOR }} />
                            <Text style={{ fontSize: s(15), paddingHorizontal: s(10), color: 'rgb(47,47,47)', fontWeight: 'bold' }}>Become a Seller</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => rest.navigation.navigate('Deals')} style={{ flexDirection: 'row', paddingLeft: s(25), alignItems: 'center', borderBottomWidth: 0.5, borderColor: Colors.LIGHT_GRAY, paddingVertical: s(12) }}>
                            <Image source={ImagesPath.dealsIcon} style={{ height: s(14), width: s(19), resizeMode: 'cover', tintColor: Colors.APPCOLOR }} />
                            <Text style={{ fontSize: s(15), paddingHorizontal: s(10), color: 'rgb(47,47,47)', fontWeight: 'bold' }}>Deals</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => rest.navigation.navigate('Settings')} style={{ flexDirection: 'row', paddingLeft: s(25), alignItems: 'center', borderBottomWidth: 0.5, borderColor: Colors.LIGHT_GRAY, paddingVertical: s(15) }}>
                            <Image source={ImagesPath.settingIcon} style={{ height: s(17), width: s(17), resizeMode: 'cover', tintColor: Colors.APPCOLOR }} />
                            <Text style={{ fontSize: s(15), paddingHorizontal: s(10), color: 'rgb(47,47,47)', fontWeight: 'bold' }}>Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => rest.navigation.navigate('Contactus')} style={{ flexDirection: 'row', paddingLeft: s(25), alignItems: 'center', borderBottomWidth: 0.5, borderColor: Colors.LIGHT_GRAY, paddingVertical: s(15) }}>
                            <Image source={ImagesPath.contactUsIcon} style={{ height: s(19), width: s(15), resizeMode: 'cover', tintColor: Colors.APPCOLOR }} />
                            <Text style={{ fontSize: s(15), paddingHorizontal: s(10), color: 'rgb(47,47,47)', fontWeight: 'bold' }}>Contact Us</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => rest.navigation.navigate('ReferFriend')}
                            style={{ flexDirection: 'row', paddingLeft: s(25), paddingVertical: s(15), borderBottomWidth: 0.5, borderColor: Colors.LIGHT_GRAY, marginTop: s(35) }}>
                            <Image source={ImagesPath.refer_friendIcon} style={{ height: s(18), width: s(18), resizeMode: 'cover' }} />
                            <Text style={{ fontSize: s(15), paddingHorizontal: s(10), color: 'rgb(47,47,47)', fontWeight: 'bold' }}>Refer A Friend</Text>
                        </TouchableOpacity>
                        {
                            this.props.loginSuccess
                                ? <TouchableOpacity
                                    onPress={async () => {
                                        this.props.navigation.closeDrawer()
                                        Alert.alert(
                                            'Are you Sure You want to Logout?',
                                            '',
                                            [
                                              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                              {text: 'YES', onPress: async () => {
                                                await this.props.resetAuthRequest()
                                                rest.navigation.dispatch(
                                                    CommonActions.reset({
                                                        index: 0,
                                                        routes: [
                                                            { name: 'Scanner' }
                                                        ],
                                                    })
                                                )
                                            }},
                                            ],
                                            { cancelable: true }
                                          )
                                        
                                    }}
                                    style={{ flexDirection: 'row', paddingLeft: s(25), alignItems: 'center', borderBottomWidth: 0.5, borderColor: Colors.LIGHT_GRAY, paddingVertical: s(15) }}>
                                    <Image source={ImagesPath.logout} style={{ height: s(18), width: s(20), resizeMode: 'cover', tintColor: Colors.APPCOLOR }} />
                                    <Text style={{ fontSize: s(15), paddingHorizontal: s(10), color: 'rgb(47,47,47)', fontWeight: 'bold' }}>Logout</Text>
                                </TouchableOpacity>
                                : <TouchableOpacity
                                    onPress={() => rest.navigation.navigate('Login')}
                                    style={{ flexDirection: 'row', paddingLeft: s(25), alignItems: 'center', borderBottomWidth: 0.5, borderColor: Colors.LIGHT_GRAY, paddingVertical: s(15) }}>
                                    <Image source={ImagesPath.logout} style={{ height: s(18), width: s(20), resizeMode: 'cover', tintColor: Colors.APPCOLOR }} />
                                    <Text style={{ fontSize: s(15), paddingHorizontal: s(10), color: 'rgb(47,47,47)', fontWeight: 'bold' }}>Login</Text>
                                </TouchableOpacity>
                        }



                    </Animated.View>
                </DrawerContentScrollView>
            </View>

        );
    }
}
// =======>>>>>>>> PROPS CONNECTION <<<<<<<<=======
const mapStateToProps = (state) => {
    return {
        scannerMode: state.Common.scannerMode,
        auth: state.Auth,
        home: state.Home,
        loginSuccess: state.Auth.checkOtpSuccess && state.Auth.checkOtpResponce.Status == 1 && state.Auth.checkOtpResponce.Data.userverificationstatus == 1,
    };
}

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(mapStateToProps,
    { resetAuthRequest }
)(SettingDrawer);
