import {Weather, WeatherLocation} from "../components/weather";
import fetchJsonp from "fetch-jsonp";


const key: string = process.env.REACT_APP_OPEN_WEATHER_API_KEY as string;
if (key === undefined) {
    throw new Error('No Open Weather API Key defined - ensure you set a variable called REACT_APP_OPEN_WEATHER_API_KEY')
}

const keyQuery = `appid=${key}`
const server = 'https://api.openweathermap.org/data/2.5';

export async function searchLocation(town: string): Promise<WeatherLocation | undefined> {
    const result = await fetch(`${server}/weather?q=${town}&${keyQuery}`);

    if (result.status === 404) return undefined;
    if (result.status !== 200) throw new Error('Failed to read location data');

    return await result.json();
}

export async function readWeather(locationId: number): Promise<Weather> {
    const current = await fetch(`${server}/weather?id=${locationId}&${keyQuery}&units=metric`);

    if (current.status !== 200) throw new Error('Failed to read location data');
    let res = await current.json()
    res.feels_like = res.main.feels_like
    res.humidity = res.main.humidity
    res.pressure = res.main.pressure
    res.temp = res.main.temp
    res.temp_max = res.main.temp_max
    res.temp_min = res.main.temp_min
    return res;
}

export async function readForecastDay(lat: number, lon: number): Promise<Weather[]> {
    const forecast = await fetch(`${server}/onecall?lat=${lat}&lon=${lon}&exclude=daily&${keyQuery}&units=metric`);

    if (forecast.status !== 200) throw new Error('Failed to read location data');
    let response = (await forecast.json()).hourly;

    response.forEach((it: any) => {
        it.temp_min = null;
        it.temp_max = null;
    })
    return response.slice(0, 24)
}

export async function readForecastWeek(lat: number, lon: number): Promise<Weather[]> {
    const forecast = await fetch(`${server}/onecall?lat=${lat}&lon=${lon}&exclude=hourly&${keyQuery}&units=metric`);

    if (forecast.status !== 200) throw new Error('Failed to read data');
    let response = (await forecast.json()).daily
    response.forEach((it: any) => {
        it.temp_min = it.temp.min;
        it.temp_max = it.temp.max;
        it.temp = it.temp.day;
        it.feels_like = it.feels_like.day;
    })

    return response.slice(0, 7);
}

export async function getLocalCity(lat: number, lon: number): Promise<WeatherLocation> {
    const current = await fetch(`${server}/weather?lat=${lat}&lon=${lon}&${keyQuery}`)

    if (current.status !== 200) throw new Error('Failed to read location data');

    return await current.json();
}

export async function getLocalCityIfLocationIsNotAllowed() {
       return  await fetchJsonp("https://geolocation-db.com/jsonp",{jsonpCallbackFunction: 'callback'})
           .then((response) => response.json())
           .then((responseText) => {
              return  responseText.city;
           })
}