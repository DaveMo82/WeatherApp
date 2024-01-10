import React from "react";

const SearchBar = (props) => {
    const {setInput, input, search} = props;

    return (
        <div className="search_bar">
            <input
                className="search_input"
                type="text"
                placeholder="Search city"
                name="query"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyPress={search}
            />
        </div>
    )
}

export default SearchBar;