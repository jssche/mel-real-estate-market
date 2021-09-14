import ReactMapGL, { NavigationControl, Source, Layer } from "react-map-gl";
import { useState } from "react";
import theme from "../Navigation/Theme/theme";
import ControlPanel from "./ControlPanel/ControlPanel";
import geojson2 from "../../data/ProcessedData/mel_polygons0";

const navControlStyle = {
    left: 10,
    top: 10,
};

const layerStyle1 = {
    id: "suburbs_polygon",
    type: "fill",
    paint: {
        "fill-color": theme.color.accent,
        "fill-opacity": 0.6,
        "fill-outline-color": theme.color.background.secondary,
    },
    filter: [
        "any",
        ["==", "sa3_code16", "20601"],
        ["==", "sa3_code16", "20901"],
    ],
};

const layerStyle2 = {
    id: "suburbs_polygon_2",
    type: "fill",
    paint: {
        "fill-color": theme.color.primary,
        "fill-opacity": 0.6,
        "fill-outline-color": theme.color.background.secondary,
    },
    filter: [
        "any",
        ["==", "sa3_code16", "20803"],
        ["==", "sa3_code16", "21303"],
    ],
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
        console.log(e.features[0].properties["sa3_name16"]);
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
                <Source type="geojson" data={geojson2}>
                    <Layer {...layerStyle1} />
                    <Layer {...layerStyle2} />
                </Source>
                <NavigationControl style={navControlStyle} />
                <ControlPanel />
            </ReactMapGL>
        </>
    );
}

export default Map;
