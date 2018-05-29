// videoInformation.test.js
import React from 'react';
import VideoInformation from '../../../src/scripts/components/VideoInformation/videoInformation.jsx';
import { shallow, mount, render } from 'enzyme';

describe('TESTING VIDEOINFORMATION COMPONENT', () => {


    it('should be selectable by class "video-information"', () => {
        expect(shallow(<VideoInformation />).is('.video-information')).toBe(true);
    });

    it('should change status on title input change', () => {
        var insertedTitle = "hello this is the title";
        const VideoControlsComponent = shallow(<VideoInformation />);
        VideoControlsComponent.find('input').simulate('change', {currentTarget:{ value : insertedTitle}});
        expect(VideoControlsComponent.state('title')).toBe(insertedTitle);
	});
});
