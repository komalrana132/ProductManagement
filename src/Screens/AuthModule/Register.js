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
   StyleSheet,
   ActivityIndicator,
   Image,
   Platform,
} from 'react-native';
import authStyle from './authStyle';
import AppHeader from '../../Assets/Components/AppHeader';
import {s, ms} from 'react-native-size-matters';
import {Colors, LoadWheel, Sizes, ImagesPath} from '../../CommonConfig';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
import {testEncryptionRequest, registerRequest} from '../../Redux/Actions';
import Button from '.././Components/Button';
import TextComponent from '.././Components/Text';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {screenHeight} from '../../CommonConfig/HelperFunctions/functions';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMD from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import PickImageModel from '../Components/PickImageModel';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';

// =======>>>>>>>> ASSETS <<<<<<<<=======

// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======

class Register extends React.Component {
   // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
   state = {
      email: '',
      password: '',
      lastname: '',
      show: false,
      showButton: false,
      showPass: false,
      confirmPass: '',
      showCButton: false,
      showCPass: false,
      emailFocus: false,
      passwordFocus: false,
      confirmPassFocus: false,
      genderFocus: false,
      firstnameFocus: false,
      lastnameFocus: false,
      phoneFocus: false,
      continue1: false,
      continue2: false,
      continue3: false,
      tab: '1',
      profile: null,
      imagepickermodalvisible: false,
      gender: '',
      firstname: '',
      phone: '',
      testEncryptionLoading: false,
      registerLoading : false,
      errors: [],
   };

   // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======

   async componentDidMount() {

      this.setHeader();
      // this.props.resetAuthRequest()
   }
   componentDidUpdate(prevProps) {
console.log(this.state);

      const {testEncryptionLoading, registerLoading} = this.state;

      // testencryption responce
      if (
         testEncryptionLoading &&
         this.props.auth.testEncryptionSuccess === true &&
         this.props.auth.testEncryptionResponse.encrypted_value
      ) {
         if (this.props.auth !== prevProps.auth) {
            this.setState({testEncryptionLoading: false})
            global.access_key = this.props.auth.testEncryptionResponse.encrypted_value;
            alert('Succesfully registered');
            this.props.navigation.navigate('Login');
         }
      } else if (
         testEncryptionLoading &&
         this.props.auth.testEncryptionSuccess && 
         this.props.auth.testEncryptionResponse.encrypted_value
      ) {
         if (this.props.auth !== prevProps.auth) {
            alert('Succesfully registered');
            this.setState({testEncryptionLoading: false});
         }
      } else if (
         testEncryptionLoading &&
         this.props.auth.testEncryptionSuccess === false
      ) {
         if (this.props.auth !== prevProps.auth) {
            this.setState({testEncryptionLoading: false});
            alert('Something went wrong');
         }
      }

      // register api 
      if (
         registerLoading &&
         this.props.auth.registerSuccess === true &&
         this.props.auth.registerResponse.status === '1'
      ) {
         if (this.props.auth !== prevProps.auth) {
            this.setState({registerLoading : false})
            global.secret_key = this.props.auth.registerResponse.userToken
            this.setState({testEncryptionLoading: true});
            this.testEncryptionRequest(this.props.auth.registerResponse.data.User.guid); 
         }
      } else if (
         registerLoading &&
         this.props.auth.registerSuccess &&
         this.props.auth.registerResponse.status !== '1'
      ) {
         if (this.props.auth !== prevProps.auth) {
            this.setState({registerLoading: false});
            alert(this.props.auth.registerResponse.message);
         }
      } else if (
         registerLoading &&
         this.props.auth.registerSuccess === false
      ) {
         if (this.props.auth !== prevProps.auth) {
            this.setState({registerLoading: false});
            alert('Something went wrong');
         }
      }
   }

   // =======>>>>>>>> FUNCTIONS DECLARATION <<<<<<<<=======
   onLoginPress = () => {
      this.props.navigation.navigate('Login');
   };

