import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';
import { Component } from 'react';
import { render } from '@testing-library/react';

class MiniPalette extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	deletePalette = e => {
		e.stopPropagation();
		this.props.handleDelete(this.props.id);
	};

	render() {
		const { classes, paletteName, emoji, colors, handleClick } = this.props;
		const miniColorBoxes = colors.map(color => (
			<div
				className={classes.miniColor}
				style={{ backgroundColor: color.color }}
				key={color.name}
			/>
		));

		return (
			<div className={classes.root} onClick={handleClick}>
				<DeleteIcon
					className={classes.deleteIcon}
					onClick={this.deletePalette}
				/>

				<div className={classes.colors}>{miniColorBoxes}</div>
				<h5 className={classes.title}>
					{paletteName} <span className={classes.emoji}>{emoji}</span>
				</h5>
			</div>
		);
	}
}

export default withStyles(styles)(MiniPalette);
