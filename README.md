This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Overview
This page provides a viewer for photos stored on a server someplace.  The site on the login page can be used to specify this (e.g.: "localhost:8000").

Imagine that this viewer were posted to github pages and the image server sat on a private 
server behind a home firewall someplace.

It's mostly a sandbox to sort out React and hot to build a full screen app.

## Image server
The image server needs to support the following REST endpoint
```
    // GET a list of albums, 
    // 'user' is provided and can optionally be validated
    // Result is a JSON array of names of albums
    app.route('/api/user/:user/albums')
        .get(setsController.getAlbums);

    // GET a list of images within an album, 
    // 'user' is provided and can optionally be validated
    // Result is a JSON array of names of images in the specified album
    app.route('/api/user/:user/album/albumName/:albumName')
        .get(setsController.getAlbum);
  
    // GET a base64 encoded image based on the specified album and imageName, 
    // 'user' is provided and can optionally be validated
    app.route('/api/user/:user/base64Image/albumName/:albumName/imageName/:imageName')
        .get(setsController.getBase64Image);

    // Gets a value for the 'user' and 'key'
    // Result is a simple string (not JSON) with the value 
    // E.g.: GET /api/marty-mcfly/setting/lastAlbum    might return 'future-pics'
    app.route('/api/user/:user/setting/key/:key')
        .get(settingsController.getSetting);

    // POST (should be PUT) a new vlaue for user/key/value
    // E.g.: POST /api/marty-mcfly/setting/lastIndex/value/17   Stores '17' for later retreival
    app.route('/api/user/:user/setting/key/:key/value/:value')    
        .post(settingsController.postSetting)
```