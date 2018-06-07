import React from 'react';

class Loader extends React.Component {

	constructor(props) {
        super(props);
        this.state = {visible: false};
    }

	componentDidMount() {
		
	}

	render() {
		return (
			<div className="video-packager-loader">
			</div>
		);
	}
}

Loader.defaultProps = {

};

export default Loader;
