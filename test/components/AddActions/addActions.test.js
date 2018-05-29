// addActions.test.js
import React from 'react';
import AddActions from '../../../src/scripts/components/AddActions/addActions.jsx';
import { shallow, mount, render } from 'enzyme';

describe('TESTING ADDACTIONS COMPONENT', () => {

	it('should be selectable by class "add-actions"', () => {
		expect(shallow((<AddActions></AddActions>)).is('.add-actions')).toBe(true);
	});

    it('should has a Button component inside', () => {
		expect(mount(<AddActions></AddActions>).find('.button').length).toBe(1);
	});

    it('should has a select tag inside', () => {
		expect(mount(<AddActions></AddActions>).find('select').length).toBe(1);
	});

    it('should has the 3 possible actions inside', () => {
		expect(mount(<AddActions></AddActions>).find('option').length).toBe(3);
	});

    it('should has Lettering as default selection', () => {
		const AddActionsComponent = mount((<AddActions></AddActions>));
        expect(AddActionsComponent.state('selectedAction')).toBe('lettering');
	});

	it('should change state when option has been changed', () => {
        var nextValue = 'watermark';
		const AddActionsComponent = shallow((<AddActions></AddActions>));
		AddActionsComponent.find('select').simulate('change', {currentTarget:{ value : nextValue}});
        expect(AddActionsComponent.state('selectedAction')).toBe(nextValue);
	});
});
