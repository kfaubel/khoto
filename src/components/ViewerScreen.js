import { useEffect, useState } from 'react';

import '../App.css';
import Canvas from './Canvas';
import NextButton from './NextButton';
import PrevButton from './PrevButton';
import AlbumSelect from './AlbumSelect';
import Slider from "./Slider";
import ToggleButton from './ToggleButton';

import { loadSetting, saveSetting } from "../helpers/Settings";
import { loadAlbumList, loadImageList, loadImage } from "../helpers/album";
//import config from "../config.json";

//import { from } from 'core-js/core/array';

// First load - ComponenDidMount
//   - Load the list of albums
//       - Update state albumList
//       - Update state activeAlbum
//       - Load imageList
//           - Update local imageList
//           - Update state imageListLength
//           - Update state activeImageIndex
// HandleAlbumChange
//   - Update state activeAlbum
//       - Load imageList
//           - Update local imageList
//           - Update state imageListLength
//           - Update state activeImageIndex

const ViewerScreen = ({credentials, logout}) => {
    const [albumList, setAlbumList] = useState([]);
    const [activeAlbum, setActiveAlbum] = useState({name: "", length: 0});
    const [activeImage, setActiveImage] = useState({index: 0, base64Image: ""});
    const [touchStartPoint, setTouchStartPoint] = useState({x: 0, y: 0});

    var controlsTimeout = null;

    /**
     * Load the list of albums, and set the active album
     */
    useEffect(() => {
        var newAlbumList = loadAlbumList(credentials);
        setAlbumList(newAlbumList);

        var savedAlbum = loadSetting(credentials, "lastAlbum");
        var savedIndex = loadSetting(credentials, "lastIndex");
        if (savedAlbum === "") {
            savedAlbum = albumList[0];
            savedIndex = 0;
        }

        let imageListLength = loadImageList(credentials, savedAlbum);

        setActiveAlbum({name: savedAlbum, length: imageListLength});

        let newBase64Image = loadImage(credentials, savedIndex);
        
        setActiveImage({index: savedIndex, base64Image: newBase64Image});

        addEventListeners();

        return () => {
            // cleanup
            removeEventListeners();
        }

    }, []);

    const addEventListeners = () => {
        document.addEventListener('namedown', handleName);
        document.addEventListener('wheel', handleWheel);
        document.addEventListener('mousemove', showControls);
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('contextmenu', handleRightClick);
        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchEnd);

        window.addEventListener('resize', handleResize);
    }

    const removeEventListeners = () => {
        document.removeEventListener('namedown', handleName);
        document.removeEventListener('wheel', handleWheel);
        document.removeEventListener('mousemove', showControls);
        document.removeEventListener('mousedown', handleClick);
        document.removeEventListener('contextmenu', handleRightClick);
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchend', handleTouchEnd);

        window.removeEventListener('resize', handleResize);
    }

    const handleAlbumChange = async (event) => {
        let newActiveAlbum = event.target.value;
        console.log(`Viewer::handleAlbumChange New Album selected:`, newActiveAlbum);

        let imageListLength = loadImageList(credentials, newActiveAlbum);

        setActiveAlbum({name: newActiveAlbum, length: imageListLength});

        var newBase64Image = loadImage(credentials, 0);
        
        setActiveImage({index: 0, base64Image: newBase64Image});

        saveSetting(credentials, "lastAlbum", newActiveAlbum);
        saveSetting(credentials, "lastIndex", 0);
    };

    const handleSliderChange = (event) => {
        console.log(`Viewer::handlSliderChange - New: ${event.target.value}, Max: ${this.state.imageListLength}`);
        changeActiveImage(event.target.value);
    }

    // Redisplay the current image.  This will recompute the coordinates and rescale
    const handleResize = () => {
        //console.log("Viewer::handleResize");
        changeActiveImage(activeImage);  // This will cause a re-render (I hope)
    }

    /**
     * Change the active image index
     * @param {*} newIndex - The new index
     * @returns - Nothing
     */
    const changeActiveImage = (newIndex) => {
        let base64Image = loadImage(credentials, newIndex);   
        
        if (base64Image === "") {
            console.error(`Viewer::changeActiveImage - Failed to load image ${newIndex}`);
            return;
        }

        setActiveImage({base64Image: base64Image, index: newIndex});
        saveSetting(credentials, "lastIndex", newIndex);
    }

    /**
     * Handle the next image event (click, name or wheel)
     * @returns - Nothing
     */
    const handleNext = () => {
        if (activeImage.index < activeAlbum.length - 1) {
            changeActiveImage(activeImage.index + 1);
        }
    }

    /**
     * Handle the previous image event (click, name or wheel)
     * @returns - Nothing
     */
    const handlePrev = () => {
        if (activeImage.index > 0) {
            changeActiveImage(activeImage.index - 1);
        }
    }

    // Handle an event from the nameboard.  
    // Right arrow and space advance
    // Left arrow rewinds
    // ESC exits full screen.
    const handleName = (event) => {
        var x = event.which || event.nameCode;

        // space: 32       Enter: 13     Esc:   27
        // Up:    38       Down:  40
        // Right: 39       Left:  37

        if (x === 32 || x === 39) { // Right arrow or space
            handleNext();
        } else if (x === 37) {      // Back Arrow
            handlePrev();
        } else if (x === 27) {      // ESC
            closeFullscreen();
        } else if (x === 81) {      // 'q'
            logout("Logout");
        } 
    }

    // This is the handler for the mouse buttons.  In full screen it can be used to 
    // advance, rewind or logout  
    const handleClick = (event) => {
        if (isInFullScreen()) {
            //console.log("Viewer::onClick", event.button);
            if (event.button === 0) {
                handlePrev();
            } else if (event.button === 1) {
                //this.props.history.push(process.env.PUBLIC_URL + "/");
                logout("logout");
            } else if (event.button === 2) {
                handleNext();
            }
        } else {
            // console.log("Skipping mouse click when not in full screen")
        }
    }

    // We don't need the context menu
    const handleRightClick = (event) => {
        // Disable the regular context menu
        event.preventDefault();
    }

    /**
     *  Handle whell events to advance or rewind the image flow
     * @param {*} event - The wheel event
     * @returns - Nothing
     * @sideeffects - Calls handleNext or handlePrev
     */
    const handleWheel = (event) => {
        //console.log("Viewer::onWheel: ", event);

        if (event.deltaY < 0) {
            handlePrev();
        } else if (event.deltaY > 0) {
            handleNext();
        } else {
            console.warn("Viewer::onWheel - not an up/down");
        }
    }

    /**
     * Handle the touch start event
     * @param {*} event - The touch start event
     * @returns - Nothing
     * @sideeffects - Sets touchStartPoint
     */
    const handleTouchStart = (event) => {
        event.preventDefault();
        setTouchStartPoint({ x: event.touches[0].clientX, y: event.touches[0].clientY });
    }

    /**
     * Handle the touch end event
     * @param {*} event - The touch end event
     * @returns - Nothing
     * @sideeffects - Calls handleNext or handlePrev
     */
    const handleTouchEnd = (event) => {
        //console.log("handleTouchEnd: " + JSON.stringify(event, undefined, 2))
        event.preventDefault();

        var diffX = touchStartPoint.x - event.touches[0].clientX;
        var diffY = touchStartPoint.y - event.touches[0].clientY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // sliding horizontally
            if (diffX > 0) {
                // swiped left
                handleNext();
            } else {
                // swiped right
                handlePrev();
            }
        } else {
            // sliding vertically
            if (diffY > 0) {
                // swiped up
                handleNext();
            } else {
                // swiped down
                handlePrev();
            }
        }
    
        setTouchStartPoint({ x: 0, y: 0 });
    }

    /**
     * Show the controls
     * @returns - Nothing
     * @sideeffects - Shows the controls and then calls hideControls after 4 seconds
     */
    const showControls = () => {
        try {
            if (!isInFullScreen()) {
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
            if (controlsTimeout !== null) {
                clearTimeout(controlsTimeout);
                controlsTimeout = null;
            }

            controlsTimeout = setTimeout(() => {
                hideControls();
            }, 4000);
        } catch (e) { }
    }

    /**
     * Hide the controls
     * @returns - Nothing
     * @sideeffects - Hides the controls
     */
    const hideControls = () => {
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

    /**
     * Handle the full screen toggle
     */
    const handleFullscreenToggle = () => {
        if (isInFullScreen()) {
            closeFullscreen();
        } else {
            openFullscreen();
        }
    }

    /**
     * Check if the browser is in full screen mode
     * @returns {boolean} - True if the browser is in full screen mode
     */
    const isInFullScreen = () => {
        return (document.fullscreenElement && document.fullscreenElement !== null) ||
            (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
            (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
            (document.msFullscreenElement && document.msFullscreenElement !== null)
    }

    /**
     * Open full screen mode
     */
    const openFullscreen = () => {
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

    /**
     * Close full screen mode
     */
    const closeFullscreen = () => {
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

    if (activeAlbum.length === 0) {
        return (
            <div id="myViewer" className="Viewer">
                <h2>Loading...</h2>
            </div>
        )
    } else {
        return (
            <div id="myViewer" className="Viewer">
                <AlbumSelect
                    selectedAlbum={activeAlbum}
                    handleChange={handleAlbumChange}
                    albums={albumList}
                />

                <Canvas activeImage={activeImage.base64Image} />

                <NextButton handleOnNext={handleNext} />

                <PrevButton handleOnPrev={handlePrev} />

                <Slider max={activeAlbum.length - 1} current={activeImage.index} handleChange={handleSliderChange} />

                <ToggleButton handleOnToggle={handleFullscreenToggle} />
            </div>
        );
    }
    
}

export default ViewerScreen;