import React from "react";
import { Layer, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";


const Raio = (props) => {
    return(
        <>
        <Source 
            id={`circle ${props.index}`}
            type="geojson" 
            data={props.circle}
        />
        <Layer 
            id={`point ${props.index}`}
            type="fill"
            source={`circle ${props.index}`}
            paint={{
            "fill-color": '#f2780c',
            "fill-outline-color": '#f2780c',
            "fill-opacity": 0.07
            }}
        />
    </>
    );
}

export default Raio;