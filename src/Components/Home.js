import React, { Component } from 'react';
import {View, Text ,Dimensions , StyleSheet , ActivityIndicator} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import FindWeather from './FindWeather';
import WeatherCurrent from './WeatherCurrent';
const {width,height} = Dimensions.get('window');
const initialLayout = {
height: 0,
width
};
export default class Home extends Component{
  constructor(props){
    super(props)

  }
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'WeatherCurrent' },
      { key: 'second', title: 'FindWeather' },
    ],
  };
  _renderTabBar = props => (
    <TabBar {...props} style={style.tabbar} labelStyle={style.label} indicatorStyle={style.indicator} />
  );
  _renderScene = SceneMap({
    first: WeatherCurrent,
    second: FindWeather,
 });
  render(){
    var a = false
    if(this.props.isLoading){
      return(
        <View>
          <Text>Dang load nhe</Text>
        </View>
      );
    }
    return(
      <TabView
        style={style.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={index => this.setState({ index })}
        initialLayout={initialLayout}
      />
    );
  }
}
const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#1E90FF'
  },
  indicator:{
    backgroundColor: '#FFF'
  },
  label: {
    color: '#fff',
    fontSize:17,
    fontFamily:'Oswald-Regular'
  }
})
