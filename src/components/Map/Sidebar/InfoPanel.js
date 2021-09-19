import styled from "styled-components";
import theme from "../../Theme/theme";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import IconWrapper from "../../UI/Help";
import { IoHelpCircleOutline } from "react-icons/io5";
import for_sale_count_house from "../../../data/ProcessedData/for_sale_count_timeline_house";
import for_sale_count_unit from "../../../data/ProcessedData/for_sale_count_timeline_unit";
import for_sale_median_house from "../../../data/ProcessedData/for_sale_timeline_house";
import for_sale_median_unit from "../../../data/ProcessedData/for_sale_timeline_unit";
import sold_count_house from "../../../data/ProcessedData/sold_count_timeline_house";
import sold_count_unit from "../../../data/ProcessedData/sold_count_timeline_unit";
import sold_median_house from "../../../data/ProcessedData/sold_timeline_house";
import sold_median_unit from "../../../data/ProcessedData/sold_timeline_unit";

const StyledPanel = styled.div`
    display: flex;
    flex-direction: column;
    border-top-style: solid;
    border-top-width: thin;
    border-top-color: ${theme.color.text.primary};
    width: 100%;
    padding: 1em;
`;

const CarouselWrapper = styled.div`
    width: 98%;
    margin: auto;

    .MuiPaper-root {
        padding: 0.5em;
        padding-top: 1em;
        height: 40vh;
        background-color: ${theme.color.background.sideBar};
    }

    .MuiPaper-elevation1 {
        box-shadow: none;
    }
`;

const genChartData = (propertyType, dataType, suburbCode) => {
    const months = [...Array(12).keys()];
    const years = ["2019", "2020"];
    let labels = [];
    years.forEach((year) => {
        months.forEach((month) => {
            labels.push(year + "-" + (month + 1).toString());
        });
    });

    let for_sale_history;
    let sold_history;
    if (propertyType === "house") {
        if (dataType === "median") {
            for_sale_history = for_sale_median_house[suburbCode];
            sold_history = sold_median_house[suburbCode];
        } else if (dataType === "count") {
            for_sale_history = for_sale_count_house[suburbCode];
            sold_history = sold_count_house[suburbCode];
        }
    } else if (propertyType === "unit") {
        if (dataType === "median") {
            for_sale_history = for_sale_median_unit[suburbCode];
            sold_history = sold_median_unit[suburbCode];
        } else if (dataType === "count") {
            for_sale_history = for_sale_count_unit[suburbCode];
            sold_history = sold_count_unit[suburbCode];
        }
    }

    const data = {
        labels: labels,
        datasets: [
            {
                label: "For Sale",
                data: for_sale_history,
                borderColor: theme.color.primary,
                backgroundColor: theme.color.primary,
            },
            {
                label: "Sold",
                data: sold_history,
                borderColor: theme.color.secondary,
                backgroundColor: theme.color.secondary,
            },
        ],
    };

    return data;
};

const genItems = (tabIndex, suburbCode, suburbName) => {
    let propertyType;

    tabIndex === 0 ? (propertyType = "House") : (propertyType = "Unit");
    const items = [
        {
            title: propertyType + " Median Price in " + suburbName,
            chartData: genChartData(
                propertyType.toLowerCase(),
                "median",
                suburbCode
            ),
        },
        {
            title: propertyType + " Sales Count in " + suburbName,
            chartData: genChartData(
                propertyType.toLowerCase(),
                "count",
                suburbCode
            ),
        },
    ];
    return items;
};

const CaroselItem = (props) => {
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {},
                title: {},
            },
            y: {
                grid: {},
                ticks: {},
                title: {},
            },
        },
        animation: {},
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: props.item.title,
                position: "top",
            },
            tooltip: {
                displayColors: false,
                titleAlign: "center",
                bodyAlign: "center",
                yAlign: "bottom",
            },
        },
    };

    return (
        <Paper square={true}>
            <Line
                data={props.item.chartData}
                width={"auto"}
                height={"100%"}
                options={options}
            />
        </Paper>
    );
};

const InfoPanel = ({ panelInfo }) => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (event, newtabIndex) => {
        setTabIndex(newtabIndex);
    };

    let items;
    if (panelInfo) {
        items = genItems(tabIndex, panelInfo.suburbCode, panelInfo.suburbName);
    }

    return (
        <StyledPanel>
            {!panelInfo ? (
                <div>
                    Please select a region on the map to view the market
                    history.
                </div>
            ) : (
                <>
                    <IconWrapper>
                        <IoHelpCircleOutline
                            title={
                                "Click on the map to view the market history of the selected region."
                            }
                        />
                    </IconWrapper>
                    <Tabs
                        value={tabIndex}
                        onChange={handleChange}
                        centered
                        TabIndicatorProps={{
                            style: {
                                background: theme.color.background.primary,
                            },
                        }}
                    >
                        <Tab label="House" />
                        <Tab label="Unit" />
                    </Tabs>
                    <CarouselWrapper>
                        <Carousel
                            autoPlay={false}
                            animation={"slide"}
                            navButtonsProps={{
                                style: { width: "0.5em", height: "0.5em" },
                            }}
                        >
                            {items.map((item, i) => (
                                <CaroselItem key={i} item={item} />
                            ))}
                        </Carousel>
                    </CarouselWrapper>
                </>
            )}
        </StyledPanel>
    );
};

export default InfoPanel;
