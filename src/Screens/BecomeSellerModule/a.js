
// // import React, {Component} from 'react';
// // import {
// //   View, Text, StyleSheet, ScrollView, Alert,
// //   Image, TouchableOpacity, NativeModules, Dimensions
// // } from 'react-native';

// // // import Video from 'react-native-video';

// // var ImagePicker = NativeModules.ImageCropPicker;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center'
// //   },
// //   button: {
// //     backgroundColor: 'blue',
// //     marginBottom: 10
// //   },
// //   text: {
// //     color: 'white',
// //     fontSize: 20,
// //     textAlign: 'center'
// //   }
// // });

// // export default class App extends Component {

// //   constructor() {
// //     super();
// //     this.state = {
// //       image: null,
// //       images: null
// //     };
// //   }

// //   pickSingleWithCamera(cropping, mediaType='photo') {
// //     ImagePicker.openCamera({
// //       cropping: cropping,
// //       width: 500,
// //       height: 500,
// //       includeExif: true,
// //       mediaType,
// //     }).then(image => {
// //       console.log('received image', image);
// //       this.setState({
// //         image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
// //         images: null
// //       });
// //     }).catch(e => alert(e));
// //   }

// //   pickSingleBase64(cropit) {
// //     ImagePicker.openPicker({
// //       width: 300,
// //       height: 300,
// //       cropping: cropit,
// //       includeBase64: true,
// //       includeExif: true,
// //     }).then(image => {
// //       console.log('received base64 image');
// //       this.setState({
// //         image: {uri: `data:${image.mime};base64,`+ image.data, width: image.width, height: image.height},
// //         images: null
// //       });
// //     }).catch(e => alert(e));
// //   }

// //   cleanupImages() {
// //     ImagePicker.clean().then(() => {
// //       console.log('removed tmp images from tmp directory');
// //     }).catch(e => {
// //       alert(e);
// //     });
// //   }

// //   cleanupSingleImage() {
// //     let image = this.state.image || (this.state.images && this.state.images.length ? this.state.images[0] : null);
// //     console.log('will cleanup image', image);

// //     ImagePicker.cleanSingle(image ? image.uri : null).then(() => {
// //       console.log(`removed tmp image ${image.uri} from tmp directory`);
// //     }).catch(e => {
// //       alert(e);
// //     })
// //   }

// //   cropLast() {
// //     if (!this.state.image) {
// //       return Alert.alert('No image', 'Before open cropping only, please select image');
// //     }

// //     ImagePicker.openCropper({
// //       path: this.state.image.uri,
// //       width: 200,
// //       height: 200
// //     }).then(image => {
// //       console.log('received cropped image', image);
// //       this.setState({
// //         image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
// //         images: null
// //       });
// //     }).catch(e => {
// //       console.log(e);
// //       Alert.alert(e.message ? e.message : e);
// //     });
// //   }

// //   pickSingle(cropit, circular=false, mediaType) {
// //     ImagePicker.openPicker({
// //       width: 500,
// //       height: 500,
// //       cropping: cropit,
// //       cropperCircleOverlay: circular,
// //       sortOrder: 'none',
// //       compressImageMaxWidth: 1000,
// //       compressImageMaxHeight: 1000,
// //       compressImageQuality: 1,
// //       compressVideoPreset: 'MediumQuality',
// //       includeExif: true,
// //     }).then(image => {
// //       console.log('received image', image);
// //       this.setState({
// //         image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
// //         images: null
// //       });
// //     }).catch(e => {
// //       console.log(e);
// //       Alert.alert(e.message ? e.message : e);
// //     });
// //   }

// //   pickMultiple() {
// //     ImagePicker.openPicker({
// //       multiple: true,
// //       waitAnimationEnd: false,
// //       sortOrder: 'desc',
// //       includeExif: true,
// //       forceJpg: true,
// //     }).then(images => {
// //       this.setState({
// //         image: null,
// //         images: images.map(i => {
// //           console.log('received image', i);
// //           return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
// //         })
// //       });
// //     }).catch(e => alert(e));
// //   }

// //   scaledHeight(oldW, oldH, newW) {
// //     return (oldH / oldW) * newW;
// //   }

// //   renderVideo(video) {
// //     console.log('rendering video');
// //     return (<View style={{height: 300, width: 300}}>
// //       <Video source={{uri: video.uri, type: video.mime}}
// //          style={{position: 'absolute',
// //             top: 0,
// //             left: 0,
// //             bottom: 0,
// //             right: 0
// //           }}
// //          rate={1}
// //          paused={false}
// //          volume={1}
// //          muted={false}
// //          resizeMode={'cover'}
// //          onError={e => console.log(e)}
// //          onLoad={load => console.log(load)}
// //          repeat={true} />
// //      </View>);
// //   }

