export function StartApp(){
  return{
    type:'StartApp'
  };
}
export function GetLocationSuccess(Latitude,Longitude){
  return{
    type:'GetLocationSuccess',
    Latitude,
    Longitude
  };
}
export function GetLocationFail(isLoading,error){
  return{
    type:'GetLocationFail',
    isLoading,
    error
  };
}
export function GetWeatherSuccess(isLoading,cityNameCurrent,TempCurrent,HumidityCurrent){
  return{
    type:'GetWeatherSuccess',
    isLoading,
    cityNameCurrent,
    TempCurrent,
    HumidityCurrent
  };
}
export function GetWeatherFail(error){
  return{
    type:'GetWeatherFail',
    error
  };
}
export function FindWeatherSuccess(cityName,Temp,Humidity){
  return{
    type:'FindWeatherSuccess',
    cityName,
    Temp,
    Humidity
  };
}
export function FindWeatherError(finderror){
  return{
    type:'FindWeatherError',
    finderror
  };
}
