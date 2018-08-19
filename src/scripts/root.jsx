import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router';
import StartScreen from './screens/StartScreen/StartScreen.jsx';
import GameScreen from './screens/GameScreen/GameScreen.jsx';
import FinishScreen from './screens/FinishScreen/FinishScreen.jsx';
import Galaxy from './Galaxy.jsx';

export default class Root extends Component {

    render() {
        const { history } = this.props;
        return (
            <Router history={history}>
                <div className="galaxy-app">
                    <Route component={Galaxy}/>
                    <Route exact name='start' path='/' component={StartScreen}></Route>
                    <Route name='game' path='/game' component={GameScreen}></Route>
                    <Route name='finish' path='/finish' component={FinishScreen}></Route>
                </div>
            </Router>
        );
    }
}
