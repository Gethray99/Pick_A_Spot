import { useState, useEffect } from 'react';
import app from '../../firebase-config';
import { getDatabase, ref, set, get, onValue, off } from 'firebase/database';
import {Link} from 'react-router-dom';
import SelectLocation from '../Select_location';
import Map from '../../Components/map';


function Crud() {

  const [db, setDb] = useState("");
  const [username, setUsername] = useState('');
  const [latitude, setlatitude] = useState('');
  const [longtitude, setlongtitude] = useState('');
  const [total, settotal] = useState('');
  const [available, setavailable] = useState('');
  const [rate, setRate] = useState('');
  const [tableData, setTableData] = useState([]);


  console.log("Hello1");
  useEffect(() => {
    
    const dbInstance1 = getDatabase(app);
    setDb(dbInstance1);
  },[]);

 
  const insertData = () => {
    console.log("Hello2");
    const data = {
      username: username,
      lat: Number(latitude),
      longt: Number(longtitude),
      total: total,
      available: available,
      rate: Number(rate)
    };
  
  
    set(ref(db, 'Location/' + data.username), {
        
      latitude: data.lat,
      longtitude: data.longt,
      total: data.total,
      available:data.available,
      rate: data.rate
    })
      .then(() => {
        alert('Data added successfully');
      })
      .catch((error) => {
        alert('Error occurred, details: ' + error);
      });
  };
/*
  const getdata = () => {
    const dataRef = ref(db, 'Location/' + username);
    get(dataRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setlatitude(data.latitude);
          setlongtitude(data.longtitude);
          settotal(data.total);
          setavailable(data.available);
        } else {
          alert('No data found');
        }
      })
      .catch((error) => {
        alert('There was an error occurred, details: ' + error);
      });
  };
  /*
  const insertData = () => {
    console.log("hello !");
  }
  */
  console.log("Hello3");

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
  
  
  
  return (
    <>
      <br />
      <br />
      <label>Enter Username:</label>
      <input
        type="text"
        id="userbox"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      
      <label>Enter latitude:</label>
      <input
        type="text"
        id="namebox"
        value={latitude}
        onChange={(e) => setlatitude(e.target.value)}
      />
      <br />

      <label>Enter longtitude:</label>
      <input
        type="text"
        id="phonebox"
        value={longtitude}
        onChange={(e) => setlongtitude(e.target.value)}
      />
      <br />

      <label>Enter total number of spots :</label>
      <input
        type="text"
        id="datebox"
        value={total}
        onChange={(e) => settotal(e.target.value)}
      />
      <br />

      <label>Enter available spots :</label>
      <input
        type="text"
        id="availablebox"
        value={available}
        onChange={(e) => setavailable(e.target.value)}
      />
      <br />

      <label>Enter Rate per hour :</label>
      <input
        type="text"
        id="ratebox"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
      <br />

      <button id="addbtn" onClick={insertData}>
        Add Data
      </button>
      <br />
      <button id="getdata" onClick={"#"}>Get Data</button>

      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Total</th>
            <th>Available</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{data.username}</td>
              <td>{data.latitude}</td>
              <td>{data.longtitude}</td>
              <td>{data.total}</td>
              <td>{data.available}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
    {/* <Link to="/selectlocation"><button>Select Location</button></Link> */}
    <SelectLocation />
    
    </>
  );
  

}

export default Crud;
