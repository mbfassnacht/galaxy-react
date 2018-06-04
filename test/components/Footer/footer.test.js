// footer.test.js
import React from 'react';
import Footer from '../../../src/scripts/components/Footer/footer.jsx';
import { shallow, mount, render } from 'enzyme';

describe('TESTING FOOTER COMPONENT', () => {

    it('should be selectable by class "video-packager-footer"', () => {
        expect(shallow(<Footer />).is('.video-packager-footer')).toBe(true);
    });

    it('should has a Button component inside', () => {
		expect(mount(<Footer />).find('.video-packager-button').length).toBe(1);
	});
});
