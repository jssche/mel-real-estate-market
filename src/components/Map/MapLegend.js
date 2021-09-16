import styled from "styled-components";
import theme from "../Theme/theme";
import { currencyConverter } from "../Utils";

const MapLegendWrapper = styled.div`
    background: ${theme.color.background.secondary_alfa};
    position: fixed;
    bottom: 2em;
    width: 20vw;
    left: 1em;
    z-index: 100;
    display: flex;
    flex-direction: column;
    border-style: solid;
    border-width: thin;
    border-color: ${theme.color.text.primary};
    padding: 0.5em;
`;

const LegendSummary = styled.p`
    margin-top: 0;
    margin-bottom: 1em;
`;

const Legend = styled.div``;

const LegendItemWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 0.5em;
`;

const LegendItemColor = styled.div`
    width: 1em;
    height: 1em;
    background: ${(props) => props.color};
`;

const LegendItemName = styled.div`
    margin-left: 1em;
    font-size: 0.8em;
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
        "The " +
        dataTypePrint +
        " of the " +
        salesTypePrint +
        " " +
        propertyTypePrint +
        " in " +
        yearPrint +
        " in Greater Melbourne. "
    );
};

const LegendItem = ({ index, stop, prevStop, dataType }) => {
    let name, prevName;
    if (dataType === "median") {
        name = currencyConverter(stop);
        prevName = currencyConverter(prevStop);
    } else {
        name = Math.round(stop, 0);
        prevName = Math.round(prevStop, 0);
    }

    return (
        <LegendItemWrapper>
            <LegendItemColor color={theme.color.stops[index]} />
            <LegendItemName>{prevName + "-" + name}</LegendItemName>
        </LegendItemWrapper>
    );
};

const MapLegend = ({ year, propertyType, salesType, dataType, stops }) => {
    const summary = genSummary(year, propertyType, salesType, dataType);

    return (
        <MapLegendWrapper>
            <LegendSummary>{summary}</LegendSummary>
            <Legend>
                {stops.map((stop, i) => (
                    <LegendItem
                        key={i}
                        index={i}
                        stop={stop}
                        prevStop={i > 0 ? stops[i - 1] : 0}
                        dataType={dataType}
                    />
                ))}
            </Legend>
        </MapLegendWrapper>
    );
};

export default MapLegend;
