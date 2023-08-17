import React, { useState } from "react";
import { CreateReaction } from "../../managers/reactions";

export const ReactionForm = ({ refreshPage }) => {
  const [reaction, setReaction] = useState({
    label: "",
    image_url: "",
  });

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setReaction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveButtonClick = () => {
    const reactionToSendToAPI = {
      ...reaction,
    };

    CreateReaction(reactionToSendToAPI)
      .then(() => {
        setReaction({
          label: "",
          image_url: "",
        });
      })
      .then(() => {
        refreshPage();
      });
  };

  return (
    <div className="reaction-form-container">
      <div className="box">
        <h2 className="title is-5">Create a Reaction</h2>
        <form className="reaction-form">
          <div className="field">
            <label className="label">Reaction Label:</label>
            <div className="control">
              <input
                required
                type="text"
                className="input"
                placeholder="Reaction Label"
                name="label"
                value={reaction.label}
                onChange={handleFieldChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Reaction Image:</label>
            <div className="control">
              <input
                required
                type="text"
                className="input"
                placeholder="Reaction Image URL"
                name="image_url"
                value={reaction.image_url}
                onChange={handleFieldChange}
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button
                className="button is-primary"
                onClick={(clickEvent) => {
                  clickEvent.preventDefault();
                  handleSaveButtonClick();
                }}
              >
                Save Reaction
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
