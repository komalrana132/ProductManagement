
//LIBRARIES
import React from 'react';
import { View, StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
// =======>>>>>>>> ASSETS <<<<<<<<=======
import { Colors } from '../CommonConfig';
import { CommonActions } from '@react-navigation/native';

// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======

class Splash extends React.Component {

    componentDidMount() {
        console.log(this.props, 'splash');
        // StatusBar.setBackgroundColor('white')
        // StatusBar.setBarStyle('dark-content')
        if (Object.keys(this.props.auth).length != 0) {
            if (this.props && this.props.auth && this.props.auth.loginSuccess && this.props.auth.loginResponse.status == 1) {
                SplashScreen.hide();
                if (this.props.auth.loginResponse.status === '1') {
                    this.props.navigation.navigate('Dashboard')
                } else {
                    this.props.navigation.navigate('Login')
                }

            }
            else {
                SplashScreen.hide();
                this.navigateToScreen('Login');
            }
        }
        else {
            SplashScreen.hide();
            this.navigateToScreen('Login');
        }
    }

    // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
    render() {
        return (
            <View>
                {/* <StatusBar backgroundColor={Colors.APPCOLOR} /> */}
            </View>
        )
    }
}

// =======>>>>>>>> PROPS CONNECTION <<<<<<<<=======
const mapStateToProps = (res) => {
    return {
        auth: res.Auth
    };
}

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(mapStateToProps)(Splash);
