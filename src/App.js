import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelper';
import './App.css';

class App extends Component {
	componentDidMount() {
		console.log(generatePalette(seedColors[3]));
	}
	render() {
		return (
			<div>
				<Palette palette={generatePalette(seedColors[4])} />
			</div>
		);
	}
}

export default App;
