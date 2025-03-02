import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {IoIosHeart} from "react-icons/io";
import FavoriteList from "./FavoriteList";
import {weatherContext} from "../UI/WeatherDisplayUi";

const FavoriteData = (props) => {
    const {setFavorites, favorites, setIsFavorites, weather, isFavorites} = props;
    const [favoritesData, setFavoritesData] = useState([]);
    const {isListVisible} = useContext(weatherContext);

    const FavoriteGetData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/weather',)
            setFavoritesData(response.data);
        } catch (error) {
            console.error('error fetching favorite data', error);
        }
    };

    const toggleFavorite = async () => {
        const isCityInFavorite = favorites.some(
            (fav) => fav.name === weather.data.name
        );

        if (isCityInFavorite) {
            const updateFavorites = favorites.filter(
                (fav) => !(fav.name === weather.data.name)
            );
            setFavorites(updateFavorites);
        } else {
            try {
                const response = await axios.post('http://localhost:8080/weather_favorites', {
                    name: weather.data.name,
                });
                const newFavorite = response.data;
                setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
            } catch (error) {
                console.error('Error saving favorite:', error);
            }
        }
    };

    const deleteCity =async (id) => {
        try {
            await axios.delete(`http://localhost:8080/weather_city/${id}`)
            const updateFavoriteData = favoritesData.filter((city) => city.id !==id)
            setFavoritesData(updateFavoriteData);
        }catch (Error){
            console.error("Error deleting city");
        }
    }

    useEffect(() => {
        setIsFavorites(
            favorites.some(
                (fav) => fav.name === weather.data.name
            )
        );
        FavoriteGetData();
    }, [favorites, weather.data.name]);

    return (
        <>
            {favoritesData && <FavoriteList favoritesData={favoritesData} isVisible={isListVisible}
                                            deleteCity={deleteCity}/>}
            {weather && weather.data && weather.data.main && (
                <div className="weather_condition">
                    <td>
                        <IoIosHeart
                            onClick={() => toggleFavorite()}
                            style={{color: isFavorites ? 'red' : 'white'}}
                        />
                    </td>
                </div>
            )}
        </>
    )
}

export default FavoriteData;