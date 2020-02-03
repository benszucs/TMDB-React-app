import React from 'react';
import styled, { css } from 'styled-components';
import minusIcon from '../../images/minus.png';
import plusIcon from '../../images/plus.png';
import Checkbox from '../checkbox';

export default class ExpandableFilters extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showIndex: 0,
			checked: {
				'Select genre(s)': [],
				'Select min. vote': [],
				'Select language': [],
			},
		};
	}

	updateActiveIndex = index => {
		if (index === this.state.showIndex) this.setState({ showIndex: -1 });
		else this.setState({ showIndex: index });
	};

	handleCheck = (index, category) => {
		let array = this.state.checked[category];
		if (array.includes(index)) array.splice(array.indexOf(index), 1);
		else array.push(index);
		this.setState({
			checked: {
				...this.state.checked,
				[category]: array,
			},
		});
	};

	// You need to create your own checkbox component with a custom checkmark
	render() {
		const { genres, ratings, languages } = this.props;
		const { showIndex, checked } = this.state;
		const filters = [
			{ name: 'Select genre(s)', list: genres },
			{ name: 'Select min. vote', list: ratings },
			{ name: 'Select language', list: languages },
		];

		return (
			<Container>
				{filters.map((item, index) => {
					return (
						<Select key={index}>
							<SelectHeader onClick={() => this.updateActiveIndex(index)}>
								{showIndex === index ? (
									<img src={minusIcon} alt="Minus Icon" />
								) : (
									<img src={plusIcon} alt="Plus Icon" />
								)}
								<h4>{item.name}</h4>
							</SelectHeader>
							<SelectList show={showIndex === index}>
								{item.list.map((el, idx) => (
									<Checkbox
										key={idx}
										index={idx}
										category={item.name}
										checked={checked}
										onChange={this.handleCheck}
									>
										{el.name}
									</Checkbox>
								))}
							</SelectList>
						</Select>
					);
				})}
			</Container>
		);
	}
}

const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
`;

const Select = styled.div`
	position: relative;
`;

const SelectHeader = styled.header`
	padding: 10px 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	cursor: pointer;
	& > img {
		width: 15px;
		margin-right: 10px;
	}
`;

const SelectList = styled.ul`
	${p =>
		p.show
			? css`
					display: flex;
					flex-wrap: wrap;
					@media (min-width: 1240px) {
						display: block;
					}
			  `
			: css`
					display: none;
			  `}

	padding: 0;
	margin: 0;
	list-style-type: none;
	& div {
		margin-right: 0.5rem;
	}
`;
