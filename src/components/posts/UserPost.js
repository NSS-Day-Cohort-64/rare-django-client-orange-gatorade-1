import { useEffect, useState } from "react";
import { deletePost, viewUserPost } from "../../managers/posts";
import { getCategories } from "../../managers/categories";
import { Link, useNavigate, useParams } from "react-router-dom";

export const UserPost = ({ token }) => {
  const [userPosts, setUserPosts] = useState([]); // Change 'posts' to 'userPosts'
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    viewUserPost({ token }).then((postsData) => setUserPosts(postsData)); // Pass token as an object
  }, [token]);

  const deleteButton = (postId) => {
    const handleDelete = () => {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (shouldDelete) {
        deletePost(postId).then(() => {
          setUserPosts((prevPosts) =>
            prevPosts.filter((post) => post.id !== postId)
          );
        });
      }
    };

    return <button onClick={handleDelete}>Delete</button>;
  };

  const editButton = (post) => {
    return (
      <button
        onClick={() => {
          navigate(`/my-posts/${post.id}/edit`);
        }}
      >
        Edit
      </button>
    );
  };

  return (
    <div style={{ margin: "0rem 3rem" }}>
      <h1>My Posts</h1>
      <article className="posts">
        {userPosts.map((post) => {
          return (
            <section className="post" key={post.id}>
              <div>==============================</div>
              <div>
                Title: <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </div>
              <div>Author: {post.author.username}</div>
              <div>Category: {post.category?.label}</div>
              <footer>{deleteButton(post.id)}</footer>
              <footer>{editButton(post)}</footer>
            </section>
          );
        })}
      </article>
    </div>
  );
};
