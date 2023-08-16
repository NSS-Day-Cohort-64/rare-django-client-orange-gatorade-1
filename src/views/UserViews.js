import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { TagList } from "../components/tag/TagList";
import { Authorized } from "./Authorized";
import { PostList } from "../components/posts/PostList";
import { UserPost } from "../components/posts/UserPost";
import { PostDetails } from "../components/posts/PostDetails";
import { CategoryList } from "../components/Categories/CategoryList";
import { UserList } from "../components/users/UserList";
import { PostForm } from "../components/posts/PostForm";
import { PostEdit } from "../components/posts/PostEdit";
import { UserDetail } from "../components/users/UserDetail";
import { PostComments } from "../components/comments/PostComments";
import { CommentForm } from "../components/comments/CommentForm";
import { SubscribedUserPosts } from "../components/subscriptions/ViewSubscribedUserPosts";
import { CommentEditForm } from "../components/comments/CommentEditForm";

export const UserViews = ({ token, setToken, isAdmin, setAdmin }) => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<Login setToken={setToken} setAdmin={setAdmin} />}
        />
        <Route
          path="/register"
          element={<Register setToken={setToken} setAdmin={setAdmin} />}
        />
        <Route element={<Authorized token={token} />}>
          <Route index element={<SubscribedUserPosts token={token} />} />

          <Route path="/tags" element={<TagList token={token} />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/my-posts" element={<UserPost token={token} />} />
          <Route
            path="/posts/:postId"
            element={<PostDetails token={token} />}
          />
          <Route path="/categories" element={<CategoryList />} />
          <Route
            path="/comments/:postId"
            element={<PostComments token={token} />}
          />
          <Route
            path="/commentform/:postId"
            element={<CommentForm token={token} />}
          />
          <Route
            path="/commentEditForm/:commentId"
            element={<CommentEditForm token={token} />}
          />

          <Route path="/users">
            <Route index element={<UserList />} />
            <Route path=":userId" element={<UserDetail token={token} />} />
          </Route>
          <Route path="/postform" element={<PostForm token={token} />} />
          <Route path="/my-posts/:postId/edit" element={<PostEdit />} />

          <Route path="/users/:userId" element={<UserDetail token={token} />} />

          <Route path="/postform" element={<PostForm token={token} />} />
          <Route path="/my-posts/:postId/edit" element={<PostEdit />} />
        </Route>
      </Routes>
    </>
  );
};
