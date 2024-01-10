import {Oval} from "react-loader-spinner";
import React from "react";

const LoadingSpinne = (props) => {
const {weather} =props;
    return (
        <div className="weather_condition">
            {weather.loading && (
                <Oval type="Oval" color="black" height={100} width={100}/>
            )}
        </div>
    )
}

export default LoadingSpinne;