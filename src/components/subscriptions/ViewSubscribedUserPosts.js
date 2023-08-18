import { useEffect, useState } from "react";
import { getCurrentAuthor, getUserById } from "../../managers/users";
import { getPostsByAuthor } from "../../managers/posts";
import { getMySubscriptions } from "../../managers/subscriptions";

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
        const query = `?follower=${currentUser[0].id}&subscribed`
        const followedAuthors = await getMySubscriptions(query)

        const myFeed = [...subscribedPosts]
        for (const author of followedAuthors) {
            const posts = await getPostsByAuthor(author.author)
            for (const post of posts) {
                myFeed.push(post)
            }
        }
        setSubscribedPosts(myFeed);


    }

    return (
        <>
            <h1>Welcome to Your Homepage!</h1>
            {subscribedPosts.length > 0 ? (
                <ul>
                    {subscribedPosts.map((post) => (
                        <li key={post.id}>
                            <div>===================================================</div>
                            <p>Author: {post.author.username}</p>
                            <img
                                className="author__postIMG"
                                src={post.image_url}
                            />
                            <p>Title: {post.title}</p>
                            <p>Category: {post.category?.label}</p>
                            <p>Publication Date: {post.publication_date}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Subscribe To Users To See Their Posts!</p>

            )}

        </>
    );
};