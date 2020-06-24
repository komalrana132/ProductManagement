import React,{ Component } from "react";
import {View} from 'react-native'
import { HomeShineLoader } from "../../../CommonConfig/HomeShineLoader";

class ShineScreen extends Component{
    state ={
        visible : true
    }
    render() {
         return(
             <View style={{flex: 1}}>
                 <HomeShineLoader visible={this.state.visible} />
             </View>
         )
    }
}
export default ShineScreen;