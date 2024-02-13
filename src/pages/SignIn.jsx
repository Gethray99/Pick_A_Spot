import React from 'react';
import { Link, useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAuth
} from "firebase/auth";
import {useState, useMemo, useCallback, useRef, useEffect} from "react";
//import  auth from "../firebase-config";
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Banner from '../partials/Banner';
import Index1 from '../Components/index1';
import app from '../firebase-config';
import Provider_page from './Provider_page';
import { getDatabase, ref, set, get, onValue, off, update } from 'firebase/database';




function SignIn() {

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
 // const [setName,Name] = useState("");
  const auth = getAuth(app);
  
  //const auth = getAuth();
  const navigate = useNavigate();
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


  async function Login () {
    
    let provider_account_found = false;
    let vacent_spots;
    let Provider_name;
    let available_spots;


    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      //console.log("works here");
      //console.log(user);
     
    
     // Reference to the Firebase Realtime Database
     
     for(let i=0;i<tableData.length;i++){
      //console.log("from tabledata "+Number(tableData[i].latitude));
      if(loginEmail === tableData[i].Email){
       
        provider_account_found = true;
        vacent_spots = tableData[i].total - tableData[i].available;
        Provider_name = tableData[i].username;
        available_spots = tableData[i].available;
        
      }
    }
    
   
    if(provider_account_found){
      navigate(`/provider_page/${Provider_name}/${vacent_spots}/${available_spots}`);
    }
    else{
      navigate("/index1");
    }




    
    } catch (error) {
      console.log("error in login",error);
      alert("Wrong username or password");
    }


  };

function loginhandle(event) {

  

  event.preventDefault();
  console.log(loginEmail + " " + loginPassword);
  //window.location.href = "/index1";
  //navigate("/index1");
  
  Login();
}


  return (
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
                <h1 className="h1"></h1> {/*text can add*/}
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3">
                    {/* <div className="w-full px-3">
                      <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                        <svg className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                        </svg>
                        <span className="h-6 flex items-center border-r border-white border-opacity-25 mr-4" aria-hidden="true"></span>
                        <span className="flex-auto pl-16 pr-8 -ml-16">Sign in with Google</span>
                      </button>
                    </div> */}
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div className="border-t border-gray-700 border-dotted grow mr-3" aria-hidden="true"></div>
                  <div className="text-gray-400">sign in with your email</div>
                  <div className="border-t border-gray-700 border-dotted grow ml-3" aria-hidden="true"></div>
                </div>
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email</label>
                      <input id="email" type="email" className="form-input w-full text-gray-300" placeholder="you@mail.com" required onChange={(event) => {
            setLoginEmail(event.target.value);
          }}/>
          
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password</label>
                      <input id="password" type="password" className="form-input w-full text-gray-300" placeholder="Password (at least 10 characters)" required onChange={(event) => {
            setLoginPassword(event.target.value);
          }}/>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="text-gray-400 ml-2">Keep me signed in</span>
                        </label>
                        <Link to="/reset-password" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Forgot Password?</Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full" onClick={loginhandle}>Sign in</button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-400 text-center mt-6">
                  Don’t you have an account? <Link to="/signup" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign up</Link>
                  
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

export default SignIn;