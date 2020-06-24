// =======>>>>>>>> LIBRARIES <<<<<<<<=======

import * as React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TextInput, StatusBar, TouchableOpacity, Image, FlatList, Platform, ActivityIndicator } from 'react-native';
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
import ImagePickerModal from '../BecomeSellerModule/Component/ImagePickerModal';
import ImagePicker from 'react-native-image-crop-picker'
import { getProfileDetailRequest, updateProfile } from '../../Redux/Actions'
import dealsStyle from '../DealsModule/dealsStyle';


// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======

class SettingsScreen extends React.Component {
    // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
    INITIALSTATE = {
        fname: '',
        lname: '',
        email: '',
        phone: '',
        profile: null,
        imagepickermodalvisible: false,
        headerShow: true,
        profileLoading: false,
        updateProfileLoading: false,
    }
    state = { ...this.INITIALSTATE }
    // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======

    componentDidMount() {
        console.disableYellowBox = true //warning disable line
        this.setHeader()
        if (this.state.profileLoading) {
            this.setState({ profileLoading: false })
        }

        if (this.props.loginSuccess && this.props.auth.userData.Data) {
            this.setState({
                fname: this.props.auth.userData.Data.firstname !== null ? this.props.auth.userData.Data.firstname : "",
                lname: this.props.auth.userData.Data.lastname !== null ? this.props.auth.userData.Data.lastname : "",
                profile: this.props.auth.userData.Data.Documents.find(data => data.document_type === "Profile") ? {
                    uri: this.props.auth.userData.Data.Documents.find(data => data.document_type === "Profile").document_url,
                    name: this.props.auth.userData.Data.Documents.find(data => data.document_type === "Profile").document_name,
                } : null,
                email: this.props.auth.userData.Data.emailid !== null ? this.props.auth.userData.Data.emailid : '',
                phone: `+${this.props.auth.userData.Data.mobile_number}`,
            })
        }
        if (this.props.loginSuccess) {
            this.requestprofileDetail()
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.loginSuccess) {
            if (this.props.home.getProfileSuccess && this.state.profileLoading && this.props.home.getProfileResponce.Status === 1) {
                setTimeout(() => {
                    this.setState({
                        profileLoading: false,
                        fname: this.props.home.getProfileResponce.Data.userData ? this.props.home.getProfileResponce.Data.userData.firstname : '',
                        lname: this.props.home.getProfileResponce.Data.userData ? this.props.home.getProfileResponce.Data.userData.lastname : '',
                        email: this.props.home.getProfileResponce.Data.userData ? this.props.home.getProfileResponce.Data.userData.emailid : '',
                        phone: this.props.home.getProfileResponce.Data.userData ? `+${this.props.home.getProfileResponce.Data.userData.mobile_number}` : '',
                        profile:
                            this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Profile") ?
                                {
                                    uri: this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Profile").document_url,
                                    name: this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Profile").document_name,
                                } :
                                null
                    })
                }, 1000)
                // }
            } else if (this.props.home.getProfileSuccess && this.state.profileLoading && this.props.home.getProfileResponce.Status !== 1) {
                if (this.props.home !== prevProps.home) {
                    this.setState({ profileLoading: false })
                    alert(this.props.home.getProfileResponce.Message)
                }
            } else if (this.props.home.getProfileSuccess === false) {
                if (this.props.home !== prevProps.home) {
                    this.setState({ profileLoading: false })
                    alert("Something went wrong")
                }
            }
        }


        // updateProfileResponce
        if (this.props.auth.updateProfileSuccess && this.state.updateProfileLoading && this.props.auth.updateProfileResponce.Status == 1) {
            if (this.props.auth !== prevProps.auth) {
                this.setState({ updateProfileLoading: false })
                this.setHeader()
                this.requestprofileDetail()
                alert('updated')
            }
        } else if (this.props.auth.updateProfileSuccess && this.props.auth.updateProfileResponce.Status !== 1 && this.state.updateProfileLoading) {
            if (this.props.auth !== prevProps.auth) {
                this.setState({ updateProfileLoading: false })
                this.setHeader()
                alert(this.props.auth.updateProfileResponce.Message)
            }
        } else if (this.props.auth.updateProfileSuccess === false) {
            if (this.props.auth !== prevProps.auth) {
                this.setState({ updateProfileLoading: false })
                this.setHeader()
                alert("Something went wrong")
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
                            style={homeStyle.touchStyle}>
                            {/* <Image source={ImagesPath.menuIcon} style={homeStyle.drawerMenuIconStyle} /> */}
                        </TouchableOpacity>
                        <View>
                            <Text style={ApplicationStyles.headerTitleStyle}>SETTINGS</Text>
                        </View>
                        {
                            !this.state.updateProfileLoading
                                ? <TouchableOpacity
                                    style={homeStyle.touchStyle}
                                    onPress={() => { this.onRightClick() }} >
                                    <Image source={ImagesPath.rightIcon} style={homeStyle.rightIconStyle} />
                                </TouchableOpacity>
                                : <View style={homeStyle.touchStyle}>
                                    <ActivityIndicator visible={this.state.updateProfileLoading} size={"small"} />
                                </View>
                        }
                    </SafeAreaView>
                );
            },
        })
    }

    requestprofileDetail() {
        if (this.props.loginSuccess) {
            this.setState({ profileLoading: true })
            this.props.getProfileDetailRequest({
                "userid": this.props.auth.userData.Data.userId,
                "access_key": "nousername",
                "secret_key": this.props.token,
                "device_type": Platform.OS === 'android' ? "1" : "0",
                "device_token": ""
            })
        }
    }

    setImagePickerModalVisible() {
        this.setState({ imagepickermodalvisible: !this.state.imagepickermodalvisible });
    }

    closeImagePickerModal() {
        this.setState({ imagepickermodalvisible: false });
    }

    onCamera(cropping, mediaType = 'photo') {
        ImagePicker.openCamera({
            cropping: cropping,
            width: 500,
            height: 500,
            includeExif: true,
            mediaType,
            useFrontCamera: true,
        }).then(image => {
            this.closeImagePickerModal()
            this.setState({
                profile: {
                    uri: image.path,
                    width: image.width,
                    height: image.height,
                    mime: image.mime,
                    name: image.filename == null ? 'IMG1.jpg' : image.filename, data: image.data
                }
            });
        }).catch(e => alert(e));
    }

    onLibrary(cropit, circular = true, mediaType = 'photo') {
        ImagePicker.openPicker({
            width: s(200),
            height: s(200),
            cropping: cropit,
            cropperCircleOverlay: circular,
            cropperStatusBarColor: Colors.APPCOLOR,
            cropperToolbarColor: Colors.APPCOLOR,
            cropperToolbarTitle: '',
            sortOrder: 'none',
            compressImageMaxWidth: 1000,
            includeBase64: true,
            compressImageMaxHeight: 1000,
            compressImageQuality: 1,
            compressVideoPreset: 'MediumQuality',
            includeExif: true,
        }).then(image => {
            this.closeImagePickerModal();
            console.log(image, image.path);
            
            this.setState({
                profile: {
                    uri: image.path,
                    width: image.width,
                    height: image.height,
                    mime: image.mime,
                    name: image.filename == null ? 'IMG1.jpg' : image.filename, data: image.data
                }
            });

        }).catch(e => {
            alert(e.message ? e.message : e);
        });
    }

    onRightClick() {
        if (!this.props.loginSuccess) {
            this.props.navigation.navigate('Login')
        } else if (!this.state.fname) {
            alert('please provide first name')
        } else if (!/^[a-zA-Z]+$/.test(this.state.fname)) {
            alert('please provide valid first name')
        } else if (!this.state.lname) {
            alert('please provide last name')
        } else if (!/^[a-zA-Z]+$/.test(this.state.lname)) {
            alert('please provide valid last name')
        } else if (this.state.email === '') {
            alert('please provide email')
        } else if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email) == false) {
            alert('provide valid email')
        } else if (this.state.phone === '') {
            alert('please provide phone number')
        } else if (isNaN(this.state.phone)) {
            alert('please provide valid number')
        } else {

            let formData = new FormData()
            formData.append("firstname", this.state.fname)
            formData.append("lastname", this.state.lname)
            formData.append("mobile_number", this.state.phone.replace('+', ''))
            formData.append("email", this.state.email)
            formData.append("paymentType", global.Payment ? global.Payment : "")
            formData.append("user_type", this.props.scannerMode === 'buyer' ? 'Buyer' : 'Seller')
            if (this.state.profile !== null) {
                formData.append('userProfile', {
                    uri: this.state.profile['uri'],
                    type: this.state.profile['mime'] ? this.state.profile['mime'] : 'image/jpeg',
                    name: this.state.profile['name']
                });
            } else {
                formData.append('userProfile', "")
            }
            formData.append("access_key", this.props.loginSuccess ? this.props.access_key : "nousername")
            formData.append("secret_key", this.props.loginSuccess ? this.props.secret_key : this.props.token)
            formData.append("device_type", Platform.OS === 'android' ? "1" : "0")
            formData.append("device_token", "")
            formData.append("userid", this.props.loginSuccess ? this.props.auth.checkOtpResponce.Data.userId : "")

            console.log("formData", formData);

            this.setState({ updateProfileLoading: true })
            this.setHeader()
            this.props.updateProfile(formData)
        }
    }

    // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
    render() {
        let loading = this.state.profileLoading
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>

                {
                    loading
                        ?
                        <LoadWheel visible={loading} />
                        :
                        (
                            <View style={{ flex: 1 }}>
                                <KeyboardAwareScrollView
                                    keyboardShouldPersistTaps={'handled'}
                                    enableAutomaticScroll={true}
                                    showsVerticalScrollIndicator={false}
                                    enableOnAndroid={true}
                                    contentContainerStyle={{ flexGrow: 1 }}
                                    style={{ margin: s(15) }}>
                                    <View style={{ height: vs(150), justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                                        {/* <TouchableOpacity onPress={this.setImagePickerModalVisible.bind(this)} style={settingScreenStyle.profileContainerView}>
                            <Image source={this.state.profile ? this.state.profile : ImagesPath.profilePictureIcon} resizeMode="contain" style={{ height: s(100), width: s(100)}} />
                        </TouchableOpacity> */}
                                        <TouchableOpacity style={[dealsStyle.imageViewContainerStyle, { alignSelf: 'center' }]} onPress={this.setImagePickerModalVisible.bind(this)}>
                                            <Image source={this.state.profile ? this.state.profile : ImagesPath.profilePictureIcon} resizeMode="cover" style={[dealsStyle.imageStyle, { height: s(100), width: s(100) }]}  />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ paddingTop: s(10) }}>
                                        <Text style={{ fontSize: s(14), color: Colors.GRAY, padding: s(5) }}>First Name</Text>
                                        <TextInput
                                            autoCorrect={false}
                                            autoCapitalize="none"
                                            placeholderTextColor={Colors.LIGHT_GRAY}
                                            placeholder="Micheal"
                                            value={this.state.fname}
                                            onChangeText={(text) => { this.setState({ fname: text }) }}
                                            style={{ paddingHorizontal: s(7), paddingVertical: s(5), borderBottomWidth: 1, borderColor: Colors.LIGHT_GRAY, fontSize: s(14) }}
                                        />
                                    </View>
                                    <View style={{ backgroundColor: Colors.WHITE, paddingTop: s(10) }}>
                                        <Text style={{ fontSize: s(14), color: Colors.GRAY, padding: s(5) }}>Last Name</Text>
                                        <TextInput
                                            autoCorrect={false}
                                            autoCapitalize="none"
                                            placeholderTextColor={Colors.LIGHT_GRAY}
                                            placeholder="Winsone"
                                            value={this.state.lname}
                                            onChangeText={(text) => { this.setState({ lname: text }) }}
                                            style={{ paddingHorizontal: s(7), paddingVertical: s(5), borderBottomWidth: 1, borderColor: Colors.LIGHT_GRAY, fontSize: s(14) }}
                                        />
                                    </View>
                                    <View style={{ backgroundColor: Colors.WHITE, paddingTop: s(10) }}>
                                        <Text style={{ fontSize: s(14), color: Colors.GRAY, padding: s(5) }}>Mobile No.</Text>
                                        <TextInput
                                            autoCorrect={false}
                                            autoCapitalize="none"
                                            placeholderTextColor={Colors.LIGHT_GRAY}
                                            keyboardType="phone-pad"
                                            value={this.state.phone}
                                            onChangeText={(text) => { this.setState({ phone: text }) }}
                                            placeholder="+1 1334562896"
                                            style={{ paddingHorizontal: s(7), paddingVertical: s(5), borderBottomWidth: 1, borderColor: Colors.LIGHT_GRAY, fontSize: s(14) }}
                                        />
                                    </View>
                                    <View style={{ backgroundColor: Colors.WHITE, paddingTop: s(10) }}>
                                        <Text style={{ fontSize: s(14), color: Colors.GRAY, padding: s(5) }}>Email</Text>
                                        <TextInput
                                            autoCorrect={false}
                                            autoCapitalize="none"
                                            keyboardType="email-address"
                                            placeholderTextColor={Colors.LIGHT_GRAY}
                                            value={this.state.email}
                                            onChangeText={(text) => { this.setState({ email: text }) }}
                                            placeholder="kkr@narola.email"
                                            style={{ paddingHorizontal: s(7), paddingVertical: s(5), borderBottomWidth: 1, borderColor: Colors.LIGHT_GRAY, fontSize: s(14) }}
                                        />
                                    </View>
                                    <View style={{ borderBottomWidth: 1, borderColor: Colors.LIGHT_GRAY }}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('PaymentMethods')} style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: s(5), paddingRight: s(10), paddingVertical: s(20) }}>
                                            <Text style={{ fontSize: s(15), color: Colors.APPCOLOR, }}>Payment Methods</Text>
                                            <Image source={ImagesPath.backIcon} style={{ transform: [{ rotate: '180deg' }], tintColor: Colors.APPCOLOR, height: s(15), width: s(10) }} />
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        this.props.scannerMode === 'buyer'
                                            ? null
                                            : <View style={{ borderBottomWidth: 1, borderColor: Colors.LIGHT_GRAY }}>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangeDocuments')} style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: s(5), paddingRight: s(10), paddingVertical: s(20) }}>
                                                    <Text style={{ fontSize: s(15), color: Colors.APPCOLOR, }}>Change Documents</Text>
                                                    <Image source={ImagesPath.backIcon} style={{ transform: [{ rotate: '180deg' }], tintColor: Colors.APPCOLOR, height: s(15), width: s(10) }} />
                                                </TouchableOpacity>
                                            </View>
                                    }
                                </KeyboardAwareScrollView>
                                <ImagePickerModal
                                    visible={this.state.imagepickermodalvisible}
                                    close={this.closeImagePickerModal.bind(this)}
                                    onCamera={this.onCamera.bind(this)}
                                    onLibrary={this.onLibrary.bind(this)}
                                />
                            </View>
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
        token: state.Common.refreshTokenSuccess && state.Common.refreshTokenResponce && state.Common.refreshTokenResponce.tempToken,
        secret_key: state.Auth.sendOtpSuccess && state.Auth.sendOtpResponce && state.Auth.sendOtpResponce.userToken,
        access_key: state.Auth.testEncryptionSuccess && state.Auth.testEncryptionResponce && state.Auth.testEncryptionResponce.encrypted_value,
        loginSuccess: state.Auth.checkOtpSuccess && state.Auth.checkOtpResponce.Status == 1 && state.Auth.checkOtpResponce.Data.userverificationstatus == 1,
    };
}

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(mapStateToProps,
    {
        getProfileDetailRequest,
        updateProfile
    }
)(SettingsScreen);