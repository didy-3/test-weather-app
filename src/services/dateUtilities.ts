import {format} from "date-fns";
import {enGB, ru} from "date-fns/locale";

export function convertUnixTimeToString(unixUtc: number): string {
    let time =  new Date(unixUtc * 1000)
    return `${time.getHours()}:00`
}
export function convertUnixTimeToDateString(unixUtc: number): string {
    let time =  new Date(unixUtc * 1000)
    return format(time, 'dd.MM.yyyy', {locale:ru})
}

export function convertUnixTimeToWeekDay(unixUtc: number): string {
    let time =  new Date(unixUtc * 1000)
    let res = format(time, 'EEEE', {locale:enGB})
    return  res.charAt(0).toUpperCase() + res.slice(1);
}