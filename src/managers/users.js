export const getAllAuthors = () => {
    return fetch(`http://localhost:8000/authors`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}

export const getUserById = (id) => {
    return fetch(`http://localhost:8000/users/${id}`)
        .then(res => res.json())
}

export const getCurrentAuthor = () => {
    return fetch(`http://localhost:8000/authors?current=true`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}