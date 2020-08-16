import sizes from './sizes';
import bg from './bgsvg.svg';
export default {
	root: {
		height: '100vh',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'center',
		/* background by SVGBackgrounds.com */
		backgroundColor: '#cc5577',
		backgroundImage: `url(${bg})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		overflow: 'scroll',
	},
	container: {
		width: '50%',
		display: 'flex',
		alignItems: 'flex-start',
		flexDirection: 'column',
		flexWrap: 'wrap',
		[sizes.down('xl')]: {
			width: '80%',
		},
		[sizes.down('xs')]: {
			width: '75%',
		},
	},
	nav: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		color: 'white',
		alignItems: 'center',
		color: 'white',
		'& a': {
			color: 'white',
			textDecoration: 'none',
		},
	},
	palettes: {
		boxSizing: 'border-box',
		width: '100%',
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 30%)',
		gridGap: '2.5rem',
		[sizes.down('md')]: {
			gridTemplateColumns: 'repeat(2, 50%)',
		},
		[sizes.down('xs')]: {
			gridTemplateColumns: 'repeat(1, 100%)',
			gridGap: '1rem',
		},
	},
	heading: {
		fontSize: '2rem',
	},
};
