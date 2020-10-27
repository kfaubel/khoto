import React from 'react';
import axios from 'axios';

import './App.css';
import Canvas from './components/Canvas';
import NextButton from './components/NextButton';
import PrevButton from './components/PrevButton';
import AlbumSelect from './components/AlbumSelect';
import Slider from "./components/Slider";
import ToggleButton from './components/ToggleButton';

import Settings from "./Settings";
import config from "./config.json";

// First load - ComponenDidMount
//   - Load the list of albums
//       - Update state albumList
//       - Update state activeAlbum
//       - Load imageList
//           - Update local imageList
//           - Update state mageListLength
//           - Update state activeImageIndex
// HandleAlbumChange
//   - Update state activeAlbum
//       - Load imageList
//           - Update local imageList
//           - Update state mageListLength
//           - Update state activeImageIndex

class Viewer extends React.Component {

    // AlbumList []       - state  - Shared with Selec-
    // imageList []       - local  - 
    // imageListLength    - state  - Shared with Slider
    // activeAlbum        - state  - Shared with Select
    // activeImageIndex   - state  - Shared with slider
    // activeUrl          - state  - Shared with Canvas
    constructor(props) {
        super(props);
        this.state = {
            baseUrl: `${config.httpsProxy}http://${this.props.site}/api/user/${this.props.name}`,
            password: this.props.password,
            activeUrl: "",
            albumList: [""],
            activeAlbum: "",
            activeImageIndex: 0,
            imageListLength: 0,
            imageType: "",
            imagePassword: this.props.password
        };

        //console.log(`Viewer::Viewer - name=${this.props.name} password=${this.state.password}`);
        if (this.props.name === "") {
            console.warn(`No name.  Pushing to login`);
            this.setState({ activeUrl: null });
            this.props.exitViewer("No name");
        }
        this.imageList = [];
        this.timeout = null;

        this.touchStartX = null;
        this.touchStartY = null;
    }

    async componentDidMount() {
        this.timeout = setTimeout(() => {
            this.hideControls();
        }, 3000);

        // Load the list of albums
        try {
            let newAlbumList = await this.loadAlbumList();

            let newActiveAlbum = await Settings.loadSetting(this.props.site, this.props.name, "lastAlbum");
            if (newActiveAlbum === "") {
                newActiveAlbum = newAlbumList[0];
                Settings.saveSetting(this.props.site, this.props.name, "lastAlbum", newActiveAlbum);
            }
            this.imageList = await this.loadImageList(newActiveAlbum);

            let newActiveImageIndex = await Settings.loadSetting(this.props.site, this.props.name, "lastIndex");
            if (newActiveImageIndex === "") {
                console.log(`Viewer::componentDidMount: newActiveImageIndex blank, setting to 0`)
                newActiveImageIndex = 0;
            }

            this.bookmarkIndex = newActiveImageIndex;

            // console.log(`Viewer::componentDidMount album=${newActiveAlbum} Index= ${newActiveImageIndex} - assigning new Image Url`);
            this.assignNewImageUrl(newActiveAlbum, newActiveImageIndex);

            let newState = {
                albumList: newAlbumList,
            };

            this.setState(newState);

        } catch (error) {
            // handle error
            console.error(`Viewer::componentDidMount Catch = ${error}.  Pushing to login`);
            if (this.timeout !== null) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }

            this.setState({ activeUrl: null });
            this.props.exitViewer("No access");
        };

