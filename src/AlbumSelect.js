import React from 'react';

class AlbumSelect extends React.Component {
    
    render() {
        //console.log("AlbumSelect: albums: " + this.props.albums + " Active: " + this.props.selectedAlbum);
        const options = this.props.albums.map((album) =>
            <option key={album} value={album} >{album}</option>,
        );

        return (
            <select 
              id="albumSelect" 
              className="float-select" 
              value={this.props.selectedAlbum} 
              onChange={this.props.handleChange}>
                {options}
            </select>
        );
    }
}

export default AlbumSelect;