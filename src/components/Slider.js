/* eslint-disable no-useless-constructor */
import React from 'react';

function Slider(props) {
    return (
        <div id="imageSlider" className="slidecontainer">
            <input
                className="slider"
                id="myRange"
                type="range"
                min="0"
                max={props.max}
                value={props.current}
                onChange={props.handleChange} />
        </div>
    );
}

export default Slider;