import React from "react";
import { PostAuthor } from "./PostAuthor";
import { selectPostById } from "./postsSlice";
import { selectCommentsByPostID } from "../comments/commentsSlice";
import { RouteComponentProps } from "react-router-dom";
import { Post, Comment } from "../../app/types";
import { useAppSelector } from "../../app/hooks";
import { capitalizeFirstLetter } from "./PostCard";
import { SingleComment } from "../comments/SingleComment";

type TParams = { postId: string };
export const SinglePost = ({ match }: RouteComponentProps<TParams>) => {
  const postId = parseInt(match.params.postId);
  console.log(postId);

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
    <div>
      <article className="col-md-6 mx-auto mb-4 mt-3">
        <h2 className="text-center">{capitalizeFirstLetter(post[0].title)}</h2>
        <PostAuthor userId={post[0].userId} />
        <p className="">{capitalizeFirstLetter(post[0].body)}</p>
      </article>
      <div className="col-md-8 mx-auto">
        <h4>Comments</h4>
        <div className="col-md-8 mx-auto">{renderedComments}</div>
      </div>
    </div>
  ) : (
    <section>
      <h2>Post not found!</h2>
    </section>
  );
};
