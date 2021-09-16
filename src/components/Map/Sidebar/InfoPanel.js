import styled from "styled-components";
import theme from "../../Theme/theme";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Slide } from "@material-ui/core";

const StyledPanel = styled.div`
    display: flex;
    flex-direction: column;
    border-top-style: solid;
    border-top-width: thin;
    border-top-color: ${theme.color.text.primary};
    width: 100%;
    padding: 1em;
`;

const PanelHeader = styled.div`
    color: ${theme.color.text.primary};
    font-size: 0.8em;
    padding-bottom: 1em;
`;

const items = [
    {
        name: "Random Name #1",
        description: "Probably the most random thing you have ever seen!",
    },
    {
        name: "Random Name #2",
        description: "Hello World!",
    },
];

const CarouselWrapper = styled.div`
    width: 98%;
    margin: auto;

    .MuiPaper-root {
        padding: 0.5em;
        min-height: 28vh;
    }
`;

const CaroselItem = (props) => {
    return (
        <Paper square={true}>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>
        </Paper>
    );
};

const InfoPanel = ({ panelInfo }) => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (event, newtabIndex) => {
        setTabIndex(newtabIndex);
    };
    console.log(tabIndex);

    return (
        <StyledPanel>
            <PanelHeader>
                {panelInfo
                    ? "Area: " + panelInfo.suburbName
                    : "Please select an area on the map"}
            </PanelHeader>
            <Tabs
                value={tabIndex}
                onChange={handleChange}
                centered
                TabIndicatorProps={{
                    style: { background: theme.color.background.primary },
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
                    next={(active, _) => console.log(`at ${active}`)}
                    prev={(active, _) => console.log(`at ${active}`)}
                >
                    {items.map((item, i) => (
                        <CaroselItem key={i} item={item} />
                    ))}
                </Carousel>
            </CarouselWrapper>
        </StyledPanel>
    );
};

export default InfoPanel;
