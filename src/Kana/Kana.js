import React from 'react';
import './Kana.css';
import DARK_COLOR from '../themes/dark';
import LIGHT_COLOR from '../themes/light';

const Kana = (props) => {
  return (
        <p style={props.theme === "light" ? {color: LIGHT_COLOR} : {color: DARK_COLOR}} className={"kana " + props.validity}>
            {props.kana}
        </p>
  );
}

export default Kana;
