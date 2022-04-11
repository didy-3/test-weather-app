import React, {useEffect, useState} from 'react';
import './App.scss';
import './scss/popup.scss'
import {LocationSearch} from "./components/LocationSearch";
import {getLocalCity, getLocalCityIfLocationIsNotAllowed, searchLocation} from "./services/weatherService";
import {WeatherLocation} from "./components/weather";
import {WeatherSummary} from "./components/WeatherSummary";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import menu from './menu.json';


function App() {
    const [currentLocation, setCurrentLocation] = useState<WeatherLocation | null>(null);
    const [error, setError] = useState('');
    const [pickedRender, setPickedRender] = useState<string>('forecast-today');
    const [username, setUsername] = useState<string | null>(JSON.parse(localStorage.getItem("username") as string))
    const [askUsername, setAskUsername] = useState<JSX.Element | null>(null)
    if (localStorage.getItem("username") === null) {
        localStorage.setItem("username", JSON.stringify("Anonymous"))
        setUsername(localStorage.getItem("username"))
    }

    const resetAlert = () => {
        setError('');
    }
    const addLocation = async (town: string) => {
        resetAlert();
        const location = await searchLocation(town);
        if (!location) {
            setError(`No location found called '${town}'`);
        } else {
            setCurrentLocation(location);
        }
    };

    function setLocalAddress() {
        navigator.geolocation.watchPosition(async function (position) {
                const location = await getLocalCity(position.coords.latitude, position.coords.longitude)
                setCurrentLocation(location)
            },
            async function (position) {
                const location = await getLocalCityIfLocationIsNotAllowed()
                await addLocation(location)
            });
    }

    function usernameModalPopup(): JSX.Element {
        let name = '';

        function keyPress(e: React.KeyboardEvent<HTMLInputElement>, name: string) {
            if (e.key === "Enter") {
                localStorage.setItem("username", JSON.stringify(name))
                setUsername(name)
                setAskUsername(null)
            }
        }

        return <div id={"modal-popup"} className={"popup-wrapper"}>
            <div className={"popup"}>
                <label className={"popup-label"}>
                    What's your name?

                </label>
                <input className={"popup-input"}
                       onChange={e => name = (e.target.value)}
                       onKeyDown={(e) => keyPress(e, name)}

                />
                <div className="close"
                     onClick={() => {
                         setAskUsername(null)
                     }}>
                    &times;
                </div>
            </div>
        </div>
    }

    // load local city
    useEffect(() => {
        setLocalAddress()
    }, [])

    useEffect(() => {
        if (username === "Anonymous" || username===null)
            setAskUsername(usernameModalPopup)

    }, [username])

    return (
        <div className="App">
            {askUsername}
            <div className={"menu-bar"}>
                <Menu menuJSON={menu} updateApp={(pick: string): void => {
                    setPickedRender(pick)
                }}/>
                <LocationSearch onSearch={addLocation}/>
                {error && <div role={'alert'}>{error}</div>}
            </div>
            <h2 className={"user-greetings"}>Hello, {username}!</h2>
            <WeatherSummary location={currentLocation} pickedRender={pickedRender}/>
            <Footer/>
        </div>
    );
}

export default App;
