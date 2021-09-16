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
import styled from "styled-components";

const navControlStyle = {
    left: 10,
    top: 10,
};

const getCursor = ({ isHovering, isDragging }) => {
    return isDragging ? "grabbing" : isHovering ? "pointer" : "default";
};

const PopupInfo = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    width: auto;
    height: auto;
    font-size: 1em;

    div + div {
        margin-top: 0.5em;
    }
`;

const Map = () => {
    const [panelInfo, setPanelInfo] = useState(null);
    const [popupInfo, setPopupInfo] = useState(null);
    const [year, setYear] = useState("allyears");
    const [propertyType, setPropertyType] = useState("house");
    const [salesType, setSalesType] = useState("sold");
    const [dataType, setDataType] = useState("median");

    const [viewPort, setviewPort] = useState({
        latitude: -37.930825,
        longitude: 144.9631,
        zoom: 8,
    });

    const formLayerStyle = (styleId, stops) => {
        const mapLayerStyle = {
            id: "mapStyle",
            type: "fill",
            paint: {
                "fill-color": {
                    property: styleId,
                    stops: [
                        [stops[0], theme.color.stops[20]],
                        [stops[1], theme.color.stops[40]],
                        [stops[2], theme.color.stops[60]],
                        [stops[3], theme.color.stops[80]],
                        [stops[4], theme.color.stops[100]],
                    ],
                },
                "fill-outline-color": theme.color.background.primary,
                "fill-opacity": 0.6,
            },
        };
        return mapLayerStyle;
    };

    const dataName = salesType + "_" + dataType;
    const stops = coloring_stops[propertyType][year][dataName];
    const styleId = propertyType + "_" + year + "_" + dataName;
    let mapLayerStyle = formLayerStyle(styleId, stops);

    const handleOnClick = (e) => {
        if (e.features[0]) {
            const { features } = e;
            const selectedSuburb = features[0].properties["sa3_name16"];
            const selectedSuburbCode = features[0].properties["sa3_code16"];
            const data = Math.round(features[0].properties[styleId], 0);
            setPopupInfo({
                name: selectedSuburb,
                data: data,
                longitude: e.lngLat[0],
                latitude: e.lngLat[1],
            });
            setPanelInfo({
                suburbCode: selectedSuburbCode,
                suburbName: selectedSuburb,
            });
        }
    };

    return (
        <>
            <ReactMapGL
                {...viewPort}
                width="100%"
                height={theme.height.mapHeight}
                mapStyle="mapbox://styles/jssche/cktm9ilu59vx819qtpgfs5t3z"
                mapboxApiAccessToken={
                    "pk.eyJ1IjoianNzY2hlIiwiYSI6ImNrdGljdDgycDExMGMyd3FucXhzaGs1OWEifQ.wXhDDu4cd7dgddsBs7c6cA"
                }
                // mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewportChange={(nextViewport) => setviewPort(nextViewport)}
                onClick={handleOnClick}
                getCursor={getCursor}
                interactiveLayerIds={["mapStyle"]}
            >
                <Source type="geojson" data={overviewData}>
                    <Layer
                        {...mapLayerStyle}
                        beforeId={"settlement-subdivision-label"}
                    />
                </Source>
                {popupInfo && (
                    <Popup
                        tipSize={3}
                        anchor="bottom"
                        longitude={popupInfo.longitude}
                        latitude={popupInfo.latitude}
                        closeOnClick={true}
                        onClose={setPopupInfo}
                    >
                        <PopupInfo>
                            <div>Area: {popupInfo.name}</div>
                            <div>
                                {dataType === "median"
                                    ? "Median Price"
                                    : "Transaction Counts"}
                                : {popupInfo.data}
                            </div>
                        </PopupInfo>
                    </Popup>
                )}
                <div style={{ width: "2em" }}>
                    <NavigationControl style={navControlStyle} />
                </div>
                <Sidebar
                    setYear={setYear}
                    setPropertyType={setPropertyType}
                    setSalesType={setSalesType}
                    setDataType={setDataType}
                    year={year}
                    propertyType={propertyType}
                    salesType={salesType}
                    dataType={dataType}
                    panelInfo={panelInfo}
                />
            </ReactMapGL>
        </>
    );
};

export default Map;
