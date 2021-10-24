import React from "react";
import { Link } from "react-router-dom";

import { selectAllUsers } from "./usersSlice";
import { useAppSelector } from "../../app/hooks";

export const Users = () => {
  const users = useAppSelector(selectAllUsers);

  const renderedUsers = users ? (
    users.map((user) => (
      <div className="col-md-6 col-lg-4 mb-4">
        <div
          className="card m-auto"
          style={{ minHeight: "10rem", maxWidth: "20rem" }}
        >
          <div className="card-body">
            <h5 className="card-title text-center">{user.username}</h5>
            <p className="card-text">Email: {user.email}</p>
            <p className="card-text">Website: {user.website}</p>
            <Link to={`/users/${user.id}`}>
              <button className="btn btn-primary d-block m-auto">
                Visit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="p-5">Failed to fetch users</div>
  );

  return (
    <section>
      <h2 className="mt-3 text-center">Users</h2>

      <div className="p-2 container">
        <div className="row">{renderedUsers}</div>
      </div>
    </section>
  );
};
