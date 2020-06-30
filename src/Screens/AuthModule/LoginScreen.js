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
   Platform,
} from 'react-native';
import authStyle from './authStyle';
import AppHeader from '../../Assets/Components/AppHeader';
import {s, ms} from 'react-native-size-matters';
import {Colors, LoadWheel, Sizes} from '../../CommonConfig';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {loginRequest, refreshToken} from '../../Redux/Actions';
import Button from '.././Components/Button';
import TextComponent from '.././Components/Text';
import {CardStyleInterpolators} from '@react-navigation/stack';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-root-toast';

// =======>>>>>>>> ASSETS <<<<<<<<=======

// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======

class LoginScreen extends React.Component {
   // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
   state = {
      email: '',
      password: '',
      show: false,
      showButton: false,
      showPass: false,
      emailFocus: false,
      passwordFocus: false,
      errors: [],
      refreshTokenLoading: false,
      loginLoading: false,
      tokenLoading: false,
      testEncryptionLoading: false,
   };

   // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======

   async componentDidMount() {
      this.setHeader();
      console.log(this.state,  this.props, "login");
      
      this.props.auth.testEncryptionSuccess && this.props.auth.testEncryptionResponse.encryted_value
            ? (global.access_key = this.props.auth.testEncryptionResponse.encryted_value)
            : (global.access_key = 'nousername');
         
      
            const token = await AsyncStorage.getItem('appToken');
         
      this.props.auth.registerSuccess &&  this.props.auth.registerResponse.userToken
            ? (global.secret_key = this.props.auth.registerResponse.userToken)
            : (global.secret_key = token);
      console.log(global.secret_key, token);
      
   }
   async componentDidUpdate(prevProps) {
      const {loginLoading, refreshTokenLoading} = this.state;

      // login api
      if (
         loginLoading &&
         this.props.auth.loginSuccess === true &&
         this.props.auth.loginResponse.status === '1'
      ) {
         if (this.props.auth !== prevProps.auth) {
            this.setState({loginLoading: false});
            this.props.navigation.navigate('Dashboard');
         }
      } else if (
         loginLoading &&
         this.props.auth.loginSuccess &&
         this.props.auth.loginResponse.status !== '1'
      ) {
         if (this.props.auth !== prevProps.auth) {
            this.setState({loginLoading: false});
            alert(this.props.auth.loginResponse.message);
         }
      } else if (loginLoading && this.props.auth.loginSuccess === false) {
         if (this.props.auth !== prevProps.auth) {
            this.setState({loginLoading: false});
            alert('Something went wrong');
         }
      }
   }

   // =======>>>>>>>> FUNCTIONS DECLARATION <<<<<<<<=======
   onRegisterPress = () => {
      this.props.navigation.navigate('Register');
   };

   hasErrors = (key) => {
      return this.state.errors.includes(key) ? true : false;
   };

   loginRequest() {
      this.setState({loginLoading: true});
      let requestParam = {
         email: this.state.email,
         passsword: this.state.password,
         access_key: global.access_key,
         secret_key: global.secret_key,
         device_token: '',
         device_type: global.device_type,
      };
      this.props.loginRequest(requestParam);
   }

   handleLogin() {
      if (this.state.email === '') {
         // alert('provide email');
         this.setState({errors: _.uniq([...this.state.errors, 'email'])});
      } else if (
         /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            this.state.email,
         ) == false
      ) {
         this.setState({errors: _.uniq([...this.state.errors, 'email'])});
      } else if (this.state.password === '') {
         this.setState({errors: _.uniq([...this.state.errors, 'password'])});
      } else {
         let requestParam = {
            email: this.state.email,
            password: this.state.password,
            secret_key: global.secret_key,
            access_key: global.access_key,
            device_token: global.device_token,
            device_type: global.device_type,
         };
         this.setState({loginLoading: true})
         this.props.loginRequest(requestParam);
      }
   }
   setHeader() {
      this.props.navigation.setOptions({
         headerShown: false,
         // cardStyleInterpolator: null,
      });
   }

   removeError(key) {
      this.state.errors.splice(this.state.errors.indexOf(key), 1);
   }

   // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
   render() {
      let loading = this.state.loginLoading;
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
                  <View style={authStyle.loginBodyViewStyle}>
                     <View style={authStyle.loginHeaderTextContainer}>
                        <AppHeader title1="Lo" title2="gin" />
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
                                 this.removeError('email');
                                 this.setState({
                                    emailFocus: true,
                                 });
                              }}
                              onBlur={() => {
                                 this.setState({
                                    emailFocus: false,
                                 });
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
                                 color: Colors.BLACK,
                                 paddingVertical: s(0),
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
                              secureTextEntry={
                                 this.state.showPass ? false : true
                              }
                              autoCapitalize="none"
                              value={this.state.password}
                              onFocus={() => {
                                 this.removeError('password');
                                 this.setState({
                                    passwordFocus: true,
                                 });
                              }}
                              onBlur={() => {
                                 this.setState({
                                    passwordFocus: false,
                                 });
                              }}
                              onChangeText={(text) => {
                                 this.setState({password: text});
                                 setTimeout(() => {
                                    this.state.password !== ''
                                       ? this.setState({
                                            showButton: true,
                                         })
                                       : this.setState({
                                            showButton: false,
                                         });
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
                                       this.setState({
                                          showPass: !this.state.showPass,
                                       });
                                    }}
                                 />
                              ) : (
                                 <Icon
                                    name="ios-eye-off"
                                    size={s(18)}
                                    color={Colors.gray}
                                    onPress={() => {
                                       this.setState({
                                          showPass: !this.state.showPass,
                                       });
                                    }}
                                 />
                              )
                           ) : null}
                           {this.state.errors.includes('password') && (
                              <TextComponent accent>
                                 Provide password
                              </TextComponent>
                           )}
                        </View>
                     </View>

                     <View style={authStyle.textInputBoxStyle}>
                        <Button
                           gradient
                           style={authStyle.loginButtonContainer}
                           onPress={this.handleLogin.bind(this)}>
                           <TextComponent bold white center>
                              Login
                           </TextComponent>
                        </Button>
                        <Button
                           onPress={() => {
                              this.props.navigation.navigate('ForgetPassword');
                           }}>
                           <TextComponent
                              gray
                              semibold
                              caption
                              center
                              style={{
                                 textDecorationLine: 'underline',
                                 fontSize: Sizes.smallFont,
                              }}>
                              Forgot your password?
                           </TextComponent>
                        </Button>
                     </View>
                     <View style={{position: 'absolute', bottom: s(5)}}>
                        <Button onPress={this.onRegisterPress}>
                           <TextComponent
                              gray
                              bold
                              caption
                              center
                              style={{
                                 textDecorationLine: 'underline',
                                 fontSize: Sizes.smallFont,
                              }}>
                              Don't Have Account? create one
                           </TextComponent>
                        </Button>
                     </View>
                  </View>
               </KeyboardAwareScrollView>
            )}
         </SafeAreaView>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      auth: state.Auth,
      common: state.Common,
   };
};

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(mapStateToProps, {loginRequest})(
   LoginScreen,
);
