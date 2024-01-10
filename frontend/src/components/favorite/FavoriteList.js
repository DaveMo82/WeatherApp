import React from "react";
import {IoIosTrash} from "react-icons/io";

const FavoriteList = (props) => {
    const {isVisible, favoritesData, deleteCity} = props;


    return (
        <div className={`favorite_list ${isVisible ? 'visible' : ''}`}>
            <ul>
                {favoritesData.map((city, index) => (
                    <li key={index}>
                        {city.name}
                        <div className="delete_button_container">
                            <button
                                type="button" className="delete_button" onClick={() => deleteCity(city.id)}>
                                <IoIosTrash/></button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoriteList;