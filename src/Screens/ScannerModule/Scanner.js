// =======>>>>>>>> LIBRARIES <<<<<<<<=======

import React from 'react';
import {
    ScrollView, View, Text, TouchableOpacity, TextInput,
    StatusBar, Image, Platform, SafeAreaView, ActivityIndicator, Animated, StyleSheet
} from 'react-native';
import scannerStyle from './scannerStyle';
import { ImagesPath, Colors, LoadWheel, ApplicationStyles } from '../../CommonConfig';
import { connect } from 'react-redux';
import AppHeader from '../../Assets/Components/AppHeader';
import { s } from 'react-native-size-matters';
import { RNCamera } from 'react-native-camera';
import {
    setScannerMode,
    refreshToken,
    getBuyerProductListRequest,
    getBarcodeProductRequest
} from '../../Redux/Actions'
import * as Animatable from 'react-native-animatable';
import ScannerModal from './Component/ScannerModal';
import AsyncStorage from '@react-native-community/async-storage'

// =======>>>>>>>> ASSETS <<<<<<<<=======



// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======

export class Scanner extends React.Component {

    // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
    state = {
        changetik: true, // here change tik false=sellermode true=buyerMode
        scannerModalVisible: false,
        refreshTokenLoading: false,
        buyerProductLoading: false,
        barcodeProductLoading: false,
        code: '',
        focusedScreen: false,
        hintText: ''
    }


    // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======
    async componentDidMount() {
        this.setHeader()
        console.disableYellowBox = true
        this.setScannerMode();
        this.getRefreshToken();
        this.setState({ focusedScreen: true })
    }


    componentDidUpdate(prevProps) {
        
        // refresh token responce
        if (this.props.common.refreshTokenSuccess && this.state.refreshTokenLoading && this.props.common.refreshTokenResponce.Status === 1) {
            if (this.props.common != prevProps.common) {
                this.setState({ refreshTokenLoading: false })
                AsyncStorage.setItem("Token", this.props.secret_key);
            }
        } else if (this.state.refreshTokenLoading && this.props.common.refreshTokenSuccess && this.props.common.refreshTokenResponce.Status !== 1) {
            if (this.props.common != prevProps.common) {
                this.setState({ refreshToken: false })
            }
        } else if (this.state.refreshTokenLoading && this.props.common.refreshTokenSuccess === false) {
            if (this.props.common != prevProps.common) {
                this.setState({ refreshToken: false })
                alert('Something went wrong')
            }
        }

        // buyerlist responce
        if (this.props.scannerMode === 'buyer') {
            if (this.state.buyerProductLoading && this.props.home.buyerProductListSuccess && this.props.home.buyerProductListResponce.Status == 1) {
                if (this.props.home !== prevProps.home) {
                    // this.setFirstItem()
                    global.temp = false
                    this.setState({ buyerProductLoading: false })
                    global.QrofShop = this.state.code
                    this.props.navigation.navigate('root');
                }
            }else if(this.props.home.buyerProductListSuccess && this.props.home.buyerProductListResponce.Status == 0 && this.state.buyerProductLoading){
                if (this.props.home !== prevProps.home) {
                    global.temp = false
                    this.setState({ buyerProductLoading: false })
                    alert(this.props.home.buyerProductListResponce.Message)
                    setTimeout(() => { }, 1000)
                }
            } else if (this.props.home.buyerProductListSuccess === false && this.state.buyerProductLoading) {
                if (this.props.home !== prevProps.home) {
                    global.temp = false
                    this.setState({ buyerProductLoading: false })
                    alert('Something went wrong') // this alert shows on logout too.
                }
            }
        }

        if (this.props.scannerMode === 'seller') {
            // barcode responce
            if (this.state.barcodeProductLoading && this.props.home.barcodeSuccess && this.props.home.barcodeResponce.Status === 1) {
                if (this.props.home !== prevProps.home) {
                    this.setState({ barcodeProductLoading: false })
                    global.temp = true
                    this.props.navigation.navigate('root')
                }
            } else if (this.state.barcodeProductLoading && this.props.home.barcodeSuccess && this.props.home.barcodeResponce.Status !== 1) {
                if (this.props.home !== prevProps.home) {
                    this.setState({ barcodeProductLoading: false })
                    this.props.scannerMode === 'seller' ? global.temp = true : null
                    this.props.navigation.navigate('root')
                }
            }  else if (this.state.barcodeProductLoading && this.props.home.barcodeSuccess === false) {
                if (this.props.home !== prevProps.home) {
                    this.setState({ barcodeProductLoading: false })
                    this.props.scannerMode === 'seller' ? global.temp = true : null
                    this.props.navigation.navigate('root')
                }
            }
        }

    }


