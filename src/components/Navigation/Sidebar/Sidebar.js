import theme from "../Theme/theme";
import styled from "styled-components";

const StyledNav = styled.nav`
    background: ${theme.color.background.secondary};
    position: fixed;
    top: 0;
    right: 0;
    width: 20vw;
    height: 100vh;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 8%;
`;

const Sidebar = () => {
    return <StyledNav></StyledNav>;
};

export default Sidebar;
