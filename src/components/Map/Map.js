import ReactMapGL, { NavigationControl, Source, Layer } from "react-map-gl";
import { useState } from "react";
import theme from "../Navigation/Theme/theme";
import ControlPanel from "./ControlPanel/ControlPanel";
import overviewData from "../../data/ProcessedData/mel_polygons_realestate";
import coloring_stops from "../../data/ProcessedData/coloring_stops";

const navControlStyle = {
    left: 10,
    top: 10,
};

const stops = coloring_stops["house"]["allYears"]["sold_count"];

const layerStyle = {
    id: "house_allyears_sold_count",
    type: "fill",
    paint: {
        "fill-color": {
            property: "house_allyears_sold_count",
            stops: [
                [stops[0], "#3288bd"],
                [stops[1], "#66c2a5"],
                [stops[2], "#abdda4"],
                [stops[3], "#e6f598"],
                [stops[4], "#ffffbf"],
            ],
        },
        "fill-outline-color": theme.color.background.secondary,
        "fill-opacity": 0.8,
    },
};

function Map() {
    const [popupInfo, setPopupInfo] = useState(null);

    const [viewPort, setviewPort] = useState({
        latitude: -37.930825,
        longitude: 145.146457,
        zoom: 10,
        width: "100%",
        height: theme.height.mapHeight,
        mapStyle: "mapbox://styles/mapbox/light-v10",
    });

    const handleOnClick = (e) => {
        console.log(e.features[0].properties["house_allyears_sold_count"]);
        const {
            features,
            srcEvent: { offsetX, offsetY },
        } = e;
        const selectedSuburb = features[0].properties["sa3_name16"];
        const selectedSuburbCode = features[0].properties["sa3_code16"];
        setPopupInfo(
            selectedSuburb
                ? {
                      suburbCode: selectedSuburb,
                  }
                : null
        );
    };

    return (
        <>
            <ReactMapGL
                {...viewPort}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewportChange={(nextViewport) => setviewPort(nextViewport)}
                onClick={handleOnClick}
            >
                <Source type="geojson" data={overviewData}>
                    {/* <Layer {...layerStyle1} /> */}
                    {/* <Layer {...layerStyle2} /> */}
                    <Layer {...layerStyle} />
                </Source>
                <NavigationControl style={navControlStyle} />
                <ControlPanel />
            </ReactMapGL>
        </>
    );
}

export default Map;
