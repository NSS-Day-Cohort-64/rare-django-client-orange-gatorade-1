import { useEffect, useState } from "react";
import { getCurrentAuthor, getUserById } from "../../managers/users";

export const SubscribedUserPosts = ({ token }) => {
    const [subscribedPosts, setSubscribedPosts] = useState([]);
    const [user, setUser] = useState({});
    const [currentUser, setCurrentUser] = useState([{
        id: 0
    }])

    useEffect(() => {
        getCurrentAuthor()
            .then((user) => setCurrentUser(user))
    }, [])

    useEffect(() => {
        if (currentUser[0].id !== 0) {
            fetchSubscribedPosts();
        }
    }, [currentUser]);

    const fetchSubscribedPosts = async () => {
        const response = await fetch(`http://localhost:8000/subscriptions?follower=${currentUser[0].id}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("auth_token")}`,
            },
        })
        
        const data = await response.json()

        // Check if response is array
        if (Array.isArray(data)) {
            const followedPosts = data.filter((post) => post.follower !== currentUser[0].id);
            setSubscribedPosts(followedPosts);
        }
        // Check if response is object with message
        if (data.message) {
            setSubscribedPosts(data)
        }

    }

    return (
        <>
            <h1>Welcome to Your Homepage!</h1>
            {subscribedPosts.length > 0 ? (
                <ul>
                    {subscribedPosts.map((post) => (
                        <li key={post.id}>
                            <div>===================================================</div>
                            <p>Author: {post.author_username}</p>
                            <img
                                className="author__postIMG"
                                src={post.image_url}
                            />
                            <p>Title: {post.title}</p>
                            <p>Category: {post.category_label}</p>
                            <p>Publication Date: {post.publication_date}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>{subscribedPosts?.message}</p>

            )}

        </>
    );
};