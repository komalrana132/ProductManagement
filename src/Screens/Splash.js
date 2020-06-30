//LIBRARIES
import React from 'react';
import {View, StatusBar, SafeAreaView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';
// =======>>>>>>>> ASSETS <<<<<<<<=======
import {Colors, LoadWheel} from '../CommonConfig';
import {CommonActions} from '@react-navigation/native';
import {refreshToken, resetAuth} from '../Redux/Actions';
import authStyle from './AuthModule/authStyle';
import AsyncStorage from '@react-native-community/async-storage';
import TextComponent from './Components/Text';

// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======
class Splash extends React.Component {
   state = {refreshTokenLoading: false};

   async componentDidMount() {
      // const logout = await AsyncStorage.removeItem('appToken');
      // logout && console.log('logout');

      // this.props.resetAuth()
      this.checkLogin();
      console.log(this.props, 'splash');
      if (Object.keys(this.props.auth).length != 0) {
         this.props.auth.testEncrypptionSuccess &&
         this.props.auth.testEncryptionResponse.encryted_value
            ? (global.access_key = this.props.auth.testEncryptionResponse.encryted_value)
            : (global.access_key = 'nousername');
         const token = await AsyncStorage.getItem('appToken');
         this.props.auth.registerSuccess &&
         this.props.auth.registerResponse.userToken
            ? (global.secret_key = this.props.auth.registerResponse.userToken)
            : (global.secret_key = token);

         console.log(global.secret_key, 'splash secret_key');
      }
   }

   async componentDidUpdate(prevProps) {
      const {refreshTokenLoading} = this.state;

      // refresh token responce
      if (
         refreshTokenLoading &&
         this.props.common.refreshTokenSuccess === true &&
         this.props.common.refreshTokenResponce.status === '1'
      ) {
         if (this.props.common != prevProps.common) {
            global.secret_key = this.props.common.refreshTokenResponce.tempToken;
            AsyncStorage.setItem(
               'appToken',
               this.props.common.refreshTokenResponce.tempToken,
            ).then(this.setState({refreshTokenLoading: false}));
            this.props.navigation.navigate('Login');
         }
      } else if (
         refreshTokenLoading &&
         this.props.common.refreshTokenSuccess &&
         this.props.common.refreshTokenResponce.status !== '1'
      ) {
         if (this.props.common != prevProps.common) {
            this.setState({refreshTokenLoading: false});
         }
      } else if (
         refreshTokenLoading &&
         this.props.common.refreshTokenSuccess === false
      ) {
         if (this.props.common != prevProps.common) {
            this.setState({refreshTokenLoading: false});
            alert('Something went wrong');
         }
      }
   }

   async checkLogin() {
      this.setState({refreshTokenLoading: true});
         const appToken = await AsyncStorage.getItem('appToken');

         if (!appToken) {
            await this.refreshTokenRequest();
         } else {
            this.setState({refreshTokenLoading: false});
            global.secret_key = appToken;
            if (Object.keys(this.props.auth).length != 0) {
               if (
                  this.props &&
                  this.props.auth &&
                  this.props.auth.loginSuccess &&
                  this.props.auth.loginResponse.status === '1'
               ) {
                  SplashScreen.hide();
                  if (this.props.auth.loginResponse.status === '1') {
                     this.props.navigation.navigate('Dashboard');
                  } else {
                     this.props.navigation.navigate('Login');
                  }
               } else {
                  SplashScreen.hide();
                  this.props.navigation.navigate('Login');
               }
            } else {
               SplashScreen.hide();
            }
         }
      
   }


   async refreshTokenRequest() {
      const appToken = await AsyncStorage.getItem('appToken');

      if (!appToken) {
         let requestParam = {
            access_key: 'nousername',
         };
         if (!global.secret_key) {
            global.secret_key = appToken;
         }
         this.setState({refreshTokenLoading: true});
         this.props.refreshToken(requestParam);
      } else {
         this.setState({refreshTokenLoading: false});
         global.secret_key = appToken;
      }
   }

   // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
   render() {
      loading = this.state.refreshTokenLoading;
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
               <View />
            )}
         </SafeAreaView>
      );
   }
}

// =======>>>>>>>> PROPS CONNECTION <<<<<<<<=======
const mapStateToProps = (res) => {
   return {
      auth: res.Auth,
      common: res.Common,
   };
};

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(mapStateToProps, {resetAuth, refreshToken})(Splash);
