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

export const putPost = (postId, post) => {
    return fetch(`http://localhost:8088/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
}

export const getPostsByUser = (userId) => {
    return fetch(`http://localhost:8088/posts?user=${userId}`)
        .then(res => res.json())
}
