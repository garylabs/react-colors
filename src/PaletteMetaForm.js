import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

export class PaletteMetaForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			stage: 'form',
			newPaletteName: '',
		};
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleChange = evt => {
		this.setState({ [evt.target.name]: evt.target.value });
	};

	showEmojiPicker = () => {
		this.setState({ stage: 'emoji' });
	};

	savePalette = emoji => {
		const newPalette = {
			paletteName: this.state.newPaletteName,
			emoji: emoji.native,
		};
		this.props.handleSubmit(newPalette);
	};

	componentDidMount() {
		ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
			this.props.palettes.every(
				({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
			)
		);
	}

	render() {
		const { newPaletteName } = this.state;
		const { handleSubmit, hideForm } = this.props;
		return (
			<div>
				<Dialog open={this.state.stage === 'emoji'} onClose={hideForm}>
					<DialogTitle id="form-dialog-title">
						Choose a Palette Emoji
					</DialogTitle>
					<Picker onSelect={this.savePalette} title="Choose a Palette Emoji" />
				</Dialog>
				<Dialog
					open={this.state.stage === 'form'}
					onClose={hideForm}
					aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">
						Choose a Palette Name
					</DialogTitle>
					<ValidatorForm onSubmit={this.showEmojiPicker}>
						<DialogContent>
							<DialogContentText>
								Please enter a name for your new palette. Make sure it is unique
							</DialogContentText>
							<TextValidator
								label="Palette Name"
								value={newPaletteName}
								name="newPaletteName"
								onChange={this.handleChange}
								fullWidth
								margin="normal"
								validators={['required', 'isPaletteNameUnique']}
								errorMessages={['Enter Palette Name', 'Name already used']}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={hideForm} color="primary">
								Cancel
							</Button>
							<Button variant="contained" color="primary" type="submit">
								Save Palette
							</Button>
						</DialogActions>
					</ValidatorForm>
				</Dialog>
			</div>
		);
	}
}

export default PaletteMetaForm;
