import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import './ColorBox.css';

class ColorBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			copied: false,
		};
		this.changeCopyState = this.changeCopyState.bind(this);
	}

	changeCopyState() {
		this.setState({ copied: true }, () => {
			setTimeout(() => this.setState({ copied: false }), 1500);
		});
	}

	render() {
		const { name, background, moreUrl, showLink } = this.props;
		const { copied } = this.state;
		const isDark = chroma(background).luminance() <= 0.06 && 'light-text';
		const isLight = chroma(background).luminance() >= 0.07 && 'dark-text';
		return (
			<CopyToClipboard text={background} onCopy={this.changeCopyState}>
				<div style={{ background }} className="ColorBox">
					<div
						style={{ background }}
						className={`copy-overlay ${copied && 'show'}`}
					/>
					<div className={`copy-msg ${copied && 'show'}`}>
						<h1>copied!</h1>
						<p className={isLight}>{background}</p>
					</div>
					<div className="copy-container">
						<div className="box-content">
							<span className={isDark}>{name}</span>
						</div>
						<button className={`copy-button ${isLight}`}>Copy</button>
					</div>
					{showLink && (
						<Link to={moreUrl} onClick={e => e.stopPropagation()}>
							<span className={`see-more ${isLight}`}>MORE</span>
						</Link>
					)}
				</div>
			</CopyToClipboard>
		);
	}
}

export default ColorBox;
