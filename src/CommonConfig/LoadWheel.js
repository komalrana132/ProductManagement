import React, { Component } from 'react'
import { View, Text, Modal, ActivityIndicator } from 'react-native';
import Colors from './Colors';
import { Scale } from '.';

export const LoadWheel = ({ visible }) => {
    return (
        <Modal visible={visible} transparent style={{ flex: 1 }}>
            <View style={{ justifyContent: 'center', position: "absolute", backgroundColor: "transparent", height: visible ? '100%' : 0, width: visible ? '100%' : 0, alignItems: 'center' }}>
                <View style={{ height: Scale(85), width: Scale(85), borderRadius: Scale(10), justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={Colors.gray} />
                </View>
            </View>
        </Modal>
    )
}