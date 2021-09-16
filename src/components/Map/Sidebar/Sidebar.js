import theme from "../../Theme/theme";
import styled from "styled-components";
import ControlPanel from "./ControlPanel";
import InfoPanel from "./InfoPanel";

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

const genSummary = (year, propertyType, salesType, dataType) => {
    let yearPrint;
    let propertyTypePrint;
    let dataTypePrint;
    let salesTypePrint;

    switch (year) {
        case "2019":
            yearPrint = "2019";
            break;
        case "2020":
            yearPrint = "2020";
            break;
        default:
            yearPrint = "2019 and 2020";
    }

    switch (propertyType) {
        case "unit":
            propertyTypePrint = "units";
            break;
        default:
            propertyTypePrint = "houses";
    }

    switch (salesType) {
        case "for_sale":
            salesTypePrint = "for sale";
            break;
        default:
            salesTypePrint = "sold";
    }

    switch (dataType) {
        case "count":
            dataTypePrint = "counts";
            break;
        default:
            dataTypePrint = "median price";
    }
    return (
        "Map is showing the " +
        dataTypePrint +
        " of the " +
        salesTypePrint +
        " " +
        propertyTypePrint +
        " in " +
        yearPrint +
        " in the Great Melbourne Area. "
    );
};

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
}) => {
    const summary = genSummary(year, propertyType, salesType, dataType);

    return (
        <StyledSidebar>
            <p style={{ padding: "1em" }}>{summary}</p>
            <ControlPanel
                setYear={setYear}
                setPropertyType={setPropertyType}
                setSalesType={setSalesType}
                setDataType={setDataType}
                year={year}
                propertyType={propertyType}
                salesType={salesType}
                dataType={dataType}
            />
            <InfoPanel panelInfo={panelInfo}></InfoPanel>
        </StyledSidebar>
    );
};

export default Sidebar;
