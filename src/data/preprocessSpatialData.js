import geodata from "../data/ProcessedData/mel_polygons_realestate";
const turf = require("@turf/turf");

// the function calculate the centroids and the size of the polygons
const findSpatialInfo = () => {
    let spatialInfo = {
        centroid: {},
        area: {},
    };
    geodata.features.forEach((feature) => {
        const code = feature.properties.sa3_code16;
        const polygon = feature.geometry;
        const centroid = turf.centroid(polygon);
        const area = Math.round(turf.area(polygon) / 1000000, 0);
        spatialInfo["centroid"][code] = centroid;
        spatialInfo["area"][code] = area;
    });

    const fs = require("fs");
    const data = JSON.stringify(spatialInfo);

    fs.writeFile("spatialData.json", data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
};

findSpatialInfo();
