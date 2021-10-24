import React from "react";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="row mt-5">
      <div className="col-10 col-md-6 col-lg-4 background border mx-auto p-5">
        <h2>Requested page not found</h2>
        <Link to="/">
          <button type="button" className="btn btn-primary mx-auto d-block">
            Home Page
          </button>
        </Link>
      </div>
    </div>
  );
};
