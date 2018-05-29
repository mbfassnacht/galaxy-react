// button.test.js
import React from 'react';
import Button from '../../../src/scripts/components/Button/button.jsx';
import { shallow, mount, render } from 'enzyme';

describe('TESTING BUTTON COMPONENT', () => {

	it('should be selectable by class "button"', () => {
		expect(shallow(<Button />).is('.button')).toBe(true);
	});

	it('should mount in a full DOM', () => {
		expect(mount(<Button />).find('.button').length).toBe(1);
	});

	it('should render to static HTML', () => {
		expect(render(<Button text="button text"/>).text()).toEqual('button text');
	});

	it('should trigger the clickHandler when click', () => {
		const mockCallBack = jest.fn();
		const button = shallow((<Button text="button text" clickHandler={mockCallBack}></Button>));
		button.simulate('click');
		expect(mockCallBack.mock.calls.length).toBe(1);
		expect(mockCallBack).toHaveBeenCalled();
	});
});
