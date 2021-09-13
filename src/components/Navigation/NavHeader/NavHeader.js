import styled from 'styled-components';
import theme from '../Theme/theme';
import { useState } from 'react';
import SidebarHamberger from '../Sidebar/SidebarHamberger';
import Sidebar from '../Sidebar/Sidebar';
import SidebarCross from '../Sidebar/SidebarCross';


const NavHeaderDiv = styled.div`
	height: ${theme.height.navBarDesktop};
	background: ${theme.color.background.primary};
	z-index: 100;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
    padding: 2em;
    box-sizing: border-box;
`;


const SideBarToggleWrapper = styled.div`
    z-index: 200;
`

const NavHeader = () => {
	const [sideBarShown, setSideBarShown] = useState(true);

	const toggleSideBar = () => {
		setSideBarShown(prevState => !prevState);
	};

	return (
		<NavHeaderDiv>
			<h1>Melbourne Real Estate Market Map</h1>
            <SideBarToggleWrapper>
                {sideBarShown ? (
                    <SidebarCross toggleSideBar={toggleSideBar}>X</SidebarCross>
                ) : <SidebarHamberger toggleSideBar={toggleSideBar} />}
            </SideBarToggleWrapper>
			{sideBarShown ? (
                <Sidebar />
			) : null}
		</NavHeaderDiv>
	);
};

export default NavHeader;