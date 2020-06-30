// =======>>>>>>>> LIBRARIES <<<<<<<<=======

import * as React from 'react';
import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Text,
   TextInput,
   StatusBar,
   TouchableOpacity,
   Image,
   FlatList,
   Platform,
   ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';

// =======>>>>>>>> ASSETS <<<<<<<<=======
import {
   Colors,
   Scale,
   ImagesPath,
   LoadWheel,
   ShineLoader,
   Sizes,
} from '../../CommonConfig';
import {ApplicationStyles} from '../../CommonConfig/ApplicationStyle';``
import {
   screenHeight,
   screenWidth,
} from '../../CommonConfig/HelperFunctions/functions';
import homeStyle from '../HomeModule/homeStyle';
import AppHeader from '../../Assets/Components/AppHeader';
import IconMD from 'react-native-vector-icons/MaterialIcons';
import {s, vs} from 'react-native-size-matters';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import settingScreenStyle from './settingScreenStyle';
import ImagePicker from 'react-native-image-crop-picker';
import {getProfileDetailRequest, updateProfile} from '../../Redux/Actions';
import authStyle from '../AuthModule/authStyle';
import TextComponent from '../Components/Text';
import Button from '../Components/Button';
import PickImageModel from '../Components/PickImageModel';
import _ from 'lodash';

// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======

class SettingsScreen extends React.Component {
   // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
   INITIALSTATE = {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      profile: '',
      imagepickermodalvisible: false,
      headerShow: true,
      errors: [],
      profileLoading: false,
      updateProfileLoading: false,
   };
   state = {...this.INITIALSTATE};
   // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======

   componentDidMount() {
      console.disableYellowBox = true; //warning disable line
      this.setHeader();
      if (this.props.userData) {
         const {
            firstname,
            lastname,
            email,
            contact,
            gender,
            profile_image_name,
            profile_url,
         } = this.props.userData;

         this.setState({
            firstname: firstname,
            email: email,
            lastname: lastname,
            profile: {uri: profile_url, type: 'image/jpeg'},
            phone: contact,
            gender: gender,
         });
      }
   }

   componentDidUpdate(prevProps) {
      if (this.props.loginSuccess) {
         if (
            this.props.home.getProfileSuccess &&
            this.state.profileLoading &&
            this.props.home.getProfileResponce.Status === 1
         ) {
            setTimeout(() => {
               this.setState({
                  profileLoading: false,
                  fname: this.props.home.getProfileResponce.Data.userData
                     ? this.props.home.getProfileResponce.Data.userData
                          .firstname
                     : '',
                  lname: this.props.home.getProfileResponce.Data.userData
                     ? this.props.home.getProfileResponce.Data.userData.lastname
                     : '',
                  email: this.props.home.getProfileResponce.Data.userData
                     ? this.props.home.getProfileResponce.Data.userData.emailid
                     : '',
                  phone: this.props.home.getProfileResponce.Data.userData
                     ? `+${this.props.home.getProfileResponce.Data.userData.mobile_number}`
                     : '',
                  profile: this.props.home.getProfileResponce.Data.Documents.find(
                     (data) => data.document_type === 'Profile',
                  )
                     ? {
                          uri: this.props.home.getProfileResponce.Data.Documents.find(
                             (data) => data.document_type === 'Profile',
                          ).document_url,
                          name: this.props.home.getProfileResponce.Data.Documents.find(
                             (data) => data.document_type === 'Profile',
                          ).document_name,
                       }
                     : null,
               });
            }, 1000);
            // }
         } else if (
            this.props.home.getProfileSuccess &&
            this.state.profileLoading &&
            this.props.home.getProfileResponce.Status !== 1
         ) {
            if (this.props.home !== prevProps.home) {
               this.setState({profileLoading: false});
               alert(this.props.home.getProfileResponce.Message);
            }
         } else if (this.props.home.getProfileSuccess === false) {
            if (this.props.home !== prevProps.home) {
               this.setState({profileLoading: false});
               alert('Something went wrong');
            }
         }
      }

      // updateProfileResponce
      if (
         this.props.auth.updateProfileSuccess &&
         this.state.updateProfileLoading &&
         this.props.auth.updateProfileResponce.Status == 1
      ) {
         if (this.props.auth !== prevProps.auth) {
            this.setState({updateProfileLoading: false});
            this.setHeader();
            this.requestprofileDetail();
            alert('updated');
         }
      } else if (
         this.props.auth.updateProfileSuccess &&
         this.props.auth.updateProfileResponce.Status !== 1 &&
         this.state.updateProfileLoading
      ) {
         if (this.props.auth !== prevProps.auth) {
            this.setState({updateProfileLoading: false});
            this.setHeader();
            alert(this.props.auth.updateProfileResponce.Message);
         }
      } else if (this.props.auth.updateProfileSuccess === false) {
         if (this.props.auth !== prevProps.auth) {
            this.setState({updateProfileLoading: false});
            this.setHeader();
            alert('Something went wrong');
         }
      }
   }

