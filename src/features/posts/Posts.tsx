import React, { useState } from "react";

import { Spinner } from "../../components/Spinner";
import { Post } from "../../app/types";
import { PostCard } from "./PostCard";
import { Pagination } from "../../components/Pagination";
import { selectAllPosts } from "./postsSlice";
import { useAppSelector } from "../../app/hooks";

export const Posts = () => {
  // Get posts, status and error
  const posts = useAppSelector(selectAllPosts);
  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  const userStatus = useAppSelector((state) => state.users.status);

  // Declare page for pagination
  let [page, setPage] = useState(1);
  let totalPages = 1;

  let renderedPosts;

  // Render posts, handle loading and error
  if (postStatus === "loading" || userStatus === "loading") {
    renderedPosts = <Spinner text="Loading..." />;
  } else if (postStatus === "succeeded") {
    totalPages = Math.ceil(posts.length / 6);

    const slicedPosts = posts.slice((page - 1) * 6, page * 6);

    renderedPosts = slicedPosts.map((post: Post) => {
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
