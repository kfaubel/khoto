import React from 'react';

class PrevButton extends React.Component {  
    render() {
      return (
        <button
            id="prevButton" 
            className="float-button-prev"
            onClick={this.props.handleOnPrev}>
            &lt;
        </button>
      );
    }
  }
  
export default PrevButton;