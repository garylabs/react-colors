import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import styles from './styles/ColorPickerFormStyles';
export class ColorPickerForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currColor: 'teal',
			newColorName: '',
		};
	}
	componentDidMount() {
		ValidatorForm.addValidationRule('isColorNameUnique', value =>
			this.props.colors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			)
		);
		ValidatorForm.addValidationRule('isColorUnique', value =>
			this.props.colors.every(({ color }) => color !== this.state.currColor)
		);
	}

	handleColorChange = color => {
		this.setState({ currColor: color });
	};

	handleChange = evt => {
		this.setState({ [evt.target.name]: evt.target.value });
	};

	handleSubmit = () => {
		const newColor = {
			color: this.state.currColor,
			name: this.state.newColorName,
		};
		this.props.createColor(newColor);
		this.setState({ newColorName: '' });
	};

	render() {
		const { isPaletteFull, classes } = this.props;
		const { currColor, newColorName } = this.state;
		return (
			<div>
				<ChromePicker
					color={currColor}
					onChangeComplete={newColor => this.handleColorChange(newColor.hex)}
					className={classes.picker}
				/>

				<ValidatorForm onSubmit={this.handleSubmit}>
					<TextValidator
						value={newColorName}
						className={classes.colorNameInput}
						variant="filled"
						name="newColorName"
						margin="normal"
						placeholder="Color Name"
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
							backgroundColor: isPaletteFull ? 'grey' : currColor,
						}}
						type="submit"
						className={classes.addColor}
						disabled={isPaletteFull}>
						{isPaletteFull ? 'Palette Full' : 'Add Color'}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}

export default withStyles(styles)(ColorPickerForm);
