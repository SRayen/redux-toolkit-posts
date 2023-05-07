import React from "react";
import { useSelector } from "react-redux";

const PostAuthor = ({ userId }) => {
  const users = useSelector((state) => state.users.users);

  const author = users.find((user) => user.id == userId);

  return <span>by {author ? author.name : "Uknown author"}</span>;
};

export default PostAuthor;
