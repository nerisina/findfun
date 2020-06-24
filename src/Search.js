import React from 'react';

const Search = (props) => (
    <div className="search grid">
        <input 
        className="input grid-item" 
        placeholder="Type Something" 
        onChange={props.changed}
        onKeyPress={props.presskey}
        value={props.search} />
    </div>
)

export default Search;

