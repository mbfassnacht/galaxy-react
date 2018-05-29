// video.test.js
import React from 'react';
import Video from '../../../src/scripts/components/Video/video.jsx';
import VideoStatusStore from '../../../src/scripts/stores/videoStatusStore.js';

import { shallow, mount, render } from 'enzyme';

describe('TESTING VIDEO COMPONENT', () => {

    var statusStore = VideoStatusStore.getStatus();

    it('should be selectable by class "video"', () => {
        expect(shallow(<Video />, {disableLifecycleMethods: true}).is('.video')).toBe(true);
    });

    it('should has a HTML5 video tag element inside', () => {
		expect(mount(<Video />, {disableLifecycleMethods: true}).find('video').length).toBe(1);
	});

    it('should have default values defined in VideoStatusStore', () => {
        const VideoComponent = shallow(<Video />, {disableLifecycleMethods: true});
        expect(VideoComponent.state('playing')).toBe(statusStore.playing);
        expect(VideoComponent.state('mute')).toBe(statusStore.mute);
        expect(VideoComponent.state('time')).toBe(statusStore.time);
        expect(VideoComponent.state('duration')).toBe(statusStore.duration);
	});
});
