import 'core-js/fn/object/assign';
import "./../styles/main.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import VideoPackager from './videoPackager';

const rootEl = document.getElementById('react-video-packager');

ReactDOM.render(<VideoPackager/>, rootEl);
