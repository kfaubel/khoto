import React from 'react';

class ToggleButton extends React.Component {    
    render() {
        return (
            <button
                id="toggleButton"
                className="btn btn-primary float-button-toggle"
                onClick={this.props.handleOnToggle}>
                [ - ]
            </button>
        );
    }
}

export default ToggleButton;