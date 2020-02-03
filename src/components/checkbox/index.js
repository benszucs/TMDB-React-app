import React from 'react';
import styled from 'styled-components';
import * as colors from '../../colors';

export default function Checkbox({ index, children, category, checked, onChange }) {
	// Create a custom checkbox component
	return (
		<CheckboxCont onClick={() => onChange(index, category)}>
			<input type="checkbox" checked={checked[category].includes(index)} readOnly />
			<label>{children}</label>
		</CheckboxCont>
	);
}

const CheckboxCont = styled.div`
	display: flex;
	margin-left: -15px;
	&:not(:last-child) {
		margin-bottom: 0.5rem;
	}

	> input {
		opacity: 0;
	}
	> input + label {
		position: relative;
		padding-left: 25px;
		cursor: pointer;
		&:before {
			content: '';
			position: absolute;
			left: 0;
			top: 1px;
			width: 17px;
			height: 17px;
			border: 1px solid ${colors.sideNavBar};
			background: white;
			border-radius: 3px;
		}
		&:after {
			content: '✔';
			position: absolute;
			top: -1px;
			left: 2px;
			font-size: 16px;
			color: ${colors.sideNavBar};
			transition: all 0.2s;
		}
	}
	> input:not(:checked) + label {
		&:after {
			opacity: 0;
			transform: scale(0);
		}
	}
	> input:disabled:not(:checked) + label {
		&:before {
			box-shadow: none;
			border-color: ${colors.sideNavBar};
			background-color: ${colors.sideNavBar};
		}
	}
	> input:checked + label {
		&:after {
			opacity: 1;
			transform: scale(1);
		}
	}
	> input:disabled:checked + label {
		&:after {
			color: ${colors.sideNavBar};
		}
	}
	> input:disabled + label {
		color: ${colors.sideNavBar};
	}
	> input:checked:focus + label,
	input:not(:checked):focus + label {
		&:before {
			border: 1px dotted blue;
		}
	}
`;
