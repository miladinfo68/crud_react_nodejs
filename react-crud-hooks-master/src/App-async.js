import React, { useState, useEffect } from "react";
import userList from "./data.js";
import UserTable from "./tables/UserTable";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";

import { useAsyncRequest } from "./hooks";

const App = () => {
  const [data, loading] = useAsyncRequest(3);
  // Fixed array of users:
  // const [users, setUsers] = userList;
  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (data) {
      const formattedUsers = data.map((obj, i) => {
        return {
          id: i,
          name: obj.name.first,
          username: obj.name.first + " " + obj.name.last,
        };
      });
      setUsers(formattedUsers);
    }
  }, [data]);

  const addUser = (user) => {
    user.id = users.length;
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const [editing, setEditing] = useState(false);

  const initialUser = { id: null, name: "", username: "" };

  const [currentUser, setCurrentUser] = useState(initialUser);

  const editUser = (id, user) => {
    setEditing(true);
    setCurrentUser(user);
  };

  const updateUser = (newUser) => {
    setUsers(
      users.map((user) => (user.id === currentUser.id ? newUser : user))
    );
    setCurrentUser(initialUser);
    setEditing(false);
  };

  return (
    <div className="container">
      <h3>React CRUD App with Hooks</h3>
      <div className="row">
        <div className="five columns">
          {editing ? (
            <div>
              <h4>Edit user</h4>
              <EditUserForm
                currentUser={currentUser}
                setEditing={setEditing}
                updateUser={updateUser}
              />
            </div>
          ) : (
              <div>
                <h4>Add user</h4>
                <AddUserForm addUser={addUser} />
              </div>
            )}
        </div>
        {loading || !users ? (
          <p>Loading...</p>
        ) : (
            <div className="seven columns">
              <h4>View users</h4>

              <UserTable
                users={users}
                deleteUser={deleteUser}
                editUser={editUser}
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default App;
