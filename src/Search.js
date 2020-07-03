import React from 'react';

const Search = (props) => {
    return(
        <input 
        className="input grid-item" 
        placeholder="Type Something" 
        onChange={props.changed}
        onKeyPress={props.presskey}
        value={props.search} 
        ref={props.inputRef}/>
    )
};

export default Search;

