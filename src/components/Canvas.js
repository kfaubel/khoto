import React from 'react';
import axios from 'axios';
import './Canvas.css';

const crypto = require('crypto');
const options = { algorithm: 'aes256' };

class MyCanvas extends React.Component {
    // Important props:
    // url - full path
    // type - jpeg, png, gif
    // password - Crypt password (optional)
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props); // url = full url to image 
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.url === this.props.url) {
            console.log("Canvas::componentDidUpdate: url did not change");
            return;
        }
        
        if (this.props.url !== null && this.props.url !== "") {
            this.setImage(this.props.url);
        } else {
            console.log(`Canvas - Blank URL, skipping. but grey`);
            let canvas = document.getElementById("myCanvas");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            let ctx = canvas.getContext("2d");
            ctx.fillStyle = "grey";
            ctx.fillRect(0,0,canvas.width,canvas.height);
        }
    }

    componentDidMount() {
        console.log(`Canvas - componentDidMount: ${this.props.url}`);
        
        if (this.props.url !== null && this.props.url !== "") {
            this.setImage(this.props.url);
        } 
    }

    componentWillUnmount() {
        console.log(`Canvas - componentWillUnmount: ${this.props.url}`);
    }

    setImage = async () => {
        
        if (this.props.url === "") {
            console.log(`Canvas::setImage Blank url, Skipping.`);
            return;
        }
        console.log(`Canvas::setImage Retreiving: ${this.props.url}`);
        
        try {
            let listResult = await axios({
                method: 'get',
                url: this.props.url,
                responseType: 'text',
                headers: { 'Access-Control-Allow-Origin': '*' }
            });

            //console.log(listResult.data);

            let encryptedData = new Buffer(listResult.data, 'base64');
            let decryptedData = null;

            if (this.props.password !== "") {
                const cryptKey = crypto.createHash('sha256').update(String(this.props.password)).digest('base64').substr(0, 32); // 32 bytes
                const iv = Buffer.alloc(16, 0); 
                var cipher = crypto.createDecipheriv(options.algorithm, cryptKey, iv);
            
                decryptedData = Buffer.from(cipher.update(encryptedData), 'binary');
                decryptedData = Buffer.concat([decryptedData, cipher.final()]);
            } else {
                console.log(`Canvas::setImage: No key, Skipping decryption.`)
                decryptedData = encryptedData
            }

            let image = new Image();
            
            image.onload = () => {
                this.showImage(image);
            } 

            image.onerror = () => {
                //console.log(`Canvas - onerror()`);
                let canvas = document.getElementById("myCanvas");
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
    
                let ctx = canvas.getContext("2d");
                ctx.fillStyle = "grey";
                ctx.fillRect(0,0,canvas.width,canvas.height);
            }    
            
            image.src = "data:image/" + this.props.type + ";base64," + new Buffer(decryptedData).toString('base64');
        } catch(error) {
            console.error(`Viewer::loadImageList failed: ${error}`);
        }
    }

    showImage = (image) => {
        let canvas = document.getElementById("myCanvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let ctx = canvas.getContext("2d");

        var wrh = image.width / image.height;
        var newWidth = canvas.width;
        var newHeight = newWidth / wrh;
        if (newHeight > canvas.height) {
            newHeight = canvas.height;
            newWidth = newHeight * wrh;
        }

        var x = 0;
        var y = 0;

        if (newWidth < canvas.width) {
            x = (canvas.width - newWidth) / 2;
        }

        if (newHeight < canvas.height) {
            y = (canvas.height - newHeight) / 2;
        }

        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, x, y, newWidth, newHeight);
    }

    render() {
        return (<canvas id="myCanvas"></canvas>);
    }
}

export default MyCanvas;