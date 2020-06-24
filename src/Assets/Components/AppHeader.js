import React, {Component} from 'react';
import { View, Text } from "react-native";
import { ApplicationStyles } from "../../CommonConfig/ApplicationStyle";
class AppHeader extends Component {
    render(){
        return(
            <View style={{flexDirection: 'row'}}>
                <Text style={ApplicationStyles.headerTitle2Style}>{this.props.title1}{this.props.spacing ? ' ' : null}</Text>
                <Text style={ApplicationStyles.headerTitle1Style}>{this.props.title2}{this.props.spacing ? ' ' : null}</Text>
                <Text style={ApplicationStyles.headerTitle2Style}>{this.props.title3}{this.props.spacing ? ' ' : null}</Text>
            </View>
        );
    }
}
export default AppHeader;