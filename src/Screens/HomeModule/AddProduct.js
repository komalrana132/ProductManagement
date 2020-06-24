// =======>>>>>>>> LIBRARIES <<<<<<<<=======

import React from 'react';
import {
   ScrollView,
   View,
   Text,
   TouchableOpacity,
   TextInput,
   StatusBar,
   Image,
   Platform,
   SafeAreaView,
   KeyboardAvoidingView,
   FlatList
} from 'react-native';
import scannerStyle from '../ScannerModule/scannerStyle';
import {ApplicationStyles} from '../../CommonConfig/ApplicationStyle';
import {ImagesPath, Colors, LoadWheel, Sizes} from '../../CommonConfig';
import homeStyle from '../HomeModule/homeStyle';
import {connect} from 'react-redux';
import AppHeader from '../../Assets/Components/AppHeader';
import {s} from 'react-native-size-matters';
import {} from '../../Redux/Actions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import {
   addItemToShopRequest,
   getSellerProductListRequest,
} from '../../Redux/Actions';
import {cartDATA} from '../../DATA';
import dealsStyle from '../DealsModule/dealsStyle';
import CardView from 'react-native-cardview';
import Button from '../Components/Button';
import TextComponent from '../Components/Text';
import authStyle from '../AuthModule/authStyle';
import {
   screenWidth,
   screenHeight,
} from '../../CommonConfig/HelperFunctions/functions';
import { stubTrue } from 'lodash';

// =======>>>>>>>> ASSETS <<<<<<<<=======

// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======

class AddProduct extends React.Component {
   // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
   state = {
      changetik: false,
      scannerModalVisible: false,
      addItemLoading: false,
      quantity: 1,
      errors: [],
      nameFocus: false,
      priceFocus: false,
      qauntityFocus: false,
      descriptionFocus: false,
      images: [],
      sellerProductLoading: false,
      productDetail: [...cartDATA],
      price: '1.00',
   };

   // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======
   componentDidMount() {
      this.setHeader();
      // this.props.home.barcodeSuccess && this.props.home.barcodeResponce.Status === 1 &&  this.setState({ price: this.props.home.barcodeResponce.Data.actual_price })
      // !this.props.loginSuccess || !this.props.sellerVerification ? global.hasItem = true : global.hasItem = false
   }
   componentDidUpdate(prevProps) {
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
                  <TouchableOpacity onPress={() => {this.props.navigation.goBack()}} style={homeStyle.touchStyle}>
                     <Image source={ImagesPath.backIcon} style={{tintColor: Colors.white}} />
                  </TouchableOpacity>
                  <View>
                     <TextComponent
                        smallfont
                        style={ApplicationStyles.headerTitleStyle}>
                        ADD PRODUCT
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
                     {/* <Image
                                     source={ImagesPath.rightIcon}
                                     style={homeStyle.searchIconStyle}
                                  /> */}
                  </TouchableOpacity>
               </SafeAreaView>
            ) 
         },
      });
   }

 onLibrary() {
     this.setState({imageFocus: true, qauntityFocus: false})
    ImagePicker.openPicker({
        multiple: true,
        maxFiles : 5,
        mediaType: 'photo',
       includeBase64: true,
       includeExif: true,
    }).then(images => {
        this.setState({images: [...images]});
        console.log(this.state.images);
    })
       .catch((e) => {
          console.log(e.message ? e.message : e);
          
       });
 }

   noImageCardView() {
      return (
         <CardView
            cardElevation={s(3)}
            cardMaxElevation={s(2)}
            cornerRadius={s(5)}
            paddingBottom={s(10)}
            style={{
               justifyContent: 'center',
               alignItems: 'center',
               backgroundColor: 'white',
               width: screenWidth / 2.7,
               height: screenHeight / 6.5,
               borderRadius: Sizes.radius,
            }}>
            <Image
               source={ImagesPath.noProductIcon}
               resizeMode="cover"
               style={{height: screenHeight / 6.5 - s(10), width: screenWidth / 2.7 - s(10),borderRadius: Sizes.radius, alignSelf: 'center'}}
            />
         </CardView>
      );
   }

   renderImages(item){
    return (
        <CardView
           cardElevation={s(3)}
           cardMaxElevation={s(2)}
           cornerRadius={s(5)}
           paddingBottom={s(10)}
           style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              width: screenWidth / 2.7,
              margin: s(10),
              height: screenHeight / 6.5,
              borderRadius: Sizes.radius,
           }}>
           <Image
              source={{uri : item.item.path, type: item.item.mime}}
              resizeMode="cover"
              style={{height: screenHeight / 6.5 - s(10), width: screenWidth / 2.7 - s(10),borderRadius: Sizes.radius, alignSelf: 'center'}}
           />
        </CardView>
     );
   }

   // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
   addProduct() {
      const {
         weight,
         name,
         image,
      } = this.state.productDetail;
      return (
         <KeyboardAwareScrollView
            keyboardShouldPersistTaps={'handled'}
            enableAutomaticScroll={true}
            showsVerticalScrollIndicator={false}
            enableOnAndroid={true}
            contentContainerStyle={{flexGrow: 1, marginTop: s(15)}}>
            <View>
               <View style={authStyle.textInputBoxStyle}>
                  <View style={authStyle.textInputBoxStyle}>
                     <TextComponent
                        style={{
                           color: this.state.nameFocus
                              ? Colors.black
                              : Colors.gray2,
                        }}>
                        Name
                     </TextComponent>
                     <View
                        style={[
                           authStyle.loginBodyInnerViewContainer,
                           {
                              borderBottomColor: this.state.nameFocus
                                 ? Colors.black
                                 : null,
                           },
                        ]}>
                        <TextInput
                           autoCapitalize="none"
                           autoCorrect={false}
                           onFocus={() => {
                              this.setState({nameFocus: true, qauntityFocus: false, imageFocus: false});
                              this.removeError('email');
                           }}
                           onBlur={() => {
                              this.setState({nameFocus: false});
                           }}
                           value={this.state.email}
                           onChangeText={(text) => {
                              this.setState({email: text});
                           }}
                           placeholder="Enter Name"
                           placeholderTextColor={
                              this.state.nameFocus
                                 ? Colors.gray
                                 : Colors.LIGHT_GRAY
                           }
                           style={{
                              flex: 1,
                              fontSize: Sizes.smallFont,
                              color: Colors.BLACK,
                              paddingVertical:
                                 Platform.OS === 'ios' ? s(5) : s(0),
                           }}
                        />
                        {this.state.errors.includes('email') && (
                           <TextComponent accent>
                              Provide Valid name
                           </TextComponent>
                        )}
                     </View>
                  </View>
               </View>

               {/* price */}
               <View style={authStyle.textInputBoxStyle}>
                  <View style={authStyle.textInputBoxStyle}>
                     <TextComponent
                        style={{
                           color: this.state.priceFocus
                              ? Colors.black
                              : Colors.gray2,
                        }}>
                        Price
                     </TextComponent>
                     <View
                        style={[
                           authStyle.loginBodyInnerViewContainer,
                           {
                              borderBottomColor: this.state.priceFocus
                                 ? Colors.black
                                 : null,
                           },
                        ]}>
                        <TextInput
                           autoCapitalize="none"
                           autoCorrect={false}
                           onFocus={() => {
                              this.setState({priceFocus: true, qauntityFocus: false, imageFocus: false});
                              this.removeError('email');
                           }}
                           onBlur={() => {
                              this.setState({priceFocus: false});
                           }}
                           value={this.state.email}
                           onChangeText={(text) => {
                              this.setState({email: text});
                           }}
                           placeholder="Enter Price"
                           placeholderTextColor={
                              this.state.priceFocus
                                 ? Colors.gray
                                 : Colors.LIGHT_GRAY
                           }
                           style={{
                              flex: 1,
                              fontSize: Sizes.smallFont,
                              color: Colors.BLACK,
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
               </View>

               {/* description */}
               <View style={authStyle.textInputBoxStyle}>
                  <View style={authStyle.textInputBoxStyle}>
                     <TextComponent
                        style={{
                           color: this.state.descriptionFocus
                              ? Colors.black
                              : Colors.gray2,
                        }}>
                        Description
                     </TextComponent>
                     <View
                        style={[
                           authStyle.loginBodyInnerViewContainer,
                           {
                              borderBottomColor: this.state.descriptionFocus
                                 ? Colors.black
                                 : null,
                           },
                        ]}>
                        <TextInput
                           autoCapitalize="none"
                           autoCorrect={false}
                           onFocus={() => {
                              this.setState({descriptionFocus: true, qauntityFocus: false, imageFocus: false});
                              this.removeError('email');
                           }}
                           onBlur={() => {
                              this.setState({descriptionFocus: false});
                           }}
                           value={this.state.email}
                           onChangeText={(text) => {
                              this.setState({email: text});
                           }}
                           placeholder="Enter description"
                           placeholderTextColor={
                              this.state.descriptionFocus
                                 ? Colors.gray
                                 : Colors.LIGHT_GRAY
                           }
                           style={{
                              flex: 1,
                              fontSize: Sizes.smallFont,
                              color: Colors.BLACK,
                              paddingVertical:
                                 Platform.OS === 'ios' ? s(5) : s(0),
                           }}
                        />
                        {this.state.errors.includes('email') && (
                           <TextComponent accent>
                              Provide Description
                           </TextComponent>
                        )}
                     </View>
                  </View>
               </View>

               {/* quantity */}
               <View style={authStyle.textInputBoxStyle}>
                  <View
                     style={[
                        authStyle.textInputBoxStyle,
                        {flexDirection: 'row'},
                     ]}>
                     <TextComponent
                        center
                        style={{
                           color: this.state.qauntityFocus
                              ? Colors.black
                              : Colors.gray2,
                           alignSelf: 'center',
                        }}>
                        Qauntity
                     </TextComponent>
                     <View
                        style={{
                           flexDirection: 'row',
                           justifyContent: 'center',
                           alignItems: 'center',
                        }}>
                        <TouchableOpacity
                           onPress={() => {
                              this.state.quantity <= 1
                                 ? this.setState({qauntityFocus: false})
                                 : this.setState({
                                      quantity: --this.state.quantity,
                                      qauntityFocus: true,
                                      imageFocus: false,
                                   });
                           }}
                           style={{padding: s(5), paddingHorizontal: s(7)}}>
                           <TextComponent
                              gray
                              style={{
                                 fontSize: s(19),
                                 fontWeight: '500',
                                 textAlign: 'center',
                                 padding: s(5),
                              }}>
                              {' '}
                              -{' '}
                           </TextComponent>
                        </TouchableOpacity>
                        <View
                           style={{
                              paddingHorizontal: s(8),
                              borderRadius: s(7),
                              borderColor: Colors.GRAY,
                              borderWidth: 0.5,
                           }}>
                           <TextComponent smallpadding>
                              {this.state.quantity}
                           </TextComponent>
                        </View>
                        <TouchableOpacity
                           onPress={() => {
                              this.setState({
                                 quantity: ++this.state.quantity,
                                 qauntityFocus: true,
                                 imageFocus: false
                              });
                           }}
                           style={{padding: s(5), paddingHorizontal: s(7)}}>
                           <TextComponent
                              gray
                              style={{
                                 fontSize: s(19),
                                 fontWeight: '500',
                                 textAlign: 'center',
                                 padding: s(5),
                              }}>
                              {' '}
                              +{' '}
                           </TextComponent>
                        </TouchableOpacity>
                     </View>
                  </View>
               </View>

               {/* products images */}

               <View style={authStyle.textInputBoxStyle}>
                  <View style={authStyle.textInputBoxStyle}>
                     <TextComponent
                        style={{
                           color: this.state.imageFocus
                              ? Colors.black
                              : Colors.gray2,
                        }}>
                        Add Images
                     </TextComponent>
                  </View>

                  <TouchableOpacity
                     style={[
                        authStyle.textInputBoxStyle,
                        {flexDirection: 'row', justifyContent: 'space-evenly'},
                     ]}
                     onPress={this.onLibrary.bind(this)}
                     >
                     {
                         this.state.images.length <= 0
                        ?
                         this.noImageCardView()
                        :
                        <FlatList
                            data={this.state.images}
                            numColumns={2}
                            style={{ flexWrap: 'wrap' }}
                            contentContainerStyle={[authStyle.textInputBoxStyle, {justifyContent: 'space-evenly', alignContent: 'center'}]}
                            renderItem={this.renderImages}
                            keyExtractor={(item) => item.index}
                            showsVerticalScrollIndicator={false}
                        />
                        }
                  </TouchableOpacity>
               </View>
               {/* button */}
               <View style={authStyle.textInputBoxStyle}>
                  <Button
                     gradient
                     style={authStyle.loginButtonContainer}
                     onPress={() => this.handleLogin()}>
                     <TextComponent bold white center>
                        + Add Product
                     </TextComponent>
                  </Button>
               </View>
            </View>
         </KeyboardAwareScrollView>
      );
   }

   noItemView() {
      return (
         <>
            <View style={[scannerStyle.AddItemContainer]}>
               <Image
                  source={ImagesPath.qrCodeFailIcon}
                  style={{height: s(200), width: s(200)}}
               />
               <Text
                  style={{
                     fontSize: s(25),
                     fontWeight: '500',
                     color: Colors.APPCOLOR,
                     marginTop: s(10),
                  }}>
                  Sorry!
               </Text>
               <Text
                  style={{
                     fontSize: s(16),
                     fontWeight: '500',
                     color: Colors.LIGHT_GRAY2,
                     marginTop: s(10),
                  }}>
                  This item is not approved
               </Text>
               <Text
                  style={{
                     fontSize: s(16),
                     fontWeight: '500',
                     color: Colors.LIGHT_GRAY2,
                  }}>
                  by ShopiRide
               </Text>
            </View>
            <TouchableOpacity
               onPress={() => this.props.navigation.goBack()}
               style={[
                  scannerStyle.modalinnerView2,
                  {
                     backgroundColor: Colors.LIGHT_APPCOLOR,
                     marginBottom: s(25),
                     alignSelf: 'center',
                  },
               ]}>
               <Text
                  style={{
                     color: Colors.WHITE,
                     fontSize: s(18),
                     fontWeight: 'bold',
                  }}>
                  Try Again
               </Text>
            </TouchableOpacity>
         </>
      );
   }

   removeError(key) {
      this.state.errors.splice(this.state.errors.indexOf(key), 1);
   }

   render() {
      let loading =
         this.state.addItemLoading || this.state.sellerProductLoading;
      return loading ? (
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
         <SafeAreaView
            style={[
               scannerStyle.scannerContainer,{backgroundColor: Colors.white}
            ]}>
            {this.addProduct()}
         </SafeAreaView>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      auth: state.Auth,
      home: state.Home,
   };
};

export default connect(mapStateToProps, {
   addItemToShopRequest,
   getSellerProductListRequest,
})(AddProduct);
