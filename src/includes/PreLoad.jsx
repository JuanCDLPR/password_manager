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
          <img
            src={Load}
            alt=""
            className="img-fluid"
            style={{ maxWidth: "20%" }}
          />
        </center>
      </div>
    </>
  );
}
