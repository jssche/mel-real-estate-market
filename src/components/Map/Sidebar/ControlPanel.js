import theme from "../../Theme/theme";
import styled from "styled-components";
import { IoHelpCircleOutline } from "react-icons/io5";
import IconWrapper from "../../UI/Help";

const StyledPanel = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 1em;
    height: 36vh;
    overflow: auto;
`;

const PanelItem = styled.div`
    display: flex;
    flex-direction: column;
`;

const ItemHeader = styled.div`
    color: ${theme.color.text.primary};
    font-size: 0.8em;
    padding-bottom: 1.5vh;
`;

const ItemOptions = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 2vh;
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
            : theme.color.text.secondary};
    background-color: transparent;
    font-size: 0.9em;
    color: ${theme.color.text.primary};

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
    setPopupInfo,
}) => {
    return (
        <StyledPanel>
            <IconWrapper>
                <IoHelpCircleOutline
                    title={
                        "Click on the buttons to change the data you want to compare across SA3 regions."
                    }
                />
            </IconWrapper>
            <PanelItem>
                <ItemHeader>Property Type</ItemHeader>
                <ItemOptions>
                    <PanelButton
                        onClick={(e) => {
                            setPropertyType("house");
                            setPopupInfo(null);
                        }}
                        value="house"
                        selected={propertyType}
                    >
                        House
                    </PanelButton>
                    <PanelButton
                        onClick={(e) => {
                            setPropertyType("unit");
                            setPopupInfo(null);
                        }}
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
                        onClick={(e) => {
                            setYear("2019");
                            setPopupInfo(null);
                        }}
                        value="2019"
                        selected={year}
                    >
                        2019
                    </PanelButton>
                    <PanelButton
                        onClick={(e) => {
                            setYear("2020");
                            setPopupInfo(null);
                        }}
                        value="2020"
                        selected={year}
                    >
                        2020
                    </PanelButton>
                    <PanelButton
                        onClick={(e) => {
                            setYear("allyears");
                            setPopupInfo(null);
                        }}
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
                        onClick={(e) => {
                            setSalesType("for_sale");
                            setPopupInfo(null);
                        }}
                        value="for_sale"
                        selected={salesType}
                    >
                        For Sale
                    </PanelButton>
                    <PanelButton
                        onClick={(e) => {
                            setSalesType("sold");
                            setPopupInfo(null);
                        }}
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
                        onClick={(e) => {
                            setDataType("median");
                            setPopupInfo(null);
                        }}
                        value="median"
                        selected={dataType}
                    >
                        Median Price
                    </PanelButton>
                    <PanelButton
                        onClick={(e) => {
                            setDataType("count");
                            setPopupInfo(null);
                        }}
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
