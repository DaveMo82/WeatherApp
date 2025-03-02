import React, {createContext, useState} from "react";
import axios from 'axios';
import Popup from "reactjs-popup";
import WeatherPopWind from "../pop_up/WeatherPopWind";
import WeatherPopTemp from "../pop_up/WeatherPopTemp";
import FavoriteButton from "../favorite/FavoriteButton";
import SearchBar from "../SearchBar";
import LoadingSpinne from "../LoadingSpinne";
import FavoriteData from "../favorite/FavoriteData";

export const weatherContext = createContext();


function WeatherDisplayUi() {
    const [input, setInput] = useState('');
    const [weather, setWeather] = useState({loading: false, data: {}, error: false});
    const [showAlert, setShowAlert] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [isFavorites, setIsFavorites] = useState(false);
    const [isListVisible, setIsListVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [titleClass, setTitleClass] = useState("");
    const [isAnimationDisabled, setIsAnimationDisabled] = useState(true);

    const toDateFunction = () => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ];
        const weekDays = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
        ];
        const currentDate = new Date();
        const date = `${weekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
        return date;
    };

    const search = async (event) => {
        if (event.key === 'Enter') {
            setIsLoading(true);
            setIsAnimationDisabled(false);
            event.preventDefault();
            setInput('');
            setWeather({...weather, loading: true});

            setTitleClass("content");
            setTimeout(() => {
                setIsAnimationDisabled(true);
            }, 2000);


            try {
                const apiKeyResponse = await axios.get('http://localhost:8080/api-key');
                const apiKey = apiKeyResponse.data;

                const url = 'https://api.openweathermap.org/data/2.5/weather';
                const response = await axios.get(url, {
                    params: {
                        q: input,
                        units: 'metric',
                        appid: apiKey,
                    },
                });
                setIsLoading(false);
                setWeather({data: response.data, loading: false, error: false});
                const temperature = response.data.main.temp;
                const wind = response.data.wind.speed;

                const isHighWind = wind > 1;
                const isLowTemperature = temperature < 3;

                setShowAlert(isHighWind ?"wind" :isLowTemperature ? "temperature" : null);

            } catch (error) {
                setWeather({...weather, data: {}, error: true});
                setInput('');
                console.log('error', error);
            }
        }
    };

    return (
        <>
            <weatherContext.Provider value={{isListVisible, setIsListVisible}}>
                <div className="weather_container">
                    <div className={isAnimationDisabled ? "content_disabled" : titleClass}>
                        <h2>Weather</h2>
                        <h2>Weather</h2>
                    </div>
                    <FavoriteButton favorites={favorites}/>
                    {isLoading ? <LoadingSpinne weather={weather}/> : weather && weather.data && weather.data.main && (
                        <div className="weather_condition">
                            <div className="city_name">
                                <h2>
                                    {weather.data.name},<span>{weather.data.sys.country}</span>
                                </h2>
                            </div>
                            <div className="date">
                                <span>{toDateFunction()}</span>
                            </div>
                            <div className="icon_temp">
                                <img
                                    className=""
                                    src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                                    alt={weather.data.weather[0].description}
                                />
                            </div>
                            <div className="deg">
                                <sup>{weather.data.main.temp}°C</sup>
                            </div>
                            <div className="des-wind">
                                <p>{weather.data.weather[0].description.toUpperCase()}</p>
                                <p>Wind Speed: {weather.data.wind.speed}m/s</p>
                            </div>
                        </div>
                    )}
                    <SearchBar setInput={setInput} input={input} search={search}/>
                    {weather.error && (
                        <span className="error_message">
                        <span style={{fontSize: '20px'}}>City not found</span>
                    </span>
                    )}
                    {showAlert === "temperature" && (
                        <Popup open={showAlert} closeOnDocumentClick onClose={() => setShowAlert(null)}>
                            <WeatherPopTemp trigger={true} temperature={weather.data.main.temp}/>
                        </Popup>
                    )}
                    {showAlert === "wind" && (
                        <Popup open={showAlert} closeOnDocumentClick onClose={() => setShowAlert(null)}>
                            <WeatherPopWind trigger={true} wind={weather.data.wind.speed}/>
                        </Popup>
                    )}
                    <FavoriteData favorites={favorites} setFavorites={setFavorites} setIsFavorites={setIsFavorites}
                                  weather={weather} isFavorites={isFavorites}/>
                </div>
            </weatherContext.Provider>
        </>
    );
}

export default WeatherDisplayUi;
