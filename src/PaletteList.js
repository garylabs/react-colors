import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
class PaletteList extends Component {
	gotToPalette(id) {
		this.props.history.push(`/palette/${id}`);
	}

	render() {
		const { palettes, classes, deletePalette } = this.props;
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
									handleDelete={deletePalette}
									handleClick={() => this.gotToPalette(palette.id)}
									key={palette.id}
									id={palette.id}
								/>
							</CSSTransition>
						))}
					</TransitionGroup>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);
