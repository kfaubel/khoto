import React from 'react';
// AlbumSelect
//                 selectedAlbum={activeAlbum}
//                 handleChange={handleAlbumChange}
//                 albums={albumList}
//             />
function AlbumSelect({selectedAlbum, handleChange, albums}) {
    console.log(`AlbumSelect: ${selectedAlbum} ${JSON.stringify(albums, null, 2)}`);

    if (albums === undefined || albums.length === 0) {
        return (
            <select
                id="albumSelect"
                className="float-select"
                value={selectedAlbum}
                onChange={handleChange}>
                <option value="Loading">Loading...</option>
            </select>
        );
    }
    
    const options = albums.map((album) =>
        <option key={album} value={album} >{album}</option>,
    );

    return (
        <select
            id="albumSelect"
            className="float-select"
            value={selectedAlbum}
            onChange={handleChange}>
            {options}
        </select>
    );
}

export default AlbumSelect;