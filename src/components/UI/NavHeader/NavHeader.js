import styled from "styled-components";
import theme from "../../Theme/theme";

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

const NavHeader = () => {
    return (
        <NavHeaderDiv>
            <h1 style={{ color: theme.color.background.secondary }}>
                Melbourne Real Estate Market Map
            </h1>
        </NavHeaderDiv>
    );
};

export default NavHeader;
