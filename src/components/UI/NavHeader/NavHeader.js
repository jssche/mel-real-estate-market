import styled from "styled-components";
import theme from "../../Theme/theme";

const NavHeaderDiv = styled.div`
    height: ${theme.height.navBarDesktop};
    background: ${theme.color.background.primary};
    z-index: 200;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1vh 1em;
    box-sizing: border-box;
    overflow: hidden;
`;

// The NavHeader component contains the name of the application and it serves as a header.
const NavHeader = () => {
    return (
        <NavHeaderDiv>
            <h1 style={{ color: theme.color.background.sideBar }}>
                Melbourne Real Estate Market Map
            </h1>
        </NavHeaderDiv>
    );
};

export default NavHeader;
