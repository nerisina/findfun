import React from 'react';
import loader from './images/loader.svg';

const UserHint = (props) => (
    <div className="user-hint">
       {props.loader ? <img src={loader} alt="Spinner" className="block mx-auto" /> : props.hinttxt}
    </div>
)

export default UserHint;