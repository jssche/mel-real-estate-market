import ReactMapGL, {
    NavigationControl,
    Source,
    Layer,
    Popup,
} from "react-map-gl";
import { useState } from "react";
import theme from "../Theme/theme";
import overviewData from "../../data/ProcessedData/mel_polygons_realestate_normed";
import coloring_stops from "../../data/ProcessedData/coloring_stops_normed";
import Sidebar from "./Sidebar/Sidebar";
import styled from "styled-components";
import MapLegend from "./MapLegend";
import { currencyConverter } from "../Utils";

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

const getCursor = ({ isHovering, isDragging }) => {
    return isDragging ? "grabbing" : isHovering ? "pointer" : "default";
};

const Map = () => {
    const [panelInfo, setPanelInfo] = useState(null);
    const [popupInfo, setPopupInfo] = useState(null);
    const [year, setYear] = useState("allyears");
    const [propertyType, setPropertyType] = useState("house");
    const [salesType, setSalesType] = useState("sold");
    const [dataType, setDataType] = useState("median");

    const [viewPort, setviewPort] = useState({
        latitude: -37.8308,
        longitude: 144.9631,
        zoom: 8.5,
    });

    const formLayerStyle = (styleId, stops) => {
        const mapLayerStyle = {
            id: "mapStyle",
            type: "fill",
            paint: {
                "fill-color": {
                    property: styleId,
                    stops: [
                        [stops[0], theme.color.stops[0]],
                        [stops[1], theme.color.stops[1]],
                        [stops[2], theme.color.stops[2]],
                        [stops[3], theme.color.stops[3]],
                        [stops[4], theme.color.stops[4]],
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
            const data = features[0].properties[styleId];
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
                width="70vw"
                maxZoom={12}
                minZoom={8.2}
                height={theme.height.mapHeight}
                mapStyle="mapbox://styles/jssche/cktqycdgr02z01apomuvd83c2"
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
                        tipSize={5}
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
                                    : "Sales Counts (per squared kilometer) "}
                                :
                                {dataType === "median"
                                    ? currencyConverter(popupInfo.data)
                                    : popupInfo.data}
                            </div>
                        </PopupInfo>
                    </Popup>
                )}
                <div
                    style={{
                        width: "2em",
                        position: "absolute",
                        left: 10,
                        top: 10,
                    }}
                >
                    <NavigationControl showCompass={false} />
                </div>
            </ReactMapGL>
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
                setPopupInfo={setPopupInfo}
            />
            <MapLegend
                year={year}
                propertyType={propertyType}
                salesType={salesType}
                dataType={dataType}
                stops={stops}
            />
        </>
    );
};

export default Map;
