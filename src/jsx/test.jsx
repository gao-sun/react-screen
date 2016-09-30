import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Screen, ScreenSlice } from './react-screen.jsx';

ReactDOM.render((
	<Screen delay={1000} showSkip={true}>
		<ScreenSlice>
			<div className="screen">
				<div className="title">Immersive</div>
				<div className="text">Full screen. Full experience.</div>
				<div className="screen-1-base">
					<div className="block block-1"></div>
					<div className="block block-2"></div>
					<div className="block block-3">
						<div className="image"></div>
						<div className="text">React Screen</div>
					</div>
				</div>
			</div>
		</ScreenSlice>
		<ScreenSlice>
			<div className="screen">
				<div className="title">Customizable</div>
				<div className="text">Put whatever you want.</div>
				<div className="screen-2-base">
					<div className="image"></div>
					<div className="text">React Screen</div>
					<div className="button">Button</div>
				</div>
			</div>
		</ScreenSlice>
		<ScreenSlice>
			<div className="screen">
				<div className="title">
					Modularized
				</div>
				<div className="text">
					Clear. Clean. Clever.
				</div>
				<div className="rec rec-base-1"></div>
				<div className="rec rec-base-2">
					<div className="rec-block-1"></div>
					<div className="rec-block-2"></div>
				</div>
				<div className="rec rec-base-3">
					<div className="rec-block-3"></div>
					<div className="rec-block-4"></div>
				</div>
			</div>
		</ScreenSlice>
	</Screen>
), document.getElementById('react-screen'));