// videoControls.test.js
jest.dontMock('../../../src/scripts/actions/viewActions/VideoActions.js');
jest.dontMock('../../../src/scripts/stores/videoStatusStore.js');
jest.mock('../../../src/scripts/dispatcher.jsx');

import React from 'react';
import VideoControls from '../../../src/scripts/components/VideoControls/videoControls.jsx';
import VideoActions from '../../../src/scripts/actions/viewActions/VideoActions.js';
import { shallow, mount, render } from 'enzyme';

describe('TESTING VIDEOCONTROLS COMPONENT', () => {

    var AppDispatcher;
    var VideoStore;
    var callback;
    var statusStore;

    var actionPlay = {
        actionType: "PLAY_ACTION"
    };

    var actionPause = {
        actionType: "PAUSE_ACTION",
    };

    var actionMute = {
        actionType: "MUTE_ACTION",
        mute: true
    };

    var actionIncrease = {
        actionType: "INCREASE_ACTION"
    };

    var actionDecrease = {
        actionType: "DECREASE_ACTION"
    };

    beforeEach(function() {
        AppDispatcher = require('../../../src/scripts/dispatcher.jsx');
        VideoStore = require('../../../src/scripts/stores/videoStatusStore.js').default;
        callback = AppDispatcher.register.mock.calls[0][0];
        statusStore = VideoStore.getStatus();
    });

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

    it('should dispatch pause action on click', () => {
        const VideoControlsComponent = shallow(<VideoControls />);
        VideoControlsComponent.instance().onPause();
        callback(actionPause);

        var status = VideoStore.getStatus();
        expect(status.playing).toBe(false);
	});

    it('should dispatch play action on click', () => {
        const VideoControlsComponent = shallow(<VideoControls />);
        VideoControlsComponent.instance().onPlay();
        callback(actionPlay);

        var status = VideoStore.getStatus();
        expect(status.playing).toBe(true);
	});

    it('should dispatch mute action on click', () => {
        const VideoControlsComponent = shallow(<VideoControls />);
        VideoControlsComponent.instance().toggleMute();
        callback(actionMute);

        var status = VideoStore.getStatus();
        expect(status.mute).toBe(true);
	});

    it('should increase time after forward action clicked', () => {
        const VideoControlsComponent = shallow(<VideoControls />);

        var oldTime = VideoStore.getStatus().time;

        VideoControlsComponent.instance().onIncrease();
        callback(actionIncrease);

        var newTime = VideoStore.getStatus().time;
        expect(oldTime).toBeGreaterThanOrEqual(newTime);
	});

    it('should decrease time after backward action clicked', () => {
        const VideoControlsComponent = shallow(<VideoControls />);

        var oldTime = VideoStore.getStatus().time;

        VideoControlsComponent.instance().onDecrease();
        callback(actionDecrease);

        var newTime = VideoStore.getStatus().time;
        expect(oldTime).toBeLessThanOrEqual(newTime);
	});
});
