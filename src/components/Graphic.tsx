import React, {FC} from "react";
import {Weather} from "./weather";
import {LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip} from 'recharts';
import {
    convertUnixTimeToString,
    convertUnixTimeToWeekDay
} from "../services/dateUtilities";


interface GraphicProps {
    weathers:Weather[];
    isGraphicForDay: boolean;
}

export const Graphic :FC<GraphicProps> = ({weathers, isGraphicForDay}) =>{

    const data = weathers.map((it)=>{
        if (isGraphicForDay){
            return {name: convertUnixTimeToString(it.dt), temp: it.temp}
        }
        else{
            return {name: convertUnixTimeToWeekDay(it.dt), temp: it.temp}
        }
    });
    return <div className={'graphic'}>
        <ResponsiveContainer width="95%" height={200}>
        <LineChart data={data} >
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Line type="monotone" dataKey="temp" stroke="rgba(254, 207, 0, 1)" strokeWidth={2} />
            <XAxis dataKey="name" />
            <YAxis />
        </LineChart>
        </ResponsiveContainer>
    </div>
}