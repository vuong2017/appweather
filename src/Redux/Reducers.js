const defaultState = {
  isLoading:false,
  Latitude:null,
  Longitude:null,
  cityNameCurrent:null,
  TempCurrent:null,
  HumidityCurrent:null,
  cityName:null,
  Temp:null,
  Humidity:null,
  error:null
}
const Reducers = (state=defaultState,action) =>{
  switch (action.type) {
    case 'StartApp': return {...state,isLoading:true};
    case 'GetLocationSuccess': return {...state,Latitude:action.Latitude,Longitude:action.Longitude};
    case 'GetLocationFail': return {...state,isLoading:action.isLoading,error:action.error};
    case 'GetWeatherSuccess': return {...state,isLoading:action.isLoading,cityNameCurrent:action.cityNameCurrent,TempCurrent:action.TempCurrent,HumidityCurrent:action.HumidityCurrent};
    case 'GetWeatherFail': return {...state,error:action.error};
    case 'FindWeatherSuccess': return {...state,cityName:action.cityName,Temp:action.Temp,Humidity:action.Humidity};
    case 'FindWeatherError': return {...state,cityName:null,Humidity:null,finderror:action.finderror};
    default:
      return state;
  }
}

export default Reducers;
