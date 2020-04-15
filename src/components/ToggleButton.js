import React from 'react';

class ToggleButton extends React.Component {    
    render() {
        return (
            <button
                id="toggleButton"
                className="float-button-toggle"
                onClick={this.props.handleOnToggle}>
                [ - ]
            </button>
        );
    }
}

export default ToggleButton;