   hasErrors = (key) => {
      return this.state.errors.includes(key) ? true : false;
   };

   testEncryptionRequest(val) {

      this.setState({testEncryptionLoading: true});
      let requestParams = {
         guid : val
      }
      this.props.testEncryptionRequest(requestParams);
   }
   setHeader() {
      this.props.navigation.setOptions({
         headerShown: false,
         cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      });
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

   hasErrors = (key) => {
      return this.state.errors.includes(key) ? true : false;
   };

   TabBar() {
      return (
         <View style={[authStyle.registertabStyle]}>
            <TouchableOpacity
               onPress={() => {
                  this.onContinuePress('1');
               }}
               style={{marginHorizontal: s(15)}}>
               <Image
                  source={ImagesPath.sliderdotIcon}
                  style={{
                     height: s(25),
                     width: s(25),
                     tintColor:
                        this.state.tab == '1'
                           ? Colors.GREEN
                           : this.state.continue1
                           ? Colors.APPCOLOR
                           : Colors.gray,
                  }}
               />
            </TouchableOpacity>
            <TouchableOpacity
               onPress={() => {
                  this.onContinuePress('2');
               }}
               style={{marginHorizontal: s(15)}}>
               <Image
                  source={ImagesPath.sliderdotIcon}
                  style={{
                     height: s(25),
                     width: s(25),
                     tintColor:
                        this.state.tab == '2'
                           ? Colors.GREEN
                           : this.state.continue2
                           ? Colors.APPCOLOR
                           : Colors.gray,
                  }}
               />
            </TouchableOpacity>
            <TouchableOpacity
               onPress={() => {
                  this.onContinuePress('3');
               }}
               style={{marginHorizontal: s(15)}}>
               <Image
                  source={ImagesPath.sliderdotIcon}
                  style={{
                     height: s(25),
                     width: s(25),
                     tintColor:
                        this.state.tab == '3'
                           ? Colors.GREEN
                           : this.state.continue3
                           ? Colors.APPCOLOR
                           : Colors.gray,
                  }}
               />
            </TouchableOpacity>
         </View>
      );
   }

   renderBody() {
      return (
         <View style={authStyle.loginBodyViewStyle}>
            <View
               style={[
                  authStyle.loginHeaderTextContainer,
                  {flexDirection: 'column', height: screenHeight / 6},
               ]}>
               <AppHeader
                  spacing
                  title1="Create"
                  title2="an"
                  title3="Account"
               />
               {this.TabBar()}
            </View>
            {this.handleTab()}
            <View style={{position: 'absolute', bottom: s(0)}}>
               <Button onPress={this.onLoginPress}>
                  <TextComponent
                     gray
                     bold
                     caption
                     center
                     style={{
                        textDecorationLine: 'underline',
                        fontSize: Sizes.smallFont,
                     }}>
                     Back to Login
                  </TextComponent>
               </Button>
            </View>
         </View>
      );
   }

   onContinuePress(val) {
      this.setState({tab: val});
   }

   renderOneTab() {
      return (
         <View style={authStyle.textInputBoxStyle}>
            <View style={authStyle.textInputBoxStyle}>
               <TextComponent
                  style={{
                     color: this.state.emailFocus ? Colors.black : Colors.gray2,
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
                        this.state.emailFocus ? Colors.gray : Colors.LIGHT_GRAY
                     }
                     style={{
                        flex: 1,
                        fontSize: Sizes.smallFont,
                        color: Colors.BLACK,
                        paddingVertical: Platform.OS === 'ios' ? s(5) : s(0),
                     }}
                  />
                  {this.state.errors.includes('email') && (
                     <TextComponent accent>Provide Valid email</TextComponent>
                  )}
               </View>
            </View>
            <View style={authStyle.textInputBoxStyle}>
               <TextComponent
                  style={{
                     color: this.state.passwordFocus
                        ? Colors.black
                        : Colors.gray2,
                  }}>
                  Password
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
                     secureTextEntry={this.state.showPass ? false : true}
                     autoCapitalize="none"
                     value={this.state.password}
                     onFocus={() => {
                        this.setState({passwordFocus: true});
                        this.removeError('password');
                     }}
                     onBlur={() => {
                        this.setState({passwordFocus: false});
                     }}
                     onChangeText={(text) => {
                        this.setState({password: text});
                        setTimeout(() => {
                           this.state.password !== ''
                              ? this.setState({showButton: true})
                              : this.setState({showButton: false});
                        }, 100);
                     }}
                     autoCorrect={false}
                     maxLength={16}
                     placeholder="Enter password"
                     placeholderTextColor={
                        this.state.passwordFocus
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
                  {this.state.showButton ? (
                     !this.state.showPass ? (
                        <Icon
                           name="ios-eye"
                           size={s(18)}
                           color={Colors.gray}
                           onPress={() => {
                              this.setState({showPass: !this.state.showPass});
                           }}
                        />
                     ) : (
                        <Icon
                           name="ios-eye-off"
                           size={s(18)}
                           color={Colors.gray}
                           onPress={() => {
                              this.setState({showPass: !this.state.showPass});
                           }}
                        />
                     )
                  ) : null}
                  {this.state.errors.includes('password') && (
                     <TextComponent accent>Provide Password</TextComponent>
                  )}
               </View>
            </View>

            <View style={authStyle.textInputBoxStyle}>
               <TextComponent
                  style={{
                     color: this.state.confirmPassFocus
                        ? Colors.black
                        : Colors.gray2,
                  }}>
                  Confirm Password
               </TextComponent>
               <View
                  style={[
                     authStyle.loginBodyInnerViewContainer,
                     {
                        borderBottomColor: this.state.confirmPassFocus
                           ? Colors.black
                           : null,
                     },
                  ]}>
                  <TextInput
                     secureTextEntry={this.state.showCPass ? false : true}
                     autoCapitalize="none"
                     value={this.state.confirmPass}
                     onFocus={() => {
                        this.setState({confirmPassFocus: true});
                        this.removeError('cpass');
                        this.removeError('differ');
                     }}
                     onBlur={() => {
                        this.setState({confirmPassFocus: false});
                     }}
                     onChangeText={(text) => {
                        this.setState({confirmPass: text});
                        setTimeout(() => {
                           this.state.confirmPass !== ''
                              ? this.setState({showCButton: true})
                              : this.setState({showCButton: false});
                        }, 100);
                     }}
                     autoCorrect={false}
                     maxLength={16}
                     placeholder="Renter password"
                     placeholderTextColor={
                        this.state.confirmPassFocus
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
                  {this.state.showCButton ? (
                     !this.state.showCPass ? (
                        <Icon
                           name="ios-eye"
                           size={s(18)}
                           color={Colors.gray}
                           onPress={() => {
                              this.setState({showCPass: !this.state.showCPass});
                           }}
                        />
                     ) : (
                        <Icon
                           name="ios-eye-off"
                           size={s(18)}
                           color={Colors.gray}
                           onPress={() => {
                              this.setState({showCPass: !this.state.showCPass});
                           }}
                        />
                     )
                  ) : null}
                  {this.state.errors.includes('confirmPass') && (
                     <TextComponent accent>
                        {this.state.errors.includes('differ')
                           ? 'Reenter password'
                           : "Password doesn't match"}
                     </TextComponent>
                  )}
               </View>
            </View>

            <View style={authStyle.textInputBoxStyle}>
               <Button
                  gradient
                  style={authStyle.loginButtonContainer}
                  onPress={() => this.onContinuePress('2')}>
                  <TextComponent bold white center>
                     Continue
                  </TextComponent>
               </Button>
            </View>
         </View>
      );
   }
   renderThreetab() {
      return (
         <View style={authStyle.textInputBoxStyle}>
            <View
               style={{flexDirection: 'row', justifyContent: 'space-between'}}>
               <Button
                  style={{padding: 0}}
                  onPress={() => this.onContinuePress('2')}>
                  <TextComponent
                     gray
                     bold
                     caption
                     right
                     style={{
                        textDecorationLine: 'underline',
                        fontSize: Sizes.smallFont,
                     }}>
                     back
                  </TextComponent>
               </Button>
               {/* <Button style={{padding: 0}} onPress={() => this.onContinuePress('3')}>
                  <TextComponent
                     gray
                     bold
                     caption
                     right
                     style={{
                        textDecorationLine: 'underline',
                        fontSize: Sizes.smallFont,
                     }}>
                     skip
                  </TextComponent>
               </Button> */}
            </View>
            <View style={authStyle.textInputBoxStyle}>
               <View>
                  <TouchableOpacity
                     style={[authStyle.profileIconStyle, {alignSelf: 'center'}]}
                     onPress={this.setImagePickerModalVisible.bind(this)}>
                     {this.state.profile ? (
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
                     ) : (
                        <IconMD
                           name="add-a-photo"
                           size={s(75)}
                           color={Colors.gray}
                           style={{
                              borderWidth: s(1.5),
                              borderRadius: s(40),
                              borderColor: Colors.gray,
                              padding: s(10),
                           }}
                        />
                     )}
                  </TouchableOpacity>
                  <TextComponent
                     center
                     gray
                     smallFont
                     bold
                     style={{margin: s(10)}}>
                     Add Profile Photo
                  </TextComponent>
               </View>
            </View>

            <View style={authStyle.textInputBoxStyle}>
               <Button
                  gradient
                  style={authStyle.loginButtonContainer}
                  onPress={this.onRegister.bind(this)}>
                  <TextComponent bold white center>
                     Register
                  </TextComponent>
               </Button>
            </View>
         </View>
      );
   }

   onRegister() {
      
      if (this.state.email === '') {
         this.setState({errors: _.uniq([...this.state.errors, 'email'])});
         this.onContinuePress('1');
      } else if (
         /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            this.state.email,
         ) == false
      ) {
         this.setState({errors: _.uniq([...this.state.errors, 'email'])});
         this.onContinuePress('1');
      } else if (this.state.password === '') {
         this.setState({errors: _.uniq([...this.state.errors, 'password'])});
         this.onContinuePress('1');
      } else if (this.state.confirmPass === '') {
         this.setState({errors: _.uniq([...this.state.errors, 'confirmPass'])});
         this.onContinuePress('1');
      } else if (this.state.confirmPass !== this.state.password) {
         this.setState({errors: _.uniq([...this.state.errors, 'differ'])});
         this.onContinuePress('1');
      } else if (this.state.firstname === '') {
         this.setState({errors: _.uniq([...this.state.errors, 'firstname'])});
         this.onContinuePress('2');
      } else {
         var formData = new FormData();

            formData.append("firstname", this.state.firstname);
            formData.append("lastname", this.state.lastname);
            formData.append("email", this.state.email);
            formData.append("password", this.state.password);
            formData.append("gender", this.state.gender);
            formData.append("contact", this.state.phone);
            formData.append("access_key", "nousername");
            formData.append("secret_key", global.secret_key);
            formData.append("device_token", '');
            formData.append("device_type", global.device_type);

           this.state.profile
           ?  formData.append('profile_image', {
            uri: this.state.profile['uri'],
            type: this.state.profile['mime'],
            name: this.state.profile['name']
        }) : formData.append('profile_image',"");

            console.log(formData, 'formData');
            this.setState({registerLoading: true});
            this.props.registerRequest(formData);

         //    this.props.registrationRequest(formData);
         // let requestParams = {
         //    first_name: this.state.firstname,
         //    last_name: this.state.lastname,
         //    email_id: this.state.email,
         //    contact : this.state.phone,
         //    password: this.state.password,
         //    profile_image: this.state.profile !== null ?this.state.profile.data : "",
         //    gender: this.state.gender,
         //    access_key: 'nousername',
         //    secret_key: global.secret_key,
         //    device_token: '',
         //    device_type: global.device_type,
         // };
         // console.log(requestParams);
         // this.setState({registerRequest : true})
         // this.props.registerRequest(requestParams);
      }
   }

   removeError(key) {
      this.state.errors.splice(this.state.errors.indexOf(key), 1);
   }

   renderTwotab() {
      return (
         <View style={[authStyle.textInputBoxStyle]}>
            <View
               style={{flexDirection: 'row', justifyContent: 'space-between'}}>
               <Button
                  style={{padding: 0}}
                  onPress={() => this.onContinuePress('1')}>
                  <TextComponent
                     gray
                     bold
                     caption
                     right
                     style={{
                        textDecorationLine: 'underline',
                        fontSize: Sizes.smallFont,
                     }}>
                     back
                  </TextComponent>
               </Button>
               <Button
                  style={{padding: 0}}
                  onPress={() => this.onContinuePress('3')}>
                  <TextComponent
                     gray
                     bold
                     caption
                     right
                     style={{
                        textDecorationLine: 'underline',
                        fontSize: Sizes.smallFont,
                     }}>
                     skip
                  </TextComponent>
               </Button>
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
                     color: this.state.phoneFocus ? Colors.black : Colors.gray2,
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
                        this.state.phone ? Colors.gray : Colors.LIGHT_GRAY
                     }
                     style={{
                        flex: 1,
                        fontSize: Sizes.smallFont,
                        color: Colors.black,
                        paddingVertical: s(0),
                     }}
                  />
               </View>
            </View>

            <View style={authStyle.textInputBoxStyle}>
               <TextComponent
                  style={{
                     color: this.state.genderFocus
                        ? Colors.black
                        : Colors.gray2,
                  }}>
                  gender
               </TextComponent>
               {/* radio button */}
               <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Button
                     onPress={() => {
                        this.setState({gender: 'female', genderFocus: true});
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
                        this.setState({gender: 'male', genderFocus: true});
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
                        this.state.genderFocus ? Colors.gray : Colors.LIGHT_GRAY
                     }
                     style={{
                        flex: 1,
                        fontSize: Sizes.smallFont,
                        color: Colors.BLACK,
                        fontWeight: '600',
                        paddingVertical: s(0),
                     }}
                  />
               </View>
            </View>
            <View style={authStyle.textInputBoxStyle}>
               <Button
                  gradient
                  style={authStyle.loginButtonContainer}
                  onPress={() => this.onContinuePress('3')}>
                  <TextComponent bold white center>
                     Continue
                  </TextComponent>
               </Button>
            </View>
         </View>
      );
   }

   handleTab() {
      switch (this.state.tab) {
         case '1':
            return this.renderOneTab();
            break;
         case '2':
            return this.renderTwotab();
            break;
         case '3':
            return this.renderThreetab();
            break;
         default:
            return (
               <View>
                  <TextComponent h1>Something went wrong</TextComponent>
               </View>
            );
            break;
      }
   }

   // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
   render() {
      let loading = this.state.testEncryptionLoading || this.state.registerLoading;
      return (
         <SafeAreaView style={authStyle.loginScreeContainer}>
            {loading ? (
               <View
                  style={{
                     flex: 1,
                     backgroundColor: 'transparent',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}>
                  <LoadWheel visible={loading} />
               </View>
            ) : (
               <KeyboardAwareScrollView
                  keyboardShouldPersistTaps={'handled'}
                  enableAutomaticScroll={true}
                  showsVerticalScrollIndicator={false}
                  enableOnAndroid={true}
                  contentContainerStyle={{flexGrow: 1}}>
                  {this.renderBody()}
               </KeyboardAwareScrollView>
            )}
            <PickImageModel
               visible={this.state.imagepickermodalvisible}
               close={this.closeImagePickerModal.bind(this)}
               onCamera={this.onCamera.bind(this)}
               onLibrary={this.onLibrary.bind(this)}
            />
         </SafeAreaView>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      auth: state.Auth,
   };
};

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(mapStateToProps, {
   testEncryptionRequest,
   registerRequest,
})(Register);
