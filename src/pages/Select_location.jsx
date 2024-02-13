import React from "react";
import { useState } from "react";
import { GoogleMap, Marker, LoadScript, StreetViewPanorama } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh"
};

const center = {
  lat: 6.856,
  lng: 79.911333
};

function SelectLocation() {
  const [markerPosition, setMarkerPosition] = useState(center);
  const [locationInput, setLocationInput] = useState("");

  const handleMarkerDrag = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
  };

  const handleLocationSubmit = async () => {
    try {
      const geocoder = new window.google.maps.Geocoder();
      const response = await new Promise((resolve, reject) => {
        geocoder.geocode({ address: locationInput }, (results, status) => {
          if (status === "OK") {
            resolve(results);
          } else {
            reject(status);
          }
        });
       
      });

      if (response.length > 0) {
        const { lat, lng } = response[0].geometry.location;
        setMarkerPosition({ lat: lat(), lng: lng() });
      } else {
        console.log("Location not found");
      }
    } catch (error) {
      console.log("Geocoding error:", error);
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAkqbHdpMj4JY3XF_Wr4Pvot5-jy8Rn3cQ">
      <div>
        <input
          type="text"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
        />
        <button onClick={handleLocationSubmit}>Place Marker</button>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onDragEnd={() => {
          // Handle map drag events here if needed
        }}
        options={
            {
                streetViewControl: false,
                fullscreenControl : false
            }
        }
      >
        <Marker
        position={center}
        draggable={true}
        onDragEnd={handleMarkerDrag}
        visible={true}
        zIndex={100}
        />
        
      </GoogleMap>
    </LoadScript>
  );
}

export default SelectLocation;
