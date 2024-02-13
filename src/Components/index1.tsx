import React from 'react'
import { useLoadScript } from "@react-google-maps/api";
import Map from "./map";

export default function Index1() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDeYh_ztioenc-59n51MRO77UTceAWV-qI",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
  <>
  <Map />
  </>
  ); 
}
