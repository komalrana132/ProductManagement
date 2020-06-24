// =======>>>>>>>> LIBRARIES <<<<<<<<=======

import * as React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TouchableOpacity, Image, FlatList, } from 'react-native';
import { connect } from 'react-redux';
import { CardStyleInterpolators } from '@react-navigation/stack';

// =======>>>>>>>> ASSETS <<<<<<<<=======
import { Colors, Scale, ImagesPath, LoadWheel, ShineLoader } from '../../CommonConfig';
import { ApplicationStyles } from '../../CommonConfig/ApplicationStyle';
import { screenHeight } from '../../CommonConfig/HelperFunctions/functions';
import homeStyle from '../HomeModule/homeStyle'
import AppHeader from '../../Assets/Components/AppHeader';
import { becomeSellerStyles } from '../BecomeSellerModule/becomeSellerStyle';
import { s } from 'react-native-size-matters';
import dealsStyle from '../DealsModule/dealsStyle';
import {
    manageCartDetails,
    manageCart
} from '../../Redux/Actions'
import settingScreenStyle from '../SettingsModule/settingScreenStyle';



// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======
class CartScreen extends React.Component {
    // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
    state = {
        temp: true
    }
    // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======

    componentDidMount() {
        console.disableYellowBox = true //warning disable line
        this.setHeader()
    }
    componentDidUpdate(prevProps) {

    }

    removeItemFromCart(id) {
        let itemToRemove = this.props.home.addedItems.find(item => id === item.id)
        let new_items = this.props.home.addedItems.filter(item => id !== item.id)
        //calculating the total
        let newTotal = parseFloat(this.props.home.total) - parseFloat(itemToRemove.product_price) * parseFloat(itemToRemove.cartquantity)
        console.log(itemToRemove)
        let params = {
            addedItem: new_items,
            total: newTotal.toFixed(2)
        }
        this.props.manageCartDetails(params)
    }

    addToCart(id) {

        let addedItem = this.props.home.buyerProductListResponce.Data.find(item => item.id === id)

        //check if the action product_id exists in the addedItems
        let existed_item = this.props.home.addedItems.find(item => id === item.id)
        if (existed_item) {
            let newTotal = parseFloat(this.props.home.total) + parseFloat(addedItem.product_price)
            ++addedItem.cartquantity
            let params = {
                addedItem: addedItem,
                total: newTotal.toFixed(2)
            }
            this.props.manageCart(params)
        }
        else {
            addedItem.cartquantity = 1;
            //calculating the total
            let newTotal = parseFloat(this.props.home.total) + parseFloat(addedItem.product_price)
            let params = {
                addedItem, total: newTotal.toFixed(2)
            }
            this.props.manageCart(params)
        }

    }

    subtractQauntity(id) {
        let addedItem = this.props.home.buyerProductListResponce.Data.find(item => item.id === id)
        //if the qt == 0 then it should be removed
        if (addedItem.cartquantity === 1) {
            let new_items = this.props.home.addedItems.filter(item => item.id !== id)
            let newTotal = parseFloat(this.props.home.total) - parseFloat(addedItem.product_price)
            // return {
            //     ...state,
            //     addedItems: new_items,
            //     total: newTotal.toFixed(2)
            // }
            let params = {
                addedItem: new_items, total: newTotal.toFixed(2)
            }
            this.props.manageCartDetails(params)
        }
        else {
            addedItem.cartquantity -= 1
            let newTotal = parseFloat(this.props.home.total) - parseFloat(addedItem.product_price)
            // return {
            //     ...state,
            //     total: newTotal.toFixed(2)
            // }
            let params = {
                addedItem, total: newTotal.toFixed(2)
            }
            this.props.manageCart(params)
        }
    }


