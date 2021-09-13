import ReactMapGL, { NavigationControl } from "react-map-gl";
import { useState } from "react";
import theme from "../Navigation/Theme/theme";

const navControlStyle = {
    left: 10,
    top: 10,
};

function Map() {
    const [viewPort, setviewPort] = useState({
        latitude: -37.930825,
        longitude: 145.146457,
        zoom: 10,
        width: "100%",
        height: theme.height.mapHeight,
        mapStyle: "mapbox://styles/mapbox/light-v10",
    });

    return (
        <>
            <ReactMapGL
                {...viewPort}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                onViewportChange={(nextViewport) => setviewPort(nextViewport)}
            >
                <NavigationControl style={navControlStyle} />
            </ReactMapGL>
        </>
    );
}

export default Map;
