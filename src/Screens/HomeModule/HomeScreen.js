// =======>>>>>>>> LIBRARIES <<<<<<<<=======

import React, { Fragment } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, BackHandler, RefreshControl, TouchableOpacity, Image, FlatList, Platform, } from 'react-native';
import { connect } from 'react-redux';

// =======>>>>>>>> ASSETS <<<<<<<<=======
import homeStyle from './homeStyle';
import { Colors, Scale, ImagesPath, LoadWheel, ShineLoader } from '../../CommonConfig';
import { ApplicationStyles } from '../../CommonConfig/ApplicationStyle';
import AppHeader from '../../Assets/Components/AppHeader';
import scannerStyle from '../ScannerModule/scannerStyle';
import { s } from 'react-native-size-matters';
import dealsStyle from '../DealsModule/dealsStyle';
import {
    manageCart,
    manageCartDetails,
    resetCartRequest,
    getProfileDetailRequest,
    getDealCountRequest,
    getBuyerProductListRequest,
    getSellerProductListRequest,
} from '../../Redux/Actions'


// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======
class HomeScreen extends React.Component {

    // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
    state = {
        productList: [],
        buyerProductList: [],
        isLoading_getAlbum: true,
        sellerVerification: false,
        firstItem: [],
        buyerfirstItem: '',
        // loading states
        profileLoading: false,
        dealCountLoading: false,
        buyerProductLoading: false,
        sellerProductLoading: false,
        // profileview states
        profile: null,
        fname: '',
        lname: '',
        dealCount: null,
        refreshing: false,
    }
    // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======
    async componentDidMount() {
        this.setHeader();
        this.props.resetCartRequest()

        if (this.props.scannerMode === 'seller' && this.props.loginSuccess && this.props.sellerVerification  && !this.props.home.sellerProductListSuccess ) {
            await this.requestSellerProductList();
        }

        if(this.props.scannerMode === 'seller' ){
            if (this.props.home.sellerProductListSuccess && this.props.home.sellerProductListresponce.Status === 1) {
                this.setFirstItem()
            }
        }else if(this.props.scannerMode === 'buyer'){
            if(this.props.home.buyerProductListSuccess && this.props.home.buyerProductListResponce.Status === 1){
                this.setFirstItem()
            }
        }
       
        if (this.props.loginSuccess) {
            this.setState({
                fname: this.props.auth.userData.Data ? this.props.auth.userData.Data.firstname !== null ? this.props.auth.userData.Data.firstname : "user" : "USER",
                lname: this.props.auth.userData.Data ? this.props.auth.userData.Data.lastname !== null ? this.props.auth.userData.Data.lastname : "" : "",
                profile: this.props.auth.userData.Data ? this.props.auth.userData.Data.Documents.find(data => data.document_type === "Profile") ? {
                    uri: this.props.auth.userData.Data.Documents.find(data => data.document_type === "Profile").document_url,
                    name: this.props.auth.userData.Data.Documents.find(data => data.document_type === "Profile").document_name,
                } : null : null
            })
            if (this.props.sellerVerification || (this.props.auth.signUpSuccess && this.props.auth.signUpResponce.Status === 1)) {
                this.setState({ sellerVerification: true })
            } else if (!this.props.sellerVerification || (this.props.auth.signUpSuccess && this.props.auth.signUpResponce.Status !== 1)) {
                this.setState({ sellerVerification: false })
            }else if (!this.props.sellerVerification || this.props.auth.signUpSuccess ) {
                this.setState({ sellerVerification: false })
            }
        }
        if(this.props.loginSuccess){
            await this.dealCountRequest()
        }
    }

