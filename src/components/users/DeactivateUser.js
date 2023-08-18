import { useState } from "react"
import { deactivateUser } from "../../managers/AdminManager"
import { getActiveAuthors } from "../../managers/users"

export const DeactivateButton = ({accountId, setUsers}) => {
    const [displayConfirm, setDisplayConfirm] = useState(false)

    const handleDeactivateAcct = (e) => {
        e.preventDefault()
        deactivateUser(accountId).then(() => {
            // Re-render list of active authors
            getActiveAuthors().then(userArray => setUsers(userArray));
        })
    }
    
    return <>
        {
            !displayConfirm
                ? <button
                    onClick={() => setDisplayConfirm(true)}
                >Deactivate Account</button>
                : <>
                    <div>Are you sure you want to Deactivate this user's account?</div>
                    <button
                        onClick={(click) => { handleDeactivateAcct(click) }}
                    >Deactivate</button>

                    <button onClick={() => setDisplayConfirm(false)}>Cancel</button>
                </>
        }
    </>
}