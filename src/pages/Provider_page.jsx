import PageIllustration from "../partials/PageIllustration";
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header2 from "../partials/Header_after";
import { useParams} from 'react-router-dom';
import { getDatabase,ref,update } from "firebase/database";
import app from "../firebase-config";
import "../css/global.css";




function Provider_page(){
    const {email} = useParams();
    const {vacent_spots} = useParams();
    const {available_spot} = useParams();
    const [sentence1, setSentence] = useState();
    const [rounds,setRounds] = useState(vacent_spots);
    const [ava_spot,setAva_spot] = useState(available_spot);
   
  useEffect(() => {
    let sentence = [];
    for(let i=0;i<rounds;i++){
      sentence.push(
        <div key={i}>
             <h1>Release this spot. <button className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3" onClick={Add_data}>Relase</button> </h1> 
             <br />
        </div>
      );
    }
    setSentence(sentence);
  },[rounds])

    // const Release_spot = () => {

    //   let sentence = [];
      
    //   for(let i=0;i<vacent_spots;i++)
    //   {
    //     sentence.push(
    //       <div key={i}>
    //         <h1>Release this spot. <button className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3" onClick={Add_data}>Relase</button> </h1> 
    //         <br />
    //       </div>
         
    //     );
        
    //   }
    //   return sentence;

    // }

    const Add_data = () =>{

      const dbinstance = getDatabase(app);

      update(ref(dbinstance,'Location/'+ email),
      {
        available : (parseInt(available_spot, 10) + 1)
      })
      .then(() => {
        alert("Spot relased.");
      })
      .catch((error)=> {
        alert("Error occured : "+error);
      })
      
       setRounds(rounds-1);
       setAva_spot(parseInt(ava_spot,10)+1);
      
    }

    return (
    <div className="flex flex-col min-h-screen overflow-hidden">
        <Header2 />
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
        <PageIllustration />
        </div>
        <main className="grow">
        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1"></h1> {/*hello*/}
              </div>
              <h1 className="highlight">Hello {email},</h1>
              <br />
              <h1>You have {rounds} vacent spots. You have {ava_spot} available spots. </h1>
              <br />


              {
              sentence1
              }
              

              </div>
              </div>
              </section>
        
        </main>


    </div>
    
    );
}

export default Provider_page;