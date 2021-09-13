import styled from 'styled-components';

const HamburgerButton = styled.button`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	height: 32px;
	width: 32px;
	background-color: transparent;
	border: none;
	&:hover {
		cursor: pointer;
	}
`;

const HamburgerBar = styled.span`
	width: 32px;
	height: 3px;
	background-color: black;
`;

const SidebarHamberger  = ({ toggleSideBar }) => {
	return (
		<HamburgerButton onClick={toggleSideBar}>
			<HamburgerBar />
			<HamburgerBar />
			<HamburgerBar />
		</HamburgerButton>
	);
};

export default SidebarHamberger;