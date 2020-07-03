import React from 'react'
import clearButton from './images/close-icon.svg'

const Header = (props) => (
    <header className="header grid">
        {props.hasResults ? <button onClick={props.clearSearch}><img src={clearButton} alt="Close button" /></button> : <h1 className="title">HI! Find FUN</h1> }
    </header>
)

export default Header;