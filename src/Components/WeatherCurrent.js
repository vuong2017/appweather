import React, { Component } from 'react';
import { View , StyleSheet , TextInput , Dimensions , Button , Text ,ActivityIndicator , Image } from 'react-native';
import {connect} from 'react-redux';
import getWeatherCurrent from '../API/getWeatherCurrent'
import {StartApp,GetWeatherSuccess,GetWeatherFail,GetLocationSuccess,GetLocationFail} from '../Redux/ActionCreators'
var {height, width} = Dimensions.get('window');
class WeatherCurrent extends Component{
  constructor(props){
    super(props);
    this.state={latitude:null,longitude:null,error:null}
  }
  componentDidMount(){
    this.loadPosition();
  }
  getCurrentPosition = () =>{
    return new Promise((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition(resolve,reject,{
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000
        });
    });
  };
  loadPosition = async () =>{
    await this.props.StartApp();
    console.log(this.props.isLoading);
    try{
      const position = await this.getCurrentPosition();
      const {latitude,longitude} = position.coords;
      await this.props.GetLocationSuccess(latitude,longitude);
      getWeatherCurrent(latitude,longitude)
      .then(data=>this.props.GetWeatherSuccess(false,data.name,data.main.temp,data.main.humidity))
      .catch((error)=>console.log(error));
    }catch(error){
      const message = "Bạn chưa bật định vị";
      this.props.GetLocationFail(false,message);
    }
  };

  render(){
    if(this.props.isLoading){
      return(
        <View style={style.loading}>
          <ActivityIndicator size="large" color="black" />
        </View>
      );
    }
    if(this.props.error){
      return(
        <View style={style.loading}>
          <Text style={{color:'black',fontFamily:'Oswald-Regular',fontSize:17}}>Bạn chưa bật định vị!</Text>
        </View>
      );
    }
    return(
      <View style={style.container}>
        <View style={style.cityname}>
          <Text style={style.textinput}>{this.props.cityNameCurrent}</Text>
        </View>
        <View style={style.imagestatus}>
          <Image source={this.props.TempCurrent > 30 ? require('../../public/icon/statussun.png') : this.props.TempCurrent > 20 ?  require('../../public/icon/cloud1.png') : require('../../public/icon/drop.png') } />
        </View>
        <View style={style.hr}>
          <Text style={style.hrtext}></Text>
        </View>
        <View style={style.wearther}>
            <View style={style.weartherTemp}>
              <Text style={style.weartherTempItem}>{this.props.TempCurrent?Math.ceil(this.props.TempCurrent):null}</Text>
            </View>
            <View style={style.weartherHumi}>
              <Text style={style.weartherHumiItem}><Image style={{height:80}} source={require('../../public/icon/droplet-of-water.png')} /> {this.props.HumidityCurrent}</Text>
              <Text style={style.weartherHumiItem}><Image style={{height:80}} source={require('../../public/icon/flag.png')} /> {this.props.HumidityCurrent}
              <Text style={{fontSize:25}}> km/h</Text>
              </Text>
            </View>
        </View>
      </View>
    );
    }
}
const style = StyleSheet.create({
  loading:{
    flex:1,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center'
  },
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
    flex:0.5,
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
  }
})
const mapStateToProps = state =>({
  isLoading:state.isLoading,
  Latitude:state.Latitude,
  Longitude:state.Longitude,
  cityNameCurrent:state.cityNameCurrent,
  TempCurrent:state.TempCurrent,
  HumidityCurrent:state.HumidityCurrent,
  error:state.error
})
export default connect(mapStateToProps,{StartApp,GetWeatherSuccess,GetWeatherFail,GetLocationSuccess,GetLocationFail})(WeatherCurrent);
