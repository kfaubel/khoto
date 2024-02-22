import React from 'react';

const Canvas = ({base64Image}) => {

    return (
        <img src={base64Image} alt="" />
    )

}   

export default Canvas;
//     // Convert the base64Image to an image


//     let canvas = document.getElementById("myCanvas");
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     let ctx = canvas.getContext("2d");

//     var wrh = image.width / image.height;
//     var newWidth = canvas.width;
//     var newHeight = newWidth / wrh;
//     if (newHeight > canvas.height) {
//         newHeight = canvas.height;
//         newWidth = newHeight * wrh;
//     }

//     var x = 0;
//     var y = 0;

//     if (newWidth < canvas.width) {
//         x = (canvas.width - newWidth) / 2;
//     }

//     if (newHeight < canvas.height) {
//         y = (canvas.height - newHeight) / 2;
//     }

//     //ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(image, x, y, newWidth, newHeight);
    
//     return (
//         <canvas id="myCanvas"></canvas>
//     );
    
// }










// import axios from 'axios';
// import crypto from 'node/crypto';

// //const crypto = require('node:crypto');
// const options = { algorithm: 'aes256' };

// class MyCanvas extends React.Component {
//     // Important props:
//     // url - full path
//     // type - jpeg, png, gif
//     // password - Crypt password (optional)
//     // eslint-disable-next-line no-useless-constructor
//     constructor(props) {
//         super(props); // url = full url to image 
//         this.image = null;
//     }

//     componentDidUpdate = (prevProps) => {
//         //console.log("New URL: " + this.props.url);
//         //console.log("Pre URL: " + prevProps.url);
//         if (this.props.url === null && this.props.url === "") {
//             console.log(`Canvas::componnentDidUpdate - blank or null url`);
//             let canvas = document.getElementById("myCanvas");
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;

//             let ctx = canvas.getContext("2d");
//             ctx.fillStyle = "grey";
//             ctx.fillRect(0,0,canvas.width,canvas.height);            
//         } else if (this.props.url === prevProps.url) {
            
//             // All we need to do is re-render since the size probably changed
//             if (this.image === null) {
//                 //console.log("Redraw existing image... but null, so skipping");
//             } else {
//                 //console.log("Canvas::componnentDidUpdate - Redraw existing image");
//                 this.showImage(this.image);
//             }
//         } else {
//             // Do a full retreive and render
//             console.log(`Canvas::componentDidUpdatem- Full fetch and render: ${this.props.url}`);
//             this.setImage(this.props.url);
//         }
//     }

//     componentDidMount() {
//         //console.log(`Canvas::componentDidMount: ${this.props.url}`);
        
//         if (this.props.url !== null && this.props.url !== "") {
//             this.setImage(this.props.url);
//         } 
//     }

//     componentWillUnmount() {
//         // console.log(`Canvas - componentWillUnmount: ${this.props.url}`);
//     }

//     setImage = async () => {
        
//         if (this.props.url === "") {
//             console.log(`Canvas::setImage Blank url, Skipping.`);
//             return;
//         }
//         console.log(`Canvas::setImage Retreiving: ${this.props.url}`);
        
//         try {
//             let listResult = await axios({
//                 method: 'get',
//                 url: this.props.url,
//                 responseType: 'text',
//                 headers: { 'Access-Control-Allow-Origin': '*' }
//             });

//             //console.log(listResult.data);

//             let encryptedData = new Buffer(listResult.data, 'base64');
//             let decryptedData = null;

//             if (this.props.password !== "") {
//                 const cryptKey = crypto.createHash('sha256').update(String(this.props.password)).digest('base64').substr(0, 32); // 32 bytes
//                 const iv = Buffer.alloc(16, 0); 
//                 var cipher = crypto.createDecipheriv(options.algorithm, cryptKey, iv);
            
//                 decryptedData = Buffer.from(cipher.update(encryptedData), 'binary');
//                 decryptedData = Buffer.concat([decryptedData, cipher.final()]);
//             } else {
//                 console.log(`Canvas::setImage: No key, Skipping decryption.`)
//                 decryptedData = encryptedData
//             }

//             let image = new Image();
            
//             image.onload = () => {
//                 this.image = image;
//                 this.showImage(image);
//             } 

//             image.onerror = () => {
//                 //console.log(`Canvas - onerror()`);
//                 this.image = null;
//                 let canvas = document.getElementById("myCanvas");
//                 canvas.width = window.innerWidth;
//                 canvas.height = window.innerHeight;
    
//                 let ctx = canvas.getContext("2d");
//                 ctx.fillStyle = "grey";
//                 ctx.fillRect(0,0,canvas.width,canvas.height);
//             }    
            
//             image.src = "data:image/" + this.props.type + ";base64," + new Buffer(decryptedData).toString('base64');
//         } catch(error) {
//             console.error(`Viewer::loadImageList failed: ${error}`);
//         }
//     }

//     showImage = (image) => {
//         let canvas = document.getElementById("myCanvas");
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;

//         let ctx = canvas.getContext("2d");

//         var wrh = image.width / image.height;
//         var newWidth = canvas.width;
//         var newHeight = newWidth / wrh;
//         if (newHeight > canvas.height) {
//             newHeight = canvas.height;
//             newWidth = newHeight * wrh;
//         }

//         var x = 0;
//         var y = 0;

//         if (newWidth < canvas.width) {
//             x = (canvas.width - newWidth) / 2;
//         }

//         if (newHeight < canvas.height) {
//             y = (canvas.height - newHeight) / 2;
//         }

//         //ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.fillRect(0, 0, canvas.width, canvas.height);
//         ctx.drawImage(image, x, y, newWidth, newHeight);
//     }

//     render() {
//         return (<canvas id="myCanvas"></canvas>);
//     }
// }

// export default MyCanvas;