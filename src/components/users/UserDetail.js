import { useEffect, useState } from "react";
import { getAuthorById, getCurrentAuthor, getUserById } from "../../managers/users";
import { useNavigate, useParams } from "react-router-dom";
import { addSubscription, getAllSubscriptions, deleteSubscription, getMySubscriptions, editSubscription } from "../../managers/subscriptions";

export const UserDetail = ({ token }) => {
    const [user, setUser] = useState()
    const [currentUser, setCurrentUser] = useState({})
    const [subscription, setSubscription] = useState({})
    const [alreadySubscribed, setSubscribed] = useState()
    let navigate = useNavigate()
    const { userId } = useParams()

    useEffect(() => {
        getAuthorById(userId)
            .then(setUser)
    }, [userId])

    useEffect(() => {
        getCurrentAuthor()
            .then((user) => setCurrentUser(user[0]))
    }, [])


    useEffect(() => {
        if (currentUser.id) {
            const query = `?follower=${currentUser.id}&author=${userId}`
            getMySubscriptions(query).then(data => setSubscription(data[0]))
        }
    }, [currentUser])


    const subscribeToUser = () => {

        const postBody = {
            follower: parseInt(currentUser.id),
            author: parseInt(user.id)
        }

        if (subscription?.subscribed === false) {
            postBody.date_subscribed = subscription.date_subscribed
            postBody.date_unsubscribed = subscription.date_unsubscribed
            postBody.subscribed = true
            editSubscription(subscription.id, postBody)
                .then(() => { navigate("/") })
        } else {
            addSubscription(postBody)
                .then(() => { navigate("/") })
        }
    }

    const unsubscribeToUser = () => {

        const postBody = {
            follower: parseInt(currentUser.id),
            author: parseInt(user.id),
            date_subscribed: subscription.date_subscribed,
            date_unsubscribed: subscription.date_unsubscribed,
            subscribed: false
        }

        editSubscription(subscription.id, postBody)
            .then(() => { navigate("/") })
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
                subscription?.subscribed ?
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