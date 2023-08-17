import React, { useEffect, useState } from "react";
import { GetAllReactions } from "../../managers/reactions";
import { ReactionForm } from "./ReactionForm";

export const ReactionList = () => {
  const [reactions, setReactions] = useState([]);
  const [showReactionForm, setShowReactionForm] = useState(false);

  useEffect(() => {
    GetAllReactions().then((reactionsData) => setReactions(reactionsData));
  }, []);

  const toggleReactionForm = () => {
    setShowReactionForm(!showReactionForm);
  };

  const refreshPage = () => {
    GetAllReactions().then((reactionsData) => setReactions(reactionsData));
  };

  return (
    <div className="reaction-list">
      <div className="is-flex is-justify-content-flex-end mb-2">
        <button className="button is-primary" onClick={toggleReactionForm}>
          Create Reaction
        </button>
      </div>
      <h2 className="title is-4">Reactions</h2>
      <div className="columns is-multiline">
        {reactions.map((reaction) => (
          <div key={reaction.id} className="column is-one-third">
            <div className="box has-text-centered">
              <div className="content">
                <p className="subtitle is-6">{reaction.label}</p>
                <figure className="image is-64x64">
                  <img src={reaction.image_url} alt={reaction.label} />
                </figure>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showReactionForm && <ReactionForm refreshPage={refreshPage} />}
    </div>
  );
};
