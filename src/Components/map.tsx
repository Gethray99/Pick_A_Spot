import * as React from 'react';
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  LoadScript,
} from "@react-google-maps/api";
import "../css/global.css";
import Places from "./places";
import Distance from "./distance";
import app from '../firebase-config';
import { getDatabase, ref, set, get, onValue, off, update } from 'firebase/database';
import { Link } from 'react-router-dom';



type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const generateHouses = (tableData: Array<any>): Array<LatLngLiteral> => {
 
  const _houses: Array<LatLngLiteral> = [];
  for (let i = 0; i < tableData.length; i++) {
    _houses.push({
      lat: Number(tableData[i].latitude),
      lng: Number(tableData[i].longtitude)
    });
    console.log(tableData[i].latitude+" "+tableData[i].longtitude);
  }
  return _houses;
};
 


export default function Map() {

  const [ava_spot, setAvaSpot] = useState("");
  const [Provider, setProvider] = useState("");
  const [Rate, setRate ] = useState("");
  const [selectedLocation, setselectedLocation] = useState(null);
  const [button_select,setButton] = useState("");
  const [phone,setPhone] = useState("");

  const [office, setOffice] = useState<LatLngLiteral>();
    const [directions, setDirections] = useState<DirectionsResult>();
    // useState<DirectionsResult>();useState<DirectionsResult | null>(null)
    const mapRef = useRef<GoogleMap>();
    const center = useMemo<LatLngLiteral>(
        () => ({ lat:6.856000, lng:79.911333}),
        []);
    const options = useMemo<MapOptions>(
            () => ({
              disableDefaultUI: true,
              clickableIcons: false,
            }),
            []
          );
       

          const [tableData, setTableData] = useState([]);
  const [db, setDb] = useState(null);

  useEffect(() => {
    const dbInstance = getDatabase(app);
    setDb(dbInstance);
  }, []);

  useEffect(() => {
    if (db) {
      const dataRef = ref(db, 'Location');
      const fetchData = (snapshot) => {
        const data = snapshot.val();
        const dataArray = [];
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            dataArray.push({
              username: key,
              ...data[key]
            });
          }
        }
        setTableData(dataArray);
      };

      onValue(dataRef, fetchData);

      return () => {
        off(dataRef, fetchData);
      };
    }
  }, [db]);

  const houses = useMemo(() => generateHouses(tableData), [tableData]);

          
  const onLoad = useCallback((map) => (mapRef.current = map), []);
