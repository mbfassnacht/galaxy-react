// timeline.test.js
import React from 'react';
import Timeline from '../../../src/scripts/components/Timeline/timeline.jsx';
import { shallow, mount, render } from 'enzyme';

describe('TESTING TIMELINE COMPONENT', () => {

    it('should be selectable by class "video-packager-timeline"', () => {
        expect(shallow(<Timeline />, {disableLifecycleMethods: true}).is('.video-packager-timeline')).toBe(true);
    });
});
