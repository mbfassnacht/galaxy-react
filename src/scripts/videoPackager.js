import React from 'react';
require('normalize.css/normalize.css');
require('styles/VideoPackager.scss');
import Close from './components/Close/close';
import Video from './components/Video/video';
import VideoControls from './components/VideoControls/videoControls';
import VideoAddActions from './components/VideoAddActions/videoAddActions';
import CurrentVideoAction from './components/CurrentVideoAction/currentVideoAction';
import Timeline from './components/Timeline/timeline';
import Footer from './components/Footer/footer';

class VideoPackager extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <div>
            <Close></Close>
            <Video></Video>
            <VideoControls></VideoControls>
            <VideoAddActions></VideoAddActions>
            <CurrentVideoAction></CurrentVideoAction>
            <Timeline></Timeline>
            <Footer></Footer>
            </div>
        );
    }
}

VideoPackager.defaultProps = {

};

export default VideoPackager;
