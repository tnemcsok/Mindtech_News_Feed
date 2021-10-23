import React from "react";

import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-primary p-2">
      <h1 className="text-center text-white ">Mindtech Blog</h1>
      <nav className="nav nav-pills flex-column flex-sm-row">
        <Link className="flex-sm-fill text-center nav-link text-white" to="/">
          Posts
        </Link>
        <Link
          className="flex-sm-fill text-center nav-link text-white"
          to="/users"
        >
          Users
        </Link>
      </nav>
    </header>
  );
};