    componentDidUpdate(prevProps) {
       
        if (this.props.loginSuccess) {
            if ( this.props.sellerVerification && this.props.scannerMode === 'seller' && !this.props.home.sellerProductListresponce && this.props.auth !== prevProps.auth) {
                this.requestSellerProductList()
                this.dealCountRequest()
            }
        }

        if (this.props.loginSuccess) {
            if (this.props.scannerMode !== prevProps.scannerMode ) {
                console.log("here it called");
                this.dealCountRequest()
            }
        }

        // deal count responce
        if(this.props.loginSuccess){
            if (this.props.home.dealCountSuccess && this.state.dealCountLoading && this.props.home.dealCountResponce.Status === 1) {
                if (this.props.home !== prevProps.home) {
                    setTimeout(() => {
                        this.setState({
                            dealCountLoading: false,
                            dealCount: this.props.home.dealCountResponce.Data.DealCount,
                            refreshing: false,
                        })
                        
                    }, 1000)
                }
            } else if (this.props.home.dealCountSuccess && this.state.dealCountLoading && this.props.home.dealCountResponce.Status !== 1) {
                if (this.props.home !== prevProps.home) {
                    this.setState({ dealCountLoading: false, refreshing: false })
                    // this.props.scannerMode === 'seller' && this.props.sellerVerification ? alert(this.props.home.dealCountResponce.Message) : this.props.scannerMode === 'buyer' && alert(this.props.home.dealCountResponce.Message)
                }
            } else if (this.props.home.dealCountSuccess === false) {
                if (this.props.home !== prevProps.home) {
                    this.setState({ dealCountLoading: false, refreshing: false })
                    alert('Something went wrong')
                }
            }
        }

        // seller productList
        if(this.props.loginSuccess){
            if(this.props.scannerMode === 'seller'){
                if (this.props.home.sellerProductListSuccess && this.state.sellerProductLoading && this.props.home.sellerProductListresponce.Status === 1) {
                    if (this.props.home !== prevProps.home) {
                        this.setFirstItem()
                        this.setState({ sellerProductLoading: false, refreshing: false })
                    }
                } else if (this.props.home.sellerProductListSuccess && this.state.sellerProductLoading && this.props.home.sellerProductListresponce.Status !== 1) {
                    if (this.props.home !== prevProps.home) {
                        this.setState({ sellerProductLoading: false, refreshing: false })
                        alert(this.props.sellerProductListresponce.Message)
                    }
                } else if (this.props.home.sellerProductListSuccess === false && this.state.sellerProductLoading) {
                    if (this.props.home !== prevProps.home) {
                        this.setState({ sellerProductLoading: false, refreshing: false })
                        alert("seller list failed")
                    }
                }
            }
        }

        // buyerlist responce
        if(this.props.scannerMode === 'buyer'){
            if (this.props.home.buyerProductListSuccess  && this.props.home.buyerProductListResponce.Status == 1 && this.state.buyerProductLoading) {
                if (this.props.home !== prevProps.home) {
                    this.setFirstItem()
                    this.setState({ buyerProductLoading: false, refreshing: false })
                }
            }else if(this.props.home.buyerProductListSuccess && this.props.home.buyerProductListResponce.Status !== 1 && this.state.buyerProductLoading){
                if (this.props.home !== prevProps.home) {
                    this.setState({ buyerProductLoading: false, refreshing: false })
                    alert(this.props.home.buyerProductListResponce.Message)
                }
            } else if (this.props.home.buyerProductListSuccess === false) {
                if (this.props.home !== prevProps.home) {
                    this.setState({ buyerProductLoading: false, refreshing: false })
                    alert('Something went wrong')
                }
            }
        }

        // authentication check
        if (this.props.loginSuccess) {
            if (this.props.auth !== prevProps.auth) {
                if (this.props.auth.userData.Data) {
                    this.setState({
                        fname: this.props.auth.userData.Data.firstname !== null ? this.props.auth.userData.Data.firstname : "USER",
                        lname: this.props.auth.userData.Data.lastname !== null ? this.props.auth.userData.Data.lastname : "",
                        profile: this.props.auth.userData.Data.Documents.find(data => data.document_type === "Profile") ? {
                            uri: this.props.auth.userData.Data.Documents.find(data => data.document_type === "Profile").document_url,
                            name: this.props.auth.userData.Data.Documents.find(data => data.document_type === "Profile").document_name,
                        } : null
                    })
                }
            }
            if (this.props.sellerVerification || this.props.auth.signUpSuccess) {
                if (this.props.auth != prevProps.auth)
                    this.setState({ sellerVerification: true })
            } else if (!this.props.sellerVerification || !this.props.auth.signUpSuccess) {
                if (this.props.auth != prevProps.auth)
                    this.setState({ sellerVerification: false })


            }
        }
    }


