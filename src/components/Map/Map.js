import ReactMapGL, {
    NavigationControl,
    Source,
    Layer,
    Popup,
} from "react-map-gl";
import { useState } from "react";
import theme from "../Theme/theme";
import overviewData from "../../data/ProcessedData/mel_polygons_realestate";
import coloring_stops from "../../data/ProcessedData/coloring_stops";
import Sidebar from "./Sidebar/Sidebar";

const navControlStyle = {
    left: 10,
    top: 10,
};

const getCursor = ({ isHovering, isDragging }) => {
    return isDragging ? "grabbing" : isHovering ? "pointer" : "default";
};

const formLayerStyle = (year, propertyType, salesType, dataType) => {
    const dataName = salesType + "_" + dataType;
    const stops = coloring_stops[propertyType][year][dataName];

    const styleId = propertyType + "_" + year + "_" + dataName;
    const layerStyle = {
        id: "mapStyle",
        type: "fill",
        paint: {
            "fill-color": {
                property: styleId,
                stops: [
                    [stops[0], "#3288bd"],
                    [stops[1], "#66c2a5"],
                    [stops[2], "#abdda4"],
                    [stops[3], "#e6f598"],
                    [stops[4], "#ffffbf"],
                ],
            },
            "fill-outline-color": theme.color.background.secondary,
            "fill-opacity": 0.6,
        },
    };
    return layerStyle;
};

const Map = () => {
    const [panelInfo, setPanelInfo] = useState(null);
    const [popupInfo, setPopupInfo] = useState(null);
    const [year, setYear] = useState(null);
    const [propertyType, setPropertyType] = useState(null);
    const [salesType, setSalesType] = useState(null);
    const [dataType, setDataType] = useState(null);
    const [emptyMap, setEmptyMap] = useState(true);
    const [renderLayer, setRenderLayer] = useState(false);
    // const [mapLayerStyle, setMapLayerStyle] = useState(null);

    const [viewPort, setviewPort] = useState({
        latitude: -37.930825,
        longitude: 144.9631,
        zoom: 8,
        width: "100%",
        height: theme.height.mapHeight,
        mapStyle: "mapbox://styles/mapbox/light-v10",
    });

    const emptyMapLayerStyle = {
        id: "mapStyle",
        type: "fill",
        paint: {
            "fill-color": "transparent",
            "fill-outline-color": theme.color.primary,
            "fill-opacity": 1,
        },
    };

    const handleOnClick = (e) => {
        if (e.features[0]) {
            const { features } = e;
            const selectedSuburb = features[0].properties["sa3_name16"];
            const selectedSuburbCode = features[0].properties["sa3_code16"];
            console.log(selectedSuburb);
            setPopupInfo({});
            setPanelInfo({
                suburbCode: selectedSuburbCode,
                suburbName: selectedSuburb,
            });
        }
    };

    let mapLayerStyle = null;

    if (renderLayer) {
        if (emptyMap) {
            setEmptyMap(false);
        }
        // setRenderLayer(false);
        mapLayerStyle = formLayerStyle(year, propertyType, salesType, dataType);
    }

    return (
        <>
            <ReactMapGL
                {...viewPort}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewportChange={(nextViewport) => setviewPort(nextViewport)}
                onClick={handleOnClick}
                getCursor={getCursor}
                interactiveLayerIds={["mapStyle"]}
            >
                <Source type="geojson" data={overviewData}>
                    {emptyMap ? (
                        <Layer {...emptyMapLayerStyle} />
                    ) : renderLayer ? (
                        <Layer {...mapLayerStyle} />
                    ) : null}
                </Source>
                <NavigationControl style={navControlStyle} />
                <Sidebar
                    setYear={setYear}
                    setPropertyType={setPropertyType}
                    setSalesType={setSalesType}
                    setDataType={setDataType}
                    setRenderLayer={setRenderLayer}
                />
            </ReactMapGL>
        </>
    );
};

export default Map;
