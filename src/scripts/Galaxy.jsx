import React from 'react';
import Bot from './components/Bot/bot.jsx';
import GalaxyGameStatusStore from './stores/galaxyGameStatusStore';
import StatusBar from './components/StatusBar/statusBar.jsx';
import "./../assets/images/background.jpg";

class Galaxy extends React.Component {

    constructor(props) {
        super(props);
        this.state = {finised: false};
    }

    render() {
        return (
            <div id='galaxy-game'>
                <StatusBar></StatusBar>

            </div>
        );
    }
}

Galaxy.defaultProps = {

};

export default Galaxy;
