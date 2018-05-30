// video.test.js
import React from 'react';
import Video from '../../../src/scripts/components/Video/video.jsx';
import VideoStatusStore from '../../../src/scripts/stores/videoStatusStore.js';

import { shallow, mount, render } from 'enzyme';

describe('TESTING VIDEO COMPONENT', () => {

    it('should be selectable by class "video-packager-video"', () => {
        expect(shallow(<Video />, {disableLifecycleMethods: true}).is('.video-packager-video')).toBe(true);
    });

    it('should has a HTML5 video tag element inside', () => {
		expect(mount(<Video />, {disableLifecycleMethods: true}).find('video').length).toBe(1);
	});

});
