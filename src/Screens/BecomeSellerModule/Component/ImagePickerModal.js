import React, { Component } from "react";
import { Dimensions, Text, View, Modal, StyleSheet, Image,Animated, TouchableOpacity, TextInput } from 'react-native';
import { s, vs, ms } from 'react-native-size-matters';
import { Colors, ImagesPath } from '../../../CommonConfig'
import { SafeAreaView } from "react-native-safe-area-context";
import scannerStyle from "../../ScannerModule/scannerStyle";

class ImagePickerModal extends Component {
    render() {
        return (
            <Modal
                animationType="slide"
                visible={this.props.visible}
                transparent
                onRequestClose={() => {this.props.close}}>
                <TouchableOpacity style={scannerStyle.modalContainer} onPress={this.props.close}>
                   <SafeAreaView style={scannerStyle.modalinnerView}>
                    <TouchableOpacity onPress={this.props.close} style={{ alignItems: 'center', position: 'absolute', top: s(12)}}>
                        <Image source={ImagesPath.minusIcon} style={{height: s(3), width: s(50), tintColor: Colors.GRAY}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.onCamera()} style={scannerStyle.modalinnerView2}>
                        <Text style={{color: Colors.WHITE, fontSize: s(16), fontWeight: 'bold'}}>Open Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.onLibrary()} style={scannerStyle.modalinnerView2}>
                        <Text style={{color: Colors.WHITE, fontSize: s(16), fontWeight: 'bold'}}>Choose From Library</Text>
                    </TouchableOpacity>
                   </SafeAreaView>
                </TouchableOpacity>
            </Modal>
        );
    }
}

export default ImagePickerModal;