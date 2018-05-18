import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router';
import LandingPage from './pages/landingPage';
import ProjectsPage from './pages/projectsPage';
import App from './app.js';

export default class Root extends Component {

    static propTypes = {
        history: PropTypes.object.isRequired
    }

    render() {
        const { history } = this.props;
        return (
            <Router history={history}>
                <div>
                    <Route component={App}/>
                    <Route exact name='home' path='/' component={LandingPage}></Route>
                    <Route name='projects' path='/projects' component={ProjectsPage}></Route>
                </div>
            </Router>
        );
    }
}
