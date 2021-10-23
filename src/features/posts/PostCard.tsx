import React from "react";
import { Post } from "../../app/types";
import { PostAuthor } from "./PostAuthor";
import { Link } from "react-router-dom";

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type PostCardProps = { post: Post };

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div
        className="card m-auto"
        style={{ minHeight: "15rem", maxWidth: "20rem" }}
      >
        <div className="card-body">
          <h5 className="card-title text-center">
            {capitalizeFirstLetter(post.title)}
          </h5>
          <PostAuthor userId={post.userId} />
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
