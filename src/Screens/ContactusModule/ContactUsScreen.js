// =======>>>>>>>> LIBRARIES <<<<<<<<=======

import * as React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TouchableOpacity, Image, FlatList, } from 'react-native';
import { connect } from 'react-redux';

// =======>>>>>>>> ASSETS <<<<<<<<=======
import { Colors, Scale, ImagesPath, LoadWheel, ShineLoader } from '../../CommonConfig';
import { ApplicationStyles } from '../../CommonConfig/ApplicationStyle';
import { screenHeight } from '../../CommonConfig/HelperFunctions/functions';
import homeStyle from '../HomeModule/homeStyle'
import AppHeader from '../../Assets/Components/AppHeader';
import scannerStyle from '../ScannerModule/scannerStyle';
import { s } from 'react-native-size-matters';
import inviteStyle from '../InviteModule/inviteScreenStyle';


// =======>>>>>>>> CLASS DECLARATION <<<<<<<<=======

export class ContactusScreen extends React.Component {
    // =======>>>>>>>> STATES DECLARATION <<<<<<<<=======
    state = {

    }
    // =======>>>>>>>> LIFE CYCLE METHODS <<<<<<<<=======

    componentDidMount() {
        console.disableYellowBox = true //warning disable line
        this.setHeader()
    }
    componentDidUpdate(prevProps) {
        
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
                            <Text style={ApplicationStyles.headerTitleStyle}>CONTACT US</Text>
                        </View>
                        <View
                            style={scannerStyle.touchStyle}>
                        </View>
                    </SafeAreaView>
                );
            },
        })
    }

    // =======>>>>>>>> RENDER INITIALIZE <<<<<<<<=======
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: Colors.WHITE, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={ApplicationStyles.headerTitle1Style}>Ridy</Text>
                    <View style={{ marginTop: s(30), justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={ImagesPath.contactus} style={{ height: s(220), width: s(220) }} />
                    </View>
                    <View style={{ marginTop: s(50), justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: s(15), color: Colors.GRAY }}>Contact Us</Text>
                        <View style={[inviteStyle.view3, { marginTop: s(15) }]}>
                            <TouchableOpacity>
                                <Image source={ImagesPath.emailIcon} style={{ height: s(33), width: s(33), marginLeft: s(20) }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={ImagesPath.whatsappIcon} style={{ height: s(33), width: s(33), marginLeft: s(20) }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={ImagesPath.facebookIcon} style={{ height: s(33), width: s(33), marginLeft: s(20) }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={ImagesPath.telegramIcon} style={{ height: s(33), width: s(33), marginLeft: s(20) }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={ImagesPath.instagramIcon} style={{ height: s(33), width: s(33), marginLeft: s(20) }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </SafeAreaView>
        );
    };
}

// =======>>>>>>>> PROPS CONNECTION <<<<<<<<=======
const mapStateToProps = (state) => {
    return {
    };
}

// =======>>>>>>>> REDUX CONNECTION <<<<<<<<=======
export default connect(mapStateToProps,
    {}
)(ContactusScreen);