    // =======>>>>>>>> FUNCTIONS DECLARATION <<<<<<<<=======

    setScannerMode() {
        if (!this.props.scannerMode) {
            this.props.setScannerMode(this.state.changetik ? 'buyer' : 'seller')
        }
    }

    requestBuyerProductList() {
        this.props.getBuyerProductListRequest({
            "QrcodeNumber": this.state.code,
            "access_key": "nousername",
            "secret_key": this.props.secret_key,
            "device_type": Platform.OS === 'ios' ? '0' : '1',
            "device_token": ""
        })
    }

    requestBarcodeProduct() {
        this.props.getBarcodeProductRequest({
            "BarcodeNumber": this.state.code,
            "access_key": "nousername",
            "secret_key": this.props.secret_key,
            "device_type": Platform.OS === 'ios' ? '0' : '1',
            "device_token": ""
        })
    }

    async getRefreshToken() {
        const Token = await AsyncStorage.getItem("Token");
        if (!Token || !this.props.secret_key) {
            this.setState({ refreshTokenLoading: true })
            await this.props.refreshToken({
                "access_key": "nousername",
            })
        }
    }

    setModalVisible() {
        this.setState({ scannerModalVisible: !this.state.scannerModalVisible });
    }

    closeModal() {
        this.setState({ scannerModalVisible: false });
    }

    onBarCodeRead = (e) => {
        if (e) {
            this.setState({ code: e.data })
            setTimeout(() => {
                if (this.props.scannerMode === 'buyer') {
                    global.temp = false
                    this.setState({ buyerProductLoading: true })
                    this.requestBuyerProductList();
                } else {
                    this.setState({ barcodeProductLoading: true })
                    this.requestBarcodeProduct()
                }
            }, 1000)

        } else {
            alert("could not read");
        }
    }

    onSubmit(text) {
        if (text === '') {
            alert('please enter code')
        } else {
            this.closeModal()
            this.setState({ code: text })
            setTimeout(() => {
                if (this.props.scannerMode === 'buyer') {
                    global.temp = false
                    this.setState({ buyerProductLoading: true })
                    this.requestBuyerProductList();
                } else {
                    this.setState({ barcodeProductLoading: true })
                    this.requestBarcodeProduct()
                }
            }, 1000)
        }
    }

    setHeader() {
        this.props.navigation.setOptions({
            header: () => {
                return (
                    <SafeAreaView style={[ApplicationStyles.headerStyle, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <View style={scannerStyle.touchStyle} />
                        <View>
                            <AppHeader />
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                global.temp = false
                                this.props.scannerMode === 'seller' ? this.props.navigation.navigate('root') : global.QrofShop ? this.props.navigation.navigate('root') : alert('Enter shop QRCode')
                            }}
                            style={scannerStyle.touchStyle}>
                            <Image source={ImagesPath.CloseIcon} style={scannerStyle.closeIconStyle} />
                        </TouchableOpacity>

                    </SafeAreaView>
                );
            },
        })
    }

