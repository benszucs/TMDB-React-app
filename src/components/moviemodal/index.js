import axios from 'axios';
import React from 'react';
import styled, { css } from 'styled-components';
import * as colors from '../../colors';
import timesIcon from '../../images/times.png';
import MovieItem from '../movieitem/index.js';

export default class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
		};
		this.modalRef = React.createRef();
	}
	componentDidUpdate = prevProps => {
		// fetch the movie details if the modal is shown
		if (prevProps.show !== this.props.show && this.props.show === true) {
			axios
				.get(
					`https://api.themoviedb.org/3/movie/${this.props.movieId}?api_key=128a1d0ed1093ac629ba82e8345d9bfc&language=en-US
            `
				)
				.then(res => this.setState({ data: res.data }));
		}
		// reset the state if the modal is closed
		if (prevProps.show !== this.props.show && this.props.show === false) this.setState({ data: {} });
	};
	// Close modal if the user clicks outside of inner modal
	onClickOutside = event => {
		if (this.modalRef && this.modalRef.current.contains(event.target)) return;
		this.props.handleClose();
	};
	render() {
		const { show, handleClose, children, genres } = this.props;
		const { data } = this.state;
		return (
			<ModalContainer show={show} onClick={this.onClickOutside}>
				<ModalInner ref={this.modalRef}>
					{children}
					<MovieItem movie={data} genres={genres} />
					<CloseIcon src={timesIcon} alt="Times Icon" onClick={handleClose} />
					<ButtonsContainer>
						<Button outlined>Watch Offline</Button>
						<Button solid>Watch Online</Button>
					</ButtonsContainer>
				</ModalInner>
			</ModalContainer>
		);
	}
}

const ModalContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	z-index: 9;
	${p =>
		p.show
			? css`
					display: block;
			  `
			: css`
					display: none;
			  `}
`;

const ModalInner = styled.section`
	position: fixed;
	background: white;
	width: 90%;
	max-width: 860px;
	min-height: 318px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 10;
	border-radius: 3px;
	@media (min-width: 960px) {
		min-height: 408px;
	}
`;

const CloseIcon = styled.img`
	width: 20px;
	height: 20px;
	position: absolute;
	top: -10px;
	right: -10px;
	cursor: pointer;
`;

const ButtonsContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	padding: 0 20px 20px 20px;
`;

const Button = styled.button`
	background: none;
	border: none;
	padding: 10px 20px;
	font-weight: 600;
	font-size: 1rem;
	border-radius: 3px;
	cursor: pointer;
	&:first-child {
		margin-right: 15px;
	}

	${p =>
		p.outlined &&
		css`
			border: 2px solid ${colors.primaryColor};
			color: ${colors.primaryColor};
		`}
	${p =>
		p.solid &&
		css`
			color: white;
			background: ${colors.primaryColor};
		`}
`;
