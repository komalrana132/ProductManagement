import React, { Component } from 'react'
import { View, Modal } from 'react-native';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Shine,
    Fade
} from "rn-placeholder";
export const HomeShineLoader = ({ visible }) => {
    if (visible) {

        return (
            <View style={{ backgroundColor: 'white' }}>
                <View visible={visible} animated={true} style={{ padding: 10 }}>
                    <Placeholder Animation={Shine} Left={PlaceholderMedia}>
                        <PlaceholderLine width={80} />
                        <PlaceholderLine />
                        <PlaceholderLine width={30} />
                    </Placeholder>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View visible={visible} animated={true} style={{ flex: 0.5, padding: 15 }}>
                        <Placeholder Animation={Shine} Left={PlaceholderMedia}>
                            <PlaceholderLine width={80} />
                            <PlaceholderLine />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                    </View>

                    <View visible={visible} animated={true} style={{ flex: 0.5, padding: 15 }}>
                        <Placeholder Animation={Shine} Left={PlaceholderMedia}>
                            <PlaceholderLine width={80} />
                            <PlaceholderLine />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                    </View>
                </View>
                
                <View style={{ flexDirection: 'row' }}>
                    <View visible={visible} animated={true} style={{ flex: 0.5, padding: 15 }}>
                        <Placeholder Animation={Shine} Left={PlaceholderMedia}>
                            <PlaceholderLine width={80} />
                            <PlaceholderLine />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                    </View>

                    <View visible={visible} animated={true} style={{ flex: 0.5, padding: 15 }}>
                        <Placeholder Animation={Shine} Left={PlaceholderMedia}>
                            <PlaceholderLine width={80} />
                            <PlaceholderLine />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View visible={visible} animated={true} style={{ flex: 0.5, padding: 15 }}>
                        <Placeholder Animation={Shine} Left={PlaceholderMedia}>
                            <PlaceholderLine width={80} />
                            <PlaceholderLine />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                    </View>

                    <View visible={visible} animated={true} style={{ flex: 0.5, padding: 15 }}>
                        <Placeholder Animation={Shine} Left={PlaceholderMedia}>
                            <PlaceholderLine width={80} />
                            <PlaceholderLine />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View visible={visible} animated={true} style={{ flex: 0.5, padding: 15 }}>
                        <Placeholder Animation={Shine} Left={PlaceholderMedia}>
                            <PlaceholderLine width={80} />
                            <PlaceholderLine />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                    </View>

                    <View visible={visible} animated={true} style={{ flex: 0.5, padding: 15 }}>
                        <Placeholder Animation={Shine} Left={PlaceholderMedia}>
                            <PlaceholderLine width={80} />
                            <PlaceholderLine />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View visible={visible} animated={true} style={{ flex: 0.5, padding: 15 }}>
                        <Placeholder Animation={Shine} Left={PlaceholderMedia}>
                            <PlaceholderLine width={80} />
                            <PlaceholderLine />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                    </View>

                    <View visible={visible} animated={true} style={{ flex: 0.5, padding: 15 }}>
                        <Placeholder Animation={Shine} Left={PlaceholderMedia}>
                            <PlaceholderLine width={80} />
                            <PlaceholderLine />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View visible={visible} animated={true} style={{ flex: 0.5, padding: 15 }}>
                        <Placeholder Animation={Shine} Left={PlaceholderMedia}>
                            <PlaceholderLine width={80} />
                            <PlaceholderLine />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                    </View>

                    <View visible={visible} animated={true} style={{ flex: 0.5, padding: 15 }}>
                        <Placeholder Animation={Shine} Left={PlaceholderMedia}>
                            <PlaceholderLine width={80} />
                            <PlaceholderLine />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View visible={visible} animated={true} style={{ flex: 0.5, padding: 15 }}>
                        <Placeholder Animation={Shine} Left={PlaceholderMedia}>
                            <PlaceholderLine width={80} />
                            <PlaceholderLine />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                    </View>

                    <View visible={visible} animated={true} style={{ flex: 0.5, padding: 15 }}>
                        <Placeholder Animation={Shine} Left={PlaceholderMedia}>
                            <PlaceholderLine width={80} />
                            <PlaceholderLine />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View visible={visible} animated={true} style={{ flex: 0.5, padding: 15 }}>
                        <Placeholder Animation={Shine} Left={PlaceholderMedia}>
                            <PlaceholderLine width={80} />
                            <PlaceholderLine />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                    </View>

                    <View visible={visible} animated={true} style={{ flex: 0.5, padding: 15 }}>
                        <Placeholder Animation={Shine} Left={PlaceholderMedia}>
                            <PlaceholderLine width={80} />
                            <PlaceholderLine />
                            <PlaceholderLine width={30} />
                        </Placeholder>
                    </View>
                </View>
                
            </View>
        )
    } else { return null }

}