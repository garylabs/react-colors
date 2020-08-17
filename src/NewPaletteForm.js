import React, { Component } from 'react';
import PaletteFormNav from './PaletteFormNav';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import seedColors from './seedColors';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { Button } from '@material-ui/core';
import DraggableColorList from './DraggableColorList';

import { arrayMove } from 'react-sortable-hoc';

import ColorPickerForm from './ColorPickerForm';
import styles from './styles/NewPaletteFormStyles';

export class NewPaletteForm extends Component {
	static defaultProps = {
		maxColors: 20,
	};
	constructor(props) {
		super(props);

		this.state = {
			open: true,
			currColor: 'teal',
			colors: seedColors[0].colors,
		};
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	createColor = newColor => {
		this.setState({
			colors: [...this.state.colors, newColor],
			newColorName: '',
		});
	};

	handleSubmit = newPalette => {
		newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
		newPalette.colors = this.state.colors;
		this.props.savePalette(newPalette);
		this.props.history.push('/');
	};

	removeColor = colorName => {
		this.setState({
			colors: this.state.colors.filter(color => color.name !== colorName),
		});
	};

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ colors }) => ({
			colors: arrayMove(colors, oldIndex, newIndex),
		}));
	};

	clearColors = () => {
		this.setState({ colors: [] });
	};

	addRandomColor = () => {
		//random color from existing palettes
		const allColors = this.props.palettes.map(p => p.colors).flat();
		let rand;
		let randomColor;
		let isDuplicateColor = true;
		while (isDuplicateColor) {
			rand = Math.floor(Math.random() * allColors.length);
			randomColor = allColors[rand];
			isDuplicateColor = this.state.colors.some(
				color => color.name === randomColor.name
			);
		}
		this.setState(
			{ colors: [...this.state.colors, randomColor] },
			console.log(this.state.colors)
		);
	};

	render() {
		const { classes, maxColors, palettes } = this.props;
		const { open, colors } = this.state;
		let isPaletteFull = colors.length >= maxColors;

		return (
			<div className={classes.root}>
				<PaletteFormNav
					open={open}
					palettes={palettes}
					handleSubmit={this.handleSubmit}
					handleDrawerOpen={this.handleDrawerOpen}
				/>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper,
					}}>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<div className={classes.container}>
						<Typography variant="h4" gutterBottom>
							Design Your Palette
						</Typography>
						<div className={classes.btns}>
							<Button
								variant="contained"
								color="secondary"
								className={classes.btn}
								onClick={this.clearColors}>
								Clear Palette
							</Button>
							<Button
								variant="contained"
								color="primary"
								className={classes.btn}
								onClick={this.addRandomColor}
								disabled={isPaletteFull}>
								Random Color
							</Button>
							<ColorPickerForm
								isPaletteFull={isPaletteFull}
								createColor={this.createColor}
								colors={colors}
							/>
						</div>
					</div>
				</Drawer>
				<main
					className={classNames(classes.content, {
						[classes.contentShift]: open,
					})}>
					<div className={classes.drawerHeader} />
					<DraggableColorList
						colors={colors}
						removeColor={this.removeColor}
						axis="xy"
						onSortEnd={this.onSortEnd}
						distance={10}
					/>
				</main>
			</div>
		);
	}
}

export default withStyles(styles)(NewPaletteForm);
