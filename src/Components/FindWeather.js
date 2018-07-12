import React, { Component } from 'react';
import { View , StyleSheet , TextInput , Dimensions , Button , Text ,ActivityIndicator , Image , Alert } from 'react-native';
import getWeather from '../API/getWeather';
import {FindWeatherSuccess,FindWeatherError} from '../Redux/ActionCreators';
import {connect} from 'react-redux';
var {height, width} = Dimensions.get('window');
class FindWeather extends Component{
  constructor(props){
    super(props);
    this.state={cityName:null}
    this.handleSerach = this.handleSerach.bind(this);
  }
  handleSerach(){
    const {cityName} = this.state;
    getWeather(cityName)
    .then(data=>this.props.FindWeatherSuccess(data.name,data.main.temp,data.main.humidity))
    .catch(()=>this.props.FindWeatherError("Tên thành phố không có!"));
    this.setState({cityName:''})

  }
  finderror(){
    Alert.alert(this.props.finderror);
  }
  render(){
    return(
      <View style={style.container}>
      {this.state.cityName?null:this.props.cityName?<View style={{flex:0.86}}>
        <View style={style.cityname}>
          <Text style={style.textinput}>{this.props.cityName}</Text>
        </View>
        <View style={style.imagestatus}>
        <Image source={this.props.Temp > 30 ? require('../../public/icon/statussun.png') : this.props.Temp > 20 ?  require('../../public/icon/cloud1.png') : require('../../public/icon/drop.png') } />
        </View>
        <View style={style.hr}>
          <Text style={style.hrtext}></Text>
        </View>
        <View style={style.wearther}>
            <View style={style.weartherTemp}>
              <Text style={style.weartherTempItem}>{this.props.Temp?Math.ceil(this.props.Temp):null}</Text>
            </View>
            <View style={style.weartherHumi}>
              <Text style={style.weartherHumiItem}><Image style={{height:80}} source={require('../../public/icon/droplet-of-water.png')} /> {this.props.Humidity}</Text>
              <Text style={style.weartherHumiItem}><Image style={{height:80}} source={require('../../public/icon/flag.png')} /> {this.props.Humidity}
              <Text style={{fontSize:25}}> km/h</Text>
              </Text>
            </View>
        </View>
      </View>:this.props.finderror? this.finderror() :null}
        <View style={style.findweather}>
          <View style={{flex:0.7,justifyContent:'center'}}>
            <TextInput
            value={this.state.cityName}
            style={style.TextInput}
            placeholder={'Nhập tên thành phố cần tìm...'}
            blurOnSubmit={true}
            underlineColorAndroid = "#1E90FF"
            onChangeText = {(text)=>this.setState({cityName:text})}
            />
          </View>
          <View style={{flex:0.3,alignItems:'center', justifyContent:'center'}}>
              <Button title="Tìm kiếm" onPress={()=>this.handleSerach()} />
          </View>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'#1E90FF',

  },
  cityname:{
    flex:0.15,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-end'
  },
  textinput:{
    fontSize:40,
    color:'white',
    fontFamily:'Oswald-Regular'
  },
  imagestatus:{
    flex:0.6,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  hr:{
    flex:0.01,
    paddingLeft:60,
    paddingRight:60
  },
  hrtext:{
    borderBottomWidth:2,
    borderBottomColor:'white'
  },
  wearther:{
    flex:0.2,
    flexDirection:'row',
    padding:20,
    justifyContent:'space-evenly'
  },
  weartherTemp:{
    justifyContent:'center'
  },
  weartherTempItem:{
    fontSize:120,
    color:'white',
    fontFamily:'Oswald-Regular'
  },
  weartherHumi:{
    flexDirection:'column',
    justifyContent:'center',
    paddingTop:10
  },
  weartherHumiItem:{
    fontSize:40,
    color:'white',
    fontFamily:'Oswald-Regular'
  },
  findweather:{
    flex:0.14,
    paddingLeft:35,
    paddingRight:15,
    paddingTop:20,
    flexDirection:'row'
  },
  TextInput:{
    height:40,
    borderColor:'white',
    borderWidth:2,
    color:'white',
    paddingLeft:10
  }
})
const mapStateToProps = state =>({
  cityName:state.cityName,
  Temp:state.Temp,
  Humidity:state.Humidity,
  finderror:state.finderror
})
export default connect(mapStateToProps,{FindWeatherSuccess,FindWeatherError})(FindWeather)
