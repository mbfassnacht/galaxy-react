// close.test.js
import React from 'react';
import Close from '../../../src/scripts/components/Close/close.jsx';
import { shallow, mount, render } from 'enzyme';
var icon = '<svg class="svg-class" version="1.1"</svg>';

describe('TESTING CLOSE COMPONENT', () => {

	it('should be selectable by class "video-packager-close"', () => {
		expect(shallow((<Close icon={icon}></Close>)).is('.video-packager-close')).toBe(true);
	});

    it('should has an svg icon inside', () => {
		expect(mount(<Close icon={icon}></Close>).find('svg')).toBeDefined();
	});

	it('should trigger the action when click', () => {
		const mockCallBack = jest.fn();
		const closeComponent = mount((<Close action={mockCallBack} icon={icon}></Close>));
		closeComponent.simulate('click');
		expect(mockCallBack.mock.calls.length).toBe(1);
		expect(mockCallBack).toHaveBeenCalled();
	});
});
