import React from "react";

export const PostCard = ({ post }: any) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div
        className="card m-auto"
        style={{ minHeight: "15rem", maxWidth: "20rem" }}
      >
        <div className="card-body">
          <h5 className="card-title text-center">{post.title}</h5>
          <p className="card-text">{post.body}</p>
        </div>
      </div>
    </div>
  );
};
