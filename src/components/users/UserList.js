import { Link } from "react-router-dom";
import { getActiveAuthors, getAllAuthors, getDeactivatedAuthors } from "../../managers/users"
import { useEffect, useState } from 'react';
import { activateUser, deactivateUser } from "../../managers/AdminManager";
import { DeactivateButton } from "./DeactivateUser";
import { UserEditForm } from "./UserEditForm";

export const UserList = ({isAdmin}) => {
  const [users, setUsers] = useState([]);
  const [showEditForm, setShowEditForm] = useState(null);
  const [authorsToDisplay, setAuthorsToDisplay] = useState('active')

  useEffect(
    () => {
      if (authorsToDisplay === 'active') {
        getActiveAuthors().then(userArray => setUsers(userArray));
      }
      if (authorsToDisplay === 'deactivated') {
        getDeactivatedAuthors().then(userArray => setUsers(userArray));
      }
    },
    [authorsToDisplay]
  )

  const handleActiveChange = (evt) => {
    const activeState = evt.target.value
    setAuthorsToDisplay(activeState)
  }

  const openEditForm = (userId) => {
    setShowEditForm(userId);
  };

  const refreshPage = () => {
    if (authorsToDisplay === 'active') {
      getActiveAuthors().then(userArray => setUsers(userArray));
    }
    if (authorsToDisplay === 'deactivated') {
      getDeactivatedAuthors().then(userArray => setUsers(userArray));
    }
  };

  const handleReactivateAcct = (e, accountId) => {
    e.preventDefault()
    activateUser(accountId).then(() => {
      // Trigger useEffect and re-render author list
      getDeactivatedAuthors().then(userArray => setUsers(userArray));
    })
  }



  return (
    <>
      <h2 className="userList py-1 ml-3">List of Users</h2>

      {
        isAdmin && 
        <>
          <label htmlFor="filterByUser">View Active or Inactive Users</label>
          <select
            name="activeStatusSelect"
            className="form-control"
            onChange={(e) => { handleActiveChange(e) }}
          >
            <option value={'active'}>View Active</option>
            <option value={'deactivated'}>View Deactivated</option>
          </select>
        </>
      }

      <article className="users pt-1 pb-5">
        {users
          .sort((a, b) => a.username.localeCompare(b.username))
          .map((user) => (
            <section className="box mx-6 mt-3 user" key={user.id}>
              <div className="userName title is-6">{user.username}</div>
              <div className="userfullName">
                Full Name:{" "}
                <Link to={`/users/${user.id}`}>
                  {user.first_name} {user.last_name}
                </Link>
              </div>
              <div className="userEmail">Email: {user.email} </div>
              <div className="userType">User Type: {user.is_staff ? "Admin" : "Author"} </div>
              {isAdmin && (
                <div className="is-flex">
                  <button
                    className="button is-small is-primary ml-2"
                    onClick={() => openEditForm(user.id)}
                  >
                    Edit
                  </button>
                  {showEditForm === user.id && (
                    <UserEditForm
                      user={user}
                      onClose={() => setShowEditForm(null)}
                      refreshPage={refreshPage}
                    />
                  )}
                </div>
              )}
              {
                isAdmin && user.is_active &&
                <DeactivateButton accountId={user.id} setUsers={setUsers} />
              }
              {
                isAdmin && !user.is_active &&
                <button
                  onClick={(click) => { handleReactivateAcct(click, user.id) }}
                >Reactivate</button>
              }
            </section>
          ))}
      </article>
    </>
  );
};
