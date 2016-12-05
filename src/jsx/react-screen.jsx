import React, { Component } from 'react';
/**
	Disable scroll from http://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
**/

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var scrollKeys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (scrollKeys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}

export class Screen extends Component {
	// Properties
	scrollListener = this.debounce.bind(this, this.handleScroll, 2);
	removeWrapperTimeoutId = null;
	prevIndex = -1;
	length = 0;
	sliceHeight = 60;
	delay = 500;
	showSkip = true;

	// User Defined Functions
	blockAt(index) {
		if(this.refs['slice-' + index] != undefined)
			return this.refs['slice-' + index];
		return null;
	}

	getPosition(el) {
		for (var lx=0, ly=0;
			 el != null;
			 lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
		return {x: lx,y: ly};
	}

	debounce(method, delay) {
		clearTimeout(method._tId);
		method._tId= setTimeout(() => {
			method.bind(this)();
		}, delay);
	}

	blockScrollForAnimation() {
		disableScroll();
		setTimeout(function() {
			enableScroll();
		}, this.delay);
	}

	skip() {
		window.scrollTo(0, this.getPosition(this.refs.gap).y + this.refs.gap.offsetHeight);
	}

	handleScroll() {
		let length = this.length;
		let innerHeight = window.innerHeight;
		let bodyScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		let screenTop = this.getPosition(this.refs.gap).y;
		let screenStartTop = screenTop - 0.5 * innerHeight;
		let screenHeight = this.refs.gap.offsetHeight;
		let screenIndex = Math.floor((bodyScrollTop - screenStartTop) / (screenHeight / length));

		// Background
		if(screenIndex >= 0 && screenIndex < length) {
			this.refs.background.classList.remove('out');
			
			// Move slider to top, need a fancier way
			clearTimeout(this.removeWrapperTimeoutId);
			this.refs.wrapper.classList.remove('out');
			this.removeWrapperTimeoutId = null;
		} else {
			this.refs.background.classList.add('out');

			// Move slider to bottom, need a fancier way
			if(this.removeWrapperTimeoutId == null) {
				this.removeWrapperTimeoutId = window.setTimeout(() => {
					this.refs.wrapper.classList.add('out');
				}, 500);
			}
		}
		// Progress
		if(screenIndex >= 0 && screenIndex < length) {
			this.refs.progress.classList.remove('hide');
			this.refs['progress-bar'].style.height = (((bodyScrollTop - screenStartTop) / screenHeight) * 100) + '%';
		} else {
			this.refs.progress.classList.add('hide');
		}

		// Skip
		if(this.showSkip && screenIndex >= 0 && screenIndex < length) {
			this.refs.skip.classList.remove('hide');
		} else {
			this.refs.skip.classList.add('hide');
		}

		// Screen
		for(let i = 0; i < length; ++ i) {
			if(i == screenIndex) {
				if(this.delay > 0 && this.prevIndex != screenIndex) {
					this.blockScrollForAnimation();
				}

				this.blockAt(i).animateIn();
				this.refs['number-' + i].classList.add('active');
			} else {
				this.blockAt(i).animateOut();
				this.refs['number-' + i].classList.remove('active');
			}
		}

		this.prevIndex = screenIndex;
	}

	jumpTo(index) {
		let length = this.length;
		let innerHeight = window.innerHeight;
		let screenTop = this.getPosition(this.refs.gap).y;
		let screenStartTop = screenTop - 0.5 * innerHeight;
		let screenHeight = this.refs.gap.offsetHeight;

		window.scrollTo(0, index * (screenHeight / length) + screenStartTop + 1);
	}

	// Original Event Handlers
	constructor(props) {
		super(props);
		this.length = Array.isArray(props.children) ? props.children.length : 1;
		(props.delay != undefined) && (this.delay = props.delay);
		(props.sliceHeight != undefined) && (this.sliceHeight = props.sliceHeight);
		(props.showSkip != undefined) && (this.showSkip = props.showSkip);
	}
	componentDidMount() {
		window.addEventListener('scroll', this.scrollListener);
		this.handleScroll();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.scrollListener);
	}

	render() {
		let numbers = [];

		for(let i = 0; i < this.length; ++ i) {
			numbers.push(
				<div key={ "number-" + i } className="item">
					<div className="number" onClick={ this.jumpTo.bind(this, i) } ref={ "number-" + i }>{ (i + 1) }</div>
				</div>
			);
		}

		let index = 0;
		let slices = React.Children.map(this.props.children, 
			(child) => React.cloneElement(child, {
				ref: 'slice-' + (index++),
				style: this.props.style
			})
		);

		return (
			<div>
				<div className="react-screen-gap" ref="gap" style={ { height: (this.sliceHeight * this.length) + 'vh' } }></div>
				<div className="react-screen-wrapper out" ref="wrapper">
					<div className="react-screen-background in out" ref="background" style={ this.props.style }></div>
					{ slices }
					<div className="react-screen-progress hide" ref="progress">
						{ numbers }
						<div className="bar" ref="progress-bar"></div>
					</div>
					<div className="react-screen-skip" ref="skip" onClick={ this.skip.bind(this) }>SKIP</div>
				</div>
			</div>
		);
	}
}

export class ScreenSlice extends Component {
	cleanUp() {
		this.refs.screen.classList.remove('in');
		this.refs.screen.classList.remove('out');
	}
	animateIn() {
		this.cleanUp();
		this.refs.screen.classList.add('in');
	}
	animateOut() {
		this.cleanUp();
		this.refs.screen.classList.add('out');
	}
	render() {
		return (
			<div ref="screen" className="react-screen" style={ this.props.style }>{ this.props.children }</div>
		);
	}
}
