import 'core-js/fn/object/assign';
import "./../styles/main.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root.jsx';
import createHashHistory from 'history/createHashHistory';

const rootEl = document.getElementById('app-container');
const history = createHashHistory();

ReactDOM.render(<Root history={history} />, rootEl);
