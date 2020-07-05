import React from 'react';
import './Footer.css';
import DARK_COLOR from '../themes/dark';
import LIGHT_COLOR from '../themes/light';

const Footer = (props) => {
    return (
        <p
            className="footer"
            style={props.theme === "light" ? {color: LIGHT_COLOR} : {color: DARK_COLOR}}>
            Visit this project on <a href="https://github.com/porthunt/hiragana-challenge" alt="GitHub">GitHub</a>
        </p>
    );
}

export default Footer;
          