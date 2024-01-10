import React, {useContext} from "react";
import {weatherContext} from "../UI/WeatherDisplayUi";

const FavoriteButton = () => {
    const {setIsListVisible} = useContext(weatherContext);

    return (
        <>
            <div className='favorite_button'>
                <button onClick={() => setIsListVisible((isVisible) => !isVisible)}>Favorite List</button>
            </div>
        </>
    )
}

export default FavoriteButton;