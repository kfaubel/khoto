import axios from 'axios';
import config from "../config.json";
import crypto from 'crypto';
//const crypto = require('node:crypto');

var currentAlbumName = "";
var albumList = [];
var imageList = [];

/**
 * getAlbumList 
 * @param {*} credentials - The credentials to use for the image retrieval
 * @returns - An array of album names  
 * Result: [ "album1", "album2", "album3" ]
 */
const loadAlbumList = async (credentials) => {

    if (albumList.length === 0) {
        console.log("album: loadAlbumList: No albums loaded, loading...");

        var albumUrl = `${config.proto}://${credentials.site}/api/v1/albums/user/${credentials.name}`;
        console.log("album: loadAlbumList: albumUrl: " + albumUrl);

        try {
            let listResult = await axios({
                method: 'get',
                url: albumUrl,
                responseType: 'json'
            });
            albumList = listResult.data;
            console.log(`album: loadAlbumList: found ${albumList.length} albums: ${JSON.stringify(albumList, null, 2)}`);
            console.log(`album: loadAlbumList: found type ${typeof albumList}`);
        } catch (error) {
            console.error(`album: loadAlbumList: failed: ${error}`);
            albumList = [];
        }
    }

    return albumList;
}

/**
 * Synchronous retreival of the album list
 * @param {*} credentials - The credentials to use for the image retrieval
 * @param {*} albumName - The name of the album to retrieve
 * @returns - The count of images in the album
 * Result from server: [ "image1", "image2", "image3"]
 */
const loadImageList = async (credentials, albumName) => {
    currentAlbumName = albumName;
    // Yes, the extra "album" in the URL is correct, but weird.
    let imageListUrl = `${config.proto}://${credentials.site}/api/v1/album/user/${credentials.name}/albumName/${albumName}`;
    console.log("album: loadImageList: albumUrl: " + imageListUrl);

    try {
        let imageResult = await axios({
            method: 'get',
            url: imageListUrl,
            responseType: 'json'
        })
        imageList = imageResult.data;
    } catch (error) {
        console.error(`album: loadImageList: failed: ${error}`);
    }

    console.log(`album: loadImageList: found ${imageList.toString()}`);
    console.log(`album: loadImageList: found ${imageList.length} images: ${JSON.stringify(imageList, null,)}`);

    return imageList.length;
}

/**
 * Synchronous retreival of the image
 * @param {*} credentials - The credentials to use for the image retrieval
 * @param {*} albumName - The name of the album to retrieve
 * @returns - An array of album names
 */
const loadImage = async (credentials, imageIndex) => {
    var newType = "";
    var imagePassword = credentials.password;

    if (imageList[imageIndex].endsWith("daj")) {
        newType = "jpeg";
    } else if (imageList[imageIndex].endsWith("dag")) {
        newType = "gif";
    } else if (imageList[imageIndex].endsWith("dap")) {
        newType = "png";
    } else if (imageList[imageIndex].endsWith("jpeg")) {
        newType = "jpeg";
        imagePassword = "";
    } else if (imageList[imageIndex].endsWith("jpg")) {
        newType = "jpeg";
        imagePassword = "";
    } else if (imageList[imageIndex].endsWith("png")) {
        newType = "png";
        imagePassword = "";
    } else if (imageList[imageIndex].endsWith("gif")) {
        newType = "gif";
        imagePassword = "";
    }
    var imageUrl = `${config.proto}://${credentials.site}/api/v1/base64Image/user/${credentials.name}/albumName/${currentAlbumName}/imageName/${imageList[imageIndex]}`;
    console.log("album: loadImage: albumUrl: " + imageUrl);

    try {
        let listResult = await axios({
            method: 'get',
            url: imageUrl,
            responseType: 'text',
            headers: { 'Access-Control-Allow-Origin': '*' }
        });

        //console.log(listResult.data);

        let encryptedData = new Buffer.from(listResult.data, 'base64');
        let decryptedData = null;

        if (imagePassword !== "") {
            //const options = { algorithm: 'aes256' };
            const cryptKey = crypto.createHash('sha256').update(String(imagePassword)).digest('base64').substr(0, 32); // 32 bytes
            const iv = Buffer.alloc(16, 0); 
            var cipher = crypto.createDecipheriv("aes256", cryptKey, iv);
        
            decryptedData = Buffer.from(cipher.update(encryptedData), 'binary');
            decryptedData = Buffer.concat([decryptedData, cipher.final()]);
        } else {
            console.log(`album: loadImage: No key, Skipping decryption.`)
            decryptedData = encryptedData
        }

        let base64Image = "data:image/" + newType + ";base64," + new Buffer(decryptedData).toString('base64');
        console.log(`album: loadImage: base64Image found and returned as base64 string.`);

        return base64Image;
    } catch(error) {
        console.error(`album::loadImage failed: ${error}`);
        return "";
    }
}

export { loadAlbumList, loadImageList, loadImage };
