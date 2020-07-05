import React from 'react';
import './StreakLabel.css';
import DARK_COLOR from '../themes/dark';
import LIGHT_COLOR from '../themes/light';

const StreakLabel = (props) => {
    return (
        <p 
          class="streak"
          style={props.theme === "light" ? {color: LIGHT_COLOR} : {color: DARK_COLOR}}>
            Your streak is {props.streak}, keep going!
        </p>
    );
}

export default StreakLabel;
          