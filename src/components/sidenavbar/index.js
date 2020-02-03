import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import * as colors from '../../colors';
import ArrowIcon from '../../images/arrow-icon.png';
import SearchIcon from '../../images/search-icon-white.png';
import timesIcon from '../../images/times.png';

export default function SideNavBar({ isOpen, setIsOpen }) {
	return (
		<SideNavBarCont className={isOpen && 'slide'}>
			{/* Page Links */}
			<Close src={timesIcon} alt="Burger Menu" onClick={() => setIsOpen(false)} />
			<SideNavMainLink className="menu_nav_link main_nav_link" to="/" activeClassName="active" exact>
				Wesley
				<NavIcon arrow>
					<img src={ArrowIcon} alt="Arrow Down" />
				</NavIcon>
			</SideNavMainLink>
			<SideNavMainLink className="menu_nav_link" to="/discover" activeClassName="active">
				Discover
				<NavIcon search>
					<img src={SearchIcon} alt="Search Icon" />
				</NavIcon>
			</SideNavMainLink>
			{/* Headers */}
			<SideNavHeader>
				<HeaderText>Watched</HeaderText>
			</SideNavHeader>
			<NavLink className="menu_nav_link" to="/watched/movies" activeClassName="active">
				Movies
			</NavLink>
			<NavLink className="menu_nav_link" to="/watched/tv-shows" activeClassName="active">
				TV Shows
			</NavLink>
			<SideNavHeader>
				<HeaderText>Saved</HeaderText>
			</SideNavHeader>
			<NavLink className="menu_nav_link" to="/saved/movies" activeClassName="active">
				Movies
			</NavLink>
			<NavLink className="menu_nav_link" to="/saved/tv-shows" activeClassName="active">
				TV Shows
			</NavLink>
		</SideNavBarCont>
	);
}

const SideNavBarCont = styled.div`
	position: fixed;
	z-index: 9;
	width: 260px;
	height: 100%;
	background-color: ${colors.sideNavBar};
	display: none;
	&.slide {
		display: inline;
	}
`;

const SideNavMainLink = styled(Link)`
	position: relative;
	display: block;
	padding: 25px 35px;
	font-size: 1.6em;
	font-weight: 700;
	color: white;
	display: flex;
	justify-content: space-between;
	transition: all 0.3s;
	&:hover {
		background-color: ${colors.primaryColor};
	}
	&.active {
		background-color: ${colors.primaryColor};
	}
`;

const NavIcon = styled.div``;

const SideNavHeader = styled.div`
	padding: 25px 0 0 35px;
	font-size: 1.6em;
	font-weight: 700;
	color: white;
`;

const HeaderText = styled.div`
	padding-bottom: 25px;
	border-bottom: 1.5px solid ${colors.dividerColor};
	margin-bottom: 25px;
`;

const NavLink = styled(Link)`
	display: block;
	padding: 0 35px 20px 35px;
	font-size: 1.2em;
	transition: color 0.3s;
	color: ${colors.dividerColor};
	&:hover {
		color: ${colors.primaryColor};
	}
	&.active {
		color: ${colors.primaryColor};
	}
`;

const Close = styled.img`
	width: 30px;
	height: 30px;
	position: absolute;
	top: 20px;
	right: -50px;
	cursor: pointer;
	@media (min-width: 960px) {
		display: none;
	}
`;
