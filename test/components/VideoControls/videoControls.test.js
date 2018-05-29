// videoControls.test.js
import React from 'react';
import VideoControls from '../../../src/scripts/components/VideoControls/videoControls.jsx';
import VideoStatusStore from '../../../src/scripts/stores/videoStatusStore.js';

import { shallow, mount, render } from 'enzyme';

describe('TESTING VIDEOCONTROLS COMPONENT', () => {

    var statusStore = VideoStatusStore.getStatus();

    it('should be selectable by class "video"', () => {
        expect(shallow(<VideoControls />).is('.video-controls')).toBe(true);
    });

    it('should has a HTML5 video tag element inside', () => {
		expect(mount(<VideoControls />).find('.video-controls').length).toBe(1);
	});

    it('should have default values defined in VideoStatusStore', () => {
        const VideoControlsComponent = shallow(<VideoControls />);
        expect(VideoControlsComponent.state('playing')).toBe(statusStore.playing);
        expect(VideoControlsComponent.state('mute')).toBe(statusStore.mute);
        expect(VideoControlsComponent.state('time')).toBe(statusStore.time);
        expect(VideoControlsComponent.state('duration')).toBe(statusStore.duration);
	});
});
