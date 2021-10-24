import React from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { selectUserById } from "../users/usersSlice";

type PostAuthorProps = { userId: number };

export const PostAuthor = ({ userId }: PostAuthorProps) => {
  const author = useAppSelector((state) => selectUserById(state, userId));

  return (
    <Link className="authorLink mb-3" to={`/users/${userId}`}>
      by {author ? author.username : "Unknown author"}
    </Link>
  );
};
