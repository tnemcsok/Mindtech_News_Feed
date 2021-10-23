import React, { useEffect, useState } from "react";
import { Spinner } from "../../components/Spinner";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectAllPosts, fetchPosts } from "./postsSlice";
import { Post } from "../../app/types";
import { PostCard } from "./PostCard";
import { Pagination } from "../../components/Pagination";

export const Posts = () => {
  const posts = useAppSelector(selectAllPosts);
  const dispatch = useAppDispatch();

  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  let [page, setPage] = useState(1);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let totalPages = 1;
  let renderedPosts;

  if (postStatus === "loading") {
    renderedPosts = <Spinner text="Loading..." />;
  } else if (postStatus === "succeeded") {
    totalPages = Math.ceil(posts.length / 6);
    const sliced = posts.slice((page - 1) * 6, page * 6);
    renderedPosts = sliced.map((post: Post) => {
      return <PostCard key={post.id} post={post} />;
    });
  } else {
    renderedPosts = <div>{error}</div>;
  }

  return (
    <div className="p-5 container">
      <div className="row">{renderedPosts}</div>
      {postStatus === "succeeded" && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}
    </div>
  );
};
