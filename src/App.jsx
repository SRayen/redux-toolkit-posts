import { useEffect } from "react";
import "./App.css";
import AddPostForm from "./features/posts/AddPostForm";
import PostList from "./features/posts/PostList";
import { useDispatch } from "react-redux";
import { getUsers } from "./features/users/usersSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <>
      <PostList />
      <AddPostForm />
    </>
  );
}

export default App;
