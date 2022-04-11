import React, {FC, useState} from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import {WeatherEntity} from "./WeatherEntity";
import {Weather} from "./weather";
import ForecastPickedDay from "./ForecastPickedDay";

interface ForecastWeekProps {
    forecastWeek: Weather[]|null
}

export const ForecastWeek: FC<ForecastWeekProps> = ({forecastWeek}) => {
    const [forecastPickedDay, setForecastPickedDay] = useState<JSX.Element | null>()
    return <React.Fragment><h2 className={'sub-header'}>Forecast for the week</h2>
        <ScrollContainer className="scroll-container forecast-group-wrapper"
                         horizontal={true}
                         hideScrollbars={false}>
            <ul className="forecast-group-week">
                {forecastWeek?.map(it =>
                    <WeatherEntity weather={it}
                                   key={it.dt}
                                   current={false}
                                   onClick={
                                       ()=>setForecastPickedDay(<ForecastPickedDay forecastDay={it}/>)}
                    />
                )}
            </ul>
        </ScrollContainer>
        {forecastPickedDay}
    </React.Fragment>
}
export default ForecastWeek