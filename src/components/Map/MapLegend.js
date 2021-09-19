import styled from "styled-components";
import theme from "../Theme/theme";
import { currencyConverter } from "../Utils";

const MapLegendWrapper = styled.div`
    background: ${theme.color.background.legend};
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

    a:link {
        color: ${theme.color.text.primary};
    }

    a:visited {
        color: ${theme.color.text.primary};
    }
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

// a function that generates a data summary
//  Input: year(2019, 2020, all), property type(house, unit), salses type(for sale, sold), and data type(price, count)
//  Output: string, a summary of the data that are being displayed in the map
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
            dataTypePrint = "average per-squared-kilometer counts";
            break;
        default:
            dataTypePrint = "average median price";
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

// a function that generates legend entries
// Input: index, current stop, previous stop, data type(price, count)
// Output: react component, an entry in the legend
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

//  athe map Lengend component contains data summary, data srouce, and legend
const MapLegend = ({ year, propertyType, salesType, dataType, stops }) => {
    const summary = genSummary(year, propertyType, salesType, dataType);

    return (
        <MapLegendWrapper>
            <LegendSummary>{summary}</LegendSummary>
            <LegendSummary>
                Data Source:
                <a href="https://www.apm.com.au/" target="_blank">
                    Australian Property Monitors
                </a>
            </LegendSummary>
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
