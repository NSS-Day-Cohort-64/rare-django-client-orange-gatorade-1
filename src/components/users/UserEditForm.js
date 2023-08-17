import { useEffect } from "react";
import { useState } from "react";
import { updateUserType } from "../../managers/users";

export const UserEditForm = ({ user, onClose, refreshPage }) => {
  const [editedUser, setEditedUser] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    is_staff: false,
    bio: "",
    profile_image_url: "",
  });

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleSaveButtonClick = () => {
    const userToUpdate = {
      ...editedUser,
      is_staff: JSON.parse(editedUser.is_staff), // Convert back to boolean
    };

    updateUserType(userToUpdate).then(() => {
      refreshPage();
      onClose();
    });
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="user-edit-form">
      <form>
        <div className="field">
          <div className="control">
            <div className="select">
              <select
                value={editedUser.is_staff}
                name="is_staff"
                id="is_staff"
                onChange={handleFieldChange}
                className="is-small"
              >
                <option value={true}>Admin</option>
                <option value={false}>Author</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field is-grouped mt-2">
          <div className="control">
            <button
              type="button"
              className="button is-small is-primary"
              onClick={handleSaveButtonClick}
            >
              Save
            </button>
          </div>
          <div className="control">
            <button
              type="button"
              className="button is-small is-light"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
