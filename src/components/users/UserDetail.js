import { useEffect, useState } from "react";
import { getAuthorById, getUserById } from "../../managers/users";
import { useNavigate, useParams } from "react-router-dom";
import { addSubscription, getAllSubscriptions, deleteSubscription } from "../../managers/subscriptions";

export const UserDetail = ({ token }) => {
    const [user, setUser] = useState()
    const [subscriptions, setSubscriptions] = useState([])
    const [alreadySubscribed, setSubscribed] = useState()
    let navigate = useNavigate()
    const { userId } = useParams()

    useEffect(() => {
        getAuthorById(userId)
            .then(setUser)
    }, [userId])
    /*
    useEffect(() => {
        getAllSubscriptions().then(data => setSubscriptions(data));
      }, [])
    
      useEffect(() => {
        if(subscriptions.length != 0) {
        const alreadySubscribed = subscriptions.find(s => s.follower_id === parseInt(token) && s.author_id === user.id)
        setSubscribed(alreadySubscribed)
        }
    }, [subscriptions, user])
    */

    const subscribeToUser = () => {
        /*
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
        */
       // Pass
    }

    const unsubscribeToUser = () => {
        /*
        deleteSubscription(alreadySubscribed.id)
            .then(() => {
                navigate("/");
            })
        */
       // Pass
    }
    
    
    

    return (
        <section className="userPage py-4 px-4">
            <h1 className="title is-3">{user?.username}</h1>
            {user?.profile_image_url && (
                <img
                    className="user__profileIMG"
                    src={user.profile_image_url}
                />
            )}
            <div>
                <span className="has-text-weight-bold">Created on: </span>
                <span className="user__createdate">{user?.created_on}</span>
            </div>
            <div>
                <span className="has-text-weight-bold">Full Name: </span>
                <span className="user__fullname">{user?.first_name} {user?.last_name}</span>
            </div>
            <div>
                <span className="has-text-weight-bold">Email: </span>
                <span className="user__email">{user?.email}</span>
            </div>
            <div>
                <span className="has-text-weight-bold">Bio: </span>
                <span className="user__bio">{user?.bio}</span>
            </div>
            <div className="mb-2">
                <span className="has-text-weight-bold">User Type: </span>
                <span className="userType">{user?.is_staff ? "Admin" : "Author"} </span>
            </div>
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