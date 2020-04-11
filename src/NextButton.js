import React from 'react';

class NextButton extends React.Component {    
    render() {
        return (
            <button
                id="nextButton"
                className="btn btn-primary  btn-lg float-button-next"
                onClick={this.props.handleOnNext}>
                &gt;
            </button>
        );
    }
}

export default NextButton;