import React, { Component } from 'react';
import PaletteFormNav from './PaletteFormNav';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { Button } from '@material-ui/core';
import DraggableColorList from './DraggableColorList';

import { arrayMove } from 'react-sortable-hoc';

import ColorPickerForm from './ColorPickerForm';

const drawerWidth = 400;

const styles = theme => ({
	root: {
		display: 'flex',
	},

	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		height: '100vh',
	},
	drawerPaper: {
		display: 'flex',
		width: drawerWidth,
		alignItems: 'center',
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		height: 'calc(100vh - 64px)',
		padding: theme.spacing.unit * 3,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	container: {
		width: '90%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	btns: {
		width: '100%',
	},
	btn: {
		width: '50%',
	},
});

export class NewPaletteForm extends Component {
	static defaultProps = {
		maxColors: 20,
	};
	constructor(props) {
		super(props);

		this.state = {
			open: true,
			currColor: 'teal',
			colors: this.props.palettes[0].colors,
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

	handleSubmit = newPaletteName => {
		let newName = newPaletteName;
		const newPalette = {
			paletteName: newName,
			id: newName.toLowerCase().replace(/ /g, '-'),
			colors: this.state.colors,
		};
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
		let rand = Math.floor(Math.random() * allColors.length);
		const randomColor = allColors[rand];
		this.setState(
			{ colors: [...this.state.colors, randomColor] },
			console.log(this.state.colors)
		);
	};

	render() {
		const { classes, theme, maxColors, palettes } = this.props;
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
					/>
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
