import React from 'react'
import "../css/Map.css";
import {useState, useMemo, useCallback, useRef} from "react";
import { GoogleMap, LoadScript,  Marker,
    DirectionsRenderer,
    Circle,
    MarkerClusterer } from '@react-google-maps/api';
    
    



const containerStyle = {
    width: '80%',
    height: '100vh'
};

/*
const center = {
  lat: 6.856000,
  lng: 79.911333
}; */

/*type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;*/


function Map() {
    
    const center = useMemo(() => ({lat:6.856000, lng:79.911333 }), []);
    const options = useMemo (
        () => ({
            disableDefaultUI: true,
            clickableIcons: false
        })
    )
  return (
    
    <LoadScript
      googleMapsApiKey="AIzaSyDeYh_ztioenc-59n51MRO77UTceAWV-qI"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        mapContainerClassName="map-container"
        options={options}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
      
    </LoadScript>
  )
}

export default React.memo(Map)