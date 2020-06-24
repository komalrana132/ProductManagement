import 'react-native-gesture-handler';

import React, { Fragment,Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// =======>>>>>>>> ASSETS <<<<<<<<=======

import { store, persistor } from './src/Redux/Store';
import AppNavigation from './src/AppNavigation';
import { Colors } from './src/CommonConfig';
import SplashScreen from 'react-native-splash-screen'
import { RootSiblingParent } from 'react-native-root-siblings';

class App extends Component{
  componentDidMount(){
    global.device_type = Platform.OS == 'ios' ? 1 : 0;
    global.device_token = '';
    // SplashScreen.hide();
  }
  render(){
    return(
      <Fragment>
        <StatusBar barStyle="light-content" backgroundColor={Colors.LIGHTAPPCOLOR}/>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <RootSiblingParent>
          <AppNavigation />
          </RootSiblingParent>
          </PersistGate>
        </Provider>
      </Fragment>
    );
  }
}

export default App;
