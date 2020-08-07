import React, { Component } from 'react';
import Slider from 'rc-slider';
import './Navbar.css';
import 'rc-slider/assets/index.css';

class Navbar extends Component {
	render() {
		const { level, changeLevel } = this.props;
		return (
			<header className="Navbar">
				<div className="logo">
					<a href="#">React-Colors</a>
				</div>
				<div className="slider-container">
					<span>Level: {level}</span>
					<div className="slider">
						<Slider
							defaultValue={level}
							min={100}
							max={900}
							step={100}
							onAfterChange={changeLevel}
							trackStyle={{ backgroundColor: 'transparent' }}
							handleStyle={{
								backgroundColor: 'green',
								outline: 'none',
								border: '2px solid green',
								boxShadow: 'none',
								width: '13px',
								height: '13px',
								margin: '-3px -7px 0 0',
							}}
							railStyle={{ height: '8px' }}
						/>
					</div>
				</div>
			</header>
		);
	}
}

export default Navbar;
