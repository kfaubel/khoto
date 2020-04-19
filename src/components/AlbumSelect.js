import React from 'react';

function AlbumSelect(props) {
    const options = props.albums.map((album) =>
        <option key={album} value={album} >{album}</option>,
    );

    return (
        <select
            id="albumSelect"
            className="float-select"
            value={props.selectedAlbum}
            onChange={props.handleChange}>
            {options}
        </select>
    );
}

export default AlbumSelect;