import React from "react";
import waitingimg from "../Assets/waiting.png";
import banner from "../Assets/Banner.png";
import "./Verify.css";

export default function Verifying() {
  return (
    <div style={{ overflow: "hidden" }}>
      <div className="banner" style={{ backgroundImage: `url(${banner})` }}>
        <h2 className="Heading">SKILLOPEDIA</h2>
      </div>
      <div className="waitingCard">
        <img src={waitingimg} alt="WaitingIcon" />
        <h2>Almost There!</h2>  
        <p>
          You will be able to login once your request to signup is verified and
          approved by the administrator.
        </p>
      </div>
    </div>
  );
}
