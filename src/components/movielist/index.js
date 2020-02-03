import React from 'react';
import styled from 'styled-components';
import MovieItem from '../movieitem';
import MovieModal from '../moviemodal';

export default class MovieList extends React.Component {
	state = { show: false, movieId: '' };

	showModal = id => {
		this.setState({ show: true, movieId: id });
	};

	hideModal = id => {
		this.setState({ show: false, movieId: '' });
	};

	render() {
		const { movies, genres } = this.props;
		const { show, movieId } = this.state;

		return (
			<MoviesWrapper>
				{movies.map((movie, idx) => (
					<MovieItem key={idx} movie={movie} genres={genres} onClick={() => this.showModal(movie.id)} clickable/>
				))}
				<MovieModal show={show} handleClose={this.hideModal} movieId={movieId} genres={genres} />
			</MoviesWrapper>
		);
	}
}

const MoviesWrapper = styled.div`
	position: relative;
	width: 100%;
	& > div:not(:last-child) {
		margin-bottom: 15px;
	}
`;
