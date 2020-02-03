import axios from 'axios';
import { useEffect, useState } from 'react';

const initState = {
	keyword: '',
	year: 0,
	results: [],
	movieDetails: null,
	totalCount: 0,
	genreOptions: [
		{
			id: 28,
			name: 'Action',
		},
		{
			id: 12,
			name: 'Adventure',
		},
		{
			id: 16,
			name: 'Animation',
		},
		{
			id: 35,
			name: 'Comedy',
		},
		{
			id: 80,
			name: 'Crime',
		},
		{
			id: 99,
			name: 'Documentary',
		},
		{
			id: 18,
			name: 'Drama',
		},
		{
			id: 10751,
			name: 'Family',
		},
		{
			id: 14,
			name: 'Fantasy',
		},
		{
			id: 36,
			name: 'History',
		},
		{
			id: 27,
			name: 'Horror',
		},
		{
			id: 10402,
			name: 'Music',
		},
		{
			id: 9648,
			name: 'Mystery',
		},
		{
			id: 10749,
			name: 'Romance',
		},
		{
			id: 878,
			name: 'Science Fiction',
		},
		{
			id: 10770,
			name: 'TV Movie',
		},
		{
			id: 53,
			name: 'Thriller',
		},
		{
			id: 10752,
			name: 'War',
		},
		{
			id: 37,
			name: 'Western',
		},
	],
	ratingOptions: [
		{ id: 7.5, name: 7.5 },
		{ id: 8, name: 8 },
		{ id: 8.5, name: 8.5 },
		{ id: 9, name: 9 },
		{ id: 9.5, name: 9.5 },
		{ id: 10, name: 10 },
	],
	languageOptions: [
		{ id: 'GR', name: 'Greek' },
		{ id: 'EN', name: 'English' },
		{ id: 'RU', name: 'Russian' },
		{ id: 'PO', name: 'Polish' },
	],
};

const useDataApi = (initialUrl, initialData) => {
	const [data, setData] = useState(initialData);
	const [url, setUrl] = useState(initialUrl);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);
			try {
				const result = await axios(url);
				setData({
					...initState,
					results: result.data,
				});
			} catch (error) {
				setIsError(true);
			}
			setIsLoading(false);
		};
		fetchData();
	}, [url]);
	return [{ data, isLoading, isError }, setUrl];
};

export default useDataApi;
