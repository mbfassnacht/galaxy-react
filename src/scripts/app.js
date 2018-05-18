import React from 'react';
import Menu from './components/Menu/menu';
require('normalize.css/normalize.css');
require('styles/App.scss');

class App extends React.Component {

    componentDidMount() {

    }

    render() {
        var props = this.props;
        return (
            <div>
                <Menu></Menu>
                {this.props.children}
            </div>
        );
    }
}

App.defaultProps = {

};

export default App;
