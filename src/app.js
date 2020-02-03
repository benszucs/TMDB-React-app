import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import SideNavBar from './components/sidenavbar';
import './css/app.css';
import burgerIcon from './images/bars-solid.png';
import Discover from './pages/discover';

export default function App({ props }) {
	// State of the sidebar 
	const [isOpen, setIsOpen] = React.useState(true);

	// Custom react hook to check if the sidebar should be visible or not depending on screen width
	React.useEffect(() => {
		const debouncedHandleResize = debounce(function handleResize() {
			const width = window.innerWidth;
			// Set the isOpen state according to the size of the screen
			if (width >= 960) setIsOpen(() => true);
			if (width <= 960) setIsOpen(() => false);
		}, 200);

		// Call function to run on initial render
		debouncedHandleResize();
		// Add event listener to window to run function on resize
		window.addEventListener('resize', debouncedHandleResize);

		return _ => {
			// Remove event handler on dismount
			window.removeEventListener('resize', debouncedHandleResize);
		};
	}, []);

	return (
		<Router>
			<PageContainer>
				<SideNavBar {...props} isOpen={isOpen} setIsOpen={setIsOpen} />
				<ContentWrapper className={isOpen && 'open'}>
					<MobileHeader>
						<img src={burgerIcon} alt="Burger Menu" onClick={() => setIsOpen(!isOpen)} />
						<h1>Discover</h1>
					</MobileHeader>
					<Switch>
						<Route path="/discover" component={Discover} {...props} />
					</Switch>
				</ContentWrapper>
			</PageContainer>
		</Router>
	);
}

// Debounce funtion
function debounce(fn, ms) {
	let timer;
	return _ => {
		clearTimeout(timer);
		timer = setTimeout(_ => {
			timer = null;
			fn.apply(this, arguments);
		}, ms);
	};
}

// Styled components
const ContentWrapper = styled.main`
	padding-left: 0;
	@media (min-width: 960px) {
		padding-left: 260px;
	}
`;

const PageContainer = styled.main`
	overflow-x: hidden;
	position: relative;
`;

const MobileHeader = styled.div`
	margin: 45px 0 0 45px;
	display: flex;
	align-items: center;
	@media (min-width: 960px) {
		display: none;
	}

	& > img {
		width: 30px;
		height: 30px;
		margin-right: 15px;
		cursor: pointer;
	}
`;
