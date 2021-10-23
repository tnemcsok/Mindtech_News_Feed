import React from "react";
import { Comment } from "../../app/types";

type CommentProps = { comment: Comment };

export const SingleComment = ({ comment }: CommentProps) => {
  return (
    <div className="border mb-3 p-3">
      <h6 className="text-center">{comment.name}</h6>
      <p className="mb-0">{comment.body}</p>
      <p className="text-end mb-0">
        <a className="fst-italic">{comment.email}</a>
      </p>
    </div>
  );
};
