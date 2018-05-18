import React from 'react';
require('normalize.css/normalize.css');
require('styles/App.scss');
import Close from './components/Close/close';
import Video from './components/Video/video';
import VideoControls from './components/VideoControls/videoControls';
import VideoActionsContainer from './components/VideoActionsContainer/videoActionsContainer';
import Timeline from './components/Timeline/timeline';
import Footer from './components/Footer/footer';

class App extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <div>
            <Close></Close>
            <Video></Video>
            <VideoControls></VideoControls>
            <VideoActionsContainer></VideoActionsContainer>
            <Timeline></Timeline>
            <Footer></Footer>
            </div>
        );
    }
}

App.defaultProps = {

};

export default App;
