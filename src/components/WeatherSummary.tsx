import React, {FC, SetStateAction, useEffect, useState} from "react";
import {Weather, WeatherLocation} from "./weather";
import {readForecastDay, readForecastWeek, readWeather} from "../services/weatherService";
import "../scss/weather-summary.scss"
import ScrollContainer from "react-indiana-drag-scroll";
import {WeatherEntity} from "./WeatherEntity";
import {Graphic} from "./Graphic";
import ForecastDay from "./ForecastDay";
import ForecastWeek from "./ForecastWeek";

interface WeatherSummaryProps {
    location: WeatherLocation | null;
    pickedRender: string;
}

export const WeatherSummary: FC<WeatherSummaryProps> = ({location, pickedRender}) => {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [forecastDay, setForecastDay] = useState<Weather[] | null>(null);
    const [forecastWeek, setForecastWeek] = useState<Weather[] | null>(null);
    const [render, setRender] = useState(<div></div>)
    useEffect(() => {
        (async function () {
            if (location) {
                const [currentWeather, forecastDay, forecastWeek] = await Promise.all([
                    readWeather(location.id),
                    readForecastDay(location.coord.lat, location.coord.lon),
                    readForecastWeek(location.coord.lat, location.coord.lon)
                ]);
                setWeather(currentWeather);
                setForecastDay(forecastDay);
                setForecastWeek(forecastWeek);
            }
        })();

    }, [location]);
    useEffect(() => {
        selectRender(pickedRender)
    }, [location, pickedRender, forecastDay, forecastWeek])

    if (!location || !weather || !forecastDay || !forecastWeek) return null;

    function selectRender(pickedRender: string): SetStateAction<JSX.Element | void> {
        switch (pickedRender) {
            case "forecast-today":
                return setRender(<ForecastDay forecastDay={forecastDay}/>)
            case "forecast-week":
                return setRender(<ForecastWeek forecastWeek={forecastWeek}/>)
            case "graphic-today":
                if (forecastDay === null) return setRender(<div></div>)
                return setRender(<Graphic weathers={forecastDay} isGraphicForDay={true}/>)
            case "graphic-week":
                if (forecastWeek === null) return setRender(<div></div>)
                return setRender(<Graphic weathers={forecastWeek} isGraphicForDay={false}/>)
            default:
                return setRender(<div></div>)
        }
    }

    return (
        <div className={'weather-summary'}>
            <h2 className={'current-city'}>{location.name}</h2>
            <WeatherEntity weather={weather} current={true} onClick={()=>{}}/>

            {render}

        </div>
    );
}