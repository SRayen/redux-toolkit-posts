import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const items =
  localStorage.getItem("posts-local") !== null
    ? JSON.parse(localStorage.getItem("posts-local"))
    : [];

const initialState = {
  allPosts: items,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.allPosts.push(action.payload);

        localStorage.setItem(
          "posts-local",
          JSON.stringify(state.allPosts.map((item) => item))
        );
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },

    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.allPosts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
    deletePost(state,action){
      const { postId } = action.payload;
      const posts = state.allPosts.filter((post) => post.id !== postId);
      state.allPosts = posts;

      localStorage.setItem(
        "posts-local",
        JSON.stringify(state.allPosts.map((item) => item))
      );
    }
  },
});

export const { postAdded, reactionAdded,deletePost } = postsSlice.actions;
export default postsSlice.reducer;
