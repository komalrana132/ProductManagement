// =======>>>>>>>> LIBRARIES <<<<<<<<=======

import * as React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Button,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView,
    TextInput,
    Platform
} from 'react-native';
import { connect } from 'react-redux';

// =======>>>>>>>> ASSETS <<<<<<<<=======
import homeStyle from '../HomeModule/homeStyle'
import { becomeSellerStyles } from './becomeSellerStyle'
import authStyle from '../AuthModule/authStyle';
import scannerStyle from '../ScannerModule/scannerStyle';
import {
    Colors,
    Scale,
    ImagesPath,
    LoadWheel,
    ShineLoader,
    ApplicationStyles,
} from '../../CommonConfig';
import AppHeader from '../../Assets/Components/AppHeader';
import { s, vs } from 'react-native-size-matters';
import ImagePicker from 'react-native-image-crop-picker'
import ImagePickerModal from './Component/ImagePickerModal';
import StatementPickerModal from './Component/StatementPickerModal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    signUpRequest
} from '../../Redux/Actions';

// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======

export class BecomeSellerScreen extends React.Component {
    // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
    state = {
        imagepickermodalvisible: false,
        statementPickerModalvisible: false,
        selfieWithPassport: null,
        statementImage: null,
        statementPDF: null,
        countryModalOpen: false,
        countryCode: '+91',
        cca2: 'IN',
        countryName: "India",
        country: '',
        email: '',
        region: '',
        platNumber: '',
        signUpLoading: false
    }
    // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======

    componentDidMount() {
        console.disableYellowBox = true //warning disable line
        this.setHeader()
       
    }
    componentDidUpdate(prevProps) {
        if (this.state.signUpLoading && this.props.auth.signUpSuccess && this.props.auth.signUpResponce.Status === 1) {
            if (this.props.auth != prevProps.auth) {
                this.setState({ signUpLoading: false })
                this.props.navigation.navigate('Home')
            }
        } else if (this.state.signUpLoading && this.props.auth.signUpSuccess && this.props.auth.signUpResponce.Status !== 1) {
            if (this.props.auth != prevProps.auth) {
                this.setState({ signUpLoading: false })
                alert(this.props.auth.signUpResponce.Message)
            }
        } else if (this.state.signUpLoading && this.props.auth.signUpSuccess === false) {
            if (this.props.auth != prevProps.auth) {
                this.setState({ signUpLoading: false })
                alert("Could not sign you up")
            }
        }
    }

