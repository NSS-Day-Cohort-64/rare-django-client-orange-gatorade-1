import { getUsers } from "../../managers/users"
import React, { useEffect, useState } from 'react';

export const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(userArray => setUsers(userArray));
  }, []);

return(
    
        <>
          <h2 className="userList">List of Users</h2>
      
          <article className="users">
            {users
              .sort((a, b) => a.username.localeCompare(b.username)) 
              .map((user) => (
                <section className="user" key={user.id}>
                 <div className="userName">Username: {user.username}</div>
                  <div className="userfullName">Full Name: {user.first_name} {user.last_name}</div>
                  <div className="userEmail">Email: {user.email} </div>

                </section>
              ))}
          </article>
        </>
      


) 

}


