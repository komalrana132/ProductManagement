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
import authStyle from './authStyle';
import AppHeader from '../../Assets/Components/AppHeader';
import {s, ms} from 'react-native-size-matters';
import {Colors, LoadWheel, Sizes} from '../../CommonConfig';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {loginRequest} from '../../Redux/Actions';
import Button from '.././Components/Button';
import TextComponent from '.././Components/Text';
import {CardStyleInterpolators} from '@react-navigation/stack';

// =======>>>>>>>> ASSETS <<<<<<<<=======

// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======

export class ForgetPassword extends React.Component {
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
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        });
    }

    // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
    render() {
        let loading = this.state.testEncryptionLoading;
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
                                <AppHeader
                                    spaccing
                                    title1="Forgot"
                                    title2="Password"
                                />
                            </View>
                            <View style={authStyle.textInputBoxStyle}>
                                <TextComponent
                                    style={{
                                        color: this.state.textInput1Focus
                                            ? Colors.black
                                            : Colors.gray2,
                                    }}>
                                    Email
                                </TextComponent>
                                <View
                                    style={[
                                        authStyle.loginBodyInnerViewContainer,
                                        {
                                            borderBottomColor: this.state
                                                .textInput1Focus
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
                                            this.setState({
                                                textInput1Focus: true,
                                            });
                                        }}
                                        onBlur={() => {
                                            this.setState({
                                                textInput1Focus: false,
                                            });
                                        }}
                                        value={this.state.email}
                                        onChangeText={(text) => {
                                            this.setState({email: text});
                                        }}
                                        placeholder="Enter Email Address"
                                        placeholderTextColor={
                                            this.state.textInput1Focus
                                                ? Colors.gray
                                                : Colors.LIGHT_GRAY
                                        }
                                        style={{
                                            flex: 1,
                                            fontSize: Sizes.smallFont,
                                            color: Colors.BLACK,
                                            fontWeight: '600',
                                            paddingVertical: s(0),
                                            // textAlignVertical: 'top'
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={authStyle.textInputBoxStyle}>
                                <Button
                                    gradient
                                    style={authStyle.loginButtonContainer}
                                    onPress={() => this.handleForgetClick()}>
                                    <TextComponent bold white center>
                                        Send email
                                    </TextComponent>
                                </Button>
                            </View>
                            <View style={{position: 'absolute', bottom: s(5)}}>
                                <Button onPress={this.onBackLoginPress}>
                                    <TextComponent
                                        gray
                                        bold
                                        caption
                                        center
                                        style={{
                                            textDecorationLine: 'underline',
                                            fontSize: Sizes.smallFont,
                                        }}>
                                        Back to login
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
    };
};

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(mapStateToProps, {loginRequest})(ForgetPassword);
