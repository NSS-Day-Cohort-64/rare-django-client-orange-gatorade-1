import { useEffect, useState } from "react";
import { getUserById } from "../../managers/users";
import { useParams } from "react-router-dom";

export const UserDetail = () => {
    const [user, setUser] = useState();
    const { userId } = useParams()

    useEffect(() => {
        getUserById(userId)
            .then(setUser)
    }, [userId])

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
            
        </section>
    );
};
