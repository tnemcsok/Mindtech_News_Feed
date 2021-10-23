import React from "react";
import { PostAuthor } from "./PostAuthor";
import { selectPostById } from "./postsSlice";
import { RouteComponentProps } from "react-router-dom";
import { Post } from "../../app/types";
import { useAppSelector } from "../../app/hooks";
import { PostCard } from "./PostCard";
import { capitalizeFirstLetter } from "./PostCard";

type TParams = { postId: string };
export const SinglePost = ({ match }: RouteComponentProps<TParams>) => {
  const postId = parseInt(match.params.postId);
  console.log(postId);

  const post: Post[] = useAppSelector((state) => selectPostById(state, postId));

  return post ? (
    <article className="w-50 m-auto mt-3">
      <h2 className="text-center">{capitalizeFirstLetter(post[0].title)}</h2>
      <PostAuthor userId={post[0].userId} />
      <p className="">{capitalizeFirstLetter(post[0].body)}</p>
    </article>
  ) : (
    <section>
      <h2>Post not found!</h2>
    </section>
  );
};
