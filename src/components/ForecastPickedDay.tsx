import React, {FC} from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import {WeatherEntity} from "./WeatherEntity";
import {Weather} from "./weather";
import {convertUnixTimeToDateString} from "../services/dateUtilities";

interface ForecastPickedDayProps {
    forecastDay: Weather
}

export const ForecastPickedDay: FC<ForecastPickedDayProps> = ({forecastDay}) => {
    return <React.Fragment>
        <h2 className={'sub-header'}></h2>
        <WeatherEntity weather={forecastDay} current={true} onClick={()=>{}}/>
        </React.Fragment>
}
export default ForecastPickedDay