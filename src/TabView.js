// =======>>>>>>>> LIBRARIES <<<<<<<<=======

import React, { Fragment } from 'react';
import { SafeAreaView, TouchableOpacity, Easing, Image, Button, Animated, StyleSheet, ScrollView, View, Text, StatusBar, } from 'react-native';
import { ImagesPath, Colors, Scale } from './CommonConfig';
global.springValue1 = new Animated.Value(0.9)
global.springValue2 = new Animated.Value(0.8)
global.springValue3 = new Animated.Value(0.8)
global.springValue4 = new Animated.Value(0.8)

export function Tabbar({ state, descriptors, navigation }) {
    return (
        <View style={{ flexDirection: 'row', height: Scale(65) }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;
                const spring = (val) => {
                    global.springValue1.setValue(0.8)
                    global.springValue2.setValue(0.8)
                    global.springValue3.setValue(0.8)
                    global.springValue4.setValue(0.8)
                    if (val == 0) {
                        Animated.spring(
                            global.springValue1,
                            {
                                toValue: 0.9,
                                friction: 1
                            }
                        ).start()
                    } else if (val == 1) {
                        Animated.spring(
                            global.springValue2,
                            {
                                toValue: 0.9,
                                friction: 1
                            }
                        ).start()
                    } else if (val == 2) {
                        Animated.spring(
                            global.springValue3,
                            {
                                toValue: 0.9,
                                friction: 1
                            }
                        ).start()
                    } else if (val == 3) {
                        Animated.spring(
                            global.springValue4,
                            {
                                toValue: 0.9,
                                friction: 1
                            }
                        ).start()
                    }
                }
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });
                    spring(index)
                    console.log(index, "indexindex")
                    if (!isFocused && !event.defaultPrevented) {
                        if (route.name == 'Settings') {
                            navigation.openDrawer();
                        } else {
                            navigation.navigate(route.name);
                        }
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        activeOpacity={1}
                        onLongPress={onLongPress}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isFocused ? Colors.primary : Colors.WHITE }}
                    >
                        {index == 0 && <Animated.Image source={isFocused ? ImagesPath.HomeActiveIcon : ImagesPath.HomeInActiveIcon} style={[{ height: isFocused ? Scale(32) : Scale(30), width: isFocused ? Scale(32) : Scale(30), tintColor: isFocused ? Colors.APPCOLOR : Colors.gray }, global.springValue1 ? { transform: [{ scale: global.springValue1 }] } : {}]} resizeMode={'contain'} />}
                        {index == 1 && <Animated.Image source={isFocused ? ImagesPath.StoriesActiveIcon : ImagesPath.StoriesInActiveIcon} style={[{ height: isFocused ? Scale(32) : Scale(30), width: isFocused ? Scale(32) : Scale(30), tintColor: isFocused ? Colors.APPCOLOR : Colors.gray }, global.springValue2 ? { transform: [{ scale: global.springValue2 }] } : {}]} resizeMode={'contain'} />}
                        {index == 2 && <Animated.Image source={isFocused ? ImagesPath.PeopleActiveIcon : ImagesPath.PeopleInActiveIcon} style={[{ height: isFocused ? Scale(32) : Scale(30), width: isFocused ? Scale(32) : Scale(30), tintColor: isFocused ? Colors.APPCOLOR : Colors.gray }, global.springValue3 ? { transform: [{ scale: global.springValue3 }] } : {}]} resizeMode={'contain'} />}
                        {index == 3 && <Animated.Image source={isFocused ? ImagesPath.MenuIcon : ImagesPath.MenuIcon} style={[{ height: isFocused ? Scale(32) : Scale(30), width: isFocused ? Scale(32) : Scale(30), tintColor: isFocused ? Colors.APPCOLOR : Colors.gray }, global.springValue4 ? { transform: [{ scale: global.springValue4 }] } : {}]} resizeMode={'contain'} />}

                        {/*------>>>>>> IF YOU WANT TO DISPLAY LABELS UNDER TAB ICON ENABLE THIS BELOW LINE <<<<<<--------*/}
                        {/* <Text style={{ color: isFocused ? Colors.APPCOLOR : Colors.LIGHT_GRAY }}>
                            {label}
                        </Text> */}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

