import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';

class Palette extends Component {
	render() {
		const colorBoxes = this.props.colors.map(color => (
			<ColorBox background={color.color} name={color.name} />
		));
		return (
			<div className="Palette">
				{/*Navbar Goes here */}
				<div className="Palette-Colors">{colorBoxes}</div>
				{/* footer eventually */}
			</div>
		);
	}
}

export default Palette;
