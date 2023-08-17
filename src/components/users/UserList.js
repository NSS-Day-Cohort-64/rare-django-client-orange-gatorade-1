import { Link } from "react-router-dom";
import { getAllAuthors } from "../../managers/users";
import { useEffect, useState } from "react";
import { getCurrentAuthor } from "../../managers/users";
import { UserEditForm } from "./UserEditForm";

export const UserList = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [showEditForm, setShowEditForm] = useState(null);
  const [currentAuthor, setCurrentAuthor] = useState({});

  useEffect(() => {
    getAllAuthors().then((userArray) => setUsers(userArray));
  }, []);

  const openEditForm = (userId) => {
    setShowEditForm(userId);
  };

  useEffect(() => {
    getCurrentAuthor(token).then((author) => {
      setCurrentAuthor(author[0]);
    });
  }, [token]);

  const refreshPage = () => {
    getAllAuthors().then((userArray) => setUsers(userArray));
  };

  return (
    <>
      <h2 className="userList py-1 ml-3">List of Users</h2>

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
              <div className="userType">
                User Type: {user.is_staff ? "Admin" : "Author"}{" "}
              </div>
              {currentAuthor.is_staff && (
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
            </section>
          ))}
      </article>
    </>
  );
};
