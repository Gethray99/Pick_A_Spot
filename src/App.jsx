import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Userpage from './pages/Userpage';
import Map from './Components/map';
import Index1 from './Components/index1';
import Places from './Components/places';
import Distance from './Components/distance';
import Firebase from './firebase-config';
import Crud from './pages/locations/index_location';
import SelectLocation from './pages/Select_location';
import Index2 from './pages/Provider_location/index2';
import Map2 from './pages/Provider_location/load_map';
import Provider_page from './pages/Provider_page';
import Header2 from './partials/Header_after';

function App() {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/userpage" element={<Userpage />}/>
        <Route path="/map" element={<Map />}/>
        <Route path="/index1" element={<Index1 />}/>
        <Route path="./places" element ={<Places/>}/>
        <Route path="./distance" element ={<Distance/>}/>
        <Route path="./firebase-config" element={<Firebase/>}/>
        <Route path="/crud" element={<Crud />} />
        <Route path="/selectlocation" element={<SelectLocation />} />
        <Route path="/index2" element={<Index2 />} />
        <Route path="/map2" element={<Map2 />} />
        <Route path="/provider_page/:email/:vacent_spots/:available_spot" element={<Provider_page />} />
        <Route path="/header_after" element={<Header2 />} />
        
        
      </Routes> 
    </>
  );
}

export default App;
