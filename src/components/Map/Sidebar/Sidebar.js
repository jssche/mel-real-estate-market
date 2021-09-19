import theme from "../../Theme/theme";
import styled from "styled-components";
import ControlPanel from "./ControlPanel";
import InfoPanel from "./InfoPanel";

const StyledSidebar = styled.div`
    background: ${theme.color.background.sideBar};
    position: fixed;
    top: ${theme.height.navBarDesktop};
    right: 0;
    width: ${theme.width.sideBarWidth};
    height: ${theme.height.mapHeight};
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
    year,
    propertyType,
    salesType,
    dataType,
    panelInfo,
    setPopupInfo,
}) => {
    return (
        <StyledSidebar>
            <ControlPanel
                setYear={setYear}
                setPropertyType={setPropertyType}
                setSalesType={setSalesType}
                setDataType={setDataType}
                year={year}
                propertyType={propertyType}
                salesType={salesType}
                dataType={dataType}
                setPopupInfo={setPopupInfo}
            />
            <InfoPanel panelInfo={panelInfo}></InfoPanel>
        </StyledSidebar>
    );
};

export default Sidebar;
