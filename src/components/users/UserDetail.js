import { useEffect, useState } from "react";
import { getUserById } from "../../managers/users";
import { useNavigate, useParams } from "react-router-dom";
import { addSubscription } from "../../managers/subscriptions";

export const UserDetail = () => {
    const [user, setUser] = useState();
    let navigate = useNavigate()
    const { userId } = useParams()

    useEffect(() => {
        getUserById(userId)
            .then(setUser)
    }, [userId])

    const subscribeToUser = () => {
        // const author_id = parseInt(user.id)

        addSubscription({
            follower_id: parseInt(localStorage.getItem("auth_token")),
            author_id: parseInt(user.id),
            created_on: new Date().toISOString().split('T')[0]
        })
            .then(() => navigate("/"))
    }

    return (
        <section className="userPage">
            <h1>{user?.username}'s Page</h1>
            {user?.profile_image_url && (
                <img
                    className="user__profileIMG"
                    src={user.profile_image_url}
                />
            )}
            <h3 className="user__createdate">Created on: {user?.created_on}</h3>
            <h3 className="user__fullname">Full Name: {user?.first_name} {user?.last_name}</h3>
            <div className="user__bio">{user?.bio}</div>
            <button
                onClick={(clickEvt) => { subscribeToUser(clickEvt) }}
                className="btn btn-primary"
            >
                Subscribe
            </button>
        </section>
    );
};
