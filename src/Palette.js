import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Slider from 'rc-slider';
import './Palette.css';
import 'rc-slider/assets/index.css';

class Palette extends Component {
	constructor(props) {
		super(props);
		this.state = { level: 500 };
		this.changeLevel = this.changeLevel.bind(this);
	}

	changeLevel(level) {
		this.setState({ level });
	}

	render() {
		const { colors } = this.props.palette;
		const { level } = this.state;
		const colorBoxes = colors[level].map(color => (
			<ColorBox background={color.hex} name={color.name} />
		));
		return (
			<div className="Palette">
				<div className="slider">
					<Slider
						defaultValue={level}
						min={100}
						max={900}
						step={100}
						onAfterChange={this.changeLevel}
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
				{/*Navbar Goes here */}
				<div className="Palette-Colors">{colorBoxes}</div>
				{/* footer eventually */}
			</div>
		);
	}
}

export default Palette;
