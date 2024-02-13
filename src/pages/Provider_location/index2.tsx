import React from 'react'
import { useLoadScript } from "@react-google-maps/api";
import Map2 from './load_map';

// const libraries = ["places"] as const ;  
const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"];

export default function Index2() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDeYh_ztioenc-59n51MRO77UTceAWV-qI",
    libraries: libraries
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
  <>
  <Map2 />
  </>
  ); 
}
