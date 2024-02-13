import React from 'react';
import app from '../firebase-config';
import { getDatabase, ref, set, get, onValue, off } from 'firebase/database';
import { useState, useEffect } from 'react';


const commutesPerYear = 260 * 2;
const litresPerKM = 10 / 100;
const gasLitreCost = 1.5;
const litreCostKM = litresPerKM * gasLitreCost;
const secondsPerDay = 60 * 60 * 24;

type DistanceProps = {
  leg: google.maps.DirectionsLeg;
};

export default function Distance({ leg }: DistanceProps) {
 
  const [tableData, setTableData] = useState([]);
  const [db, setDb] = useState(null);
  const { start_location } = leg;
  const { lat, lng } = start_location;

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

  //const latit = leg.end_location.lat;
  console.log("from google "+Number(lat()));
  
  for(let i=0;i<tableData.length;i++){
    console.log("from tabledata "+Number(tableData[i].latitude));
    if(Number(lat()) == Number(tableData[i].latitude) ){
      console.log("mathced");

    }
  }
  

  if (!leg.distance || !leg.duration) return null;

  const days = Math.floor(
    (commutesPerYear * leg.duration.value) / secondsPerDay
  );
  const cost = Math.floor(
    (leg.distance.value / 1000) * litreCostKM * commutesPerYear
  );


  return (
    <div>
      <p>
        This parking spot is <span className="highlight">{leg.distance.text}</span> away
        from your destination. That would take{" "}
        <span className="highlight">{Math.round((leg.duration.value+300)/60)}</span> mins to reach your destination.
       
      </p>
        <br />
      
    </div>
    
  );
}