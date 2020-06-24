import React, { Component } from "react";
import { Dimensions, Text, View, Modal, StyleSheet, Image,RefreshControl, TouchableOpacity, TextInput } from 'react-native';
import { s, vs, ms } from 'react-native-size-matters';
import { Colors, ImagesPath } from '../../../CommonConfig'
import { SafeAreaView } from "react-native-safe-area-context";
import scannerStyle from '../scannerStyle';
import { CommonActions } from "@react-navigation/native";
class ScannerModal extends Component {
    state={
        barcode: '307667491555',
        //  66643178, 60865217,74221986
        QRcode: '74221986',
    }
    render() {
        return (
            <Modal
                animationType="slide"
                visible={this.props.visible}
                transparent
                onRequestClose={this.props.close}>
                <TouchableOpacity style={scannerStyle.modalContainer} onPress={this.props.close}>
                   <SafeAreaView style={scannerStyle.modalinnerView}>
                    <TouchableOpacity onPress={this.props.close} style={{ alignItems: 'center', position: 'absolute', top: s(12)}}>
                        <Image source={ImagesPath.minusIcon} style={{height: s(3), width: s(50), tintColor: Colors.GRAY}}/>
                    </TouchableOpacity>
                    <TextInput
                        placeholder={this.props.scannerMode === 'buyer' ? 'Enter QR code' : 'Enter BarCode'}
                        placeholderTextColor={Colors.GRAY}
                        value={this.props.scannerMode === 'buyer' ? this.state.QRcode : this.state.barcode}
                        onChangeText= {(text) => {
                            this.props.scannerMode === 'buyer'
                            ? this.setState({QRcode: text})
                            : this.setState({barcode: text})
                        }}
                        style={{paddingVertical: s(5), fontSize: s(14), paddingVertical: s(10)}}
                    />
                    <TouchableOpacity onPress={() => {this.props.onSubmit(this.props.scannerMode === 'buyer' ? this.state.QRcode : this.state.barcode) }} style={scannerStyle.modalinnerView2}>
                        <Text style={{color: Colors.WHITE, fontSize: s(16), fontWeight: 'bold'}}>Submit</Text>
                    </TouchableOpacity>
                   </SafeAreaView>
                </TouchableOpacity>
            </Modal >
        );
    }
}

export default ScannerModal;