    switchView() {
        return (
            <View style={{ position: 'absolute', alignSelf: 'center', top: 0 }}>
                <View style={[scannerStyle.switchViewStyle]}>
                    <TouchableOpacity
                        activeOpacity={this.props.scannerMode === 'buyer' ? 0 : 1}
                        onPress={() => {
                            if (this.props.scannerMode === 'buyer') {
                                global.temp = false
                                global.QrofShop && this.props.home.buyerProductListSuccess ? this.props.navigation.navigate('root') : alert('Enter shop number')
                            }
                        }}>
                        <Text style={[scannerStyle.switchtextStyle, { textAlign: 'center', paddingHorizontal: s(3), color: this.props.scannerMode === 'buyer' ? Colors.APPCOLOR : 'rgb(173,173,173)' }]}>Buyer Mode</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={async () => {
                            this.setState({ changetik: !this.state.changetik })
                            await this.props.setScannerMode(this.state.changetik ? 'buyer' : 'seller')
                        }}>
                        <Image source={this.props.scannerMode === 'buyer' ? ImagesPath.SwitchOffIcon : ImagesPath.SwitchOnIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={this.props.scannerMode === 'seller' ? 0 : 1}
                        onPress={() => {
                            if (this.props.scannerMode === 'seller') {
                                global.temp = false
                                this.props.navigation.navigate('root')
                            }
                        }}>
                        <Text style={[scannerStyle.switchtextStyle, { textAlign: 'center', paddingHorizontal: s(3), color: this.props.scannerMode === 'seller' ? Colors.APPCOLOR : 'rgb(173,173,173)' }]}>Seller Mode</Text>
                    </TouchableOpacity>

                </View>
                <View style={[{ backgroundColor: 'transparent', margin: s(15), marginTop: s(0), width: '85%', height: s(40) }]}>
                    <View>
                        <Text style={scannerStyle.textStyle}>
                            {
                                this.props.scannerMode === 'buyer'
                                    ? "Scan QR-Code of the Shop to start shopping"
                                    : "Scan the BAR-Code of product you want to add to your shop"
                            }
                        </Text>
                    </View>
                </View>

            </View>
        )
    }

    getBackgroundColor = () => {
        return { backgroundColor: '#0000004D' };
    };

    getCornerStyle() {
        return {
            height: s(32),
            width: s(32),
            borderColor: Colors.APPCOLOR,
        };
    }

    getRectSize = () => {
        return { height: scannerStyle.scannerView.height, width: scannerStyle.scannerView.width };
    };

    middleView() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={scannerStyle.scannerView}>
                    <View style={{ height: 100 }} />
                    <View style={{ backgroundColor: 'transparent', borderColor: Colors.APPCOLOR, borderTopWidth: 4, borderLeftWidth: 4, top: s(0), left: s(0), padding: s(15), position: 'absolute' }}></View>
                    <View style={{ backgroundColor: 'transparent', borderColor: Colors.APPCOLOR, borderTopWidth: 4, borderRightWidth: 4, top: s(0), right: s(0), padding: s(15), position: 'absolute' }}></View>
                    <View style={{ backgroundColor: 'transparent', borderColor: Colors.APPCOLOR, borderBottomWidth: 4, borderLeftWidth: 4, bottom: s(0), left: s(0), padding: s(15), position: 'absolute' }}></View>
                    <View style={{ backgroundColor: 'transparent', borderColor: Colors.APPCOLOR, borderBottomWidth: 4, borderRightWidth: 4, bottom: s(0), right: s(0), padding: s(15), position: 'absolute' }}></View>
                    {
                        this.state.focusedScreen
                            ? <Animatable.View
                                style={scannerStyle.scanLine}
                                animation="slideInDown"
                                iterationCount="infinite"
                                direction="alternate-reverse"
                            />
                            : null
                    }
                </View>
            </View>
        );
    }

    getBorderStyle() {
        const cornerOffsetSize = 0;
        return {
            height: scannerStyle.scannerView.height - cornerOffsetSize * 2,
            width: scannerStyle.scannerView.width - cornerOffsetSize * 2,
            borderWidth: scannerStyle.scannerView.borderWidth,
            borderColor: scannerStyle.scannerView.borderColor,
        };
    }
    getRectOffsetHeight = () => {
        return { height: 0 };
    };

    footerView() {
        return (
            <View style={[scannerStyle.bottomViewStyle, { position: 'absolute', bottom: 0, alignSelf: 'center' }]}>
                <TouchableOpacity
                    onPress={this.setModalVisible.bind(this)}
                    style={{ alignItems: 'center' }}>
                    <Image source={ImagesPath.backIcon} style={{ transform: [{ rotate: '90deg' }], height: s(12), width: s(16), tintColor: Colors.WHITE }} />
                    <Text style={scannerStyle.manualinputStyle}>Manually Input</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======

    render() {
        let loading = this.state.refreshTokenLoading || this.state.buyerProductLoading || this.state.barcodeProductLoading
        return (
            loading
                ?
                    <LoadWheel visible={loading} />
                :
                <View style={scannerStyle.scannerContainer}>
                    {/* {
                        this.state.focusedScreen
                            ?
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                < QRScannerView
                                    onScanResult={this.onBarCodeRead.bind(this)}
                                    renderHeaderView={this.switchView.bind(this)}
                                    renderFooterView={this.footerView.bind(this)}
                                    scanBarAnimateReverse={true}
                                    rectStyle={{ height: s(250), width: s(250) }}
                                    cornerStyle={{ borderColor: Colors.APPCOLOR }}
                                    hintText={''}
                                    isShowScanBar={false}
                                // scanBarStyle={{ backgroundColor: Colors.APPCOLOR, borderRadius: s(0.2), marginHorizontal: s(8), height: s(1.5), width: '95%' }}
                                />
                                <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1, position: 'absolute' }}>
                                    <View style={{ height: s(100) }} />
                                    <Animatable.View
                                        style={scannerStyle.scanLine}
                                        animation="slideInDown"
                                        iterationCount="infinite"
                                        direction="alternate-reverse"
                                    />
                                </View>
                            </View>
                            : null
                    } */}
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        defaultTouchToFocus
                        mirrorImage={false}
                        keepAwake={true}
                        onBarCodeRead={this.onBarCodeRead}
                        style={scannerStyle.cameraStyle}
                    >

                        <View style={[styles.container, { bottom: 0 }]}>
                            <View style={[this.getBackgroundColor(), { flex: 1, paddingTop: s(40) }]} />
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[this.getBackgroundColor(), { flex: 1 }]} />
                                <View style={[styles.viewfinder, this.getRectSize()]}>
                                    {this.middleView()}
                                </View>
                                <View style={[this.getBackgroundColor(), { flex: 1 }]} />
                            </View>
                            <View style={[this.getBackgroundColor(), { flex: 1, alignItems: 'center' }]}>
                                <Text numberOfLines={1}>{this.state.hintText}</Text>
                            </View>
                            <View style={[this.getBackgroundColor(), this.getRectOffsetHeight()]} />
                            <View style={[styles.topContainer]}>{this.switchView()}</View>
                            <View style={[styles.bottomContainer]}>{this.footerView()}</View>
                        </View>
                    </RNCamera>
                    <ScannerModal
                        visible={this.state.scannerModalVisible}
                        close={this.closeModal.bind(this)}
                        onSubmit={this.onSubmit.bind(this)}
                        scannerMode={this.props.scannerMode}
                    />
                </View>
        );
    };
}

const styles = StyleSheet.create({
    topContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    container: {
        flex: 1,
    },
    viewfinder: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    topLeftCorner: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    topRightCorner: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    bottomLeftCorner: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    bottomRightCorner: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
});

const mapStateToProps = (state) => {
    return {
        scannerMode: state.Common.scannerMode,
        common: state.Common,
        home: state.Home,
        secret_key: state.Common.refreshTokenSuccess && state.Common.refreshTokenResponce && state.Common.refreshTokenResponce.tempToken,
    }
}

export default connect(mapStateToProps,
    {
        setScannerMode,
        refreshToken,
        getBuyerProductListRequest,
        getBarcodeProductRequest
    }
)(Scanner);