    // =======>>>>>>>> FUNCTIONS DECLARATION <<<<<<<<=======
    setHeader() {
        this.props.navigation.setOptions({
            header: () => {
                return (
                    <SafeAreaView style={[ApplicationStyles.headerStyle, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',borderColor: Colors.LIGHT_GRAY, borderBottomWidth: s(0.5) }]}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.goBack() }}
                            style={homeStyle.touchStyle}
                        >
                            <Image source={ImagesPath.backIcon} style={becomeSellerStyles.backIconStyle} />
                        </TouchableOpacity>
                        <View>
                            <Text style={ApplicationStyles.headerTitleStyle}>BECOME A SHOPIRIDE SELLER</Text>
                        </View>
                        <View
                            style={scannerStyle.touchStyle}>
                        </View>
                    </SafeAreaView>
                );
            },
        })
    }

    onCamera(cropping = false, mediaType = 'photo') {

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
                selfieWithPassport: {
                    uri: image.path,
                    width: image.width,
                    height: image.height,
                    mime: image.mime,
                    name: image.filename == null ? 'IMG1.jpg' : image.filename, data: image.data
                },
            });
        }).catch(e => alert(e));
    }

    onStatementCamera(cropit, circular = true, mediaType = 'photo') {

        ImagePicker.openCamera({
            cropping: cropit,
            width: 500,
            height: 500,
            includeExif: true,
            mediaType,
            useFrontCamera: true,
        }).then(image => {
            this.closeStatementPickerModal()
            if (this.state.statementPDF) {
                this.setState({
                    statementPDF: null
                })
            }
            this.setState({
                statementImage: {
                    uri: image.path,
                    width: image.width,
                    height: image.height,
                    mime: image.mime,
                    name: image.filename == null ? 'IMG1.jpg' : image.filename, data: image.data
                },
            });
        }).catch(e => alert(e));
    }

    async onStatementLibrary() {
        try {
            const pdf = await DocumentPicker.pick({ type: [DocumentPicker.types.pdf] });
            this.state.statementImage && this.setState({ statementImage: null });
            this.setState({
                // statementImage: null, 
                statementPDF: {
                    uri: pdf.uri,
                    mime: pdf.type,
                    name: pdf.name === null ? 'statement.pdf' : pdf.name
                }
            })
            this.closeStatementPickerModal()
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                alert('Canceled');
            } else {
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
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
            compressImageMaxHeight: 1000,
            compressImageQuality: 1,
            compressVideoPreset: 'MediumQuality',
            includeExif: true,
            includeBase64: true,
        }).then(image => {
            this.closeImagePickerModal()
            this.setState({
                selfieWithPassport: {
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

    setImagePickerModalVisible() {
        this.setState({ imagepickermodalvisible: !this.state.imagepickermodalvisible });
    }

    closeImagePickerModal() {
        this.setState({ imagepickermodalvisible: false });
    }
    setStatementPickerModalVisible() {
        this.setState({ statementPickerModalvisible: !this.state.statementPickerModalvisible });
    }

    closeStatementPickerModal() {
        this.setState({ statementPickerModalvisible: false });
    }

    signUpPress() {
        if (!this.props.loginSuccess) {
            this.props.navigation.navigate('Login')
        } else if (this.state.email === '') {
            alert('provide email')
        } else if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email) == false) {
            alert('provide valid email')
        } else if (this.state.countryName == '') {
            alert('please select country name')
        } else if (this.state.region === '') {
            alert('please provide region')
        } else if (!/^[a-zA-Z]+$/.test(this.state.region)) {
            alert('please provide valid region')
        } else if (!this.state.selfieWithPassport) {
            alert('please provide selfie with passport')
        } else if (!this.state.statementImage && this.state.statementPDF === '') {
            alert('please profile pdf or image of Bank statement')
        } else {
            let BankDocument;
            if (this.state.statementImage) {
                BankDocument = this.state.statementImage;
            } else if (this.state.statementPDF) {
                BankDocument = this.state.statementPDF;
                BankDocument['mime'] = 'application/pdf'
            }

            var formData = new FormData();

            formData.append("userid", this.props.auth.checkOtpResponce.Data.userId)
            formData.append("country", this.state.countryName)
            formData.append("region", this.state.region)
            formData.append("emailid", this.state.email.toLowerCase())
            formData.append('selfiPassport', {
                uri: this.state.selfieWithPassport['uri'],
                type: this.state.selfieWithPassport['mime'] ? this.state.selfieWithPassport['mime'] : 'image/jpeg',
                name: this.state.selfieWithPassport['name']
            });
            formData.append('BankDocument', {
                uri: BankDocument['uri'],
                type: BankDocument['mime'] ? BankDocument['mime'] : 'image/jpeg',
                name: BankDocument['name']
            });
            formData.append("platNumber", this.state.platNumber)
            formData.append("access_key", this.props.access_key)
            formData.append("secret_key", this.props.secret_key)
            formData.append("device_type", Platform.OS === 'android' ? "1" : "0")
            formData.append("device_token", " ")

            console.log("formData", formData);

            this.setState({ signUpLoading: true })
            this.props.signUpRequest(formData)
        }
    }

    // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
    render() {
        return (
            <KeyboardAwareScrollView 
            style={becomeSellerStyles.container} 
            showsVerticalScrollIndicator={false}>
                {
                    this.state.signUpLoading
                        ?
                        (<View style={{ flex: 1, backgroundColor: Colors.MODALBACKGROUD, justifyContent: 'center', alignItems: 'center' }}>
                            <LoadWheel visible={this.state.signUpLoading} />
                        </View>)
                        :
                        (<View style={{ flex: 1, alignItems: 'center', paddingBottom: s(10), backgroundColor: Colors.WHITE }}>
                            {/* // =======>>>>>>>> headertext view <<<<<<<<======= */}
                            <View style={{ alignSelf: 'center', justifyContent: 'center', paddingVertical: vs(20) }}>
                                <Text style={becomeSellerStyles.headerlabelStyle}>Please Provide Below Documents</Text>
                            </View>

                            {/* region and country view */}
                            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ paddingTop: s(10), width: '85%' }}>
                                    <Text style={becomeSellerStyles.innerTextStyle}>Email</Text>
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


                                <View style={{ paddingTop: s(10), width: '85%' }}>
                                    <Text style={becomeSellerStyles.innerTextStyle}>Region</Text>
                                    <TextInput
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        placeholderTextColor={Colors.LIGHT_GRAY}
                                        value={this.state.region}
                                        onChangeText={(text) => { this.setState({ region: text }) }}
                                        placeholder="Gujarat"
                                        style={{ paddingHorizontal: s(7), paddingVertical: s(5), borderBottomWidth: 1, borderColor: Colors.LIGHT_GRAY, fontSize: s(14) }}
                                    />
                                </View>
                                <View style={{ paddingTop: s(10), width: '85%' }}>
                                    <Text style={becomeSellerStyles.innerTextStyle}>Plat Number</Text>
                                    <TextInput
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        placeholderTextColor={Colors.LIGHT_GRAY}
                                        value={this.state.platNumber}
                                        onChangeText={(text) => { this.setState({ platNumber: text }) }}
                                        placeholder="GJ 87 SHKDN"
                                        style={{ paddingHorizontal: s(7), paddingVertical: s(5), borderBottomWidth: 1, borderColor: Colors.LIGHT_GRAY, fontSize: s(14) }}
                                    />
                                </View>

                                <View style={{ width: '85%', paddingTop: s(10) }}>
                                    <Text style={becomeSellerStyles.innerTextStyle}>Country</Text>
                                    <TouchableOpacity onPress={() => {  }}
                                        style={{ flexDirection: 'row', paddingTop: s(2), paddingHorizontal: s(15) }}>
                                        <Text style={[becomeSellerStyles.innerTextStyle, { alignSelf: 'center' }]}>{this.state.countryName}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* // =======>>>>>>>> selfie view <<<<<<<<======= */}
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: '85%', marginTop: s(20) }}>
                                <Text style={becomeSellerStyles.innerTextStyle}>Selfie With A PassPort</Text>

                                {
                                    this.state.selfieWithPassport
                                        ?
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={becomeSellerStyles.selfieWithPassportViewStyle}>
                                                <View>
                                                    <Image source={this.state.selfieWithPassport ? this.state.selfieWithPassport : ImagesPath.invite} style={{ height: s(100), width: s(130), alignSelf: 'center' }} />
                                                </View>
                                                <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                                                    <TouchableOpacity onPress={this.setImagePickerModalVisible.bind(this)} style={{ paddingLeft: s(5) }}>
                                                        <Image source={ImagesPath.editIcon} style={{ height: s(23), width: s(23) }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => { this.setState({ selfieWithPassport: null }) }} style={{ paddingLeft: s(5) }}>
                                                        <Image source={ImagesPath.deleteIcon} style={{ height: s(23), width: s(23) }} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        <TouchableOpacity onPress={this.setImagePickerModalVisible.bind(this)} style={[becomeSellerStyles.selfieWithPassportViewStyle, { flexDirection: 'column' }]}>
                                            <Image source={this.state.selfieWithPassport ? this.state.selfieWithPassport : ImagesPath.invite} style={{ height: s(100), width: s(150) }} />
                                        </TouchableOpacity>
                                }
                            </View>

                            {/* // =======>>>>>>>> statement view <<<<<<<<======= */}
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: '85%', marginTop: s(20), }}>
                                <Text style={becomeSellerStyles.innerTextStyle}>Bank Account Statement or Utility Bill</Text>

                                {
                                    this.state.statementPDF || this.state.statementImage
                                        ?
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={[becomeSellerStyles.selfieWithPassportViewStyle, {}]}>
                                                <View>
                                                    <Image source={this.state.statementImage ? this.state.statementImage : this.state.statementPDF ? ImagesPath.pdfIcon : ImagesPath.editIcon} style={{ height: s(80), width: s(60), alignSelf: 'center' }} />
                                                </View>
                                                <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                                                    <TouchableOpacity onPress={() => {}} style={{ paddingLeft: s(5) }}>
                                                        <Image source={ImagesPath.editIcon} style={{ height: s(23), width: s(23) }} />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => { this.setState({ statementImage: null, statementPDF: null }) }} style={{ paddingLeft: s(5) }}>
                                                        <Image source={ImagesPath.deleteIcon} style={{ height: s(23), width: s(23) }} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        <TouchableOpacity onPress={this.setStatementPickerModalVisible.bind(this)} style={[becomeSellerStyles.selfieWithPassportViewStyle, { flexDirection: 'column' }]}>
                                            <Image source=
                                                {this.state.statementImage
                                                    ? this.state.statementImage
                                                    : this.state.statementPDF ? ImagesPath.pdfIcon : ImagesPath.editIcon
                                                } style={{ height: s(70), width: s(70) }} />
                                        </TouchableOpacity>
                                }

                            </View>


                            {/* // =======>>>>>>>> card view <<<<<<<<======= */}
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('AddCardScreen') }} 
                            style={{ justifyContent: 'center', alignItems: 'center', width: '85%', marginTop: s(20), borderWidth: 1, borderColor: Colors.GRAY, borderRadius: 10, padding: s(5) }}>
                                <View style={[becomeSellerStyles.selfieWithPassportViewStyle, { justifyContent: 'space-between' }]}>
                                    <Text style={becomeSellerStyles.innerTextStyle}>Credit/ Debit Card</Text>
                                    <Image source={ImagesPath.backIcon} style={{ transform: [{ rotate: '180deg' }], tintColor: Colors.GRAY, height: s(15), width: s(10) }} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.signUpPress.bind(this)} style={[scannerStyle.modalinnerView2, { width: '90%', alignSelf: 'center' }]}>
                                <Text style={{ color: Colors.WHITE, fontSize: s(18), fontWeight: 'bold' }}>Sign Up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={[authStyle.loginFotterInnerView], { borderBottomColor: Colors.APPCOLOR, borderBottomWidth: 1, marginTop: s(25), marginBottom: s(10) }}>
                                <Text style={{ fontSize: s(16), color: Colors.APPCOLOR, textAlign: 'center' }}>Skip</Text>
                            </TouchableOpacity>
                        </View>
                        )}
                <ImagePickerModal
                    visible={this.state.imagepickermodalvisible}
                    close={this.closeImagePickerModal.bind(this)}
                    onCamera={this.onCamera.bind(this)}
                    onLibrary={this.onLibrary.bind(this)}
                />
                <StatementPickerModal
                    visible={this.state.statementPickerModalvisible}
                    close={this.closeStatementPickerModal.bind(this)}
                    onCamera={this.onStatementCamera.bind(this)}
                    onLibrary={this.onStatementLibrary.bind(this)}
                />
            </KeyboardAwareScrollView>
        );
    };
}

// =======>>>>>>>> PROPS CONNECTION <<<<<<<<=======
const mapStateToProps = (state) => {
    return {
        scannerMode: state.Common.scannerMode,
        auth: state.Auth,
        secret_key: state.Auth.sendOtpSuccess && state.Auth.sendOtpResponce && state.Auth.sendOtpResponce.userToken,
        access_key: state.Auth.testEncryptionSuccess && state.Auth.testEncryptionResponce && state.Auth.testEncryptionResponce.encrypted_value,
        loginSuccess: state.Auth.checkOtpSuccess && state.Auth.checkOtpResponce.Status == 1 && state.Auth.checkOtpResponce.Data.userverificationstatus == 1,
    };
}

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(mapStateToProps,
    { signUpRequest }
)(BecomeSellerScreen);