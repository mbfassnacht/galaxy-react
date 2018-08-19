import 'core-js/fn/object/assign';
import "./../styles/main.scss";
import "./../fonts/Emulogic.eot";
import "./../fonts/Emulogic.svg";
import "./../fonts/Emulogic.ttf";
import "./../fonts/Emulogic.woff";
import "./../fonts/Emulogic.woff2";
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root.jsx';
import createHashHistory from 'history/createHashHistory';

const rootEl = document.getElementById('app-container');
const history = createHashHistory();

ReactDOM.render(<Root history={history} />, rootEl);
