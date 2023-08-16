export const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    }).then((res) => res.json());
};

export const postCategories = (newCategory) => {
    return fetch("http://localhost:8000/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(newCategory),
    }).then((res) => res.json());
};

export const getCategory = (id) => {
    return fetch(`http://localhost:8000/categories/${id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    }).then((res) => res.json());
};

export const editCategory = (category) => {
    return fetch(`http://localhost:8000/categories/${category.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(category),
    })
};
