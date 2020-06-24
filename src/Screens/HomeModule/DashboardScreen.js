import React, {Component} from 'react';
import {
   View,
   SafeAreaView,
   TouchableOpacity,
   Image,
   TextInput,
   Text,
   Platform,
   StatusBar,
   Alert,
   FlatList,
} from 'react-native';
import CardView from 'react-native-cardview';
import TextComponent from '../Components/Text';
import {connect} from 'react-redux';
import {fromPairs} from 'lodash';
import {ApplicationStyles, Colors, ImagesPath, Sizes} from '../../CommonConfig';
import homeStyle from './homeStyle';
import {cartDATA} from '../../DATA';
import {s} from 'react-native-size-matters';
import FloatingActionButton from '../Components/FloatingActionButton';
import Button from '../Components/Button';
import scannerStyle from '../ScannerModule/scannerStyle';
import dealsStyle from '../DealsModule/dealsStyle';

class DashboardScreen extends Component {
   state = {
      serachEnable: false,
      productList: [],
   };
   componentDidMount() {
      this.setHeader();
      this.setState({productList: [...cartDATA]});
   }
   setHeader() {
      this.props.navigation.setOptions({
         header: () => {
            return this.state.serachEnable == true ? (
               <SafeAreaView
                  style={[
                     ApplicationStyles.headerStyle,
                     {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        justifyContent: 'center',
                     },
                  ]}>
                  <View
                     style={{
                        borderWidth: s(1),
                        backgroundColor: Colors.primary,
                        borderColor: Colors.gray,
                        borderRadius: Sizes.radius,
                        paddingHorizontal: s(15),
                        width: '80%',
                        alignSelf: 'center',
                     }}>
                     <TextInput
                        style={{
                           paddingVertical:
                              Platform.OS === 'android' ? s(0) : s(5),
                           color: Colors.white,
                        }}
                     />
                  </View>
                  <TouchableOpacity
                     onPress={() => {
                        this.setState({serachEnable: false});
                        setTimeout(() => {
                           this.setHeader();
                        }, 100);
                     }}
                     style={homeStyle.touchStyle}>
                     <Image
                        source={ImagesPath.CloseIcon}
                        style={[homeStyle.headerClose]}
                     />
                  </TouchableOpacity>
               </SafeAreaView>
            ) : (
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
                        DASHBOARD
                     </TextComponent>
                  </View>
                  <TouchableOpacity
                     onPress={() => {
                        this.setState({serachEnable: true});
                        setTimeout(() => {
                           this.setHeader();
                        }, 100);
                     }}
                     style={homeStyle.touchStyle}>
                     <Image
                        source={ImagesPath.searchIcon}
                        style={homeStyle.searchIconStyle}
                     />
                  </TouchableOpacity>
               </SafeAreaView>
            );
         },
      });
   }
   renderProductList({item}) {
      return (
         <TouchableOpacity>
         <CardView
            cardElevation={s(3)}
            cardMaxElevation={s(2)}
            cornerRadius={s(5)}
            paddingBottom={s(10)}
            style={{
               justifyContent: 'center',
               margin: s(15),
               backgroundColor: 'white',
            }}>
            <View style={
                  [homeStyle.productItemContainerStyle,
                  {
                     borderRadius: s(15),
                     borderWidth: item.is_promo_product === 1 ? s(2) : s(0),
                     flexDirection: 'row',
                     justifyContent: 'space-around'
                  },
               ]}>

               <View
                     style={[
                        dealsStyle.cartImageContainerStyle,
                        {alignSelf: 'flex-start'},
                     ]}>
                     <Image
                        source={item.image}
                        resizeMode={'contain'}
                        style={{height: s(80), width: s(80)}}
                     />
               </View>
               <View style={{justifyContent: 'space-around'}}>
                  <TextComponent BLACK bold h2 padding>
                     {item.name}
                  </TextComponent>
                  <View style={{flexDirection: 'row', paddingVertical: s(5)}}>
                     <View
                        style={{
                           marginHorizontal: s(5),
                           justifyContent: 'center',
                           alignItems: 'center',
                        }}>
                        <Image
                           source={ImagesPath.multiproductsIcon}
                           style={{
                              height: s(12),
                              width: s(13),
                              tintColor: Colors.APPCOLOR,
                           }}
                        />
                     </View>
                     <View
                        style={{
                           marginHorizontal: s(5),
                           justifyContent: 'center',
                           alignItems: 'center',
                        }}>
                        <Image
                           source={ImagesPath.CloseIcon}
                           style={{
                              height: s(12),
                              width: s(7),
                              tintColor: Colors.BLACKSHADE,
                           }}
                        />
                     </View>
                     <TextComponent semibold smallfont padding>{item.purchase}</TextComponent>
                  </View>
               </View>
               <View style={{justifyContent: 'space-around'}}>
               <View>
                     <TextComponent semibold smallfont gray padding>{item.weight}</TextComponent>
                  </View>
               <View>
                     <TextComponent bold smallfont BLACK padding>${item.price}</TextComponent>
                  </View>
               </View>
            </View>
            </CardView>
            </TouchableOpacity>                 
      );
   }

   onPressItem(name) {
      if (name === 'bt_addproduct') {
         this.props.navigation.navigate('AddProduct');
      } else {
      Alert.alert('Icon pressed', `the icon ${name} was pressed`);
   }
   }
   render() {
      return (
         <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
            <StatusBar
               backgroundColor={Colors.APPCOLOR}
               barStyle="light-content"
            />
            <FlatList 
               data={this.state.productList}
               renderItem={this.renderProductList}
               keyExtractor={(item) => item.id}
            />
            <FloatingActionButton onPressItem={this.onPressItem.bind(this)} />
         </SafeAreaView>
      );
   }
}

export default DashboardScreen;