    // =======>>>>>>>> FUNCTIONS DECLARATION <<<<<<<<=======
    setHeader() {
        this.props.navigation.setOptions({

            header: () => {
                return (
                    this.props.scannerMode === 'buyer'
                        ?
                        (<SafeAreaView style={[ApplicationStyles.headerStyle, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <TouchableOpacity
                                style={homeStyle.touchStyle}
                                onPress={() => { this.props.navigation.openDrawer() }}>
                                <Image source={ImagesPath.menuIcon} style={homeStyle.drawerMenuIconStyle} />
                            </TouchableOpacity>
                            <View>
                                <AppHeader />
                            </View>
                            <TouchableOpacity
                                onPress={() => { this.props.navigation.navigate('Scanner') }}
                                style={scannerStyle.touchStyle}>
                                <Image source={ImagesPath.barcodeIcon} style={[scannerStyle.closeIconStyle, { height: s(20), width: s(25) }]} />
                            </TouchableOpacity>
                        </SafeAreaView>)
                        :
                        (<SafeAreaView style={[ApplicationStyles.headerStyle, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <TouchableOpacity
                                style={homeStyle.touchStyle}
                                onPress={() => { this.props.navigation.openDrawer() }}>
                                <Image source={ImagesPath.menuIcon} style={homeStyle.drawerMenuIconStyle} />
                            </TouchableOpacity>
                            <View>
                                <AppHeader />
                            </View>
                            {
                                this.state.sellerVerification
                                    ? <TouchableOpacity
                                        onPress={() => { this.props.navigation.navigate('DashBoard') }}
                                        style={scannerStyle.touchStyle}>
                                        <Image source={ImagesPath.dashboardIcon} style={[scannerStyle.closeIconStyle, { height: s(20), width: s(25) }]} />
                                    </TouchableOpacity>
                                    : <View style={scannerStyle.touchStyle} />

                            }

                        </SafeAreaView>)
                );
            },
        })
    }

    // ================>>>>>>>>>>>>> APIS <<<<<<<<<<<<<===============
    requestprofileDetail() {
        if (this.props.loginSuccess) {
            this.setState({ profileLoading: true })
            this.props.getProfileDetailRequest({
                "userid": this.props.auth.userData.Data.userId,
                "access_key": "nousername",
                "secret_key": this.props.token,
                "device_type": Platform.OS === 'android' ? "1" : "0",
                "device_token": ""
            })
        }
    }

    addToCart(id){
       
        let addedItem = this.props.home.buyerProductListResponce.Data.find(item => item.id === id)

                //check if the action product_id exists in the addedItems
                let existed_item = this.props.home.addedItems.find(item => id === item.id)
                if (existed_item) {
                    // let addedItems = this.props.home.addedItems.splice(this.props.home.addedItems.indexOf(id), 1)
                    let newTotal = parseFloat(this.props.home.total) + parseFloat(addedItem.product_price)
                    ++addedItem.cartquantity
                    let params = {
                        addedItem :addedItem,
                        total : newTotal.toFixed(2)
                    }
                    this.props.manageCart(params)
                }
                else {
                    addedItem.cartquantity = 1;
                    //calculating the total
                    let newTotal = parseFloat(this.props.home.total) + parseFloat(addedItem.product_price)

                    let params = {
                        addedItem,total : newTotal.toFixed(2)
                    }
                    this.props.manageCart(params)
                }
    }

    subtractQauntity(id){
        let addedItem = this.props.home.buyerProductListResponce.Data.find(item => item.id === id)
        //if the qt == 0 then it should be removed
        if (addedItem.cartquantity === 1) {
            let new_items = this.props.home.addedItems.filter(item => item.id !== id)
            let newTotal = parseFloat(this.props.home.total) - parseFloat(addedItem.product_price)
           
            let params = {
                addedItem : new_items, total: newTotal.toFixed(2)
            }
            this.props.manageCartDetails(params)
        }
        else {
            addedItem.cartquantity -= 1
            let newTotal = parseFloat(this.props.home.total) - parseFloat(addedItem.product_price)
           
            let params = {
                addedItem,total : newTotal.toFixed(2)
            }
            this.props.manageCart(params)
        }
    }

    dealCountRequest() {
        if (this.props.loginSuccess) {
            this.setState({ dealCountLoading: true })
            this.props.getDealCountRequest({
                "userid": this.props.auth.userData.Data.userId,
                "access_key": this.props.access_key,
                "secret_key": this.props.secret_key,
                "device_type": Platform.OS === 'android' ? "1" : "0",
                "device_token": "",
                "userType": this.props.scannerMode === 'seller' ? 'Seller' : 'Buyer'
            })
        }
    }

    requestBuyerProductList() {
        this.setState({ buyerProductLoading: true })
        this.props.getBuyerProductListRequest({
            "QrcodeNumber": global.QrofShop,
            "access_key": "nousername",
            "secret_key": this.props.token,
            "device_type": Platform.OS === 'ios' ? '0' : '1',
            "device_token": ""
        })
    }

    async requestSellerProductList() {
        this.setState({ sellerProductLoading: true })
        let requestParams = {
            "userid": this.props.auth.userData.Data.userId,
            "access_key": this.props.access_key,
            "secret_key": this.props.secret_key,
            "device_type": Platform.OS == 'android' ? "1" : "0",
            "device_token": ""
        }
        await this.props.getSellerProductListRequest(requestParams);
    }

    setFirstItem() {
        if (this.props.scannerMode === 'buyer') {
            let Arr = [...this.props.home.buyerProductListResponce.Data];
            this.setState({ buyerfirstItem: Arr.splice(0, 1) })
            this.setState({ buyerProductList: Arr })
        } else if (this.props.scannerMode === 'seller' && this.props.home.sellerProductListresponce.Data) {
            let Arr = [...this.props.home.sellerProductListresponce.Data];
            this.setState({ firstItem: Arr.splice(0, 1) })
            this.setState({ productList: Arr })
        }
    }

    async onRefresh() {
        this.setState({ refreshing: true })
        await this.dealCountRequest()
        this.props.scannerMode === 'buyer'
            ? await this.requestBuyerProductList()
            : this.props.loginSuccess && this.props.sellerVerification && await this.requestSellerProductList()
    }

    checkverification() {
        if (!this.props.loginSuccess) {
            this.props.navigation.navigate('Login')
        } else if (this.props.loginSuccess && !this.props.sellerVerification) {
            this.props.navigation.navigate('BecomeSeller')
        }
    }

    NoVeriFicationSellerView() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.BACKGROUD }}>
                <View style={homeStyle.noVerificationContainer}>
                    <Text style={{ padding: s(4), fontWeight: 'bold', fontSize: s(19), color: Colors.WHITESHADE }}>Your Verification is Pending</Text>
                    <TouchableOpacity
                        onPress={this.checkverification.bind(this)}
                        style={{ padding: s(4) }}>
                        <Text style={{ fontWeight: 'bold', fontSize: s(17), color: Colors.WHITESHADE, textDecorationLine: 'underline' }}>Click here</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: s(17), color: Colors.GRAY }}>Click "+" to Add an Item</Text>
                    {this.floatingButton()}
                </View>
            </View>
        );
    }

    VerifiedSellerView() {
        return (
            <View style={{ flex: 1 }}>
                {this.floatingButton()}
                {this.bannerView()}
                {this.profileView()}
                {
                    this.props.home.sellerProductListSuccess && this.props.home.sellerProductListresponce.Data
                        ? <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh.bind(this)}
                                />
                            }>
                            {this.sellerfirstItemView()}
                            <View style={{ borderRadius: s(10), flex: 1, backgroundColor: Colors.BACKGROUD, justifyContent: 'center', width: '98%', marginTop: s(15), alignSelf: 'center' }}>
                                <FlatList
                                    numColumns={2}
                                    style={{ flexWrap: 'wrap' }}
                                    data={this.state.productList}
                                    renderItem={({ item }) => this.sellerRenderProductList(item)}
                                    keyExtractor={(item) => item.id.toString()}
                                    showsVerticalScrollIndicator={false}
                                />
                            </View>
                        </ScrollView>
                        :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: s(17), color: Colors.GRAY }}>Click "+" to Add an Item</Text>
                            {this.floatingButton()}
                        </View>
                }

            </View>
        );
    }

    renderProductList(item) {
        let imagedata = { uri: item.image_url, name: item.image }
        let quantity;
        this.props.home.addedItems.map(data => {
            if (data.id == item.id) {
                quantity = data.cartquantity;
            }
        })
        return (
            <View style={{ margin: '2%', borderColor: Colors.APPCOLOR, borderRadius: s(9), width: '46%', padding: s(2), backgroundColor: Colors.WHITE }}>
                {/* image View */}
                <View style={{ justifyContent: 'space-between', paddingHorizontal: s(2), flexDirection: 'row' }}>
                    <Text style={{ fontSize: s(13), fontWeight: '500', color: Colors.LIGHT_GRAY2, padding: s(2) }}>{item.weight}</Text>
                </View>
                <View style={[dealsStyle.cartImageContainerStyle, { height: s(80), width: s(80), }]}>
                    <Image source={imagedata ? imagedata : ImagesPath.noProductIcon} resizeMode={'contain'} style={{ height: s(80), width: s(80) }} />
                </View>
                <View style={{ paddingHorizontal: s(7), paddingVertical: s(5) }}>
                    <Text style={{ fontSize: s(15), fontWeight: '500', color: Colors.BLACKSHADE }}>{item.product_name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: s(2) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ marginHorizontal: s(5), justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={ImagesPath.multiproductsIcon} style={{ height: s(12), width: s(13), tintColor: Colors.APPCOLOR }} />
                            </View>
                            <View style={{ marginHorizontal: s(5), justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={ImagesPath.CloseIcon} style={{ height: s(12), width: s(7), tintColor: Colors.BLACKSHADE }} />
                            </View>
                            <Text style={{ fontSize: s(14), fontWeight: '500', color: Colors.BLACKSHADE }}>{item.quantity}</Text>
                        </View>
                        <Text style={{ fontSize: s(16), fontWeight: '500', color: Colors.BLACK }}>${item.product_price}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => {
                            if (quantity > 0) {
                                // this.props.subtractToCartRequest(item.id)
                                this.subtractQauntity(item.id)
                            }
                        }} style={{ padding: s(7) }}>
                            <Text style={{ fontSize: s(19), color: Colors.LIGHT_GRAY, fontWeight: '500', textAlign: 'center' }}>-</Text>
                        </TouchableOpacity>
                        <View style={{ paddingHorizontal: s(8), borderRadius: s(7), borderColor: Colors.GRAY, borderWidth: 0.5, paddingHorizontal: s(2) }}>
                            <Text style={{ fontSize: s(15), fontWeight: '500', textAlign: 'center', paddingHorizontal: s(7), paddingVertical: s(3), color: Colors.GRAY }}>
                                {quantity ? quantity : 0}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            if (quantity >= item.quantity) {
                                alert('Out Of Stocks')
                            } else {
                                // this.props.addToCart(item.id)
                                this.addToCart(item.id)
                            }
                        }} style={{ padding: s(7) }}>
                            <Text style={{ fontSize: s(19), color: Colors.LIGHT_GRAY, fontWeight: '500', textAlign: 'center' }}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            if (quantity >= item.quantity) {
                                alert('Out Of Stocks')
                            } else {
                                // this.props.addToCart(item.id)
                                this.addToCart(item.id)
                            }
                        }}
                        style={[homeStyle.addButton, {
                            alignSelf: 'flex-end',
                            backgroundColor: this.props.home.addedItems.find(additem => additem.id == item.id) ? Colors.APPCOLOR : Colors.WHITE,
                        }]}>
                        <Text
                            style={[homeStyle.addText, { color: this.props.home.addedItems.find(additem => additem.id == item.id) ? Colors.WHITE : Colors.APPCOLOR }]}>
                            {this.props.home.addedItems.find(additem => additem.id == item.id) ? 'Added' : "Add"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    sellerRenderProductList(item) {
        return (
            <View style={{ margin: '2%', borderWidth: item.is_promo_product === 1 ? s(2) : s(0), borderColor: Colors.APPCOLOR, borderRadius: s(9), width: '46%', padding: s(2), backgroundColor: Colors.WHITE }}>
                {/* image View */}
                <View style={{ justifyContent: 'space-between', paddingHorizontal: s(2), flexDirection: 'row' }}>
                    <Text style={{ fontSize: s(13), fontWeight: '500', color: Colors.LIGHT_GRAY2, padding: s(2) }}>{item.weight}</Text>
                    <TouchableOpacity style={{ alignSelf: 'flex-end', paddingHorizontal: s(7), paddingVertical: s(5) }}>
                        <Image source={ImagesPath.optionsIcon} style={{ height: s(13), width: s(3.5), tintColor: Colors.APPCOLOR }} />
                    </TouchableOpacity>
                </View>
                <View style={[dealsStyle.cartImageContainerStyle, { height: s(80), width: s(80), }]}>
                    <Image source={{ uri: item.image_url, name: item.image }} resizeMode={'contain'} style={{ height: s(80), width: s(80) }} />
                </View>
                <View style={{ paddingHorizontal: s(7), paddingVertical: s(5) }}>
                    <Text style={{ fontSize: s(15), fontWeight: '500', color: Colors.BLACKSHADE }}>{item.product_name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: s(2) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ marginHorizontal: s(5), justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={ImagesPath.multiproductsIcon} style={{ height: s(12), width: s(13), tintColor: Colors.APPCOLOR }} />
                            </View>
                            <View style={{ marginHorizontal: s(5), justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={ImagesPath.CloseIcon} style={{ height: s(12), width: s(7), tintColor: Colors.BLACKSHADE }} />
                            </View>
                            <Text style={{ fontSize: s(14), fontWeight: '500', color: Colors.BLACKSHADE }}>{item.quantity}</Text>
                        </View>
                        <Text style={{ fontSize: s(16), fontWeight: '500', color: Colors.BLACK }}>${item.product_price}</Text>
                    </View>
                </View>
            </View>
        );
    }

    firstItemView() {
        let quantity;
        this.state.buyerfirstItem[0]
            ? this.props.home.addedItems.map(data => {
                if (data.id == this.state.buyerfirstItem[0].id) {
                    quantity = data.cartquantity;
                }
            })
            : null
        return (
            this.state.buyerfirstItem[0] != null
                ?
                <View style={[scannerStyle.AddItemContainer, { borderRadius: s(15), flexDirection: 'row', width: '92%', alignSelf: 'center', flex: 0, marginTop: s(10) }]}>
                    <View style={{ padding: s(5) }}>
                        <View style={[dealsStyle.cartImageContainerStyle, { alignSelf: 'flex-start' }]}>
                            <Image source={{ uri: this.state.buyerfirstItem[0].image_url, name: this.state.buyerfirstItem[0].image }} resizeMode={'contain'} style={{ height: s(80), width: s(80) }} />

                        </View>
                        <View style={{ flexDirection: 'row', left: s(10), justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start' }}>
                            <TouchableOpacity onPress={() => {
                                if (quantity > 0) {
                                    // this.props.subtractToCartRequest(this.state.buyerfirstItem[0].id)
                                    this.subtractQauntity(this.state.buyerfirstItem[0].id)
                                }
                            }} style={{ padding: s(7) }}>
                                <Text style={{ fontSize: s(19), color: Colors.GRAY, fontWeight: '500', textAlign: 'center', }}> - </Text>
                            </TouchableOpacity>
                            <View style={{ paddingHorizontal: s(8), paddingVertical: s(4), borderRadius: s(7), borderColor: Colors.LIGHT_GRAY, borderWidth: 1 }}>
                                <Text style={{ fontSize: s(15), fontWeight: '500', padding: s(3), textAlign: 'center', color: Colors.GRAY }}>
                                    {quantity ? quantity : 0}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                if (quantity >= this.state.buyerfirstItem[0].quantity) {
                                    alert('Out Of Stocks')
                                } else {
                                    // this.props.addToCart(this.state.buyerfirstItem[0].id)
                                    this.addToCart(this.state.buyerfirstItem[0].id)
                                }
                            }} style={{ padding: s(7) }}>
                                <Text style={{ fontSize: s(19), color: Colors.GRAY, fontWeight: '500', textAlign: 'center', }}> + </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ flex: 1, paddingHorizontal: s(10), alignSelf: 'flex-start', paddingVertical: s(5) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: s(25), paddingVertical: s(2) }}>
                            <Text style={{ fontSize: s(16), fontWeight: '500', color: Colors.BLACK, marginTop: s(10) }}>{this.state.buyerfirstItem[0].product_name}</Text>
                            <Text style={{ fontSize: s(15), fontWeight: '500', color: Colors.GRAY, marginTop: s(10) }}>{this.state.buyerfirstItem[0].weight}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingVertical: s(5) }}>
                            <View style={{ marginHorizontal: s(5), justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={ImagesPath.multiproductsIcon} style={{ height: s(12), width: s(13), tintColor: Colors.APPCOLOR }} />
                            </View>
                            <View style={{ marginHorizontal: s(5), justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={ImagesPath.CloseIcon} style={{ height: s(12), width: s(7), tintColor: Colors.BLACKSHADE }} />
                            </View>
                            <Text style={{ fontSize: s(15), fontWeight: '500', color: Colors.BLACK }}>{this.state.buyerfirstItem[0].quantity}</Text>
                        </View>
                        <View style={{ alignSelf: 'flex-end' }}>
                            <Text style={{ fontSize: s(17), fontWeight: '500', paddingRight: s(12), color: Colors.BLACK }}>${this.state.buyerfirstItem[0].product_price}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                if (quantity >= this.state.buyerfirstItem[0].quantity) {
                                    alert('Out Of Stocks')
                                } else {
                                    // this.props.addToCart(this.state.buyerfirstItem[0].id)
                                    this.addToCart(this.state.buyerfirstItem[0].id)
                                }
                            }}
                            style={[homeStyle.addButton, {
                                marginTop: s(25),
                                alignSelf: 'flex-end',
                                backgroundColor: this.props.home.addedItems.find(item => item.id == this.state.buyerfirstItem[0].id) ? Colors.APPCOLOR : Colors.WHITE,
                            }]}>
                            <Text
                                style={[homeStyle.addText, { color: this.props.home.addedItems.find(item => item.id == this.state.buyerfirstItem[0].id) ? Colors.WHITE : Colors.APPCOLOR }]}>
                                {this.props.home.addedItems.find(item => item.id == this.state.buyerfirstItem[0].id) ? 'Added' : "Add"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                : null
        );
    }

    sellerfirstItemView() {
        return (
            this.state.firstItem[0] != null
                ?
                <View style={[scannerStyle.AddItemContainer, { borderRadius: s(15), borderWidth: this.state.firstItem[0].is_promo_product === 1 ? s(2) : s(0), flexDirection: 'row', width: '92%', alignSelf: 'center', flex: 0, marginTop: s(10) }]}>
                    <View style={{ padding: s(5) }}>
                        <View style={[dealsStyle.cartImageContainerStyle, { alignSelf: 'flex-start' }]}>
                            <Image source={{ uri: this.state.firstItem[0].image_url, name: this.state.firstItem[0].image }} resizeMode={'contain'} style={{ height: s(80), width: s(80) }} />

                        </View>
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: s(10), alignSelf: 'flex-start', paddingVertical: s(5) }}>

                        <TouchableOpacity style={{ alignSelf: 'flex-end', paddingHorizontal: s(15), paddingVertical: s(5) }}>
                            <Image source={ImagesPath.optionsIcon} style={{ height: s(13), width: s(3.5), tintColor: Colors.APPCOLOR }} />
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: s(25), paddingVertical: s(2) }}>
                            <Text style={{ fontSize: s(16), fontWeight: '500', color: Colors.BLACK, marginTop: s(10) }}>{this.state.firstItem[0].product_name}</Text>
                            <Text style={{ fontSize: s(15), fontWeight: '500', color: Colors.GRAY, marginTop: s(10) }}>{this.state.firstItem[0].weight}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingVertical: s(5) }}>
                            <View style={{ marginHorizontal: s(5), justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={ImagesPath.multiproductsIcon} style={{ height: s(12), width: s(13), tintColor: Colors.APPCOLOR }} />
                            </View>
                            <View style={{ marginHorizontal: s(5), justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={ImagesPath.CloseIcon} style={{ height: s(12), width: s(7), tintColor: Colors.BLACKSHADE }} />
                            </View>
                            <Text style={{ fontSize: s(15), fontWeight: '500', color: Colors.BLACK }}>{this.state.firstItem[0].quantity}</Text>
                        </View>
                        <View style={{ alignSelf: 'flex-end' }}>
                            <Text style={{ fontSize: s(17), fontWeight: '500', paddingRight: s(12), color: Colors.BLACK }}>${this.state.firstItem[0].product_price}</Text>
                        </View>
                    </View>
                </View>
                : null
        );
    }

    bannerView() {
        return (
            <View style={homeStyle.bannerViewStyle}>
                <Image source={ImagesPath.bannerIcon} resizeMode="cover" style={{ height: s(100), width: '100%', borderRadius: s(10), }} />
            </View>
        );
    }

    profileView() {
        return (
            <View style={{ flexDirection: 'row', padding: s(5), margin: s(20), marginBottom: s(10) }}>
                <View style={dealsStyle.imageViewContainerStyle}>
                    <Image source={this.state.profile ? this.state.profile : ImagesPath.profilePictureIcon}  resizeMode="cover" style={[dealsStyle.imageStyle, { height: s(60), width: s(60) }]} />
                </View>
                <View style={{ paddingHorizontal: s(10), justifyContent: 'center', flex: 1 }}>
                    <Text style={{ fontSize: s(16), fontWeight: '600', paddingVertical: s(3), width: s(200) }} numberOfLines={1}>{this.capital_letter(this.state.fname)} {this.capital_letter(this.state.lname)}</Text>
                    <Text style={{ fontSize: s(14), fontWeight: '500', paddingVertical: s(3), color: Colors.BLACKSHADE }}>Deals <Text style={{ fontWeight: '600', fontSize: s(14), color: Colors.BLACK }}> - {this.state.dealCount ? this.state.dealCount : '0'}</Text></Text>
                </View>
            </View>
        );
    }

    capital_letter(s) {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }


    floatingButton() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Scanner')} style={homeStyle.floatingButton} >
                <Image source={ImagesPath.plusIcon} style={{ height: s(17), width: s(17) }} />
            </TouchableOpacity>
        )
    }

    floatingBuyButton() {
        return (
            <TouchableOpacity onPress={() => {
                if (this.props.loginSuccess) {
                    this.props.navigation.navigate('Cart')
                } else {
                    this.props.navigation.navigate('Login')
                }
            }} style={homeStyle.floatingBuyButton} >
                <Text style={[homeStyle.floatingtextStyle, { textAlign: 'center' }]}>Buy</Text>
                <Text style={[homeStyle.floatingtextStyle, { right: s(10), position: 'absolute', textAlign: 'center' }]}>${this.props.home.total}</Text>
            </TouchableOpacity>
        )
    }

    BuyerHomeScreen() {
        return (
            <View style={{ flex: 1 }}>
                {
                    this.props.home.total > 0
                        ? this.floatingBuyButton()
                        : null
                }
                {this.bannerView()}
                {
                    this.props.loginSuccess
                        ? this.profileView()
                        : null
                }
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }>
                    {this.firstItemView()}
                    <View style={[{ marginBottom: this.props.home.total > 0 ? s(80) : s(0), borderRadius: s(10), alignSelf: 'center', flex: 1, backgroundColor: Colors.BACKGROUD, justifyContent: 'center', margin: s(10) }]}>
                        <FlatList
                            numColumns={2}
                            style={{ flexWrap: 'wrap' }}
                            data={this.state.buyerProductList}
                            renderItem={({ item }) => this.renderProductList(item)}
                            keyExtractor={(item) => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </ScrollView>

            </View>
        );
    }

    // Main render
    render() {
        let loading = this.state.dealCountLoading || this.state.sellerProductLoading || this.state.buyerProductLoading
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.BACKGROUD }}>
                {
                    loading
                        ?
                        <LoadWheel visible={loading} />
                        :
                        (
                            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.BACKGROUD }}>
                                {
                                    this.props.scannerMode === 'buyer'
                                        ?
                                        this.BuyerHomeScreen()
                                        :
                                        this.props.loginSuccess && this.props.sellerVerification
                                            ? this.VerifiedSellerView()
                                            : this.NoVeriFicationSellerView()
                                }
                            </SafeAreaView>
                        )
                }
            </SafeAreaView>
        );
    };
}

