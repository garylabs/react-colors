import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
class PaletteList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			openDelDiag: false,
			deletingId: '',
		};
	}

	openDialog = id => {
		this.setState({ openDelDiag: true, deletingId: id });
	};

	closeDialog = () => {
		this.setState({ openDelDiag: false, deletingId: '' });
	};

	handleDelete = () => {
		this.props.deletePalette(this.state.deletingId);
		this.closeDialog();
	};

	handleClick() {
		this.props.goToPalette(this.props.id);
	}

	gotToPalette(id) {
		this.props.history.push(`/palette/${id}`);
	}

	render() {
		const { palettes, classes } = this.props;
		const { openDelDiag } = this.state;
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1 className={classes.heading}>Palette List</h1>
						<Link to="/palette/new">Create New Palette</Link>
					</nav>
					<TransitionGroup className={classes.palettes}>
						{palettes.map(palette => (
							<CSSTransition key={palette.id} classNames="fade" timeout={500}>
								<MiniPalette
									{...palette}
									openDialog={this.openDialog}
									goToPalette={this.gotToPalette}
									key={palette.id}
									id={palette.id}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
				<Dialog
					open={openDelDiag}
					aria-labelledby="delete-dialgoue-title"
					onClose={this.closeDialg}>
					<DialogTitle id="delete-dialogue-title">
						Delete this Palette?
					</DialogTitle>
					<List>
						<ListItem button onClick={this.handleDelete}>
							<ListItemAvatar>
								<Avatar style={{ background: blue[100], color: blue[600] }}>
									<CheckIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Delete" />
						</ListItem>
						<ListItem button onClick={this.closeDialog}>
							<ListItemAvatar>
								<Avatar style={{ background: red[100], color: red[600] }}>
									<CloseIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Cancel" />
						</ListItem>
					</List>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);
