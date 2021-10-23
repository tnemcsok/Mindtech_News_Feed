import React, { useEffect } from "react";
import { Spinner } from "../../components/Spinner";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectPosts, fetchPosts } from "./postsSlice";
import { PostsState } from "../../app/types";

export const Posts = () => {
  const posts = useAppSelector(selectPosts);
  const dispatch = useAppDispatch();

  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let renderedPosts;

  if (postStatus === "loading") {
    renderedPosts = <Spinner text="Loading..." />;
  } else if (postStatus === "succeeded") {
    renderedPosts = posts.map((post: PostsState) => {
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
    });
  } else {
    renderedPosts = <div>{error}</div>;
  }

  return (
    <div className="p-5 container">
      <div className="row">{renderedPosts}</div>
    </div>
  );
};
