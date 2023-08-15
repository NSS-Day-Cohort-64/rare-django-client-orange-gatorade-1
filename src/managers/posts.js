export const getPosts = () => {
    return fetch("http://localhost:8000/posts", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}


export const getPostById = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}

export const getPostsByCategory = (categoryId) => {
    return fetch(`http://localhost:8000/posts?category=${categoryId}`)
        .then(res => res.json())
}


export const viewUserPost = () => {
    return fetch(`http://localhost:8000/posts?user=true`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then((res) => res.json());
};

export const deletePost = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        method: "DELETE",
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
    });
};

export const putPost = (postId, post) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(post)
    })
}

export const getPostsByUser = (userId) => {
    return fetch(`http://localhost:8000/posts?user=${userId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}

export const getPostsByTitle = (title) => {
    return fetch(`http://localhost:8000/posts?title=${title}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}

export const getPostsByTag = (tagId) => {
    return fetch(`http://localhost:8000/posts?tag=${tagId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}