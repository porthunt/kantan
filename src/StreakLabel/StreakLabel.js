import React from 'react';
import './StreakLabel.css';

const StreakLabel = (props) => {
    return (
        <p class="streak">Your streak is {props.streak}, keep going!</p>
    );
}

export default StreakLabel;
          