import React, { useEffect } from "react";
import { Spinner } from "../../components/Spinner";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectAllPosts, fetchPosts } from "./postsSlice";
import { Post } from "../../app/types";
import { PostCard } from "./PostCard";

export const Posts = () => {
  const posts = useAppSelector(selectAllPosts);
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
    renderedPosts = posts.map((post: Post) => {
      return <PostCard key={post.id} post={post} />;
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
