// =======>>>>>>>> LIBRARIES <<<<<<<<=======

import * as React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TextInput, StatusBar, TouchableOpacity, Image, ActivityIndicator, } from 'react-native';
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
import ImagePicker from 'react-native-image-crop-picker'
import DocumentPicker from 'react-native-document-picker';
import ImagePickerModal from '../BecomeSellerModule/Component/ImagePickerModal';
import StatementPickerModal from '../BecomeSellerModule/Component/StatementPickerModal';
import {
    updateDocuments,
    getProfileDetailRequest
} from '../../Redux/Actions'


// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======

class ChangeDocuments extends React.Component {
    // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
    state = {
        imagepickermodalvisible: false,
        statementPickerModalvisible: false,
        selfieWithPassport: null,
        statementImage: null,
        statementPDF: null,
        uploadDocsLoading: false,
        getprofileLoading: false,
    }
    // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======

    componentDidMount() {
        console.disableYellowBox = true //warning disable line
        this.setHeader()

        if(this.props.loginSuccess && this.props.sellerVerification){
            if (this.props.home.getProfileSuccess && this.props.home.getProfileResponce.Status === 1) {
                this.setState({
                    selfieWithPassport: {
                        uri: this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Passport").document_url,
                        name: this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Passport").document_name
                    },
                })
                this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Document").document_name.split('.').slice(1).join('') === 'pdf'
                    ? this.setState({statementPDF: {
                        uri: this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Document").document_url,
                        name: this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Document").document_name
                    }, statementImage: null})
                    : this.setState({statementImage: {
                        uri: this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Document").document_url,
                        name: this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Document").document_name
                    }, statementPDF: null})
            } else {
                this.requestprofileDetail()
            }
        }
    }
    componentDidUpdate(prevProps) {
        if(this.props.loginSuccess && this.props.sellerVerification){
            if (this.props.home.getProfileSuccess && this.props.home.getProfileResponce.Status === 1 && this.state.getprofileLoading ) {
                this.setState({getprofileLoading: false})
                if (!this.state.selfieWithPassport && !this.state.statementImage) {
                    this.setState({
                        selfieWithPassport: {
                            uri: this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Passport").document_url,
                            name: this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Passport").document_name
                        },
                    })
                    this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Document").document_name.split('.').slice(1).join('') === 'pdf'
                    ? this.setState({statementPDF: {
                        uri: this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Document").document_url,
                        name: this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Document").document_name
                    }})
                    : this.setState({statementImage: {
                        uri: this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Document").document_url,
                        name: this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Document").document_name
                    }})
                }
            } else if (this.props.home.getProfileSuccess && this.props.home.getProfileResponce.Status !== 1 && this.state.getprofileLoading) {
                this.setState({ getprofileLoading: false })
                setTimeout(() => {
                    alert(this.props.home.getProfileResponce.Message)
                }, 1000)
            } else if (!this.props.home.getProfileSuccess && this.state.getprofileLoading && this.props.home.getProfileResponce) {
                this.setState({ getprofileLoading: false })
                setTimeout(() => {
                    alert("Something went wrong")
                }, 1000)
            }
        }

        // if (this.props.home.getProfileSuccess && this.props.home.getProfileResponce.Status === 1 && this.state.getprofileLoading ) {
        //     this.setState({getprofileLoading: false})
        //     if (!this.state.selfieWithPassport && !this.state.statementImage) {
        //         this.setState({
        //             selfieWithPassport: {
        //                 uri: this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Passport").document_url,
        //                 name: this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Passport").document_name
        //             },
        //         })
        //         this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Document").document_name.split('.').slice(1).join('') === 'pdf'
        //         ? this.setState({statementPDF: {
        //             uri: this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Document").document_url,
        //             name: this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Document").document_name
        //         }})
        //         : this.setState({statementImage: {
        //             uri: this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Document").document_url,
        //             name: this.props.home.getProfileResponce.Data.Documents.find(data => data.document_type === "Document").document_name
        //         }})
        //     }
        // } else if (!this.props.home.getProfileSuccess && this.state.getprofileLoading && this.props.home.getProfileResponce) {
        //     this.setState({ getprofileLoading: false })
        //     setTimeout(() => {
        //         alert("Something went wrong")
        //     }, 1000)
        // }


        if (this.props.home.updateDocSuccess && this.state.uploadDocsLoading && this.props.home.updateDocsResponce.Status === 1) {
            if (this.props.home !== prevProps.home) {
                this.setState({ uploadDocsLoading: false })
                alert(this.props.home.updateDocsResponce.Message)
                this.requestprofileDetail();
            }
        } else if (this.props.home.updateDocSuccess && this.state.uploadDocsLoading && this.props.home.updateDocsResponce.Status !== 1) {
            if (this.props.home !== prevProps.home) {
                this.setState({ uploadDocsLoading: false })
                alert(this.props.home.updateDocsResponce.Message);
            }
        } else if (!this.props.home.updateDocSuccess) {
            if (this.props.home !== prevProps.home) {
                this.setState({ uploadDocsLoading: false })
                alert('Something went wrong')
            }
        }
    }

