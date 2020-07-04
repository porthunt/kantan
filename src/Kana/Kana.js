import React from 'react';
import './Kana.css';

const Kana = (props) => {
  return (
        <p className={"kana " + props.validity}>
            {props.kana}
        </p>
  );
}

export default Kana;
