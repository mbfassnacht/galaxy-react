import React from 'react';
import Close from './components/Close/close.jsx';
import Video from './components/Video/video.jsx';
import VideoControls from './components/VideoControls/videoControls.jsx';
import AddActions from './components/AddActions/addActions.jsx';
import VideoInformation from './components/VideoInformation/videoInformation.jsx';
import ActionsList from './components/ActionsList/actionsList.jsx';
import CurrentVideoAction from './components/CurrentVideoAction/currentVideoAction.jsx';
import Timeline from './components/Timeline/timeline.jsx';
import Footer from './components/Footer/footer.jsx';

class VideoPackager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {hidden: false};
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
                            <AddActions></AddActions>
                        </div>
                        <div className="video-packager-right-container video-packager-container">
                            <VideoInformation></VideoInformation>
                            <ActionsList></ActionsList>
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