        document.addEventListener('keydown', this.handleKey);
        document.addEventListener('wheel', this.handleWheel);
        document.addEventListener('mousemove', this.showControls);
        document.addEventListener('mousedown', this.handleClick);
        document.addEventListener('contextmenu', this.handleRightClick);
        document.addEventListener('touchstart', this.handleTouchStart);
        document.addEventListener('touchmove', this.handleTouchMove);

        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKey);
        document.removeEventListener('wheel', this.handleWheel);
        document.removeEventListener('mousemove', this.showControls);
        document.removeEventListener('mousedown', this.handleClick);
        document.removeEventListener('contextmenu', this.handleRightClick);
        document.removeEventListener('touchstart', this.handleTouchStart);
        document.removeEventListener('touchend', this.handleTouchEnd);

        window.removeEventListener('resize', this.handleResize);

        if (this.timeout !== null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    handleAlbumChange = async (event) => {
        let newActiveAlbum = event.target.value;
        console.log(`New Album selected:`, newActiveAlbum);

        Settings.saveSetting(this.props.site, this.props.name, "lastAlbum", newActiveAlbum);

        this.imageList = await this.loadImageList(newActiveAlbum);

        console.log(`Viewer::handleAlbumChange album=${newActiveAlbum} Index= 0 - assigning new Image Url`);
        this.assignNewImageUrl(newActiveAlbum, 0);
    };

    handleSliderChange = (event) => {
        console.log(`Viewer::handlSliderChange - New: ${event.target.value}, Max: ${this.state.imageListLength}`);
        this.assignNewImageUrl(this.state.activeAlbum, event.target.value);
    }

    // Redisplay the current image.  This will recompute the coordinates and rescale
    handleResize = () => {
        //console.log("Viewer::handleResize");
        this.assignNewImageUrl(this.state.activeAlbum, this.state.activeImageIndex);
    }

    // Computes the image URL for the canvas to use and update all of the related state.
    assignNewImageUrl = (album, index) => {
        //console.log(`Viewer::assignNewImageUrl: user=${this.props.name} album=${album} index=${index} image=${this.imageList[index]}`)
        Settings.saveSetting(this.props.site, this.props.name, "lastIndex", index);

        var imageUrl = `${this.state.baseUrl}/base64Image/albumName/${album}/imageName/${this.imageList[index]}`;

        let newType = "";
        let newImagePassword = this.state.password;
        try {
            if (this.imageList[index].endsWith("daj")) {
                newType = "jpeg";
            } else if (this.imageList[index].endsWith("dag")) {
                newType = "gif";
            } else if (this.imageList[index].endsWith("dap")) {
                newType = "png";
            } else if (this.imageList[index].endsWith("jpeg")) {
                newType = "jpeg";
                newImagePassword = "";
            } else if (this.imageList[index].endsWith("jpg")) {
                newType = "jpeg";
                newImagePassword = "";
            } else if (this.imageList[index].endsWith("png")) {
                newType = "png";
                newImagePassword = "";
            } else if (this.imageList[index].endsWith("gif")) {
                newType = "gif";
                newImagePassword = "";
            }

            //console.log(`Viewer::assignNewImageUrl [${index}] ${imageUrl}`)
            // This causes a re-render and our canvas gets the activeUrl
            this.setState({
                activeUrl: imageUrl,
                imageType: newType,
                activeAlbum: album,
                imageListLength: this.imageList.length,
                activeImageIndex: index,
                imagePassword: newImagePassword
            });
        } catch (e) {
            console.error(`Viewer::assignNewImageUrl failed, skipping ${e}`);
        }
    }

    // Synchronous retreival of the album list
    loadAlbumList = async () => {
        let albumListUrl = this.state.baseUrl + "/albums";
        //console.log("Viewer loadAlbumList albumUrl: " + albumListUrl);

        // Load the list of albums
        let albumResult = await axios({
            method: 'get',
            url: albumListUrl,
            responseType: 'json',
            headers: { 'Access-Control-Allow-Origin': '*' }
        })

        return albumResult.data;
    }

    // Syncrhonous retrevial of the image list
    loadImageList = async (albumName) => {
        var albumUrl = this.state.baseUrl + "/album/albumName/" + albumName;
        //console.log("Viewer loadImageList albumUrl: " + albumUrl);

        let list = [];
        try {
            let listResult = await axios({
                method: 'get',
                url: albumUrl,
                responseType: 'json',
                headers: { 'Access-Control-Allow-Origin': '*' }
            });
            list = listResult.data;
        } catch (error) {
            //console.log(`Viewer::loadImageList failed: ${error}`)
        }

        return list;
    }

    // Called when a user actions (click, key or wheel) say to go to the next image
    handleNext = () => {
        //console.log("App: onNext, index: " + this.state.activeImageIndex);

        if (this.state.activeImageIndex < this.state.imageListLength - 1) {
            let newActiveImageIndex = this.state.activeImageIndex;
            // Adding 1 to activeImageIndex on the line above sometimes produced "01"
            newActiveImageIndex++;

            this.assignNewImageUrl(this.state.activeAlbum, newActiveImageIndex);
        }
    }

    // Called when a user actions (click, key or wheel) say to go to the previous image
    handlePrev = () => {
        //console.log("App: onPrev, index: " + this.state.activeImageIndex);

        if (this.state.activeImageIndex > 0) {
            let newActiveImageIndex = this.state.activeImageIndex;
            newActiveImageIndex--;

            this.assignNewImageUrl(this.state.activeAlbum, newActiveImageIndex);
        }
    }

    // Handle an event from the keyboard.  
    // Right arrow and space advance
    // Left arrow rewinds
    // ESC exits full screen.
    handleKey = (event) => {
        var x = event.which || event.keyCode;

        // space: 32       Enter: 13     Esc:   27
        // Up:    38       Down:  40
        // Right: 39       Left:  37

        if (x === 32 || x === 39) { // Right arrow or space
            this.handleNext();
        } else if (x === 37) {      // Back Arrow
            this.handlePrev();
        } else if (x === 27) {      // ESC
            this.closeFullscreen();
        } else if (x === 81) {      // 'q'
            this.setState({ activeUrl: null });
            this.props.exitViewer("Logout");
        } else if (x === 66) {      // 'b'
            this.bookmarkIndex = this.state.activeImageIndex;
        } else if (x === 71) {      // 'g'
            this.assignNewImageUrl(this.state.activeAlbum, this.bookmarkIndex);
        }
    }

    // This is the handler for the mouse buttons.  In full screen it can be used to 
    // advance, rewind or logout  
    handleClick = (event) => {
        if (this.isInFullScreen()) {
            //console.log("Viewer::onClick", event.button);
            if (event.button === 0) {
                this.handlePrev();
            } else if (event.button === 1) {
                //this.props.history.push(process.env.PUBLIC_URL + "/");
                this.setState({ activeUrl: null });
                this.props.exitViewer("Logout");
            } else if (event.button === 2) {
                this.handleNext();
            }
        } else {
            // console.log("Skipping mouse click when not in full screen")
        }
    }

    // We don't need the context menu
    handleRightClick = (event) => {
        // Disable the regular context menu
        event.preventDefault();
    }

    // Handle whell events to advance or rewind the image flow
    handleWheel = (event) => {
        //console.log("Viewer::onWheel: ", event);

        if (event.deltaY < 0) {
            this.handlePrev();
        } else if (event.deltaY > 0) {
            this.handleNext();
        } else {
            console.warn("Viewer::onWheel - not an up/down");
        }
    }

    handleTouchStart = (event) => {
        event.preventDefault();
        this.touchStartX = event.touches[0].clientX;
        this.touchStartY = event.touches[0].clientY;

        console.log(`TouchStart - X=${this.touchStartX} Y=${this.touchStartY}`);

    }

    handleTouchMove = (event) => {
        console.log("handleTouchEnd: " + JSON.stringify(event, undefined, 2))
        event.preventDefault();

        var currentX = event.touches[0].clientX;
        var currentY = event.touches[0].clientY;

        console.log(`TouchEnd - X=${currentX} Y=${currentY}`);

        if (this.touchStartX === null) {
            console.log("No initial X");
            return;
        }

        if (this.touchStartY === null) {
            console.log("No initial Y");
            return;
        }

        var diffX = this.touchStartX - currentX;
        var diffY = this.touchStartY - currentY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // sliding horizontally
            if (diffX > 0) {
                // swiped left
                console.log("swiped left");
                this.handleNext();
            } else {
                // swiped right
                console.log("swiped right");
                this.handlePrev();
            }
        } else {
            // sliding vertically
            if (diffY > 0) {
                // swiped up
                console.log("swiped up");
            } else {
                // swiped down
                console.log("swiped down");
            }
        }
    
        this.touchStartX = null;
        this.touchStartY = null;
    }

    showControls = () => {
        try {
            if (!this.isInFullScreen()) {
                document.getElementById("prevButton").classList.remove("k-fadeOut");
                document.getElementById("nextButton").classList.remove("k-fadeOut");
                document.getElementById("albumSelect").classList.remove("k-fadeOut");
                document.getElementById("imageSlider").classList.remove("k-fadeOut");
                document.getElementById("toggleButton").classList.remove("k-fadeOut");
                document.getElementById("prevButton").classList.add("k-fadeIn");
                document.getElementById("nextButton").classList.add("k-fadeIn");
                document.getElementById("albumSelect").classList.add("k-fadeIn");
                document.getElementById("imageSlider").classList.add("k-fadeIn");
                document.getElementById("toggleButton").classList.add("k-fadeIn");
            } else {
                // just the slider
                document.getElementById("imageSlider").classList.remove("k-fadeOut");
                document.getElementById("imageSlider").classList.add("k-fadeIn");
            }

            // Here we use a class variable (this.timeout) because we don't want to trigger 
            // a re-render that would happen if we changed a state variable.
            if (this.timeout !== null) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }

            this.timeout = setTimeout(() => {
                this.hideControls();
            }, 2000);
        } catch (e) { }
    }

    hideControls = () => {
        try {
            document.getElementById("prevButton").classList.remove("k-fadeIn");
            document.getElementById("nextButton").classList.remove("k-fadeIn");
            document.getElementById("albumSelect").classList.remove("k-fadeIn");
            document.getElementById("imageSlider").classList.remove("k-fadeIn");
            document.getElementById("toggleButton").classList.remove("k-fadeIn");
            document.getElementById("prevButton").classList.add("k-fadeOut");
            document.getElementById("nextButton").classList.add("k-fadeOut");
            document.getElementById("albumSelect").classList.add("k-fadeOut");
            document.getElementById("imageSlider").classList.add("k-fadeOut");
            document.getElementById("toggleButton").classList.add("k-fadeOut");
        } catch (e) { }
    }

    handleFullscreenToggle = () => {
        if (this.isInFullScreen()) {
            this.closeFullscreen();
        } else {
            this.openFullscreen();
        }
    }

    isInFullScreen = () => {
        return (document.fullscreenElement && document.fullscreenElement !== null) ||
            (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
            (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
            (document.msFullscreenElement && document.msFullscreenElement !== null)
    }

    openFullscreen = () => {
        //console.log("openFullScreen");
        var docElm = document.documentElement;

        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
    }

    /* Close fullscreen */
    closeFullscreen = () => {
        //console.log("closeFullScreen");
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    // The tabIndex="0" is needed to get onKeyDown to work
    //onKeyDown={this.onKey}
    //            onMouseMove={this.onShow}
    //            tabIndex="0"
    render() {
        // console.log("Viewer::render");
        return (
            <div id="myViewer" className="Viewer">
                <AlbumSelect
                    selectedAlbum={this.state.activeAlbum}
                    handleChange={this.handleAlbumChange}
                    albums={this.state.albumList}
                />

                <Canvas url={this.state.activeUrl} password={this.state.imagePassword} type={this.state.imageType} />

                <NextButton handleOnNext={this.handleNext} />

                <PrevButton handleOnPrev={this.handlePrev} />

                <Slider max={this.state.imageListLength - 1} current={this.state.activeImageIndex} handleChange={this.handleSliderChange} />

                <ToggleButton handleOnToggle={this.handleFullscreenToggle} />
            </div>
        )
    }
}

export default Viewer;