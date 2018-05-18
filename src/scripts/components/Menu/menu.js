require('styles/components/Menu/menu.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import TweenMax from 'gsap';
import { Link } from 'react-router-dom'
import Close from '../Close/close';

var model = require('./menu-model');

class Menu extends React.Component {

	componentDidMount() {
		this.container = ReactDOM.findDOMNode(this);
		this.links = this.container.getElementsByClassName('link');
		this.contactTitle = this.container.getElementsByClassName('contact-title')[0];
		this.requestedClose = false;
		this.opener = this.refs.opener;
		this.opened = false;
		this.isAnimating = false;

		this.opener.addEventListener('click', function() {
			if (!this.opened) {
				this.open();
			}
		}.bind(this));

		this.navigationLinks = this.container.getElementsByClassName('navigation-link');

		for (var i = 0; i < this.navigationLinks.length; i++) {
			this.navigationLinks[i].addEventListener('click', this.close);
		}
	}

	open() {
		if (!this.opened && !this.isAnimating) {
			this.isAnimating = true;
			TweenMax.fromTo(this.refs.menu, 0.2,{width: 0}, {width: 300, onComplete: function(){
				TweenMax.staggerTo(this.links, 0.2, { autoAlpha: 1}, 0.1, function(){
					this.opened = true;
					this.isAnimating = false;
					if (this.requestedClose) {
						this.close();
					}
				}.bind(this));
			}.bind(this)});

			this.refs.close.animateIn();

			TweenMax.fromTo(this.contactTitle, 0.2,{autoAlpha: 0}, {delay: 0.6, autoAlpha: 1});

		}
	}

	close() {
		if (this.opened && !this.isAnimating) {
			this.isAnimating = true;
			this.requestedClose = false;
			TweenMax.fromTo(this.contactTitle, 0.2,{autoAlpha: 1}, {delay: 0.4, autoAlpha: 0});
			TweenMax.staggerTo(this.links, 0.2, { autoAlpha: 0}, 0.1);
			TweenMax.to(this.refs.menu, 0.2, { delay:1.4, width: 0, onComplete: function(){
				this.opened = false;
				this.isAnimating = false;
			}.bind(this)});
			this.refs.close.animateOut();
		} else {
			this.requestedClose = true;
		}

	}

	render() {
		return (
			<div className="menu">
				<div ref={'opener'} className="opener">{model.title}</div>
				<div ref={'menu'} className="real-menu">
					<div className="close-icon">
						<Close ref={'close'} onClicked={this.close.bind(this)} ></Close>
					</div>
					<div className="list">
					{
					  	model.links.map(function(object, i){
							return <div className="link navigation-link" key={i}>
								<Link onClick={this.close.bind(this)} to={object.to}>
									{object.title}
								</Link>
							</div>;
					    }.bind(this))
					}
					</div>
					<div className="contact-container">
						<div className="contact-title">{model.contact.title}</div>
						<div className="contact-list">
						{
						  	model.contact.links.map(function(object, i){
								return <div key={i} className="link">
									<a href={object.href} className="link" target="_blank">
										<p className="link-name">{object.title}</p>
									</a>
								</div>;
						    }.bind(this))
						}
						</div>
					</div>
				</div>
			</div>
		);
	}
}


Menu.defaultProps = {

};

export default Menu;
