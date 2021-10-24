import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import { PostCard } from "../posts/PostCard";

import { selectUserById } from "./usersSlice";
import { selectPostsByUser } from "../posts/postsSlice";
import { useAppSelector } from "../../app/hooks";
import { Post } from "../../app/types";

type TParams = { userId: string };

export const SingleUser = ({ match }: RouteComponentProps<TParams>) => {
  const userId = parseInt(match.params.userId);

  const user = useAppSelector((state) => selectUserById(state, userId))!;

  const postsForUser = useAppSelector((state) =>
    selectPostsByUser(state, userId)
  );

  const postsToRender = postsForUser.map((post: Post) => (
    <PostCard key={post.id} post={post} />
  ));

  return user ? (
    <section>
      <h2 className="mt-5 mb-4 text-center ephesis">{user.username}</h2>

      <div className="row w-75 m-auto p-3 font-weight-bold text-dark text-center border background round">
        <h4 className="mb-3">User info</h4>
        <p className="col-md-6 col-lg-4 fst-italic">Name: {user.name}</p>
        <p className="col-md-6 col-lg-4 fst-italic">Email: {user.email}</p>
        <p className="col-md-6 col-lg-4 fst-italic">Phone: {user.phone}</p>
        <p className="col-md-6 col-lg-4 fst-italic">Website: {user.website}</p>
        <p className="col-md-6 col-lg-4 fst-italic">
          Adress:{" "}
          {user.address.zipcode +
            " " +
            user.address.street +
            " " +
            user.address.suite +
            " " +
            user.address.city}
        </p>
        <p className="col-md-6 col-lg-4 fst-italic">
          Company: {user.company.name}
        </p>
      </div>

      <Link to={`/edituser/${user.id}`}>
        <button className="btn btn-primary d-block m-auto mt-4">
          Edit User
        </button>
      </Link>

      <div className="p-5 container">
        <h4 className="mb-3">My Posts</h4>
        <div className="row">{postsToRender}</div>
      </div>
    </section>
  ) : (
    <h4 className="p-5">Failed to fetch users</h4>
  );
};
