async function getWeatherCurrent(latitude,longitude) {
  try {
    const URL = `http://api.openweathermap.org/data/2.5/find?units=metric&lat=${latitude}&lon=${longitude}&appid=a642657fb83a8674e038f4b645b9a9ad`;
    let response = await fetch(URL);
    let responseJson = await response.json();
    return responseJson.list[0];
  } catch (error) {
    console.error(error);
  }
}

export default getWeatherCurrent;