// =======>>>>>>>> PROPS CONNECTION <<<<<<<<=======
const mapStateToProps = (state) => {
    return {
        scannerMode: state.Common.scannerMode,
        token: state.Common.refreshTokenSuccess && state.Common.refreshTokenResponce && state.Common.refreshTokenResponce.tempToken,
        auth: state.Auth,
        home: state.Home,
        secret_key: state.Auth.sendOtpSuccess && state.Auth.sendOtpResponce && state.Auth.sendOtpResponce.userToken,
        access_key: state.Auth.testEncryptionSuccess && state.Auth.testEncryptionResponce && state.Auth.testEncryptionResponce.encrypted_value,
        sellerVerification: (state.Auth.signUpSuccess && state.Auth.signUpResponce.Status === 1)
            || (state.Auth.checkOtpSuccess && state.Auth.checkOtpResponce.Status == 1 && state.Auth.checkOtpResponce.Data.userverificationstatus == 1 && state.Auth.checkOtpResponce.Data.documentverificationstatus == 1),
        loginSuccess: state.Auth.checkOtpSuccess && state.Auth.checkOtpResponce.Status == 1 && state.Auth.checkOtpResponce.Data.userverificationstatus == 1,
    };
}

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(
    mapStateToProps,
    {
        manageCart,
        resetCartRequest,
        manageCartDetails,
        getProfileDetailRequest,
        getDealCountRequest,
        getBuyerProductListRequest,
        getSellerProductListRequest
    })(HomeScreen);