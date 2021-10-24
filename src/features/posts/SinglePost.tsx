import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { PostAuthor } from "./PostAuthor";
import { SingleComment } from "../comments/SingleComment";
import { Post, Comment } from "../../app/types";
import { useAppSelector } from "../../app/hooks";
import { selectPostById } from "./postsSlice";
import { selectCommentsByPostID } from "../comments/commentsSlice";
import { capitalizeFirstLetter } from "./PostCard";

type TParams = { postId: string };

export const SinglePost = ({ match }: RouteComponentProps<TParams>) => {
  const postId = parseInt(match.params.postId);

  const post: Post[] = useAppSelector((state) => selectPostById(state, postId));

  const comments: Comment[] = useAppSelector((state) =>
    selectCommentsByPostID(state, postId)
  );

  const renderedComments = comments ? (
    comments.map((comment: Comment) => <SingleComment comment={comment} />)
  ) : (
    <div>Comments not available</div>
  );

  return post ? (
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
