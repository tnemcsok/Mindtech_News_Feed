import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

import { PostAuthor } from "./PostAuthor";
import { SingleComment } from "../comments/SingleComment";
import { Spinner } from "../../components/Spinner";
import { Post, Comment } from "../../app/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectPostById } from "./postsSlice";
import { selectCommentsByPostID } from "../comments/commentsSlice";
import { capitalizeFirstLetter } from "./PostCard";
import { fetchComments } from "../comments/commentsSlice";

type TParams = { postId: string };

export const SinglePost = ({ match }: RouteComponentProps<TParams>) => {
  const postId = parseInt(match.params.postId);

  // Get status and error
  const postStatus = useAppSelector((state) => state.posts.status);
  const commentStatus = useAppSelector((state) => state.comments.status);
  const error = useAppSelector((state) => state.comments.error);

  const dispatch = useAppDispatch();

  // Fetch comments for post
  useEffect(() => {
    dispatch(fetchComments(postId));
  }, []);

  // Get the post
  const post: Post[] = useAppSelector((state) => selectPostById(state, postId));

  // Get the comments
  const comments: Comment[] = useAppSelector((state) =>
    selectCommentsByPostID(state, postId)
  );
  let renderedComments;

  // Render comments, handle loading and error
  if (commentStatus === "loading") {
    renderedComments = <Spinner text="Loading..." />;
  } else if (commentStatus === "succeeded") {
    renderedComments = comments.map((comment: Comment) => (
      <SingleComment comment={comment} />
    ));
  } else {
    renderedComments = <div>{error}</div>;
  }

  return postStatus === "loading" ? (
    <Spinner text="Loading..." />
  ) : post.length ? (
    <div className="p-2">
      <article className="col-md-6 mx-auto mb-4 mt-3">
        <h2 className="text-center">{capitalizeFirstLetter(post[0].title)}</h2>
        <PostAuthor userId={post[0].userId} />
        <p className="">{capitalizeFirstLetter(post[0].body)}</p>
      </article>
      <div className="col-md-8 mx-auto">
        <h4>Comments</h4>
        <div className="col-10 col-md-8 mx-auto">{renderedComments}</div>
      </div>
    </div>
  ) : (
    <section>
      <h2>Post not found!</h2>
    </section>
  );
};
