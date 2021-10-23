import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectPosts } from "./postsSlice";

export const Posts = () => {
  const posts = useAppSelector(selectPosts);

  let renderedPosts = posts.map((post) => {
    return (
      <div className="col-sm-6 col-lg-4 mb-4">
        <div className="card" style={{ minHeight: "15rem", maxWidth: "20rem" }}>
          <div className="card-body">
            <h5 className="card-title text-center">{post.title}</h5>
            <p className="card-text">{post.body}</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="p-5 container-fluid">
      <div className="row">{renderedPosts}</div>
    </div>
  );
};
