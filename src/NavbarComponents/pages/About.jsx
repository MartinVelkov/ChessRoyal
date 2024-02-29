import React from "react";
import Stats from "../../Stats/Dashboard";
import "./CssForThePages/About.css"
// import { Button } from "../../Stats/button";
import { getAuth } from "firebase/auth";

export const About = () => {
   const uid = getAuth().currentUser.uid;

    return (
     <div>
        {/* <Button /> */}
       
     <div className="about"> 
      Здравей, Мартин
     </div>

     <div className="Stats">
        <Stats />
     </div>
     
     </div>)
}