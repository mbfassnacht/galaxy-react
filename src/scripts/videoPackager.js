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

    constructor(props) {
        super(props);
        this.state = {hidden: true};
    }

    componentDidMount() {
        const opener = document.getElementById('react-video-packager-opener');
        opener.addEventListener('click', this.openClose.bind(this));
    }

    openClose() {
        if (this.state.hidden){
            this.setState({hidden: false});
        } else {
            this.setState({hidden: true});
        }
    }

    render() {
        return (
            <div className={'video-packager-content ' + (this.state.hidden ? 'hidden' :'')}>
                <div className="video-packager-header-container video-packager-container">
                    <Close action={this.openClose.bind(this)}></Close>
                </div>
                <div className="video-packager-body-container video-packager-container">
                    <div className="video-packager-mid-container video-packager-container">
                        <div className="video-packager-left-container video-packager-container">
                            <Video></Video>
                            <VideoControls></VideoControls>
                            <VideoAddActions></VideoAddActions>
                        </div>
                        <div className="video-packager-right-container video-packager-container">
                            <CurrentVideoAction></CurrentVideoAction>
                        </div>
                    </div>
                    <Timeline></Timeline>
                </div>
                <div className="video-packager-footer-container video-packager-container">
                    <Footer></Footer>
                </div>
            </div>
        );
    }
}

VideoPackager.defaultProps = {

};

export default VideoPackager;