    // =======>>>>>>>> FUNCTIONS DECLARATION <<<<<<<<=======
    setHeader() {
        this.props.navigation.setOptions({
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            header: () => {
                return (
                    <SafeAreaView style={[ApplicationStyles.headerStyle, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: s(0) }]}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}
                            style={homeStyle.touchStyle}
                        >
                            <Image source={ImagesPath.backIcon} style={becomeSellerStyles.backIconStyle} />
                        </TouchableOpacity>
                        <View >
                            <Text style={ApplicationStyles.headerTitleStyle}>YOUR CART</Text>
                        </View>
                        <View
                            style={scannerStyle.touchStyle}>
                            {/* <Image source={ImagesPath.CloseIcon} style={scannerStyle.closeIconStyle} /> */}
                        </View>
                    </SafeAreaView>
                );
            },
        })
    }

    onSubmit() {
        this.props.navigation.navigate('CartPaymentMethods')
    }

    // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
    renderCartItem(item) {
        return (
            <View style={[scannerStyle.AddItemContainer, { borderRadius: s(15), flexDirection: 'row', width: '95%', alignSelf: 'center', flex: 0, margin: s(10) }]}>
                <View style={{ padding: s(5) }}>
                    <View style={[dealsStyle.cartImageContainerStyle, { alignSelf: 'flex-start' }]}>
                        <Image source={{ uri: item.image_url, name: item.image }} resizeMode={'contain'} style={{ height: s(80), width: s(80) }} />

                    </View>
                    <View style={{ flexDirection: 'row', left: s(10), justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start' }}>
                        <TouchableOpacity onPress={() => {
                            if (item.cartquantity > 0) {
                                // this.props.subtractToCartRequest(item.id)
                                this.subtractQauntity(item.id)
                                // this.setState({ temp: !temp })
                            }
                        }} style={{ padding: s(7) }}>
                            <Text style={{ fontSize: s(19), color: Colors.GRAY, fontWeight: '500', textAlign: 'center', }}> - </Text>
                        </TouchableOpacity>
                        <View style={{ paddingHorizontal: s(8), paddingVertical: s(4), borderRadius: s(7), borderColor: Colors.LIGHT_GRAY, borderWidth: 1 }}>
                            <Text style={{ fontSize: s(15), fontWeight: '500', padding: s(3), textAlign: 'center', color: Colors.GRAY }}>
                                {item.cartquantity}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            if (item.cartquantity >= item.quantity) {
                                alert('Out Of Stocks')
                            } else {
                                // this.props.incrementToCartRequest(item.id)
                                this.addToCart(item.id)
                                // this.setState({ temp: !temp })
                            }
                        }} style={{ padding: s(7) }}>
                            <Text style={{ fontSize: s(19), color: Colors.GRAY, fontWeight: '500', textAlign: 'center', }}> + </Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={{ flex: 1, paddingHorizontal: s(10), alignSelf: 'flex-start', paddingVertical: s(5) }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: s(25), paddingVertical: s(2) }}>
                        <Text style={{ fontSize: s(16), fontWeight: '500', color: Colors.BLACK, marginTop: s(10) }}>{item.product_name}</Text>
                        <Text style={{ fontSize: s(15), fontWeight: '500', color: Colors.GRAY, marginTop: s(10) }}>{item.weight}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: s(5) }}>
                        <View style={{ marginHorizontal: s(5), justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={ImagesPath.multiproductsIcon} style={{ height: s(12), width: s(13), tintColor: Colors.APPCOLOR }} />
                        </View>
                        <View style={{ marginHorizontal: s(5), justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={ImagesPath.CloseIcon} style={{ height: s(12), width: s(7), tintColor: Colors.BLACKSHADE }} />
                        </View>
                        <Text style={{ fontSize: s(15), fontWeight: '500', color: Colors.BLACK }}>{item.quantity}</Text>
                    </View>
                    <View style={{ alignSelf: 'flex-end' }}>
                        <Text style={{ fontSize: s(17), fontWeight: '500', paddingRight: s(12), color: Colors.BLACK }}>${(item.product_price * item.cartquantity).toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => { this.removeItemFromCart(item.id) }}
                        style={[homeStyle.addButton, {
                            marginTop: s(25),
                            alignSelf: 'flex-end',
                            backgroundColor: Colors.WHITE
                        }]}>
                        <Text style={[homeStyle.addText, { color: Colors.APPCOLOR }]}> Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }


    render() {
        return (
            <View style={[{ flex: 1, backgroundColor: Colors.BACKGROUD }]}>
                {
                    this.props.total == 0
                        ?
                        <>
                            <View style={{ marginBottom: s(75), justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <Image source={ImagesPath.noProductIcon} style={{ height: s(200), width: s(200) }} />
                            </View>
                            <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={[homeStyle.floatingBuyButton, { alignSelf: 'center' }]} >
                                <Text style={[homeStyle.floatingtextStyle, { textAlign: 'center' }]}>Continue Shopping</Text>
                            </TouchableOpacity>
                        </>

                        : <>
                            <View style={{ marginBottom: s(75), flex: 1 }}>
                                <FlatList
                                    data={this.props.addedItems}
                                    renderItem={({ item }) => this.renderCartItem(item)}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                            </View>
                            <TouchableOpacity onPress={() => { this.onSubmit() }} style={[homeStyle.floatingBuyButton, { alignSelf: 'center' }]} >
                                <Text style={[homeStyle.floatingtextStyle, { textAlign: 'center' }]}>Continue</Text>
                                <Text style={[homeStyle.floatingtextStyle, { right: s(10), position: 'absolute', textAlign: 'center' }]}>${this.props.total}</Text>
                            </TouchableOpacity>
                        </>
                }
            </View>
        );
    };
}

// =======>>>>>>>> PROPS CONNECTION <<<<<<<<=======
const mapStateToProps = (state) => {
    return {
        addedItems: state.Home.addedItems,
        total: state.Home.total,
        home: state.Home,
    };
}

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(mapStateToProps,
    {
        manageCartDetails,
        manageCart
    }
)(CartScreen);