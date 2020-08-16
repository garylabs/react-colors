import React, { Component } from 'react';
import PaletteFormNav from './PaletteFormNav';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import DraggableColorList from './DraggableColorList';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';
import { Link } from 'react-router-dom';

const drawerWidth = 400;

const styles = theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
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
			newColorName: '',
		};
	}

	componentDidMount() {
		ValidatorForm.addValidationRule('isColorNameUnique', value =>
			this.state.colors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			)
		);
		ValidatorForm.addValidationRule('isColorUnique', value =>
			this.state.colors.every(({ color }) => color !== this.state.currColor)
		);
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	handleColorChange = color => {
		this.setState({ currColor: color });
	};

	createColor = () => {
		const newColor = {
			color: this.state.currColor,
			name: this.state.newColorName,
		};
		this.setState({
			colors: [...this.state.colors, newColor],
			newColorName: '',
		});
	};

	handleChange = evt => {
		this.setState({ [evt.target.name]: evt.target.value });
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
					classes={classes}
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
					<Typography variant="h4">Design Your Palette</Typography>
					<div>
						<Button
							variant="contained"
							color="secondary"
							onClick={this.clearColors}>
							Clear Palette
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={this.addRandomColor}
							disabled={isPaletteFull}>
							Random Color
						</Button>
					</div>
					<ChromePicker
						color={this.state.currColor}
						onChangeComplete={newColor => this.handleColorChange(newColor.hex)}
					/>

					<ValidatorForm onSubmit={this.createColor}>
						<TextValidator
							value={this.state.newColorName}
							name="newColorName"
							onChange={this.handleChange}
							validators={['required', 'isColorNameUnique', 'isColorUnique']}
							errorMessages={[
								'Enter a Color Name',
								'Name should be unique',
								'Color Name should be unique',
							]}
						/>
						<Button
							variant="contained"
							color="primary"
							style={{
								backgroundColor: isPaletteFull ? 'grey' : this.state.currColor,
							}}
							type="submit"
							disabled={isPaletteFull}>
							{isPaletteFull ? 'Palette Full' : 'Add Color'}
						</Button>
					</ValidatorForm>
				</Drawer>
				<main
					className={classNames(classes.content, {
						[classes.contentShift]: open,
					})}>
					<div className={classes.drawerHeader} />
					<DraggableColorList
						colors={this.state.colors}
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
