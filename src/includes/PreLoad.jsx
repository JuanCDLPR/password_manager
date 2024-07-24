import React from "react";
import Load from "../assets/loading.gif";

export default function PreLoad() {
  return (
    <>
      <div
        className="d-flex justify-content-center aling-items-center flex-column align-content-center p-0 m-0"
        style={{ height: "100vh", backgroundColor: "#101727" }}
      >
        <center>
          <div
            aria-label="Orange and tan hamster running in a metal wheel"
            role="img"
            className="wheel-and-hamster"
          >
            <div className="wheel"></div>
            <div className="hamster">
              <div className="hamster__body">
                <div className="hamster__head">
                  <div className="hamster__ear"></div>
                  <div className="hamster__eye"></div>
                  <div className="hamster__nose"></div>
                </div>
                <div className="hamster__limb hamster__limb--fr"></div>
                <div className="hamster__limb hamster__limb--fl"></div>
                <div className="hamster__limb hamster__limb--br"></div>
                <div className="hamster__limb hamster__limb--bl"></div>
                <div className="hamster__tail"></div>
              </div>
            </div>
            <div className="spoke"></div>
          </div>
        </center>
      </div>
      {/* <div
        className="d-flex justify-content-center aling-items-center flex-column align-content-center p-0 m-0"
        style={{ height: "100vh", backgroundColor: "#101727" }}
      >
        <center>
          <img
            src={Load}
            alt=""
            className="img-fluid"
            style={{ maxWidth: "20%" }}
          />
        </center>
      </div> */}
    </>
  );
}
