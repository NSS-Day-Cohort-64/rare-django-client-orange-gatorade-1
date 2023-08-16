import React, { useEffect, useState } from "react";
import { updateComment } from "../../managers/comments";

export const CommentEditForm = ({ comment, postId, onClose, refreshPage }) => {
  const [updatedComment, setUpdatedComment] = useState({
    post_id: 0,
    author_id: 0,
    content: "",
  });

  const handleUpdate = (event) => {
    const copy = { ...updatedComment };
    copy.content = event.target.value;
    setUpdatedComment(copy);
  };

  useEffect(() => {
    setUpdatedComment(comment);
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    const commentToSendToAPI = {
      id: comment.id,
      post_id: postId,
      author_id: comment.author_id,
      content: updatedComment.content,
    };
    updateComment(commentToSendToAPI).then(() => {
      onClose();
      refreshPage();
    });
  };

  return (
    <div className="box p-3" style={{ fontSize: "0.8rem" }}>
      <h2 className="subtitle is-6 has-text-centered mb-2">Edit Comment</h2>

      <form>
        <div className="field mb-2">
          <div className="control">
            <input
              required
              autoFocus
              className="input is-small"
              type="text"
              value={updatedComment.content}
              onChange={handleUpdate}
            />
          </div>
        </div>
        <div className="field is-grouped is-justify-content-flex-end">
          <div className="control">
            <button
              onClick={(clickEvent) => {
                handleSave(clickEvent);
              }}
              className="button is-small is-primary"
            >
              Save
            </button>
          </div>
          <div className="control">
            <button
              onClick={() => {
                onClose();
              }}
              className="button is-small is-light"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