    // =======>>>>>>>> FUNCTIONS DECLARATION <<<<<<<<=======
    setHeader() {
        this.props.navigation.setOptions({
            header: () => {
                return (
                    <SafeAreaView style={[ApplicationStyles.headerStyle, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',borderColor: Colors.LIGHT_GRAY, borderBottomWidth: s(0.5)  }]}>
                        <TouchableOpacity
                            style={homeStyle.touchStyle}
                            onPress={() => { this.props.navigation.goBack() }}>
                            <Image source={ImagesPath.backIcon} style={becomeSellerStyles.backIconStyle} />
                        </TouchableOpacity>
                        <View>
                            <Text style={ApplicationStyles.headerTitleStyle}>CHANGE DOCUMNETS</Text>
                        </View>
                        <View
                            style={homeStyle.touchStyle}>
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

    requestprofileDetail() {
        if (this.props.loginSuccess && this.props.sellerVerification) {
            this.setState({ getprofileLoading: true })
            this.props.getProfileDetailRequest({
                "userid": this.props.auth.checkOtpResponce.Data.userId,
                "access_key": this.props.access_key,
                "secret_key": this.props.secret_key,
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
    setStatementPickerModalVisible() {
        this.setState({ statementPickerModalvisible: !this.state.statementPickerModalvisible });
    }

    closeStatementPickerModal() {
        this.setState({ statementPickerModalvisible: false });
    }


    onSubmit() {
        if (!this.props.loginSuccess) {
            this.props.navigation.navigate('Login')
        } else if (!this.state.selfieWithPassport) {
            alert('please provide selfie with passport')
        } else if (!this.state.statementImage && this.state.statementPDF === '') {
            alert('please profile pdf or image of Bank statement')
        } else if (!this.props.loginSuccess) {
            this.props.navigation.navigate('Login')
        } else if (this.props.loginSuccess && !this.props.sellerVerification) {
            this.props.navigation.navigate('BecomeSeller')
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
            formData.append("access_key", this.props.access_key)
            formData.append("secret_key", this.props.secret_key)
            formData.append("device_type", Platform.OS === 'android' ? "1" : "0")
            formData.append("device_token", "")

            console.log("formData", formData);

            this.setState({ uploadDocsLoading: true })
            this.props.updateDocuments(formData)
            // alert('done')
            // this.props.navigation.goBack()
        }
    }
    // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
    render() {
        let loading = this.state.getprofileLoading
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
                {
                    loading
                        ?
                        (<View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                            <LoadWheel visible={loading} />
                        </View>)
                        :
                        <View style={{ flex: 1, margin: s(15), alignItems: 'center' }}>
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
                                                    <Image source={this.state.statementPDF ? ImagesPath.pdfIcon : this.state.statementImage ? this.state.statementImage : ImagesPath.editIcon} style={{ height: s(80), width: s(60), alignSelf: 'center' }} />
                                                </View>
                                                <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                                                    <TouchableOpacity onPress={this.setStatementPickerModalVisible.bind(this)} style={{ paddingLeft: s(5) }}>
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
                            {
                                this.state.uploadDocsLoading
                                    ? <TouchableOpacity style={homeStyle.floatingBuyButton} >
                                        <ActivityIndicator size="small" color={Colors.WHITE} visible={this.state.uploadDocsLoading} />
                                    </TouchableOpacity>
                                    : <TouchableOpacity onPress={() => { this.onSubmit() }} style={homeStyle.floatingBuyButton} >
                                        <Text style={[homeStyle.floatingtextStyle, { textAlign: 'center' }]}>Submit</Text>
                                    </TouchableOpacity>
                            }
                        </View>


                }
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
        loginSuccess: state.Auth.checkOtpSuccess && state.Auth.checkOtpResponce.Status == 1 && state.Auth.checkOtpResponce.Data.userverificationstatus == 1,
        sellerVerification: (state.Auth.signUpSuccess && state.Auth.signUpResponce.Status === 1) 
        || (state.Auth.checkOtpSuccess && state.Auth.checkOtpResponce.Status == 1 && state.Auth.checkOtpResponce.Data.userverificationstatus == 1 && state.Auth.checkOtpResponce.Data.documentverificationstatus == 1),
    };
}

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(mapStateToProps,
    {
        updateDocuments,
        getProfileDetailRequest
    }
)(ChangeDocuments);