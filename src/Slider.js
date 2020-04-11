/* eslint-disable no-useless-constructor */
import React from 'react';

class Slider extends React.Component {
    render() {
        // console.log(`Slider: Max: ${this.props.max} Current :${this.props.current}`);
        return (
            <div id="imageSlider" className="slidecontainer">
                <input
                    className="slider"
                    id="myRange"
                    type="range"
                    min="0"
                    max={this.props.max}
                    value={this.props.current}
                    onChange={this.props.handleChange} />
            </div>
        );
    }
}

export default Slider;