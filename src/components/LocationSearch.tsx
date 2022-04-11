import React from "react";
import {FC, useState} from "react";
import '../scss/search.scss'

interface LocationSearchProps {
    onSearch: (search: string) => void;
}

export const LocationSearch: FC<LocationSearchProps> = ({onSearch}) => {
    const [locationSearch, setLocationSearch] = useState('');
    const disableSearch = locationSearch === '';

    const addLocation = () => {
        onSearch(locationSearch);
        setLocationSearch('');
    };

    function keyPress(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === "Enter") {
            addLocation()
        }
    }

    return (
        <div className={'search-area-wrapper'}>
            <div className={'search-area'}>
                <label className={'search-input'}>
                    <input type="text" value={locationSearch}
                           placeholder={"Enter a city"}
                           onChange={e => setLocationSearch(e.target.value)}
                           onKeyDown={(e) => keyPress(e)}
                    />
                </label>
                <button className={'search-btn'}
                        onClick={addLocation}
                        disabled={disableSearch}
                >
                    Search
                </button>
            </div>
        </div>
    );
}