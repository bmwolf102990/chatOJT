import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Title = () =>{
    return(
        <div className="container-fluid text-center">
            <div className="row">
                {/* font changed */}
               <header className="fs-1 text-white fw-bold">
                Chatty Kathy
               </header>
               <p className="fs-6 text-white">What's on your mind?</p>
            </div>
        </div>
    )
}
export default Title;
