import React, { useEffect, useState } from "react";
import {
  getFilteredPosts,
  putPost,
} from "../../managers/posts";
import { getActiveAuthors, getAllAuthors, getCurrentAuthor } from "../../managers/users";
import { getCategories } from "../../managers/categories";
import { Link } from "react-router-dom";
import { getTags } from "../../managers/TagManager";

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({})
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [filters, setFilters] = useState({
    categoryId: 0,
    authorId: 0,
    title: "",
    tagId: 0,
  });
  const [titleInput, setTitleInput] = useState(""); // New state to track the input field value

  useEffect(() => {
    getCurrentAuthor()
      .then((user) => setCurrentUser(user))
  }, [])

  useEffect(() => {
    applyFilters()
    getActiveAuthors().then((usersData) => setUsers(usersData));
    getCategories().then((categoriesData) => setCategories(categoriesData));
    getTags().then((tagData) => setTags(tagData));
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = async () => {
    let query = '';

    if (filters.categoryId !== 0) {
      query += `?category=${filters.categoryId}`
    }

    if (filters.authorId !== 0) {
      if (query !== '') {
        query += `&author=${filters.authorId}`
      }
      else {
        query += `?author=${filters.authorId}`
      }
    }

    if (filters.title.trim() !== "") {
      if (query !== '') {
        query += `&title=${filters.title}`
      }
      else {
        query += `?title=${filters.title}`
      }
    }

    if (filters.tagId !== 0) {
      if (query !== '') {
        query += `&tag=${filters.tagId}`
      }
      else {
        query += `?tag=${filters.tagId}`
      }
    }
    const filteredResults = await getFilteredPosts(query)
    setFilteredPosts(filteredResults);
  };

  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value);
    setFilters({ ...filters, categoryId });
  };

  const handleAuthorChange = (event) => {
    const authorId = parseInt(event.target.value);
    setFilters({ ...filters, authorId });
  };

  const handleTagChange = (event) => {
    const tagId = parseInt(event.target.value);
    setFilters({ ...filters, tagId });
  };

  const handleTitleChange = (event) => {
    setTitleInput(event.target.value); // Update the title input state
  };

  const handleTitleSubmit = () => {
    setFilters({ ...filters, title: titleInput }); // Update the title filter
  };

  const handleTitleEnter = (event) => {
    if (event.key === 'Enter') {
      handleTitleSubmit()
      event.preventDefault()
    }
  }

  const handleApproveClick = async (currentPost) => {
    const copy = [...filteredPosts]
    let selectedPost = copy.find(post => post.id === currentPost.id)
    const editedPost = { ...selectedPost }
    editedPost.approved = !currentPost.approved
    const selectedTags = [...selectedPost.tags]
    editedPost.tags = selectedTags.map(tag => tag.id)
    editedPost.category = editedPost.category.id
    editedPost.author = editedPost.author.id
    await putPost(currentPost.id, editedPost)
    applyFilters()
  }

  return (
    <div style={{ margin: "0rem 3rem" }}>
      <h1>Posts</h1>
      <div className="form-group">
        <label htmlFor="category">Category: </label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
        >
          <option value={0}>Select a category</option>
          {categories.map((category) => (
            <option key={`catFilter--${category.id}`} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>

        <label htmlFor="filterByUser">Author: </label>
        <select
          name="filterByUser"
          className="form-control"
          onChange={handleAuthorChange}
        >
          <option value={0}>Filter By Author</option>
          {users.map((user) => (
            <option key={`userFilter--${user.id}`} value={user.id}>
              {user.first_name} {user.last_name}
            </option>
          ))}
        </select>
        <div>
          <input type="text" value={titleInput} onChange={handleTitleChange} onKeyDown={handleTitleEnter} />
          <button onClick={handleTitleSubmit}>Search</button>
        </div>
      </div>

      <label htmlFor="tag">Tag: </label>
      <select name="tag" className="form-control" onChange={handleTagChange}>
        <option value={0}>Select a tag</option>
        {tags.map((tag) => (
          <option key={`tagFilter--${tag.id}`} value={tag.id}>
            {tag.label}
          </option>
        ))}
      </select>

      <article className="posts">
        {filteredPosts.map((post) => {
          //const user = users.find((user) => user.id === post.user_id) || [];
          //const category =
          // categories.find((category) => category.id === post.category_id) ||
          //  [];

          return (
            <section className="post" key={`postList--${post.id}`}>
              <div>==============================</div>
              <div>
                Post Title: <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </div>
              <div>
                Author:{" "}
                <Link to={`/users/${post.author?.id}`}>
                  {post.author?.username}
                </Link>
              </div>
              <div>Date: {post.publication_date}</div>
              <div>Category: {post.category?.label}</div>
              <div>Tags:
                {post.tags.map((tag) => (
                  <span key={`tag--${tag.id}`} className="tag">
                    {tag.label}
                  </span>
                ))}
              </div>
              {currentUser[0].is_staff
                ? <>
                  <div>
                    <label>
                      Approved
                      <input
                        type="checkbox"
                        value={post.approved}
                        checked={post.approved}
                        onChange={() => handleApproveClick(post)}
                      />
                    </label>
                  </div>
                </>
                : ""}
            </section>
          );
        })}
      </article>
    </div>
  );
};
