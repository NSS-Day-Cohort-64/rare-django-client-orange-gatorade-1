export const getPosts = () => {
    return fetch("http://localhost:8088/posts")
        .then(res => res.json())
}


export const getPostById = (id) => {
    return fetch(`http://localhost:8088/posts/${id}`)
        .then(res => res.json())
}

export const getPostsByCategory = (categoryId) => {
    return fetch(`http://localhost:8088/posts?category=${categoryId}`)
    .then(res => res.json())
}

export const viewUserPost = ({ token }) => {
  const userId = parseInt(token);
  return fetch(`http://localhost:8088/posts?user=${userId}`)
    .then((res) => res.json());
};

export const deletePost = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
        method: "DELETE"
    });
};

