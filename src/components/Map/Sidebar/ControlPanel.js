import theme from "../../Theme/theme";
import styled from "styled-components";

const StyledPanel = styled.div`
    display: flex;
    flex-direction: column;
    border-top-style: solid;
    border-top-width: thin;
    border-top-color: ${theme.color.text.primary};
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
    padding-bottom: 1.5em;
`;

const ItemOptions = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 2em;
`;

const PanelButton = styled.button`
    margin-right: 1em;
    width: auto;
    min-width: 5em;
    padding-bottom: 0.4em;
    border-style: none;
    border-bottom-style: solid;
    border-bottom-color: #dbdbdb;
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
    setRenderLayer,
}) => {
    return (
        <StyledPanel>
            <PanelItem>
                <ItemHeader>Property Type</ItemHeader>
                <ItemOptions>
                    <PanelButton onClick={(e) => setPropertyType("house")}>
                        House
                    </PanelButton>
                    <PanelButton onClick={(e) => setPropertyType("unit")}>
                        Unit
                    </PanelButton>
                </ItemOptions>
            </PanelItem>

            <PanelItem>
                <ItemHeader>Year</ItemHeader>
                <ItemOptions>
                    <PanelButton onClick={(e) => setYear("2019")}>
                        2019
                    </PanelButton>
                    <PanelButton onClick={(e) => setYear("2020")}>
                        2020
                    </PanelButton>
                    <PanelButton onClick={(e) => setYear("allyears")}>
                        All
                    </PanelButton>
                </ItemOptions>
            </PanelItem>

            <PanelItem>
                <ItemHeader>Sales State</ItemHeader>
                <ItemOptions>
                    <PanelButton onClick={(e) => setSalesType("for_sale")}>
                        For Sale
                    </PanelButton>
                    <PanelButton onClick={(e) => setSalesType("sold")}>
                        Sold
                    </PanelButton>
                </ItemOptions>
            </PanelItem>

            <PanelItem>
                <ItemHeader>Data</ItemHeader>
                <ItemOptions>
                    <PanelButton onClick={(e) => setDataType("median")}>
                        Median Price
                    </PanelButton>
                    <PanelButton onClick={(e) => setDataType("count")}>
                        Transaction Count
                    </PanelButton>
                </ItemOptions>
            </PanelItem>

            <PanelItem>
                <ItemOptions>
                    <PanelButton onClick={(e) => setRenderLayer(true)}>
                        Render
                    </PanelButton>
                </ItemOptions>
            </PanelItem>
        </StyledPanel>
    );
};

export default ControlPanel;
