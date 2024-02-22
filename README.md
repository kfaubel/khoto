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
## Design

### Components
* App
  * LoginScreen
  * ViewerScreen
    * Canvas
    * NextButton
    * PrevButton
    * AlbumSelect
    * Slider
    * ToggleButton

### Helpers
* credentials is an object with: user, site, password
* settings
  * loadSettings(credentials, key, setting) 
  * saveSettings(credentials, key, setting, value) 
* album 
  * loadAlbumList(credentials)
  * loadImageList(credentials, albumName)
  * loadImage(credentials, imageIndex)
  * Album
    * Image
  * Settings
  * About
## Deployment
Publish updated version to github and a github action pushes this to azure.  See: https://github.com/kfaubel/khoto/actions

## Image server
The image server needs to support the following REST endpoint
```
// Routes  
    app.route('/api/v1/albums/user/:user')
    app.route('/api/v1/album/user/:user/albumName/:albumName')  
    app.route('/api/v1/base64Image/user/:user/albumName/:albumName/imageName/:imageName')

    app.route('/api/v1/setting/user/:user/key/:key')
    app.route('/api/v1/setting/user/:user/key/:key/value/:value')  
    
```