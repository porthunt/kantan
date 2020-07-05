import React from 'react';
import './Header.css';
import DARK_COLOR from '../themes/dark';
import LIGHT_COLOR from '../themes/light';

const Header = (props) => {
    return (
        <div>
            <p
                className="header"
                onClick={props.click}
                style={props.theme === "light" ? {color: LIGHT_COLOR} : {color: DARK_COLOR}}>
                { props.theme === "light" ? "Dark" : "Light" } Mode 
            </p>
        </div>
    );
}

export default Header;
          