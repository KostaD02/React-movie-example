import React from "react";
import "../App.css";
const notFound = () => {
  return (
    <div className="notFound">
      <div className="text-notfound">
        <h1>404</h1>
        <h3>We couldn't find the page..</h3> <br />
        <h4>
          Sorry,but page you looking for was not found, Please contact{" "}
          <a href="#">Support</a>
        </h4>
      </div>
    </div>
  );
};

export default notFound;
