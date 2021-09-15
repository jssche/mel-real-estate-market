import theme from "../../Theme/theme";
import styled from "styled-components";
import ControlPanel from "./ControlPanel";

const StyledSidebar = styled.div`
    background: ${theme.color.background.secondary};
    position: fixed;
    top: ${theme.height.navBarDesktop};
    right: 0;
    width: 30vw;
    height: 92vh;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Sidebar = ({
    setYear,
    setPropertyType,
    setSalesType,
    setDataType,
    setRenderLayer,
}) => {
    return (
        <StyledSidebar>
            <p style={{ padding: "1em" }}>
                Map shows the real estate market in Melbourne
            </p>
            <ControlPanel
                setYear={setYear}
                setPropertyType={setPropertyType}
                setSalesType={setSalesType}
                setDataType={setDataType}
                setRenderLayer={setRenderLayer}
            />
        </StyledSidebar>
    );
};

export default Sidebar;
