import React from "react";

import { selectUserById } from "./usersSlice";
import { selectPostsByUser } from "../posts/postsSlice";
import { Link, RouteComponentProps } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Post } from "../../app/types";
import { PostCard } from "../posts/PostCard";

type TParams = { userId: string };

export const SingleUser = ({ match }: RouteComponentProps<TParams>) => {
  const userId = parseInt(match.params.userId);
  console.log(userId);
  const user = useAppSelector((state) => selectUserById(state, userId))!;

  const postsForUser = useAppSelector((state) =>
    selectPostsByUser(state, userId)
  );
  console.log(postsForUser);

  const postsToRender = postsForUser.map((post: Post) => (
    <PostCard key={post.id} post={post} />
  ));

  return (
    <section>
      <h2 className="mt-2 text-center">{user.username}</h2>

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

      <div className="p-5 container">
        <h4 className="mb-3">My Posts</h4>
        <div className="row">{postsToRender}</div>
      </div>
    </section>
  );
};
