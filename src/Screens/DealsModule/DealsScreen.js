// =======>>>>>>>> LIBRARIES <<<<<<<<=======

import * as React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TouchableOpacity, Image, FlatList, Platform, } from 'react-native';
import { connect } from 'react-redux';

// =======>>>>>>>> ASSETS <<<<<<<<=======
import { Colors, Scale, ImagesPath, LoadWheel, ShineLoader } from '../../CommonConfig';
import homeStyle from '../HomeModule/homeStyle'
import { ApplicationStyles } from '../../CommonConfig/ApplicationStyle';
import { screenHeight } from '../../CommonConfig/HelperFunctions/functions';
import AppHeader from '../../Assets/Components/AppHeader';
import dealsStyle from './dealsStyle';
import { DATA } from '../.././DATA';
import { s, ms } from 'react-native-size-matters';
import {
    getDealsListRequest,
    getDisputeListRequest
} from '../../Redux/Actions'
import { ActivityIndicator } from 'react-native-paper';



// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======

export class DealsScreen extends React.Component {
    // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
    state = {
        tabSelected: 'deals',
        dealsLoading: false,
        disputeLoading: false,
        isRefreshing: false,
    }


    // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======
    componentDidMount() {
        console.disableYellowBox = true //warning disable line
        this.setHeader();
        if (this.props.loginSuccess) {
            this.requestDealList()
        }
        // this.setState({ disputeLoading: true })
        // this.props.getDisputeListRequest(DATA);
    }

    componentDidUpdate(prevProps) {
        if (this.props.home.dealsListSuccess && this.state.dealsLoading && this.props.home.dealsList.Status === 1) {
            if (this.props.home !== prevProps.home) {
                this.setState({ dealsLoading: false, onRefreshing : false })
            }
        } else if (this.props.home.dealsListSuccess && this.state.dealsLoading && this.props.home.dealsList.Status !== 1) {
            if (this.props.home !== prevProps.home) {
                this.setState({ dealsLoading: false, onRefreshing : false })
                // alert(this.props.home.dealsList.Message)
            }
        } else if (this.props.home.dealsListSuccess === false) {
            if (this.props.home !== prevProps.home) {
                this.setState({ dealsLoading: false, onRefreshing : false })
                alert('Something went wrong')
            }
        }

        if (this.props.home.disputeListSuccess && this.state.disputeLoading && this.props.home.disputeList.Status === 1) {
            if (this.props.home !== prevProps.home) {
                this.setState({ disputeLoading: false,onRefreshing : false })
            }
        } else if (this.props.home.disputeListSuccess && this.state.disputeLoading && this.props.home.dealsList.Status !== 1) {
            if (this.props.home !== prevProps.home) {
                this.setState({ disputeLoading: false,onRefreshing : false })
                alert(this.props.home.disputeList.Message)
            }
        } else if (this.props.home.disputeListSuccess === false && this.state.disputeLoading) {
            if (this.props.home !== prevProps.home) {
                this.setState({ disputeLoading: false,onRefreshing : false })
                alert('Something went wrong')
            }
        }

    }

