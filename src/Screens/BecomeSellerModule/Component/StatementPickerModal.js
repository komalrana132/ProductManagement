import React, { Component } from "react";
import { Dimensions, Text, View, Modal, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { s, vs, ms } from 'react-native-size-matters';
import { Colors, ImagesPath } from '../../../CommonConfig'
import { SafeAreaView } from "react-native-safe-area-context";
import scannerStyle from "../../ScannerModule/scannerStyle";

class StatementPickerModal extends Component {
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
                        <Image source={ImagesPath.minusIcon} style={{height: s(3), width: s(50), tintColor: Colors.GRAY, tintColor: Colors.GRAY}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.onCamera()} style={[scannerStyle.modalinnerView2, 
                        {justifyContent: 'flex-start', paddingHorizontal: s(15), backgroundColor: Colors.WHITE, borderColor: Colors.APPCOLOR, borderWidth: 1}]}>
                        <Image source={ImagesPath.camera} style={{height: s(16), width: s(20), tintColor: Colors.APPCOLOR}} />
                        <Text style={{color: Colors.APPCOLOR, fontSize: s(16), fontWeight: '500', paddingHorizontal: s(10)}}>Take a Picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.onLibrary()} style={[scannerStyle.modalinnerView2, 
                        {justifyContent: 'flex-start', paddingHorizontal: s(15), backgroundColor: Colors.WHITE, borderColor: Colors.APPCOLOR, borderWidth: 1}]}>
                        <Image source={ImagesPath.galleryIcon} style={{height: s(16), width: s(20), tintColor: Colors.APPCOLOR}} />
                        <Text style={{color: Colors.APPCOLOR, fontSize: s(16), fontWeight: '500', paddingHorizontal: s(10)}}>Upload File from Device</Text>
                    </TouchableOpacity>
                   </SafeAreaView>
                </TouchableOpacity>
            </Modal >
        );
    }
}

export default StatementPickerModal;