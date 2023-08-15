export const getPosts = () => {
    return fetch("http://localhost:8000/posts", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}


export const getPostById = (token, id) => {
    return fetch(`http://localhost:8088/posts/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${token}`
        }
    })
        .then(res => res.json())
}

export const getPostsByCategory = (categoryId) => {
    return fetch(`http://localhost:8000/posts?category=${categoryId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}



export const viewUserPost = ({ token }) => {
    return fetch(`http://localhost:8000/posts?user=true`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then((res) => res.json());
};

export const deletePost = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        method: "DELETE"
    });
};

export const putPost = (postId, post) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
}

export const getPostsByUser = (userId) => {
    return fetch(`http://localhost:8000/posts?user=${userId}`)
        .then(res => res.json())
}

export const getPostsByTitle = (title) => {
    return fetch(`http://localhost:8000/posts?title=${title}`)
        .then(res => res.json())
}

export const getPostsByTag = (tagId) => {
    return fetch(`http://localhost:8000/posts?tag=${tagId}`)
        .then(res => res.json())
}
