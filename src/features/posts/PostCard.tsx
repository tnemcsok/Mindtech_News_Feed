import React from "react";
import { Link } from "react-router-dom";

import { Post } from "../../app/types";
import { PostAuthor } from "./PostAuthor";

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type PostCardProps = { post: Post };

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div
        className="card m-auto"
        style={{ minHeight: "22rem", maxWidth: "20rem" }}
      >
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title text-center">
              {capitalizeFirstLetter(post.title)}
            </h5>
            <PostAuthor userId={post.userId} />
          </div>
          <p className="card-text text-justify">
            {capitalizeFirstLetter(post.body) + "."}
          </p>
          <Link to={`/posts/${post.id}`}>
            <button className="btn btn-primary d-block m-auto">
              Read Post
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
