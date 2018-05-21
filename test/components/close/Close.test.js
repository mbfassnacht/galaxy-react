// Close.test.js
import React from 'react';
import Close from '../../../src/scripts/components/Close/close.jsx';
import renderer from 'react-test-renderer';

test('Close changes the class when hovered', () => {
    debugger;
    const component = renderer.create(
    <Close page="http://www.facebook.com">Facebook</Close>,
    );
    let closeComponent = component.toJSON();
    expect(closeComponent).toMatchSnapshot();

    closeComponent = component.toJSON();
    expect(closeComponent).toMatchSnapshot();

    // manually trigger the callback
    closeComponent.props.onMouseLeave();
    // re-rendering
    closeComponent = component.toJSON();
    expect(closeComponent).toMatchSnapshot();
});
