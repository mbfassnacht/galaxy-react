// footer.test.js
import React from 'react';
import Footer from '../../../src/scripts/components/Footer/footer.jsx';
import { shallow, mount, render } from 'enzyme';

describe('TESTING FOOTER COMPONENT', () => {

    it('should be selectable by class "footer"', () => {
        expect(shallow(<Footer />).is('.footer')).toBe(true);
    });

    it('should has a Button component inside', () => {
		expect(mount(<Footer />).find('.button').length).toBe(1);
	});

    it('should has a Button with "Save" label inside', () => {
		expect(mount(<Footer />).find('.button').text()).toBe('Save');
	});
});