    // =======>>>>>>>> FUNCTIONS DECLARATION <<<<<<<<=======
    setHeader() {
        this.props.navigation.setOptions({
            header: () => {
                return (
                    <SafeAreaView style={[ApplicationStyles.headerStyle, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <TouchableOpacity
                            style={homeStyle.touchStyle}
                            onPress={() => { this.props.navigation.openDrawer() }}>
                            <Image source={ImagesPath.menuIcon} style={homeStyle.drawerMenuIconStyle} />
                        </TouchableOpacity>
                        <View>
                            <Text style={[ApplicationStyles.headerTitleStyle, { fontWeight: '600' }]}>DEALS</Text>
                        </View>
                        <View
                            style={scannerStyle.touchStyle}>
                        </View>

                    </SafeAreaView>
                );
            }
        })
    }

    requestDealList() {
        this.setState({dealsLoading: true})
        let requestParamas = {
            "userid": this.props.auth.userData.Data.userId,
            "userType": this.props.scannerMode === 'seller' ? 'Seller' : 'Buyer',
            "access_key": this.props.access_key,
            "secret_key": this.props.secret_key,
            "device_type": Platform.OS === 'android' ? "1" : "0",
            "device_token": ""
        }
        this.props.getDealsListRequest(requestParamas)
    }

    onRefresh() {
        if(this.state.tabSelected === 'deals'){
            this.requestDealList()
        }else{
            // refund api will be here
        }
    }

    // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
    renderDealsTabView(item) {
        let createDate = new Date(item.createdAt)
        let careteDateStart = createDate.toDateString().replace(/^\S+\s/, '').split(' ')
        careteDateStart = `${careteDateStart[1]} ${careteDateStart[0]}, ${careteDateStart[2]}`
        // let time = getUTCHours(new Date(item.createdAt))
        return (
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('DetailDeal', { deal: item }) }} style={{ flexDirection: 'row', padding: s(5), borderRadius: 10, backgroundColor: Colors.WHITE, margin: s(5) }}>
                <View style={dealsStyle.imageViewContainerStyle}>
                    <Image source={item.document_url ? { uri: item.document_url, name: item.document_name } : ImagesPath.profilePictureIcon} style={dealsStyle.imageStyle} />
                </View>
                <View style={dealsStyle.dealsViewContainerStyle}>
                    <Text style={{ fontSize: s(15), fontWeight: '500', paddingVertical: s(5) }}>{item.firstname} {item.lastname}</Text>
                    <Text style={{ fontSize: s(15), fontWeight: '500', paddingVertical: s(5), color: Colors.GRAY }}>Purchase <Text style={{ fontWeight: '600', fontSize: s(16), color: Colors.BLACK }}>- {item.purchase} items</Text></Text>
                    <View style={{ flexDirection: 'row', paddingTop: s(5) }}>
                        <Image source={ImagesPath.calenderIcon} style={{ height: s(13), width: s(12) }} />
                        <Text style={{ fontSize: s(14), color: Colors.LIGHT_GRAY2, paddingHorizontal: s(10) }}>{careteDateStart} at  {createDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>

                        {/* 10 Oct, 2019 at 5:30pm */}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderDisputesTabView(item) {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', padding: s(5), borderRadius: 10, backgroundColor: Colors.WHITE, margin: s(5) }}>
                <View style={dealsStyle.imageViewContainerStyle}>
                    <Image source={{ uri: item.thumbnail_image }} style={dealsStyle.imageStyle} />
                </View>
                <View style={dealsStyle.dealsViewContainerStyle}>
                    <Text style={{ fontSize: s(15), fontWeight: '500', paddingVertical: s(5) }}>{item.title}</Text>
                    <Text style={{ fontSize: s(15), fontWeight: '500', paddingVertical: s(5), color: Colors.GRAY }}>Purchase <Text style={{ fontWeight: '600', fontSize: s(16), color: Colors.BLACK }}>- 2 items</Text></Text>
                    <View style={{ flexDirection: 'row', paddingTop: s(5) }}>
                        <Image source={ImagesPath.calenderIcon} style={{ height: s(13), width: s(12) }} />
                        <Text style={{ fontSize: s(14), color: Colors.LIGHT_GRAY2, paddingHorizontal: s(10) }}>10 Oct, 2019 at 5:30pm</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    dealsTabView() {
        return (
            <View style={dealsStyle.dealsViewStyle}>
                {
                    !this.state.dealsLoading && this.props.home.dealsListSuccess && this.props.home.dealsList.Status === 1 && this.props.loginSuccess
                        ?
                        <FlatList
                            data={this.props.home.dealsList.Data}
                            renderItem={({ item }) => this.renderDealsTabView(item)}
                            onRefresh={this.onRefresh.bind(this)}
                            refreshing={this.state.isRefreshing}
                            keyExtractor={(item) => item.index}
                        />
                        : this.state.dealsLoading
                            ? <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <LoadWheel visible={this.state.dealsLoading} />
                            </View>
                            : (
                                <View style={[dealsStyle.dealsViewContainerStyle, { flex: 1, alignItems: 'center' }]}>
                                    <Text style={{ fontSize: s(15), fontWeight: '500', paddingVertical: s(5) }}>No Deals available</Text>
                                </View>
                            )


                }
            </View>
        )
    }

    disputeTabView() {
        return (
            <View style={dealsStyle.disputesViewStyle}>
                {
                    !this.state.disputeLoading && this.props.home.disputeList && this.props.loginSuccess
                        ?
                        <FlatList
                            data={this.props.home.disputeList}
                            renderItem={({ item }) => this.renderDisputesTabView(item)}
                            onRefresh={() => this.onRefresh.bind(this)}
                            refreshing={this.state.isRefreshing}
                            keyExtractor={(item) => item.index}
                        />
                        : this.state.disputeLoading
                            ? <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <LoadWheel visible={this.state.disputeLoading} />
                            </View>
                            : (
                                <View style={[dealsStyle.dealsViewContainerStyle, { flex: 1, alignItems: 'center' }]}>
                                    <Text style={{ fontSize: s(15), fontWeight: '500', paddingVertical: s(5) }}>No Refunds available</Text>
                                </View>
                            )


                }
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={dealsStyle.container}>
                {/* =======>>>>>>>> Tab Bar <<<<<<<<======= */}
                <View style={dealsStyle.tabViewStyle}>
                    <TouchableOpacity
                        onPress={() => this.setState({ tabSelected: 'deals' })}
                        style={[dealsStyle.tabView
                            , this.state.tabSelected === 'deals'
                            ? { backgroundColor: Colors.APPCOLOR }
                            : { backgroundColor: Colors.WHITE }

                        ]}>
                        <Text style={[{ fontSize: ms(15, 1.5), fontWeight: 'bold', textAlign: 'center' }, this.state.tabSelected === 'deals' ? { color: Colors.WHITE } : { color: Colors.GRAY }]}>Deals</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({ tabSelected: 'disputes' })}
                        style={[dealsStyle.tabView
                            , this.state.tabSelected === 'disputes'
                            ? { backgroundColor: Colors.APPCOLOR, color: Colors.WHITE }
                            : { backgroundColor: Colors.WHITE, color: Colors.GRAY }

                        ]}>
                        <Text style={[{ fontSize: ms(15, 1.5), fontWeight: 'bold', textAlign: 'center' }, this.state.tabSelected === 'disputes' ? { color: Colors.WHITE } : { color: Colors.GRAY }]}>Refunds</Text>
                    </TouchableOpacity>
                </View>

                {/* =======>>>>>>>> Tab View <<<<<<<<======= */}
                {this.state.tabSelected === 'deals' ? this.dealsTabView() : this.disputeTabView()}
            </SafeAreaView>
        );
    };
}

// =======>>>>>>>> PROPS CONNECTION <<<<<<<<=======
const mapStateToProps = (state) => {
    return {
        auth: state.Auth,
        home: state.Home,
        scannerMode: state.Common.scannerMode,
        secret_key: state.Auth.sendOtpSuccess && state.Auth.sendOtpResponce && state.Auth.sendOtpResponce.userToken,
        access_key: state.Auth.testEncryptionSuccess && state.Auth.testEncryptionResponce && state.Auth.testEncryptionResponce.encrypted_value,
        loginSuccess: state.Auth.checkOtpSuccess && state.Auth.checkOtpResponce.Status == 1 && state.Auth.checkOtpResponce.Data.userverificationstatus == 1,
    };
}

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(mapStateToProps,
    {
        getDealsListRequest,
        getDisputeListRequest
    }
)(DealsScreen);