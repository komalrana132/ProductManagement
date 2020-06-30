// =======>>>>>>>> LIBRARIES <<<<<<<<=======

import React, { Fragment } from 'react';
import { s, vs, ms } from 'react-native-size-matters'
import { SafeAreaView, TouchableOpacity, Easing, Image, Button, Animated, StyleSheet, ScrollView, View, Text, StatusBar, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
// =======>>>>>>>> SCREENS <<<<<<<<=======

import LoginScreen from './Screens/AuthModule/LoginScreen';
import Register from './Screens/AuthModule/Register';
import ForgetPasssword from './Screens/AuthModule/ForgetPassword';
import SettingDrawer from './Screens/DrawerModule/SettingDrawer';

import DashboardScreen from './Screens/HomeModule/DashboardScreen';
import { Tabbar } from './TabView';
import { Colors } from './CommonConfig';
import SettingsScreen from './Screens/SettingsModule/SettingsScreen';
import AddProduct from './Screens/HomeModule/AddProduct';
import Splash from './Screens/Splash';
import Notification from './Screens/SettingsModule/Notification';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator();


// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======
export class AppNavigation extends React.Component {


  // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======
  componentDidMount() {
    console.disableYellowBox = true
  }

  //--------->>>>> MAIN DRAWER NAVIGATOR <<<<<------------
  render() {
    return (
      <NavigationContainer screenOptions={{ headerShown: false }}>
        <Stack.Navigator
          initialRouteName="Splash"
          backBehavior="initialRoute"
          screenOptions={{ headerShown: false }}
         >
         <Stack.Screen name="Splash" component={SplashStack} />
          <Stack.Screen name="Login" component={LoginStack} />
          <Stack.Screen name="Dashboard" component={BottomTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
}

// -------->>>>>> BOTTOM TAB NAVIGATOR <<<<<<<-------
function BottomTabNavigator({ navigation, route }) {
  return (
    <Tab.Navigator
    tabBar={Tabbar}
    initialRouteName="Home"
    backBehavior="initialRouteName"
    >
      <Stack.Screen name="Notification" component={NotificationStack} />
      <Stack.Screen name="Home" component={DashboardStack} />
      <Stack.Screen name="Profile" component={SettingsStack} />
    </Tab.Navigator>
  )
}

function SplashStack() {
  return (
    <Stack.Navigator backBehavior="Splash" screenOptions={{headerShown : false}}>
      <Stack.Screen name="Splash"  component={Splash}/>
    </Stack.Navigator>
  );
}

//--------->>>>> HOME TAB STACK <<<<<------------
function DashboardStack() {
  return (
    <Stack.Navigator backBehavior="Dashboard">
      <Stack.Screen name="Dashboard"  component={DashboardScreen}/>
      <Stack.Screen name="AddProduct" component={AddProduct} />
    </Stack.Navigator>
  );
}
//--------->>>>> HOME TAB STACK <<<<<------------
function NotificationStack() {
  return (
    <Stack.Navigator backBehavior="Dashboard">
      <Stack.Screen name="Notification"  component={Notification}/>
    </Stack.Navigator>
  );
}
// function AddItemStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="AddItem" component={AddItem} />
//     </Stack.Navigator>
//   );
// }

//--------->>>>> LOGIN TAB STACK <<<<<------------
function LoginStack() {
  return (
    <Stack.Navigator backBehavior="root">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgetPassword" component={ForgetPasssword} />
    </Stack.Navigator>
  );
}

// //--------->>>>> INVITE TAB STACK <<<<<------------
// function InviteStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Invite" component={InviteScreen} />
//     </Stack.Navigator>
//   );
// }

// //--------->>>>> BECOMESELLER TAB STACK <<<<<------------
// function BecomeSellerStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="BecomeSellerScreen" component={BecomeSellerScreen} />
//       <Stack.Screen name="AddCardScreen" component={AddCard} />
//     </Stack.Navigator>
//   );
// }

// //--------->>>>> CONTACT US TAB STACK <<<<<------------
// function ContactusStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Contactus" component={ContactUsScreen} />
//     </Stack.Navigator>
//   );
// }

// //--------->>>>> SCANNER STACK <<<<<------------
// function ScannerStack() {
//   return (
//     <Stack.Navigator
//       >
//       <Stack.Screen name="Scanner" component={Scanner} />
//     </Stack.Navigator>
//   );
// }

// //--------->>>>> Deals TAB STACK <<<<<------------
// function DealsStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Deals" component={DealsScreen} />
//       <Stack.Screen name="DetailDeal" component={DetailDealScreen} />
//     </Stack.Navigator>
//   );
// }
//--------->>>>> Settings TAB STACK <<<<<------------
function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Setting" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

// function RefralStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="RefralScreen" component={ReferalScreen} />
//     </Stack.Navigator>
//   );
// }

export default AppNavigation;
