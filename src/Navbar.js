import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from 'rc-slider';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import './Navbar.css';
import 'rc-slider/assets/index.css';

const formattedText = {
	hex: 'HEX -#ffffff',
	rgb: 'RGB -rgb(255,255,255',
	rgba: 'RGBA -rgba(255,255,255, 1.0)',
};
class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			format: 'hex',
			open: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.closeSnackBar = this.closeSnackBar.bind(this);
	}

	closeSnackBar() {
		this.setState({ open: false });
	}

	handleChange(e) {
		this.setState({ format: e.target.value, open: true });
		this.props.handleChange(e.target.value);
	}
	render() {
		const { level, changeLevel, showingAllColors } = this.props;
		const { format } = this.state;
		return (
			<header className="Navbar">
				<div className="logo">
					<Link to="/">React-Colors</Link>
				</div>
				{showingAllColors && (
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
				)}
				<div className="select-container">
					<Select onChange={this.handleChange} value={format}>
						<MenuItem value="hex">HEX</MenuItem>
						<MenuItem value="rgb">RGB</MenuItem>
						<MenuItem value="rgba">RGBA</MenuItem>
					</Select>
				</div>
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					open={this.state.open}
					autoHideDuration={3000}
					message={
						<span id="message-id">{`Format: ${formattedText[format]}`}</span>
					}
					ContentProps={{
						'aria-describedby': 'message-id',
					}}
					action={[
						<IconButton
							onClick={this.closeSnackBar}
							color="inherit"
							key="close"
							aria-label="close">
							<CloseIcon />
						</IconButton>,
					]}
				/>
			</header>
		);
	}
}

export default Navbar;
