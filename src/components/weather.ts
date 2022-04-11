export interface Coordinates {
    lon: number;
    lat: number;
}

export interface WeatherLocation {
    coord: Coordinates;
    id: number;
    name: string;
}

export interface WeatherConditions {
    id: number;
    main: string;
    description: string;
    icon: string;
}



export interface Weather {
    weather: WeatherConditions[];
    temp: number;
    feels_like: number;
    temp_min: number | null;
    temp_max: number | null;
    pressure: number;
    humidity: number;
    dt: number;
}
