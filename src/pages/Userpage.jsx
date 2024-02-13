import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Banner from '../partials/Banner';
import Map from '../partials/Map';
import "../css/Map.css";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';



function Userpage(){
  const [office, setOffice] = useState();
    return(
        
        <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Let Us find you a good spot for you.</h1>
              </div>
              <div className="container">
                <div className="controls">
                  <h1 className="h3">Commute</h1>
                </div>
                <div className="map">
                  <Map/>
                </div>
                
              </div>

            </div>
          </div>
        </section>

      </main>

      <Banner />

    </div>
       
    );


}
export default Userpage;

