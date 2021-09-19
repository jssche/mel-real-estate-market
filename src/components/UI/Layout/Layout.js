import styled from "styled-components";
import NavHeader from "../NavHeader/NavHeader";
import theme from "../../Theme/theme";

const StyledLayout = styled.div`
    width: 100%;
    min-height: 100vh;
`;

const MapWrapper = styled.div`
    width: ${theme.width.mapWidth};
    min-height: 100%;
`;

// The layout component serves as a wrapper around the header and the map components.
// It maintains a consistent layout when there are multiple pages.
const Layout = ({ children }) => {
    return (
        <>
            <StyledLayout>
                <NavHeader />
                <MapWrapper>{children}</MapWrapper>
            </StyledLayout>
        </>
    );
};

export default Layout;
