import React from 'react';
import styled, { css } from 'styled-components';
import * as colors from '../../colors';
import filterIcon from '../../images/filter-icon.png';
import searchIcon from '../../images/search-icon-yellow.png';
import yearIcon from '../../images/year-icon.png';
import ExpandableFilters from '../expandablefilters/index.js';

export default class SearchFilters extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
			year: '',
			showFilters: false,
		};
	}
	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
	handleShowFilter = () => {
		this.setState({ showFilters: !this.state.showFilters });
	};
	componentDidUpdate = prevState => {
		// Fetch the popular list if the input fields are empty
		if (prevState.query !== this.state.query && this.state.query === '') {
			this.props.doFetch(
				'https://api.themoviedb.org/3/movie/popular?api_key=128a1d0ed1093ac629ba82e8345d9bfc&language=en-US&page=1'
			);
		}
		// Fetch the movie with the relevant query that is updated on each keystroke
		// TODO: how to limit calls -> debounce?
		if (prevState.query !== this.state.query && this.state.query !== '') {
			this.props.doFetch(
				`https://api.themoviedb.org/3/search/movie?api_key=128a1d0ed1093ac629ba82e8345d9bfc&language=en-US&query=${this.state.query}&page=1&include_adult=false`
			);
		}
		// Fetch the movie including the year parameter, if query is empty use a 'space' so call doesn't fail
		if (prevState.year !== this.state.year && this.state.year !== '') {
			this.props.doFetch(
				`https://api.themoviedb.org/3/search/movie?api_key=128a1d0ed1093ac629ba82e8345d9bfc&language=en-US&query=${this
					.state.query || ' '}&page=1&include_adult=false&year=${this.state.year}`
			);
		}
	};
	// Different approach to checking the width of the window 
	// update show filters accordingly...
	updateDimensions = () => {
		if (window.innerWidth >= 1240) this.setState({ showFilters: true });
		else this.setState({ showFilters: false });
	};
	componentDidMount() {
		this.updateDimensions();
		window.addEventListener('resize', this.updateDimensions);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}
	render() {
		const { genres, ratings, languages } = this.props;
		const { query, year, showFilters } = this.state;

		return (
			<FiltersWrapper>
				<SearchFiltersCont show>
					<SearchBar>
						<StyledInput show>
							<img src={searchIcon} alt="Search Icon" />
							<input
								type="text"
								name="query"
								value={query}
								placeholder="Search Query"
								onChange={event => this.onChange(event)}
							/>
						</StyledInput>
						<StyledFilter onClick={this.handleShowFilter}>
							<img src={filterIcon} alt="Filter Icon" />
						</StyledFilter>
					</SearchBar>
					<StyledInput show={showFilters}>
						<img src={yearIcon} alt="Calendar Icon" />
						<input
							type="text"
							name="year"
							value={year}
							placeholder="Year of release"
							onChange={event => this.onChange(event)}
						/>
					</StyledInput>
				</SearchFiltersCont>
				<SearchFiltersCont show={showFilters}>
					<h3>Movies</h3>
					<ExpandableFilters genres={genres} ratings={ratings} languages={languages} />
				</SearchFiltersCont>
			</FiltersWrapper>
		);
	}
}

const FiltersWrapper = styled.div`
	position: relative;
	min-width: 280px;
`;

const SearchFiltersCont = styled.div`
	background-color: white;
	padding: 20px;
	border-radius: 3px;
	transition: all 0.3s ease-in-out;
	&:first-child {
		margin-bottom: 15px;
	}

	${p =>
		p.show
			? css`
					display: block;
			  `
			: css`
					display: none;
			  `}
`;

const SearchBar = styled.div`
	display: flex;
	flex-direction: row;
`;

const StyledInput = styled.div`
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	padding: 0 10px 10px 0;
	border-bottom: 2px solid ${colors.primaryColor};
	& > input {
		flex-grow: 1;
		outline: none;
		color: ${colors.primaryColor};
		background-color: none;
		border: none;
	}
	& > img {
		margin-right: 10px;
	}
	&:not(:last-child) {
		margin-bottom: 15px;
	}
	${p =>
		p.show
			? css`
					display: block;
			  `
			: css`
					display: none;
			  `}
`;

const StyledFilter = styled.div`
	padding: 0 10px 10px 10px;
	height: 100%;
	margin-left: 15px;
	cursor: pointer;
	border-bottom: 2px solid ${colors.primaryColor};
	& > img {
		height: 28px;
	}
	@media (min-width: 1240px) {
		display: none;
	}
`;
