import { DRAWER_WIDTH } from '../constants';

const styles = theme => ({
	root: {
		display: 'flex',
	},

	drawer: {
		width: DRAWER_WIDTH,
		flexShrink: 0,
		height: '100vh',
	},
	drawerPaper: {
		display: 'flex',
		width: DRAWER_WIDTH,
		alignItems: 'center',
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
		width: '100%',
	},
	content: {
		flexGrow: 1,
		height: 'calc(100vh - 64px)',
		padding: 0,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -DRAWER_WIDTH,
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

export default styles;
