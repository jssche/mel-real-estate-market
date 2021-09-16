import theme from "../../Theme/theme";
import styled from "styled-components";

const StyledPanel = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1em;
`;

const PanelItem = styled.div`
    display: flex;
    flex-direction: column;
`;

const ItemHeader = styled.div`
    color: ${theme.color.text.primary};
    font-size: 0.8em;
    padding-bottom: 1em;
`;

const ItemOptions = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 1.5em;
`;

const PanelButton = styled.button`
    margin-right: 1em;
    width: auto;
    min-width: 5em;
    padding-bottom: 0.4em;
    border-style: none;
    border-bottom-style: solid;
    border-bottom-color: ${(props) =>
        props.selected === props.value
            ? theme.color.background.primary
            : "#dbdbdb"};
    background-color: transparent;
    font-size: 0.9em;

    &:hover {
        border-bottom-color: ${theme.color.background.primary};
        cursor: pointer;
    }
`;

const ControlPanel = ({
    setYear,
    setPropertyType,
    setSalesType,
    setDataType,
    year,
    propertyType,
    salesType,
    dataType,
}) => {
    return (
        <StyledPanel>
            <PanelItem>
                <ItemHeader>Property Type</ItemHeader>
                <ItemOptions>
                    <PanelButton
                        onClick={(e) => setPropertyType("house")}
                        value="house"
                        selected={propertyType}
                    >
                        House
                    </PanelButton>
                    <PanelButton
                        onClick={(e) => setPropertyType("unit")}
                        value="unit"
                        selected={propertyType}
                    >
                        Unit
                    </PanelButton>
                </ItemOptions>
            </PanelItem>

            <PanelItem>
                <ItemHeader>Year</ItemHeader>
                <ItemOptions>
                    <PanelButton
                        onClick={(e) => setYear("2019")}
                        value="2019"
                        selected={year}
                    >
                        2019
                    </PanelButton>
                    <PanelButton
                        onClick={(e) => setYear("2020")}
                        value="2020"
                        selected={year}
                    >
                        2020
                    </PanelButton>
                    <PanelButton
                        onClick={(e) => setYear("allyears")}
                        value="allyears"
                        selected={year}
                    >
                        All
                    </PanelButton>
                </ItemOptions>
            </PanelItem>

            <PanelItem>
                <ItemHeader>Sales State</ItemHeader>
                <ItemOptions>
                    <PanelButton
                        onClick={(e) => setSalesType("for_sale")}
                        value="for_sale"
                        selected={salesType}
                    >
                        For Sale
                    </PanelButton>
                    <PanelButton
                        onClick={(e) => setSalesType("sold")}
                        value="sold"
                        selected={salesType}
                    >
                        Sold
                    </PanelButton>
                </ItemOptions>
            </PanelItem>

            <PanelItem>
                <ItemHeader>Data</ItemHeader>
                <ItemOptions>
                    <PanelButton
                        onClick={(e) => setDataType("median")}
                        value="median"
                        selected={dataType}
                    >
                        Median Price
                    </PanelButton>
                    <PanelButton
                        onClick={(e) => setDataType("count")}
                        value="count"
                        selected={dataType}
                    >
                        Sales Count
                    </PanelButton>
                </ItemOptions>
            </PanelItem>
        </StyledPanel>
    );
};

export default ControlPanel;
