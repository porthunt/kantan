import React from 'react';
import './Skip.css';

const Skip = (props) => {
    return (
        <p className="skip" onClick={props.click}>Skip</p>
    );
}

export default Skip;
          