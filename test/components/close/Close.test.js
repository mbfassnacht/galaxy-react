// Close.test.js
import React from 'react';
import Close from '../../../src/scripts/components/Close/close.js';
import renderer from 'react-test-renderer';

test('Close changes the class when hovered', () => {
    const component = renderer.create(
    <Close page="http://www.facebook.com">Facebook</Close>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    tree.props.onMouseEnter();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    tree.props.onMouseLeave();
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
