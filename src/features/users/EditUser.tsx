import React, { ChangeEventHandler, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { useAppDispatch } from "../../app/hooks";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { selectUserById } from "./usersSlice";
import { userUpdated } from "./usersSlice";

type TParams = { userId: string };
export const EditUserForm = ({ match }: RouteComponentProps<TParams>) => {
  const userId = parseInt(match.params.userId);

  const user = useAppSelector((state) => selectUserById(state, userId));
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState(user?.username ?? "");

  const history = useHistory();

  const onUserNameChanged: ChangeEventHandler<HTMLInputElement> = (e) =>
    setUsername(e.target.value);

  const onSave = () => {
    if (username) {
      dispatch(userUpdated({ id: userId, username: username }));
      history.push(`/users/${userId}`);
    }
  };

  return (
    <section className="col-md-6 mx-auto border mt-4 p-4">
      <h2>Edit User</h2>
      <form>
        <label htmlFor="postTitle" className="d-block mb-2">
          Username:
        </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={username}
          onChange={onUserNameChanged}
          className="d-block mb-2"
        />
        <button type="button" className="btn btn-primary" onClick={onSave}>
          Update User
        </button>
      </form>
    </section>
  );
};
