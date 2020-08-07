import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from 'rc-slider';
import './Navbar.css';
import 'rc-slider/assets/index.css';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			format: 'hex',
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		this.setState({ format: e.target.value });
		this.props.handleChange(e.target.value);
	}
	render() {
		const { level, changeLevel } = this.props;
		const { format } = this.state;
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
				<div className="select-container">
					<Select onChange={this.handleChange} value={format}>
						<MenuItem value="hex">HEX -#ffffff</MenuItem>
						<MenuItem value="rgb">RGB -rgb(255,255,255)</MenuItem>
						<MenuItem value="rgba">RGBA -rgba(255,255,255, 1.0)</MenuItem>
					</Select>
				</div>
			</header>
		);
	}
}

export default Navbar;