   removeError(key) {
      this.state.errors.splice(this.state.errors.indexOf(key), 1);
   }

   setImagePickerModalVisible() {
      this.setState({
         imagepickermodalvisible: !this.state.imagepickermodalvisible,
      });
   }

   closeImagePickerModal() {
      this.setState({imagepickermodalvisible: false});
   }

   onCamera(cropping, mediaType = 'photo') {
      ImagePicker.openCamera({
         cropping: cropping,
         width: 500,
         height: 500,
         includeExif: true,
         mediaType,
         useFrontCamera: true,
      })
         .then((image) => {
            this.closeImagePickerModal();
            this.setState({
               profile: {
                  uri: image.path,
                  width: image.width,
                  height: image.height,
                  mime: image.mime,
                  name: image.filename == null ? 'IMG1.jpg' : image.filename,
                  data: image.data,
               },
            });
         })
         .catch((e) => alert(e));
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
      })
         .then((image) => {
            this.closeImagePickerModal();
            console.log(image, image.path);

            this.setState({
               profile: {
                  uri: image.path,
                  width: image.width,
                  height: image.height,
                  mime: image.mime,
                  name: image.filename == null ? 'IMG1.jpg' : image.filename,
                  data: image.data,
               },
            });
         })
         .catch((e) => {
            alert(e.message ? e.message : e);
         });
   }

   // =======>>>>>>>> FUNCTIONS DECLARATION <<<<<<<<=======
   setHeader() {
      this.props.navigation.setOptions({
         header: () => {
            return (
               <SafeAreaView
                  style={[
                     ApplicationStyles.headerStyle,
                     {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                     },
                  ]}>
                  <View style={homeStyle.touchStyle}>
                  </View>
                  <View>
                     <Text style={ApplicationStyles.headerTitleStyle}>
                        SETTINGS
                     </Text>
                  </View>
                     <View
                        style={homeStyle.touchStyle}>
                     </View>
               </SafeAreaView>
            );
         },
      });
   }

   requestprofileDetail() {
      if (this.props.loginSuccess) {
         this.setState({profileLoading: true});
         this.props.getProfileDetailRequest({
            userid: this.props.auth.userData.Data.userId,
            access_key: 'nousername',
            secret_key: this.props.token,
            device_type: Platform.OS === 'android' ? '1' : '0',
            device_token: '',
         });
      }
   }

   onUpdateProfile() {
       this.setState({errors: []})
      if (this.state.firstname == '') {
        this.setState({errors: _.uniq([...this.state.errors, 'firstname'])});
      }else if (this.state.email == '') {
        this.setState({errors: _.uniq([...this.state.errors, 'email'])});
      } else if (!/^[a-zA-Z]+$/.test(this.state.firstname)) {
        this.setState({errors: _.uniq([...this.state.errors, 'firstname'])});
      } else if (this.state.lastname && !/^[a-zA-Z]+$/.test(this.state.lastname)) {
        this.setState({errors: _.uniq([...this.state.errors, 'lastname'])});
      }else if (this.state.email === '') {
        this.setState({errors: _.uniq([...this.state.errors, 'email'])});
      } else if (
         /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            this.state.email,
         ) == false
      ) {
        this.setState({errors: _.uniq([...this.state.errors, 'email'])});
      } else if (this.state.phone && isNaN(this.state.phone)) {
        this.setState({errors: _.uniq([...this.state.errors, 'phone'])});
      }else {
        //  let formData = new FormData();
        //  formData.append('firstname', this.state.fname);
        //  formData.append('lastname', this.state.lname);
        //  formData.append('mobile_number', this.state.phone.replace('+', ''));
        //  formData.append('email', this.state.email);
        //  formData.append('paymentType', global.Payment ? global.Payment : '');
        //  formData.append(
        //     'user_type',
        //     this.props.scannerMode === 'buyer' ? 'Buyer' : 'Seller',
        //  );
        //  if (this.state.profile !== null) {
        //     formData.append('userProfile', {
        //        uri: this.state.profile['uri'],
        //        type: this.state.profile['mime']
        //           ? this.state.profile['mime']
        //           : 'image/jpeg',
        //        name: this.state.profile['name'],
        //     });
        //  } else {
        //     formData.append('userProfile', '');
        //  }
        //  formData.append(
        //     'access_key',
        //     this.props.loginSuccess ? this.props.access_key : 'nousername',
        //  );
        //  formData.append(
        //     'secret_key',
        //     this.props.loginSuccess ? this.props.secret_key : this.props.token,
        //  );
        //  formData.append('device_type', Platform.OS === 'android' ? '1' : '0');
        //  formData.append('device_token', '');
        //  formData.append(
        //     'userid',
        //     this.props.loginSuccess
        //        ? this.props.auth.checkOtpResponce.Data.userId
        //        : '',
        //  );

        //  console.log('formData', formData);

        //  this.setState({updateProfileLoading: true});
        //  this.setHeader();
        //  this.props.updateProfile(formData);
      }
   }

   // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
   render() {
      let loading = this.state.profileLoading;
      return (
         <SafeAreaView style={{flex: 1, backgroundColor: Colors.WHITE}}>
            {loading ? (
               <LoadWheel visible={loading} />
            ) : (
               <View style={{flex: 1}}>
                  <KeyboardAwareScrollView
                     keyboardShouldPersistTaps={'handled'}
                     enableAutomaticScroll={true}
                     showsVerticalScrollIndicator={false}
                     enableOnAndroid={true}
                     contentContainerStyle={{flexGrow: 1}}
                     style={{margin: s(15)}}>
                     <View style={authStyle.textInputBoxStyle}>
                        <View style={authStyle.textInputBoxStyle}>
                           <View>
                              <TouchableOpacity
                                 style={[
                                    authStyle.profileIconStyle,
                                    {alignSelf: 'center'},
                                 ]}
                                 onPress={this.setImagePickerModalVisible.bind(
                                    this,
                                 )}>
                                    <Image
                                       source={
                                          this.state.profile
                                             ? this.state.profile
                                             : ImagesPath.profilePictureIcon
                                       }
                                       resizeMode="cover"
                                       style={[
                                          authStyle.imageStyle,
                                          {height: s(100), width: s(100)},
                                       ]}
                                    />
                              </TouchableOpacity>
                           </View>
                        </View>
                        <View style={authStyle.textInputBoxStyle}>
                           <TextComponent
                              style={{
                                 color: this.state.emailFocus
                                    ? Colors.black
                                    : Colors.gray2,
                              }}>
                              Email
                           </TextComponent>
                           <View
                              style={[
                                 authStyle.loginBodyInnerViewContainer,
                                 {
                                    borderBottomColor: this.state.emailFocus
                                       ? Colors.black
                                       : null,
                                 },
                              ]}>
                              <TextInput
                                 autoCapitalize="none"
                                 autoCorrect={false}
                                 textContentType="emailAddress"
                                 keyboardType="email-address"
                                 onFocus={() => {
                                    this.setState({emailFocus: true});
                                    this.removeError('email');
                                 }}
                                 onBlur={() => {
                                    this.setState({emailFocus: false});
                                 }}
                                 value={this.state.email}
                                 onChangeText={(text) => {
                                    this.setState({email: text});
                                 }}
                                 placeholder="Enter Email Address"
                                 placeholderTextColor={
                                    this.state.emailFocus
                                       ? Colors.gray
                                       : Colors.LIGHT_GRAY
                                 }
                                 style={{
                                    flex: 1,
                                    fontSize: Sizes.smallFont,
                                    // color: Colors.BLACK,
                                    paddingVertical:
                                       Platform.OS === 'ios' ? s(5) : s(0),
                                 }}
                              />
                              {this.state.errors.includes('email') && (
                                 <TextComponent accent>
                                    Provide Valid email
                                 </TextComponent>
                              )}
                           </View>
                        </View>
                        <View style={authStyle.textInputBoxStyle}>
                           <TextComponent
                              style={{
                                 color: this.state.firstnameFocus
                                    ? Colors.black
                                    : Colors.gray2,
                              }}>
                              First Name
                           </TextComponent>
                           <View
                              style={[
                                 authStyle.loginBodyInnerViewContainer,
                                 {
                                    borderBottomColor: this.state.passwordFocus
                                       ? Colors.black
                                       : null,
                                 },
                              ]}>
                              <TextInput
                                 autoCapitalize="none"
                                 value={this.state.firstname}
                                 onFocus={() => {
                                    this.setState({firstnameFocus: true});
                                    this.removeError('firstname');
                                 }}
                                 onBlur={() => {
                                    this.setState({firstnameFocus: false});
                                 }}
                                 onChangeText={(text) => {
                                    this.setState({firstname: text});
                                 }}
                                 autoCorrect={false}
                                 placeholder="Enter firstname"
                                 placeholderTextColor={
                                    this.state.firstnameFocus
                                       ? Colors.gray
                                       : Colors.LIGHT_GRAY
                                 }
                                 style={{
                                    flex: 1,
                                    fontSize: Sizes.smallFont,
                                    color: Colors.black,
                                    paddingVertical: s(0),
                                 }}
                              />
                              {this.state.errors.includes('firstname') && (
                                 <TextComponent accent>
                                    Provide Valid firstname
                                 </TextComponent>
                              )}
                           </View>
                        </View>

                        <View style={authStyle.textInputBoxStyle}>
                           <TextComponent
                              style={{
                                 color: this.state.lastnameFocus
                                    ? Colors.black
                                    : Colors.gray2,
                              }}>
                              Last Name
                           </TextComponent>
                           <View
                              style={[
                                 authStyle.loginBodyInnerViewContainer,
                                 {
                                    borderBottomColor: this.state.lastnameFocus
                                       ? Colors.black
                                       : null,
                                 },
                              ]}>
                              <TextInput
                                 autoCapitalize="none"
                                 value={this.state.lastname}
                                 onFocus={() => {
                                    this.setState({lastnameFocus: true});
                                    this.removeError('lastname');
                                 }}
                                 onBlur={() => {
                                    this.setState({lastnameFocus: false});
                                 }}
                                 onChangeText={(text) => {
                                    this.setState({lastname: text});
                                 }}
                                 autoCorrect={false}
                                 placeholder="Enter lastname"
                                 placeholderTextColor={
                                    this.state.lastnameFocus
                                       ? Colors.gray
                                       : Colors.LIGHT_GRAY
                                 }
                                 style={{
                                    flex: 1,
                                    fontSize: Sizes.smallFont,
                                    color: Colors.black,
                                    paddingVertical: s(0),
                                 }}
                              />
                              {this.state.errors.includes('lastname') && (
                                 <TextComponent accent>
                                    Provide Valid lastname
                                 </TextComponent>
                              )}
                           </View>
                        </View>

                        <View style={authStyle.textInputBoxStyle}>
                           <TextComponent
                              style={{
                                 color: this.state.phoneFocus
                                    ? Colors.black
                                    : Colors.gray2,
                              }}>
                              Phone
                           </TextComponent>
                           <View
                              style={[
                                 authStyle.loginBodyInnerViewContainer,
                                 {
                                    borderBottomColor: this.state.phoneFocus
                                       ? Colors.black
                                       : null,
                                 },
                              ]}>
                              <TextInput
                                 autoCapitalize="none"
                                 value={this.state.phone}
                                 onFocus={() => {
                                    this.setState({phoneFocus: true});
                                    this.removeError('phone')

                                 }}
                                 onBlur={() => {
                                    this.setState({phoneFocus: false});
                                 }}
                                 onChangeText={(text) => {
                                    this.setState({phone: text});
                                 }}
                                 autoCorrect={false}
                                 maxLength={16}
                                 placeholder="Enter phone"
                                 placeholderTextColor={
                                    this.state.phone
                                       ? Colors.gray
                                       : Colors.LIGHT_GRAY
                                 }
                                 style={{
                                    flex: 1,
                                    fontSize: Sizes.smallFont,
                                    color: Colors.black,
                                    paddingVertical: s(0),
                                 }}
                                 
                              />
                              {this.state.errors.includes('phone') && (
                                 <TextComponent accent>
                                    Provide Valid phone 
                                 </TextComponent>
                              )}
                           </View>
                        </View>

                        <View style={authStyle.textInputBoxStyle}>
                           <TextComponent
                              style={{
                                 color: this.state.genderFocus
                                    ? Colors.black
                                    : Colors.gray2,
                              }}>
                              Gender
                           </TextComponent>
                           {/* radio button */}
                           <View
                              style={{
                                 flexDirection: 'row',
                                 alignItems: 'center',
                              }}>
                              <Button
                                 onPress={() => {
                                    this.setState({
                                       gender: 'female',
                                       genderFocus: true,
                                    });
                                 }}
                                 style={{
                                    margin: s(5),
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                 }}>
                                 <Image
                                    source={
                                       this.state.gender === 'female'
                                          ? ImagesPath.checkedIcon
                                          : ImagesPath.uncheckedIcon
                                    }
                                    style={{
                                       height: s(12),
                                       width: s(12),
                                       justifyContent: 'center',
                                       tintColor: Colors.gray2,
                                    }}
                                 />
                                 <TextComponent
                                    gray2
                                    style={{
                                       fontSize: Sizes.smallFont,
                                       padding: s(3),
                                    }}>
                                    female
                                 </TextComponent>
                              </Button>
                              <Button
                                 onPress={() => {
                                    this.setState({
                                       gender: 'male',
                                       genderFocus: true,
                                    });
                                 }}
                                 style={{
                                    margin: s(5),
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                 }}>
                                 <Image
                                    source={
                                       this.state.gender === 'male'
                                          ? ImagesPath.checkedIcon
                                          : ImagesPath.uncheckedIcon
                                    }
                                    style={{
                                       height: s(12),
                                       width: s(12),
                                       justifyContent: 'center',
                                       tintColor: Colors.gray2,
                                    }}
                                 />
                                 <TextComponent
                                    gray2
                                    style={{
                                       fontSize: Sizes.smallFont,
                                       padding: s(3),
                                    }}>
                                    male
                                 </TextComponent>
                              </Button>
                           </View>

                           <View
                              style={[
                                 authStyle.loginBodyInnerViewContainer,
                                 {
                                    borderBottomColor: this.state.genderFocus
                                       ? Colors.black
                                       : null,
                                 },
                              ]}>
                              <TextComponent
                                 gray2
                                 style={{
                                    fontSize: Sizes.smallFont,
                                    color: this.state.genderFocus
                                       ? Colors.gray
                                       : Colors.LIGHT_GRAY,
                                    padding: s(3),
                                 }}>
                                 other:
                              </TextComponent>
                              <TextInput
                                 autoCapitalize="none"
                                 autoCorrect={false}
                                 keyboardType="default"
                                 onFocus={() => {
                                    this.setState({genderFocus: true});
                                 }}
                                 onBlur={() => {
                                    this.setState({genderFocus: false});
                                 }}
                                 value={this.state.gender}
                                 onChangeText={(text) => {
                                    this.setState({gender: text});
                                 }}
                                 placeholder="Enter gender"
                                 placeholderTextColor={
                                    this.state.genderFocus
                                       ? Colors.gray
                                       : Colors.LIGHT_GRAY
                                 }
                                 style={{
                                    flex: 1,
                                    fontSize: Sizes.smallFont,
                                    color: Colors.BLACK,
                                    paddingVertical: s(0),
                                 }}
                              />
                              {this.state.errors.includes('gender') && (
                                 <TextComponent accent>
                                    Provide Valid gender
                                 </TextComponent>
                              )}
                           </View>
                        </View>
                        <View style={authStyle.textInputBoxStyle}>
                           <Button
                              gradient
                              style={authStyle.loginButtonContainer}
                              onPress={this.onUpdateProfile.bind(this)}>
                              <TextComponent bold white center>
                                 Save
                              </TextComponent>
                           </Button>
                           <Button
                              gradient
                              style={authStyle.loginButtonContainer}
                              onPress={this.onUpdateProfile.bind(this)}>
                              <TextComponent bold white center>
                                 Logout
                              </TextComponent>
                           </Button>
                        </View>
                     </View>
                  </KeyboardAwareScrollView>
                  <PickImageModel
                     visible={this.state.imagepickermodalvisible}
                     close={this.closeImagePickerModal.bind(this)}
                     onCamera={this.onCamera.bind(this)}
                     onLibrary={this.onLibrary.bind(this)}
                  />
               </View>
            )}
         </SafeAreaView>
      );
   }
}

// =======>>>>>>>> PROPS CONNECTION <<<<<<<<=======
const mapStateToProps = (state) => {
   return {
      scannerMode: state.Common.scannerMode,
      auth: state.Auth,
      home: state.Home,
      token:
         state.Common.refreshTokenSuccess &&
         state.Common.refreshTokenResponce &&
         state.Common.refreshTokenResponce.tempToken,
      secret_key:
         state.Auth.sendOtpSuccess &&
         state.Auth.sendOtpResponce &&
         state.Auth.sendOtpResponce.userToken,
      access_key:
         state.Auth.testEncryptionSuccess &&
         state.Auth.testEncryptionResponce &&
         state.Auth.testEncryptionResponce.encrypted_value,
      userData:
         state.Auth &&
         state.Auth.loginResponse.status == '1' &&
         state.Auth.loginResponse.data.User,
   };
};

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(mapStateToProps, {
   getProfileDetailRequest,
   updateProfile,
})(SettingsScreen);
