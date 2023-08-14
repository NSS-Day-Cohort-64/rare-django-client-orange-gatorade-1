export const getCategories = (token) => {
    return fetch("http://localhost:8088/categories", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${token}`
        }
    })
        .then(res => res.json())
}

export const postCategories = (newCategory) => {
    return fetch("http://localhost:8088/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newCategory)
    }).then(res => res.json())
}