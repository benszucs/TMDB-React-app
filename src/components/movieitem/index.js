import React from 'react';
import styled, { css } from 'styled-components';
import * as colors from '../../colors';
import placeholderImage from '../../images/poster-placeholder.png';

export default class MovieItem extends React.Component {
	render() {
		const { movie, genres, onClick, clickable } = this.props;
		// Genres key name of movies differ on different api calls so just check that we got the right array before render
		let movieGenres;
		if (!!movie.genre_ids) movieGenres = movie.genre_ids;
		if (!!movie.genres) movieGenres = movie.genres;

		return (
			// The MovieItemWrapper must be linked to the movie details popup
			<MovieItemWrapper onClick={onClick} clickable={clickable}>
				<LeftCont>
					{movie.poster_path ? (
						<img
							key={movie.id}
							src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
							alt={`${movie.original_title} Poster`}
						/>
					) : (
						<img key={movie.id} src={placeholderImage} alt={`Placeholder Poster`} width={200} />
					)}
				</LeftCont>
				<RightCont>
					<header>
						<main>
							<h2>{movie.original_title}</h2>
							<span>
								{!!movieGenres &&
									movieGenres.map((id, index) => {
										let genreName;
										genres.forEach(genre => {
											if (genre.id === id || genre.id === id.id) genreName = genre.name;
										});
										return index !== movieGenres.length - 1 ? `${genreName} | ` : `${genreName}`;
									})}
							</span>
							<footer>
								<p>{movie.overview}</p>
							</footer>
						</main>
						<aside>
							<div>
								<span>{movie.vote_average}</span>
							</div>
						</aside>
					</header>
					<footer>
						<span>{movie.release_date}</span>
					</footer>
				</RightCont>
			</MovieItemWrapper>
		);
	}
}

const MovieItemWrapper = styled.div`
	position: relative;
	background-color: white;
	border-radius: 3px;
	overflow: hidden;
	padding: 20px;
	display: flex;
	flex-direction: row;
	${p =>
		p.clickable &&
		css`
			cursor: pointer;
			transition: all 0.2s;
			&:hover {
				background-color: #fcfcfd;
			}
		`}
`;

const LeftCont = styled.div`
	display: inline-block;
	margin-right: 20px;
	& > img {
		width: 140px;
		@media (min-width: 960px) {
			width: 200px;
		}
	}
`;

const RightCont = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	justify-content: space-between;

	& > header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		& > main {
			flex-grow: 1;
			& > h2 {
				font-weight: 800;
				margin-bottom: 0.5rem;
			}
			& > span {
				color: ${colors.primaryColor};
			}

			& > footer {
				position: relative;
				margin-top: 0.5rem;
				max-height: 80px;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-bottom: 0.5rem;

				&:before {
					content: '';
					width: 100%;
					height: 100%;
					position: absolute;
					left: 0;
					top: 0;
					background: linear-gradient(transparent 60px, white);
				}
				@media (min-width: 960px) {
					max-height: 100%;
					&:before {
						background: none;
					}
				}
			}
		}
		& > aside {
			& > div {
				padding: 8px;
				color: white;
				background-color: ${colors.primaryColor};
				border-radius: 10px;
				font-weight: 900;
			}
		}
	}

	& > footer {
		& > span {
			color: ${colors.primaryColor};
		}
	}
`;
