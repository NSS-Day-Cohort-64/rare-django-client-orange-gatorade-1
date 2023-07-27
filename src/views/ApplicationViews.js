import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { PostList } from "../components/posts/PostList"
import { PostDetails } from "../components/posts/PostDetails"
import { CategoryList } from "../components/Categories/CategoryList"
import { UserList } from "../components/users/UserList"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        <Route path="/posts" element={<PostList />}  />
        <Route path="/categories" element={<CategoryList />}  />
        <Route path="/users" element={<UserList />}  />


        <Route path="/posts/:postId" element={<PostDetails />}  />
      </Route>
    </Routes>
  </>
}
