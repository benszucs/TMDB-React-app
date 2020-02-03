import React from 'react';
import styled from 'styled-components';
import MovieList from '../../components/movielist';
import SearchFilters from '../../components/searchfilter';
import useDataApi from '../../fetcher';

export default function Discover() {
	// created useDataApi function in /fetcher.js which tkes a url as parameter to make relevant api call
	const [{ data, isLoading, isError }, doFetch] = useDataApi(
		'https://api.themoviedb.org/3/movie/popular?api_key=128a1d0ed1093ac629ba82e8345d9bfc&language=en-US&page=1',
		{}
	);
	return (
		<DiscoverWrapper>
			<MovieFilters>
				<SearchFilters
					genres={data.genreOptions || []}
					ratings={data.ratingOptions || []}
					languages={data.languageOptions || []}
					doFetch={doFetch}
				/>
			</MovieFilters>
			<MovieResults>
				{isLoading ? (
					<p>Loading ...</p>
				) : (
					<>
						{isError && <p>`${isError}`</p>}
						{
							<TotalCounter>
								<p>
									<strong>Page {data.results.page}:</strong>{' '}
									{Math.ceil(data.results.total_results / data.results.total_pages) || 0} results
								</p>
								<p>
									<strong>Total:</strong> {data.results.total_results} results
								</p>
							</TotalCounter>
						}
						<MovieList movies={data.results.results || []} genres={data.genreOptions || []} />
					</>
				)}
			</MovieResults>
		</DiscoverWrapper>
	);
}

const DiscoverWrapper = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	padding: 15px;
	@media (min-width: 1240px) {
		flex-direction: row-reverse;
		padding: 45px;
	}
`;

const TotalCounter = styled.div`
	font-weight: 400;
	display: flex;
	justify-content: space-between;
	margin-bottom: 0.5rem;
`;

const MovieResults = styled.div`
	flex-grow: 1;
	margin-right: 0;
	@media (min-width: 1240px) {
		margin-right: 15px;
	}
`;

const MovieFilters = styled.div`
	margin-top: 0;
	@media (min-width: 1240px) {
		margin-top: calc(20px + 0.5rem);
	}
`;
