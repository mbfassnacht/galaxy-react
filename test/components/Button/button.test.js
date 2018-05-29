// button.test.js
import React from 'react';
import Button from '../../../src/scripts/components/Button/button.jsx';
import { shallow, mount, render } from 'enzyme';

describe('TESTING BUTTON COMPONENT', function() {

	it('should be selectable by class "button"', function() {
		expect(shallow(<Button />).is('.button')).toBe(true);
	});

	it('should mount in a full DOM', function() {
		expect(mount(<Button />).find('.button').length).toBe(1);
	});

	it('should render to static HTML', function() {
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
