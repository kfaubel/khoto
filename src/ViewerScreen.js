import React from 'react';
import axios from 'axios';
import './App.css';
import Canvas from './Canvas';
import NextButton from './NextButton';
import PrevButton from './PrevButton';
import AlbumSelect from './AlbumSelect';
import Slider from "./Slider";
import ToggleButton from './ToggleButton';
import Settings from "./Settings";
//import config from "./config.json";

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
            baseUrl: `http://${this.props.site}/api/user/${this.props.username}`,
            password: this.props.password,
            activeUrl: "",
            albumList: ["foo"],
            activeAlbum: "",
            activeImageIndex: 0,
            imageListLength: 0,
            imageType: "",
            imagePassword: this.props.password
        };

        //console.log(`Viewer::Viewer - username=${this.props.username} password=${this.state.password}`);
        if (this.props.username === "") {
            console.log(`No username.  Pushing to login`);
            this.props.history.push(process.env.PUBLIC_URL + "/");
        }
        this.imageList = [];
        this.fullScreen = false;
    }

    handleAlbumChange = async (event) => {
        let newActiveAlbum = event.target.value;
        console.log(`New Album selected:`, newActiveAlbum);

        Settings.saveSetting(this.props.username, "lastAlbum", newActiveAlbum);

        this.imageList = await this.loadImageList(newActiveAlbum);

        // this.setState({
        //     activeAlbum: newActiveAlbum,
        //     imageListLength: this.imageList.length,
        //     activeImageIndex: 0
        // });

        this.showNewImage(newActiveAlbum, 0);
    };

    handleSliderChange = (event) => {
        //console.log(`Viewer::handlSliderChange - New: ${event.target.value}, Max: ${this.state.imageListLength}`);
        this.showNewImage(this.state.activeAlbum, event.target.value);
    }

    handleResize = () => {
        //console.log("Viewer::handleResize");
        this.showNewImage(this.state.activeAlbum, this.state.activeImageIndex);
    }

    showNewImage = (album, index) => {
        //console.log(`Viewer::showNewImage: user=${this.props.username} album=${album} index=${index} image=${this.imageList[index]}`)
        Settings.saveSetting(this.props.username, "lastIndex", index);
        
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

        this.setState({ 
            activeUrl: imageUrl, 
            imageType: newType, 
            activeAlbum: album,
            imageListLength: this.imageList.length,
            activeImageIndex: index,
            imagePassword: newImagePassword });
        } catch (e) {
            console.log(`ShowNewImage failed, skipping ${e}`);
        }
    }


    async componentDidMount() {
        this.timeout = setTimeout(() => {
            this.onHide();
        }, 3000);

        // Load the list of albums
        try {
            let newAlbumList = await this.loadAlbumList();

            let newActiveAlbum = await Settings.loadSetting(this.props.username, "lastAlbum");
            if (newActiveAlbum === "") {
                newActiveAlbum = newAlbumList[0];
                Settings.saveSetting(this.props.username, "lastAlbum", newActiveAlbum);
            }
            this.imageList = await this.loadImageList(newActiveAlbum);

            let newActiveImageIndex = await Settings.loadSetting(this.props.username, "lastIndex");
            if (newActiveImageIndex === "") {
                console.log(`Viewer::componentDidMount: newActiveImageIndex blank, setting to 0`)
                newActiveImageIndex = 0;
            }

            this.showNewImage(newActiveAlbum, newActiveImageIndex);

            let newState = {
                albumList: newAlbumList,
            };

            this.setState(newState);

        } catch (error) {
            // handle error
            console.log(`Viewer::componentDidMount Catch = ${error}.  Pushing to login`);
            if (this.timeout !== undefined) {
                clearTimeout(this.timeout);
            }
            this.props.history.push(process.env.PUBLIC_URL + "/");
        };

        document.addEventListener('keydown', this.onKey);
        document.addEventListener('wheel', this.onWheel);
        document.addEventListener('mousemove', this.onShow);
        document.addEventListener('mousedown', this.onClick);
        document.addEventListener('contextmenu', this.onRightClick);
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKey);
        document.removeEventListener('wheel', this.onWheel);
        document.removeEventListener('mousemove', this.onShow);
        document.removeEventListener('mousedown', this.onClick);
        document.removeEventListener('contextmenu', this.onRightClick);
        document.removeEventListener('resize', this.handleResize);
    }

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
            console.log(`Viewer::loadImageList failed: ${error}`)
        }

        return list;
    }

    onNext = () => {
        console.log("App: onNext, index: " + this.state.activeImageIndex);

        if (this.state.activeImageIndex < this.state.imageListLength - 1) {
            let newActiveImageIndex = this.state.activeImageIndex;
            // Adding 1 to activeImageIndex on the line above sometimes produced "01"
            newActiveImageIndex++;

            this.showNewImage(this.state.activeAlbum, newActiveImageIndex);
        }
    }

    onPrev = () => {
        console.log("App: onPrev, index: " + this.state.activeImageIndex);

        if (this.state.activeImageIndex > 0) {
            let newActiveImageIndex = this.state.activeImageIndex - 1;
            newActiveImageIndex--; 

            this.showNewImage(this.state.activeAlbum, newActiveImageIndex);
        }
    }

    onKey = (event) => {
        var x = event.which || event.keyCode;

        // space: 32       Enter: 13     Esc:   27
        // Up:    38       Down:  40
        // Right: 39       Left:  37

        if (x === 32 || x === 39) {
            this.onNext();
        } else if (x === 37) {
            this.onPrev();
        } else if (x === 27) {
            this.closeFullscreen();
        }
    }

    onClick = (event) => {
        console.log("onClick.");
        if (this.isInFullScreen()) {
            console.log("Viewer::onClick", event.button);
            if (event.button === 0) {
                this.onPrev();
            } else if (event.button === 1) {
                this.props.history.push(process.env.PUBLIC_URL + "/");
            } else if (event.button === 2) {
                this.onNext();
            }
        } else {
            console.log("Skipping mouse click when not in full screen")
        }
    }

    onRightClick = (event) => {
        // Disable the regular context menu
        event.preventDefault(); 
    }

    onWheel = (event) => {
        console.log("Viewer::onWheel: ", event);

        if (event.deltaY < 0) {
            this.onPrev();
        } else if (event.deltaY > 0) {
            this.onNext();
        } else {
            console.log("Viewer::onWheel - not an up/down");
        }
    }

    onShow = () => {
        try {
            if (!this.isInFullScreen()) {
                document.getElementById("prevButton").classList.remove("m-fadeOut");
                document.getElementById("nextButton").classList.remove("m-fadeOut");
                document.getElementById("albumSelect").classList.remove("m-fadeOut");
                document.getElementById("imageSlider").classList.remove("m-fadeOut");
                document.getElementById("toggleButton").classList.remove("m-fadeOut");
                document.getElementById("prevButton").classList.add("m-fadeIn");
                document.getElementById("nextButton").classList.add("m-fadeIn");
                document.getElementById("albumSelect").classList.add("m-fadeIn");
                document.getElementById("imageSlider").classList.add("m-fadeIn");
                document.getElementById("toggleButton").classList.add("m-fadeIn");
            } else {
                // just the slider
                document.getElementById("imageSlider").classList.remove("m-fadeOut");
                document.getElementById("imageSlider").classList.add("m-fadeIn");
            }

            // Here we use a class variable (this.timeout) because we don't want to trigger 
            // a re-render that would happen if we changed a state variable.
            if (this.timeout !== undefined) {
                clearTimeout(this.timeout);
            }

            this.timeout = setTimeout(() => {
                this.onHide();
            }, 2000);
        } catch (e) { }
    }

    onHide = () => {
        try {
            document.getElementById("prevButton").classList.remove("m-fadeIn");
            document.getElementById("nextButton").classList.remove("m-fadeIn");
            document.getElementById("albumSelect").classList.remove("m-fadeIn");
            document.getElementById("imageSlider").classList.remove("m-fadeIn");
            document.getElementById("toggleButton").classList.remove("m-fadeIn");
            document.getElementById("prevButton").classList.add("m-fadeOut");
            document.getElementById("nextButton").classList.add("m-fadeOut");
            document.getElementById("albumSelect").classList.add("m-fadeOut");
            document.getElementById("imageSlider").classList.add("m-fadeOut");
            document.getElementById("toggleButton").classList.add("m-fadeOut");
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

        return (
            <div id="myViewer" className="Viewer">
                <AlbumSelect
                    selectedAlbum={this.state.activeAlbum}
                    handleChange={this.handleAlbumChange}
                    albums={this.state.albumList}
                />

                <Canvas url={this.state.activeUrl} password={this.state.imagePassword} type={this.state.imageType} />

                <NextButton handleOnNext={this.onNext} />

                <PrevButton handleOnPrev={this.onPrev} />

                <Slider max={this.state.imageListLength - 1} current={this.state.activeImageIndex} handleChange={this.handleSliderChange} />

                <ToggleButton handleOnToggle={this.handleFullscreenToggle} />
            </div>
        )
    }
}

export default Viewer;