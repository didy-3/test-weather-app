import React, {FC} from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import {WeatherEntity} from "./WeatherEntity";
import {Weather} from "./weather";

interface ForecastDayProps {
    forecastDay: Weather[] |null
}

export const ForecastDay: FC<ForecastDayProps> = ({forecastDay}) => {
    return <React.Fragment><h2 className={'sub-header'}>Forecast for the day</h2>
        <ScrollContainer className="scroll-container forecast-group-wrapper"
                         horizontal={true}
                         hideScrollbars={false}>
            <ul className="forecast-group-hourly">
                {forecastDay?.map(it =>
                    <WeatherEntity weather={it} key={it.dt} current={false} onClick={()=>{}}/>
                )}
            </ul>
        </ScrollContainer></React.Fragment>
}
export default ForecastDay