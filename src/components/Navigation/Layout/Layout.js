import styled from "styled-components";
import NavHeader from "../NavHeader/NavHeader";

const StyledLayout = styled.div`
    width: 100%;
    min-height: 100vh;
`;

const MapWrapper = styled.div`
    width: 100%;
    min-height: 100%;
`;

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
