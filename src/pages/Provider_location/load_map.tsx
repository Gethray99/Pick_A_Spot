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
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    getAuth
  } from "firebase/auth";
import "../../css/global.css";
import Places from './Load_places';
import Distance from '../../Components/distance';
import app from '../../firebase-config';
import { getDatabase, ref, set, get, onValue, off, update } from 'firebase/database';
import { Link, useNavigate } from 'react-router-dom';



type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;



export default function Map2() {
    

  const [ava_spot, setAvaSpot] = useState("");
  const [Provider, setProvider] = useState("");
  const [Rate, setRate ] = useState("");
  const [selectedLocation, setselectedLocation] = useState(null);
  const [button_select,setButton] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [office, setOffice] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const [username,setUsername] = useState("");
  const [total,setTotal] = useState("");
  const [rate,setrate] = useState("");
  const [available, setAvailable]=useState("");
  const [phone,setPhone] = useState("");
  const auth = getAuth(app);
  const navigate = useNavigate();


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
       

          
  const [db, setDb] = useState(null);


  useEffect(() => {
    const dbInstance = getDatabase(app);
    setDb(dbInstance);
  }, []);


  
  const register = async (event) => {
    event.preventDefault();

    console.log("Hello2");
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }

    
    const data = {
      username: username,
      lat: Number(office.lat),
      longt: Number(office.lng),
      total: Number(total),
      available: Number(available),
      rate: Number(rate),
      phone: Number(phone),
      Email:registerEmail
    };
 
  
    await set(ref(db, 'Location/' + data.username), {
        
      latitude: data.lat,
      longtitude: data.longt,
      total: data.total,
      available:data.available,
      rate: data.rate,
      phone: data.phone,
      Email:data.Email
    })
      .then(() => {
        alert('Data added successfully');
        navigate("/");
      })
      .catch((error) => {
        alert('Error occurred, details: ' + error);
      });

      

  };

  



          
  const onLoad = useCallback((map) => (mapRef.current = map), []);


  const handleMarkerDrag = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setOffice({ lat, lng });
    console.log("lat : "+lat);
    
  };

  

 
  // const insertData = (event) => {
  //   console.log("Hello2");
  //   const data = {
  //     username: username,
  //     lat: Number(event.latLng.lat()),
  //     longt: Number(event.latLng.lng()),
  //     total: total,
  //     available: available,
  //     rate: Number(rate),
  //     phone: Number(phone)
  //   };
  // console.log("long :"+ event.latLng);
  
  //   set(ref(db, 'Location/' + data.username), {
        
  //     latitude: data.lat,
  //     longtitude: data.longt,
  //     total: data.total,
  //     available:data.available,
  //     rate: data.rate,
  //     phone: data.phone
  //   })
  //     .then(() => {
  //       alert('Data added successfully');
  //     })
  //     .catch((error) => {
  //       alert('Error occurred, details: ' + error);
  //     });
  // };
  
  


  return (
    <div className="container">
        <div className="controls2">
        <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="full-name">Full Name <span className="text-red-600">*</span></label>
                      <input id="full-name" type="text" className="form-input w-full text-gray-300" placeholder="First and last name" value={username} onChange={(e) => setUsername(e.target.value)} required  />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="company-name">Your mobile number <span className="text-red-600">*</span></label>
                      <input id="company-name" type="text" className="form-input w-full text-gray-300" placeholder="Your mobile number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Your Email <span className="text-red-600">*</span></label>
                      <input id="email" type="email" className="form-input w-full text-gray-300" placeholder="you@your.com" required onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}/>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                      <input id="password" type="password" className="form-input w-full text-gray-300" placeholder="Password (at least 10 characters)" required  onChange={(event) => {
            setRegisterPassword(event.target.value);//className="form-input w-full text-gray-300"
          }} />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="company-name">Your Parking spot location <span className="text-red-600">*</span></label>
                    </div>
                  </div>
                  <Places 
            setOffice={(position) => {
                setOffice(position);
                mapRef.current?.panTo(position);

            }}
                />
<br />
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="company-name">How many paring spots do you have <span className="text-red-600">*</span></label>
                      <input id="total_spots" type="text" className="form-input w-full text-gray-300" placeholder="total number of slots" required  onChange={(event) => {
            setTotal(event.target.value);}} />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="company-name">How many paring spots are available currently <span className="text-red-600">*</span></label>
                      <input id="availavle_spots" type="text" className="form-input w-full text-gray-300" placeholder="available number of slots currently" required  onChange={(event) => {
            setAvailable(event.target.value);}} />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="company-name">How much will you charge per hour <span className="text-red-600">*</span></label>
                      <input id="rate" type="text" className="form-input w-full text-gray-300" placeholder="per hour charge" required  onChange={(event) => {
            setrate(event.target.value);}} />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" onClick={register}>Sign up</button>
                    </div>
                  </div>
                </form>
            

       
        </div>
        <div className="map" >
        <GoogleMap
          zoom={15}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
        
 

          

        {office && (
            <>
            <Marker 
            position={office} 
            draggable={true}
            onDragEnd={handleMarkerDrag}
        //icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
        />  
        </>
        
        )}


        </GoogleMap>
            
        </div>
    </div>
  );

  

  
}

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








