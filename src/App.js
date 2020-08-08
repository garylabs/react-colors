import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelper';
import { Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
	componentDidMount() {
		console.log(generatePalette(seedColors[3]));
	}
	render() {
		return (
			<Switch>
				<Route exact path="/" render={() => <h1>PALETTE LIST GOES HERE</h1>} />
				<Route
					exact
					path="/palette/:id"
					render={() => <h1>PALETTE IND GOES HERE</h1>}
				/>
			</Switch>
			// <div>
			// 	<Palette palette={generatePalette(seedColors[4])} />
			// </div>
		);
	}
}

export default App;
