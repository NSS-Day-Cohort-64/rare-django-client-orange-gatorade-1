import { useEffect, useState } from "react";
import { getUserById } from "../../managers/users";
import { useNavigate, useParams } from "react-router-dom";
import { addSubscription, getAllSubscriptions, deleteSubscription } from "../../managers/subscriptions";

export const UserDetail = ({ token }) => {
    const [user, setUser] = useState()
    const [subscriptions, setSubscriptions] = useState([])
    const [alreadySubscribed, setSubscribed] = useState()
    let navigate = useNavigate()
    const { userId } = useParams()

    useEffect(() => {
        getUserById(userId)
            .then(setUser)
    }, [userId])

    useEffect(() => {
        getAllSubscriptions().then(data => setSubscriptions(data));
      }, [])

      useEffect(() => {
        if(subscriptions.length != 0) {
        const alreadySubscribed = subscriptions.find(s => s.follower_id === parseInt(token) && s.author_id === user.id)
        setSubscribed(alreadySubscribed)
        }
    }, [subscriptions, user])


    const subscribeToUser = () => {
        const follower_id = parseInt(localStorage.getItem("auth_token"))

        addSubscription({
            follower_id: follower_id,
            author_id: parseInt(user.id),
            created_on: new Date().toISOString().split('T')[0]
        })
            .then(() => {
                // Update the follower_id in localStorage after successful subscription
                localStorage.setItem("follower_id", follower_id);
                navigate("/");
            })
    }

    const unsubscribeToUser = () => {

        deleteSubscription(alreadySubscribed.id)
            .then(() => {
                navigate("/");
            })
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
            { 
                alreadySubscribed ?
                <button
                onClick={() => { unsubscribeToUser() }}
                className="btn btn-primary">Unsubscribe</button>
                :
            
            <button
                onClick={(clickEvt) => { subscribeToUser(clickEvt) }}
                className="btn btn-primary"
            >
                Subscribe
            </button>
            }
        </section>
    );
};