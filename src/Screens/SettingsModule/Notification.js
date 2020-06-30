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
} from 'react-native';

import AppHeader from '../../Assets/Components/AppHeader';
import {s, ms} from 'react-native-size-matters';
import {Colors, LoadWheel, Sizes, ApplicationStyles} from '../../CommonConfig';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {loginRequest} from '../../Redux/Actions';
import {CardStyleInterpolators} from '@react-navigation/stack';
import authStyle from '../AuthModule/authStyle';
import TextComponent from '../Components/Text';
import homeStyle from '../HomeModule/homeStyle';


// =======>>>>>>>> ASSETS <<<<<<<<=======

// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======

class Notification extends React.Component {
    // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
    state = {
        email: '',
        show: false,
        showButton: false,
        textInput1Focus: false,
    };

    // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======

    componentDidMount() {
        this.setHeader();
        // this.props.resetAuthRequest()
    }
    componentDidUpdate(prevProps) {}

    // =======>>>>>>>> FUNCTIONS DECLARATION <<<<<<<<=======
    onBackLoginPress = () => {
        this.props.navigation.navigate('Login');
    };

    handleForgetClick() {
        if (this.state.email === '') {
            alert('provide email');
        } else if (
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                this.state.email,
            ) == false
        ) {
            alert('provide valid email');
        } else {
            this.props.loginRequest({
                email: this.state.email,
                password: this.state.password,
            });
        }
    }
    setHeader() {
        this.props.navigation.setOptions({
           header: () => {
               return(
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
                   {/* <Image source={ImagesPath.backIcon} /> */}
                </View>
                <View>
                   <TextComponent
                      smallfont
                      style={ApplicationStyles.headerTitleStyle}>
                      NOTIFICATIONS
                   </TextComponent>
                </View>
                <View style={homeStyle.touchStyle}/>

             </SafeAreaView>
          
               );
           }
        });
    }

    // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
    render() {
        let loading = this.state.testEncryptionLoading;
        return (
            <SafeAreaView style={authStyle.loginScreeContainer}>
                <View>
                    <TextComponent>dmnojdmksndm</TextComponent>
                </View>
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
export default connect(mapStateToProps, {loginRequest})(Notification);
