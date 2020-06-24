// =======>>>>>>>> LIBRARIES <<<<<<<<=======

import * as React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TouchableOpacity, Image, FlatList, } from 'react-native';
import { connect } from 'react-redux';

// =======>>>>>>>> ASSETS <<<<<<<<=======
import { Colors, Scale, ImagesPath, LoadWheel, ShineLoader } from '../../CommonConfig';
import { ApplicationStyles } from '../../CommonConfig/ApplicationStyle';
import { screenHeight, screenWidth } from '../../CommonConfig/HelperFunctions/functions';
import homeStyle from '../HomeModule/homeStyle'
import AppHeader from '../../Assets/Components/AppHeader';
import { becomeSellerStyles } from '../BecomeSellerModule/becomeSellerStyle';
import { s } from 'react-native-size-matters';
import { BarChart } from 'react-native-chart-kit';
import { cartDATA } from '../../DATA';

import { getSoldProductListRequest } from '../../Redux/Actions'


// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======

class DashBoard extends React.Component {
    chartData = {
        labels: ["S", "M", "T", "W", "T", "F", "S"],
        datasets: [
            {
                data: [80, 45, 28, 80, 99, 43, 80]
            }
        ]
    };
    // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
    state = {
        soldList: [],
    }
    // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======

    componentWillMount() {
        this.setState({ soldList: cartDATA })
    }
    componentDidMount() {
        console.disableYellowBox = true //warning disable line
        this.setHeader();
        this.props.getSoldProductListRequest(this.state.soldList)
    }
    componentDidUpdate(prevProps) {
        if (this.state.isLoading_getAlbum && (this.props.Home.albumList != prevProps.Home.albumList)) {
            //here we have to check for API success and failure codes if any
        }
    }

    // =======>>>>>>>> FUNCTIONS DECLARATION <<<<<<<<=======
    setHeader() {
        this.props.navigation.setOptions({
            header: () => {
                return (
                    <SafeAreaView style={[ApplicationStyles.headerStyle, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.goBack()}
                            style={homeStyle.touchStyle}
                        >
                            <Image source={ImagesPath.backIcon} style={becomeSellerStyles.backIconStyle} />
                        </TouchableOpacity>
                        <View>
                            <Text style={ApplicationStyles.headerTitleStyle}>DASHBOARD</Text>
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

    // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
    renderSoldItem(item) {
        return (
            <View style={{ padding: s(10), flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: s(16), fontWeight: '500', paddingVertical: s(5), color: Colors.GRAY }}>{item.name}, {item.weight}</Text>
                <Text style={{ fontSize: s(16), fontWeight: '500', paddingVertical: s(5), color: Colors.BLACKSHADE }}>${item.purchase * item.price}</Text>
            </View>
        )
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, borderWidth: 1, backgroundColor: Colors.BACKGROUD }}>
                <View style={{ height: s(120), width: '100%', backgroundColor: Colors.BLACKSHADE, flexDirection: 'row' }}>
                    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ borderRightWidth: 1, alignItems: 'center', borderColor: Colors.GRAY, width: '100%' }}>
                            <Text style={{ color: Colors.APPCOLOR, fontSize: s(22), fontWeight: 'bold' }}>$69.67</Text>
                            <Text style={{ fontSize: s(13), paddingTop: s(4), color: Colors.LIGHT_GRAY, fontWeight: '600' }}>Wallet Ballence</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', }}>
                        <TouchableOpacity style={{ backgroundColor: Colors.WHITE, padding: s(10), borderRadius: s(7), shadowColor: Colors.BLACK, overflow: 'hidden', shadowRadius: 5, shadowOpacity: 1, elevation: 5 }}>
                            <Text style={{ color: Colors.GREEN, fontSize: s(15), fontWeight: '500' }}>Withdraw</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ margin: s(7), backgroundColor: Colors.WHITE, borderRadius: s(15) }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', padding: s(8) }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: s(14), color: Colors.GRAY }}>Sep 8 - Sep 14 </Text></View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: s(16), color: Colors.BLACK }}>$54.93</Text></View>

                    </View>
                    <BarChart
                        data={this.chartData}
                        width={screenWidth - s(20)}
                        height={s(200)}
                        showBarTops={false}
                        withInnerLines={false}
                        withHorizontalLabels={false}
                        fromZero={true}
                        verticalLabelRotation={30}
                        chartConfig={{
                            // backgroundGradientFrom: Colors.WHITE,
                            backgroundGradientTo: Colors.WHITE,
                            backgroundGradientFrom: Colors.WHITE,
                            barPercentage: s(0.5),
                            fillShadowGradient: Colors.APPCOLOR,
                            fillShadowGradientOpacity: 1,
                            barRadius: s(10),
                            propsForBackgroundLines: { borderTopRadius: s(15), cy1: s(15), cy2: s(15) },
                            propsForLabels: { fontSize: s(12), textAnchor: 'middle', stroke: 'black', rotation: 0 },
                            color: (opacity = 1) => `rgba(0, 162, 49, ${opacity})`,
                        }}
                    />
                </View>
                <ScrollView style={{ margin: s(10), backgroundColor: Colors.WHITE }}>
                    <FlatList
                        data={this.props.soldproductList}
                        renderItem={({ item }) => this.renderSoldItem(item)}
                        keyExtractor={(item) => item.id}
                    />
                </ScrollView>

            </SafeAreaView>
        );
    };
}

// =======>>>>>>>> PROPS CONNECTION <<<<<<<<=======
const mapStateToProps = (state) => {
    return {
        soldproductList: state.Home.soldproductList,
    };
}

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(mapStateToProps,
    {
        getSoldProductListRequest,
    }
)(DashBoard);