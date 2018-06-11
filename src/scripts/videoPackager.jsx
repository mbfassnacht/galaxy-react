import React from 'react';
import Close from './components/Close/close.jsx';
import Video from './components/Video/video.jsx';
import VideoControls from './components/VideoControls/videoControls.jsx';
import AddActions from './components/AddActions/addActions.jsx';
import VideoInformation from './components/VideoInformation/videoInformation.jsx';
import CurrentVideoAction from './components/CurrentVideoAction/currentVideoAction.jsx';
import Timeline from './components/Timeline/timeline.jsx';
import Footer from './components/Footer/footer.jsx';
import VideoPackagerActions from './actions/viewActions/videoPackagerActions';

class VideoPackager extends React.Component {

    constructor(props) {
        super(props);
        var originalVideoId = document.getElementById('react-video-packager').getAttribute("data-video-id");
        var locale = document.getElementById('react-video-packager').getAttribute("data-locale") || "en" ;
        var config = document.getElementById('react-video-packager').getAttribute("data-config");

        VideoPackagerActions.setOriginalVideoId(originalVideoId);
        VideoPackagerActions.setConfig(config);

        this.state = {hidden: true, locale: locale};
    }

    componentDidMount() {
        const opener = document.getElementById('react-video-packager-opener');
        opener.addEventListener('click', this.openClose.bind(this));

        var backLayer = this.refs.backLayer;

        backLayer.addEventListener('click', this.close.bind(this));
    }

    openClose() {
        if (this.state.hidden){
            this.setState({hidden: false});
        } else {
            this.setState({hidden: true});
        }
    }

    close() {
        this.setState({hidden: true});
    }

    render() {
        return (
            <div id='video-packager-overlay' className={(this.state.hidden ? 'hidden' :'')}>
                <div className='video-packager-content'>
                    <div className="video-packager-header-container video-packager-col-container">
                        <div className="video-packager-version">Video Packager 1.0</div>
                        <Close locale={this.state.locale} action={this.openClose.bind(this)}></Close>
                    </div>
                    <div className="video-packager-body-container video-packager-col-container">
                        <div className="video-packager-mid-container video-packager-col-container">
                            <div className="video-packager-left-container video-packager-col-container">
                                <Video locale={this.state.locale}></Video>
                                <VideoControls locale={this.state.locale}></VideoControls>
                                <AddActions locale={this.state.locale}></AddActions>
                            </div>
                            <div className="video-packager-right-container video-packager-col-container">
                                <VideoInformation locale={this.state.locale}></VideoInformation>
                                <CurrentVideoAction locale={this.state.locale}></CurrentVideoAction>
                            </div>
                        </div>
                        <Timeline locale={this.state.locale}></Timeline>
                    </div>
                    <div className="video-packager-footer-container video-packager-col-container">
                        <Footer locale={this.state.locale}></Footer>
                    </div>
                </div>
                <div ref="backLayer" className='video-packager-back-layer'></div>
            </div>
        );
    }
}

VideoPackager.defaultProps = {

};

export default VideoPackager;
