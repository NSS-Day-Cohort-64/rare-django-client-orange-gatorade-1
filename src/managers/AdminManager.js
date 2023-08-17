export const deactivateUser = (authorId) => {
    return fetch(`http://localhost:8000/deactivate/${authorId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
        }
    });
};

export const activateUser = (authorId) => {
    return fetch(`http://localhost:8000/activate/${authorId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
        }
    });
};