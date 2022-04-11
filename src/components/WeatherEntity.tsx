import React, {FC} from "react";
import {Weather} from "./weather";
import {
    convertUnixTimeToDateString,
    convertUnixTimeToString,
    convertUnixTimeToWeekDay
} from "../services/dateUtilities";


interface WeatherEntityProps {
    weather: Weather;
    current: boolean;
    onClick: ()=>void
}

export const WeatherEntity: FC<WeatherEntityProps> = ({weather, current,onClick}) => {
    if (current) {
        return <li className={'forecast-current'}>
            <div>{convertUnixTimeToWeekDay(weather.dt)}</div>
            <div>{convertUnixTimeToDateString(weather.dt)}</div>
            <div>
                <p className={'main-temp'}>{Math.round(weather.temp)}°C</p>
                <div>({Math.round(typeof weather.temp_min === "number" ? weather.temp_min : 0)}°C
                    / {Math.round(typeof weather.temp_max === "number" ? weather.temp_max : 0)}°C)
                </div>
            </div>
            <div>Humidity: {weather.humidity}%</div>
            <div>Feels like: {Math.round(weather.feels_like)}°C</div>
            {weather.weather.map(condition =>
                <div key={condition.id}>
                    <img src={require(`../assets/icons/${condition.icon}.png`)} alt={condition.main}/>
                    <p>{condition.description}</p>
                </div>)
            }
        </li>
    }
    //hourly
    if (weather.temp_min === null) {
        return (<li className={'forecast-item'}>
            <div>{convertUnixTimeToString(weather.dt)}</div>
            <div>
                <strong>{Math.round(weather.temp)}°C</strong>
            </div>
            <p>{weather.humidity}%</p>
            {weather.weather.map(condition =>
                <div key={condition.id}>
                    <img src={require(`../assets/icons/${condition.icon}.png`)} alt={condition.main}
                         style={{width: "30px"}}/>
                </div>)
            }
        </li>)
    }
    //week
    else return (<li className={'forecast-item'}  onClick={onClick} >
        <div>{convertUnixTimeToWeekDay(weather.dt)}</div>
        <div>
            <strong>{Math.round(weather.temp)}°C</strong>
            <div>({Math.round(weather.temp_min)}°C
                / {Math.round(typeof weather.temp_max === "number" ? weather.temp_max : 0)}°C)
            </div>
        </div>
        <div>Humidity: {weather.humidity}%</div>
        {weather.weather.map(condition =>
            <div key={condition.id}>
                <img src={require(`../assets/icons/${condition.icon}.png`)} alt={condition.main}
                     style={{width: "50px"}}/>
            </div>)
        }
    </li>)

}