//const houses = useMemo(() => generateHouses(center),[center]);



  const fetchDirections = (house: LatLngLiteral) => {

    if (!office) return;
  
    
     
     // console.log("house variable :" + select_househouse);
    
    for(let i=0;i<tableData.length;i++){
      //console.log("from tabledata "+Number(tableData[i].latitude));
      if(house.lat === Number(tableData[i].latitude) ){
        //console.log("mathced");
        
        setAvaSpot(tableData[i].available);
        setProvider(tableData[i].username);
        setRate(tableData[i].rate);
        setPhone(tableData[i].phone);
  
      }
  
    }
    
  
      const service = new google.maps.DirectionsService();
        
    service.route(
      {
        origin: house,
        destination: office,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
          
        }
      }
      
      
    );
      setselectedLocation(null);
      
    };


  

    
  
  const Bookspot = () => {
    console.log("before selecting "+ava_spot);
    setAvaSpot(ava_spot-1);
    console.log("Provider name "+Provider);
    const dbInstance = getDatabase(app);
    setDb(dbInstance);


    update(ref(db,'Location/'+Provider),
        {
            //Phonenumber: data.phone,
            available : ava_spot-1
        })
        .then(()=> {alert('Booking is Successful')})
        .catch((error)=> {alert("Error occured, details: "+error)});
        //console.log("after selecting "+ava_spot);
        setButton("True");
  }

  const Cancelspot = () => {
    console.log("before selecting "+ava_spot);
    setAvaSpot(ava_spot+1);
    console.log("Provider name "+Provider);
    const dbInstance = getDatabase(app);
    setDb(dbInstance);


    update(ref(db,'Location/'+Provider),
        {
            //Phonenumber: data.phone,
            available : ava_spot+1
        })
        .then(()=> {alert('Booking Canceled successfully')})
        .catch((error)=> {alert("Error occured, details: "+error)});
        //console.log("after selecting "+ava_spot);
        setButton("True");
  }

  const Refresh = () => {
    setDirections(null);

  }
  
  


  return (
    <div className="container">
        <div className="controls">
            <Link to="/"><button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">Log Out</button></Link>
            <br />
            {/* <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center" onClick={Refresh}>Refresh</button> */}
            <h1 className="h3">Need a spot?</h1>
            <Places 
            setOffice={(position) => {
                setOffice(position);
                mapRef.current?.panTo(position);
            }}
                />

        {!office && <p className="h4">Enter the destination you want to go.</p>}
        <br />
        {selectedLocation && <p>available spots <span className="highlight">{ava_spot}</span></p>}
        <br />
        {directions && <Distance leg={directions.routes[0].legs[0]} />}
        {selectedLocation && <p>Provider will charge <span className="highlight">Rs.{Rate}</span> per hour. <br /> Provider name : {Provider} <br /> Proviver Phone number : {phone}</p>}
        <br />
        {selectedLocation && <button id="bookspot" className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3" onClick={Bookspot}>Book the spot</button>}
        <br /><br />
        
        {button_select && (
          <button className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3" onClick={() => {setselectedLocation(null); Cancelspot() }}>Cancel the spot</button>  
        )}
        </div>
        <div className="map" >
        <GoogleMap
          zoom={15}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
        
 {selectedLocation &&(
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976D2",
                  strokeWeight: 5,
                },
              }}
            />
          )}

          

        {office && (
            <>
            <Marker 
            position={office} 
        icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
        />
        
        <MarkerClusterer>
                {(clusterer) =>
                  houses.map((house) => (
                    <Marker
                      key={house.lat}
                      position={house}
                      clusterer={clusterer}
                      onClick={() => {
                        fetchDirections(house);                        
                        setselectedLocation(house);
                        
                      }}
                      
                    />
                  ))
                }
              </MarkerClusterer>
        <Circle center={office} radius={50} options={closeOptions}/>
        <Circle center={office} radius={100} options={middleOptions}/>
        <Circle center={office} radius={200} options={farOptions}/>

        
        </>
        
        )}


        </GoogleMap>
            
        </div>
    </div>
  );

  

  
}
/*
const generateHouses = (position: LatLngLiteral) => {

 const [tableData, setTableData] = useState([]);
 const [db, setDb] = useState("");
useEffect(() => {
    
    const dbInstance1 = getDatabase(app);
    setDb(dbInstance1);
  },[]);

  useEffect(() => {
    if (db) {
      const dataRef = ref(db, 'Location');
      const fetchData = (snapshot) => {
        const data = snapshot.val();
        const dataArray = [];
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            dataArray.push({
              username: key,
              ...data[key]
            });
          }
        }
        setTableData(dataArray);
      };
  
      onValue(dataRef, fetchData);
  
      return () => {
        off(dataRef, fetchData);
      };
    }
  }, [db]);
  const _houses: Array<LatLngLiteral> = [];
  if (tableData.length === 0) {
    return _houses; // Return an empty array if tableData is empty
  }
  for (let i = 0; i < tableData.length; i++) {
    _houses.push({
      lat: tableData[i].latitude,
      lng: tableData[i].longtitude
    });
    console.log(_houses);
  }
  
  return _houses;
  }; */
const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};


/*
const generateHouses = (position: LatLngLiteral) => {
  const _houses: Array<LatLngLiteral> = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random()/30 < 0.5 ? 30 : 80;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
*/





