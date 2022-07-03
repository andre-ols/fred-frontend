import React, { useState } from "react";
import MapGL, { Layer, Source, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import data from '../geojson/vitoria_da_conquista';  
import * as turf from '@turf/turf';
import marker from '../assets/marker.png';
import Raio from '../components/Raio';

const Map = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { lat, lng } = user.addresses;
    const [ circles ] = useState([
      turf.circle([lng,lat], 1, {steps: 25, units: 'kilometers'}),
      turf.circle([lng,lat], 2, {steps: 25, units: 'kilometers'}),
      turf.circle([lng,lat], 3, {steps: 25, units: 'kilometers'}),
      turf.circle([lng,lat], 4, {steps: 25, units: 'kilometers'}),
      turf.circle([lng,lat], 5, {steps: 25, units: 'kilometers'}),
    ]);

    const [state, setState] = useState({
        viewport: {
          latitude: lat,
          longitude: lng,
          zoom: 12,
          bearing: 0,
          pitch: 0
        }
      });


    return (
        <MapGL
        style={{ position: 'absolute', left: 0, top: 0 }}
        width={'100vw'}
        height={'100vh'}
        {...state.viewport}
        bearing ={0}
        pitch={0}
        //mapStyle={'mapbox://styles/andreols/ckpx3uwep0xqt17o6ap5l6byl'}
        mapboxApiAccessToken={'pk.eyJ1IjoiYW5kcmVvbHMiLCJhIjoiY2tweDNubWRnMDJydTJxbW1pN2VyN3B5ZiJ9.S_DE_FUv0urQsWfEwoDG1A'}
        onViewportChange={ viewport => setState({ viewport }) }
      >
        <Marker latitude={lat} longitude={lng} offsetLeft={-24} offsetTop={-48}>
        <img src={marker} alt='marker' />
        </Marker>
          <Source 
            id="vitoria da conquista" 
            type="geojson" 
            data={data}
          />
          <Layer
          className="area"
          id="point-blip"
          type="fill"
          source="vitoria da conquista"
          paint={{
            "fill-color": '#000',
            "fill-opacity": 0.1,
          }}
        />
        { circles.map((circle, index) => <Raio circle={circle} key={index} index={index} />) }
      </MapGL>
    );
}

export default Map;