// //   renderImage(image) {
// //     return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
// //   }

// //   renderAsset(image) {
// //     if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
// //       return this.renderVideo(image);
// //     }

// //     return this.renderImage(image);
// //   }

// //   render() {
// //     return (<View style={styles.container}>
// //       <ScrollView>
// //         {this.state.image ? this.renderAsset(this.state.image) : null}
// //         {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
// //       </ScrollView>

// //       <TouchableOpacity onPress={() => this.pickSingleWithCamera(false)} style={styles.button}>
// //         <Text style={styles.text}>Select Single Image With Camera</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity onPress={() => this.pickSingleWithCamera(false, mediaType='video')} style={styles.button}>
// //         <Text style={styles.text}>Select Single Video With Camera</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity onPress={() => this.pickSingleWithCamera(true)} style={styles.button}>
// //         <Text style={styles.text}>Select Single With Camera With Cropping</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity onPress={() => this.pickSingle(false)} style={styles.button}>
// //         <Text style={styles.text}>Select Single</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity onPress={() => this.cropLast()} style={styles.button}>
// //         <Text style={styles.text}>Crop Last Selected Image</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity onPress={() => this.pickSingleBase64(false)} style={styles.button}>
// //         <Text style={styles.text}>Select Single Returning Base64</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity onPress={() => this.pickSingle(true)} style={styles.button}>
// //         <Text style={styles.text}>Select Single With Cropping</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity onPress={() => this.pickSingle(true, true)} style={styles.button}>
// //         <Text style={styles.text}>Select Single With Circular Cropping</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity onPress={this.pickMultiple.bind(this)} style={styles.button}>
// //         <Text style={styles.text}>Select Multiple</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity onPress={this.cleanupImages.bind(this)} style={styles.button}>
// //         <Text style={styles.text}>Cleanup All Images</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity onPress={this.cleanupSingleImage.bind(this)} style={styles.button}>
// //         <Text style={styles.text}>Cleanup Single Image</Text>
// //       </TouchableOpacity>
// //     </View>);
// //   }
// // }
































