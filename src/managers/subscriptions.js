export const addSubscription = (subscription) => {
    return fetch("http://localhost:8000/subscriptions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(subscription)
    })
}

export const getAllSubscriptions = () => {
    return fetch("http://localhost:8000/subscriptions", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(res => res.json())
}

export const deleteSubscription = (subscriptionId) => {
    return fetch(`http://localhost:8000/subscriptions/${subscriptionId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`
        }
    })
}

export const getMySubscriptions = async (query) => {
    const response = await fetch(`http://localhost:8000/subscriptions${query}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    const followedAuthors = await response.json()
    return followedAuthors
}

export const editSubscription = (id, body) => {
    return fetch(`http://localhost:8000/subscriptions/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(body),
    });
};

