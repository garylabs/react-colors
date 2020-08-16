import React, { Component } from 'react';

import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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
		const { isPaletteFull } = this.props;
		const { currColor, newColorName } = this.state;
		return (
			<div>
				<ChromePicker
					color={currColor}
					onChangeComplete={newColor => this.handleColorChange(newColor.hex)}
				/>

				<ValidatorForm onSubmit={this.handleSubmit}>
					<TextValidator
						value={newColorName}
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
							backgroundColor: isPaletteFull ? 'grey' : currColor,
						}}
						type="submit"
						disabled={isPaletteFull}>
						{isPaletteFull ? 'Palette Full' : 'Add Color'}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}

export default ColorPickerForm;
