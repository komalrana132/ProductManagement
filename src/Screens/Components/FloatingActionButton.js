import React, {PureComponent} from 'react';
import {View, SafeAreaView, StyleSheet, Alert} from 'react-native';
import {FloatingAction} from 'react-native-floating-action'; // eslint-disable-line import/no-unresolved
import {ImagesPath, Colors} from '../../CommonConfig';
import {s} from 'react-native-size-matters';

class FloatingActionButton extends PureComponent {

   render() {
      const actions = [
         {
            text: 'Add product',
            icon: ImagesPath.sellerIcon,
            name: 'bt_addproduct',
            position: 4,
         },
         {
            text: 'Sort by Name',
            icon: ImagesPath.dealsIcon,
            name: 'bt_srt_name',
            position: 3,
         },
         {
            text: 'Price -- Low to High',
            icon: ImagesPath.multiproductsIcon,
            name: 'bt_lth',
            position: 2,
         },
         {
            text: 'Price -- High to Low',
            icon: ImagesPath.cashPayIcon,
            name: 'bt_htl',
            position: 1,
         },
      ];

      return (
         // <SafeAreaView style={styles.container}>
         //    <View style={styles.container}>
               <FloatingAction
                  color={Colors.APPCOLOR}
                  actions={actions}
                  position="right"
                  buttonSize={s(50)}
                  // showBackground={false}
                  onPressItem={this.props.onPressItem}
               />
             
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: Colors.white,
   },
});

export default FloatingActionButton;
