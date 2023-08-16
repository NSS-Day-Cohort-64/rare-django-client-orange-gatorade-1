export const addSubscription = (subscription) => {
    return fetch("http://localhost:8088/subscriptions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(subscription)
    })
}

export const getAllSubscriptions = () => {
    return fetch("http://localhost:8088/subscriptions")
        .then(res => res.json())
}

export const deleteSubscription = (subscriptionId) => {
    return fetch(`http://localhost:8088/subscriptions/${subscriptionId}`, {
        method: "DELETE"
    })
}

export const getMySubscriptions = async(currentUser) => {
    const response = await fetch(`http://localhost:8000/subscriptions?follower=${currentUser[0].id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
    })
    const followedAuthors = await response.json()
    return followedAuthors
}

