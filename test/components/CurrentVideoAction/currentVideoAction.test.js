// currentVideoAction.test.js
import React from 'react';
import CurrentVideoAction from '../../../src/scripts/components/CurrentVideoAction/currentVideoAction.jsx';
import { shallow, mount, render } from 'enzyme';
var icon = '<svg class="svg-class" version="1.1"</svg>';

describe('TESTING CURRENTVIDEOACTION COMPONENT', () => {

    it('should be selectable by class "current-video-action"', () => {
        expect(shallow(<CurrentVideoAction icon={icon} />).is('.current-video-action')).toBe(true);
    });
});
