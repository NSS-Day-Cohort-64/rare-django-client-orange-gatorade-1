import { Link } from "react-router-dom";
import { getAllAuthors } from "../../managers/users"
import { useEffect, useState } from 'react';

export const UserList = ({isAdmin}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllAuthors().then(userArray => setUsers(userArray));
  }, []);

  return (

    <>
      <h2 className="userList py-1 ml-3">List of Users</h2>

      <article className="users pt-1 pb-5">
        {users
          .sort((a, b) => a.username.localeCompare(b.username))
          .map((user) => (
            <section className="box mx-6 mt-3 user" key={user.id}>
              <div className="userName title is-6">{user.username}</div>
              <div className="userfullName">Full Name: <Link to={`/users/${user.id}`}>{user.first_name} {user.last_name}</Link></div>
              <div className="userEmail">Email: {user.email} </div>
              <div className="userType">User Type: {user.is_staff ? "Admin" : "Author"} </div>
            </section>
          ))}
      </article>
    </>
  )
}