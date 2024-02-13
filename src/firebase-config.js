import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
//import { getAuth } from "firebase/auth";

/*
const firebaseConfig = {
    apiKey: "AIzaSyCtJDXuJm_l3gW_aGqgq1-mnbofBResyCg",
    authDomain: "pick-a-spot-c53f0.firebaseapp.com",
    projectId: "pick-a-spot-c53f0",
    storageBucket: "pick-a-spot-c53f0.appspot.com",
    messagingSenderId: "646634016430",
    appId: "1:646634016430:web:c3266f301f93157f4c673f",
    measurementId: "G-SDEVXVHW88"
  };
  */
  const firebaseConfig = {
    apiKey: "AIzaSyAukmZKgqcsPu7_GeFGQME1ceyG70Go8Q4",
    authDomain: "pick-a-spot-mobile.firebaseapp.com",
    projectId: "pick-a-spot-mobile",
    storageBucket: "pick-a-spot-mobile.appspot.com",
    messagingSenderId: "1017882151115",
    appId: "1:1017882151115:web:6b239cfc2ae3eca56fb34e",
    measurementId: "G-M7BBR8DSKP"
  };

  const app = initializeApp(firebaseConfig);

  //const auth = getAuth(app);

  export default app;