// import React, { useState } from 'react'
// import {
//   Text,
//   StyleSheet,
//   PixelRatio,
//   Switch,
//   Button,
//   ScrollView,
// } from 'react-native'
// import CountryPicker, { CountryModalProvider } from './src/'
// import { CountryCode, Country } from './src/types'
// import { Row } from './src/Row'
// import { DARK_THEME } from './src/CountryTheme'

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   welcome: {
//     fontSize: 17,
//     textAlign: 'center',
//     margin: 5,
//   },
//   instructions: {
//     fontSize: 10,
//     textAlign: 'center',
//     color: '#888',
//     marginBottom: 0,
//   },
//   data: {
//     maxWidth: 250,
//     padding: 10,
//     marginTop: 7,
//     backgroundColor: '#ddd',
//     borderColor: '#888',
//     borderWidth: 1 / PixelRatio.get(),
//     color: '#777',
//   },
// })

// interface OptionProps {
//   title: string
//   value: boolean
//   onValueChange(value: boolean): void
// }
// const Option = ({ value, onValueChange, title }: OptionProps) => (
//   <Row fullWidth>
//     <Text style={styles.instructions}>{title}</Text>
//     <Switch {...{ value, onValueChange }} />
//   </Row>
// )

// export default function App() {
//   const [countryCode, setCountryCode] = useState<CountryCode | undefined>()
//   const [country, setCountry] = useState<Country>(null)
//   const [withCountryNameButton, setWithCountryNameButton] = useState<boolean>(
//     false,
//   )
//   const [withCurrencyButton, setWithCurrencyButton] = useState<boolean>(false)
//   const [withFlagButton, setWithFlagButton] = useState<boolean>(true)
//   const [withCallingCodeButton, setWithCallingCodeButton] = useState<boolean>(
//     false,
//   )
//   const [withFlag, setWithFlag] = useState<boolean>(true)
//   const [withEmoji, setWithEmoji] = useState<boolean>(true)
//   const [withFilter, setWithFilter] = useState<boolean>(true)
//   const [withAlphaFilter, setWithAlphaFilter] = useState<boolean>(false)
//   const [withCallingCode, setWithCallingCode] = useState<boolean>(false)
//   const [withCurrency, setWithCurrency] = useState<boolean>(false)
//   const [withModal, setWithModal] = useState<boolean>(true)
//   const [visible, setVisible] = useState<boolean>(false)
//   const [dark, setDark] = useState<boolean>(false)
//   const [disableNativeModal, setDisableNativeModal] = useState<boolean>(false)
//   const onSelect = (country: Country) => {
//     setCountryCode(country.cca2)
//     setCountry(country)
//   }
//   const switchVisible = () => setVisible(!visible)
//   return (
//     <CountryModalProvider>
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.welcome}>Welcome to Country Picker !</Text>
//         <Option
//           title='With country name on button'
//           value={withCountryNameButton}
//           onValueChange={setWithCountryNameButton}
//         />
//         <Option
//           title='With currency on button'
//           value={withCurrencyButton}
//           onValueChange={setWithCurrencyButton}
//         />
//         <Option
//           title='With calling code on button'
//           value={withCallingCodeButton}
//           onValueChange={setWithCallingCodeButton}
//         />
//         <Option
//           title='With flag'
//           value={withFlag}
//           onValueChange={setWithFlag}
//         />
//         <Option
//           title='With emoji'
//           value={withEmoji}
//           onValueChange={setWithEmoji}
//         />
//         <Option
//           title='With filter'
//           value={withFilter}
//           onValueChange={setWithFilter}
//         />
//         <Option
//           title='With calling code'
//           value={withCallingCode}
//           onValueChange={setWithCallingCode}
//         />
//         <Option
//           title='With currency'
//           value={withCurrency}
//           onValueChange={setWithCurrency}
//         />
//         <Option
//           title='With alpha filter code'
//           value={withAlphaFilter}
//           onValueChange={setWithAlphaFilter}
//         />
//         <Option
//           title='Without native modal'
//           value={disableNativeModal}
//           onValueChange={setDisableNativeModal}
//         />
//         <Option
//           title='With modal'
//           value={withModal}
//           onValueChange={setWithModal}
//         />
//         <Option title='With dark theme' value={dark} onValueChange={setDark} />
//         <Option
//           title='With flag button'
//           value={withFlagButton}
//           onValueChange={setWithFlagButton}
//         />
//         <CountryPicker
//           theme={dark ? DARK_THEME : {}}
//           {...{
//             countryCode,
//             withFilter,
//             excludeCountries: ['FR'],
//             withFlag,
//             withCurrencyButton,
//             withCallingCodeButton,
//             withCountryNameButton,
//             withAlphaFilter,
//             withCallingCode,
//             withCurrency,
//             withEmoji,
//             withModal,
//             withFlagButton,
//             onSelect,
//             disableNativeModal,
//             modalProps: {
//               visible,
//             },
//             onClose: () => setVisible(false),
//             onOpen: () => setVisible(true),
//           }}
//         />
//         <Text style={styles.instructions}>Press on the flag to open modal</Text>
//         <Button
//           title={'Open modal from outside using visible props'}
//           onPress={switchVisible}
//         />
//         {country !== null && (
//           <Text style={styles.data}>{JSON.stringify(country, null, 0)}</Text>
//         )}
//       </ScrollView>
//     </CountryModalProvider>
//   )
// }





import React, { useState } from 'react'
import { View, Text, StyleSheet, PixelRatio, Switch } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'

const styles = StyleSheet.create({
  // ...
})

export default function App() {
  const [countryCode, setCountryCode] = useState('FR')
  const [country, setCountry] = useState(null)
  const [withCountryNameButton, setWithCountryNameButton] = useState(
    false,
  )
  const [withFlag, setWithFlag] = useState(true)
  const [withEmoji, setWithEmoji] = useState(true)
  const [withFilter, setWithFilter] = useState(true)
  const [withAlphaFilter, setWithAlphaFilter] = useState(false)
  const [withCallingCode, setWithCallingCode] = useState(false)
  const onSelect = (country) => {
    setCountryCode(country.cca2)
    setCountry(country)
  }
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Country Picker !</Text>
      <Option
        title='With country name on button'
        value={withCountryNameButton}
        onValueChange={setWithCountryNameButton}
      />
      <Option title='With flag' value={withFlag} onValueChange={setWithFlag} />
      <Option
        title='With emoji'
        value={withEmoji}
        onValueChange={setWithEmoji}
      />
      <Option
        title='With filter'
        value={withFilter}
        onValueChange={setWithFilter}
      />
      <Option
        title='With calling code'
        value={withCallingCode}
        onValueChange={setWithCallingCode}
      />
      <Option
        title='With alpha filter code'
        value={withAlphaFilter}
        onValueChange={setWithAlphaFilter}
      />
      <CountryPicker
        {...{
          countryCode,
          withFilter,
          withFlag,
          withCountryNameButton,
          withAlphaFilter,
          withCallingCode,
          withEmoji,
          onSelect,
        }}
        visible
      />
      <Text style={styles.instructions}>Press on the flag to open modal</Text>
      {country !== null && (
        <Text style={styles.data}>{JSON.stringify(country, null, 2)}</Text>
      )}
    </View>
  )
}