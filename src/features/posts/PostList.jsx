import { useDispatch, useSelector } from "react-redux";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { deletePost } from "./postsSlice";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.allPosts);
  //Order posts according to the time (from the most recent)
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
      <button
        id="delete"
        onClick={() => {
          dispatch(deletePost({ postId: post.id }));
        }}
      >
        Delete
      </button>
    </article>
  ));

  return (
    <>
      <h1>Posts with Redux Toolkit</h1>
      {renderedPosts}
    </>
  );
};

export default PostList;
