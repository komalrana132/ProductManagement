import React, {Component} from 'react';
import {
   Dimensions,
   Text,
   View,
   StyleSheet,
   Image,
   Modal,
   Animated,
   TouchableOpacity,
   TextInput,
} from 'react-native';
import {s, vs, ms} from 'react-native-size-matters';
import {PanGestureHandler} from 'react-native-gesture-handler';
import IconMD from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Colors, ImagesPath} from '../../CommonConfig';
import Button from './Button';
// import Modal from 'react-native-modal';
let translateX = new Animated.Value(0);
let translateY = new Animated.Value(0);
let failOffsetX = 120;
class PickImageModel extends Component {
   
   handleGesture = Animated.event(
      [
         {
            nativeEvent: {
              //  translationX: translateX,
            translationY: translateY,
            },
         },
      ],
      {useNativeDriver: true},
   );
   render() {
      return (
         <Modal
            // animationIn="slideInUp"
            // animationOut="slideOutDown"
            animationType="slide"
            transparent
            visible={this.props.visible}
            style={{borderWidth: 3}}
            onRequestClose={this.props.close}>
            <TouchableOpacity
               style={styles.modalContainer}
               onPress={this.props.close}
               activeOpacity={1}>
               <PanGestureHandler onGestureEvent={this.handleGesture} >
                  <Animated.View
                     style={[
                        styles.modalinnerView,
                        styles.modelInnerViewPanStyle
                     ]}>
                     {/* closing line image */}
                     <TouchableOpacity
                        // onPress={this.props.close}
                        style={{
                           alignItems: 'center',
                           position: 'absolute',
                           top: s(12),
                        }}>
                        <Image
                           source={ImagesPath.minusIcon}
                           style={{
                              height: s(3),
                              width: s(50),
                              tintColor: Colors.GRAY,
                           }}
                        />
                     </TouchableOpacity>

                     {/* inner  button */}
                     <View
                        style={{
                           flexDirection: 'row',
                           justifyContent: 'space-around',
                           width: '80%',
                        }}>
                        <Button onPress={() => this.props.onCamera()}>
                           <IconMD
                              name="add-a-photo"
                              size={s(70)}
                              color={Colors.APPCOLOR}
                           />
                        </Button>

                        <Button onPress={() => this.props.onLibrary()}>
                           <FontAwesome
                              name="file-picture-o"
                              size={s(60)}
                              color={Colors.APPCOLOR}
                           />
                        </Button>
                     </View>
                  </Animated.View>
               </PanGestureHandler>
            </TouchableOpacity>
         </Modal>
      );
   }
}

const styles = StyleSheet.create({
   modalContainer: {
      backgroundColor: 'rgba(0,0,0,0.50)',
      alignItems: 'center',
      justifyContent: 'flex-end',
      flex: 1,
   },
   modalinnerView: {
      backgroundColor: Colors.white,
      overflow: 'hidden',
      elevation: 4,
      borderTopLeftRadius: s(25),
      borderTopRightRadius: s(25),
      alignItems: 'center',
      justifyContent: 'center',
      height: '30%',
      width: '100%',
   },
   modelInnerViewPanStyle: {
      transform: [
         {
            translateY: translateY,
         },
         {
            translateX: translateX,
         },
      ],
   },
});

export default PickImageModel;
