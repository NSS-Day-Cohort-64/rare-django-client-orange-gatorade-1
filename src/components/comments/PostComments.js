import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCommentsByPost } from "../../managers/comments";
import { getPostById } from "../../managers/posts";
import { getCurrentAuthor } from "../../managers/users";
import { CommentEditForm } from "./CommentEditForm";

export const PostComments = ({ token }) => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});
  const [showEditForm, setShowEditForm] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (postId) {
      getCommentsByPost(postId).then((foundComments) =>
        setComments(foundComments)
      );
      getPostById(postId).then((PostDetails) => setPost(PostDetails));
    }
  }, [postId]);

  const [currentAuthorId, setCurrentAuthorId] = useState({});

  const deleteButton = (comment, event) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmDelete) {
      return fetch(`http://localhost:8000/comments/${comment.id}`, {
        method: "DELETE",
        headers: {
          authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
      }).then(() => {
        getCommentsByPost(postId).then((foundComments) =>
          setComments(foundComments)
        );
      });
    }
  };

  const refreshPage = () => {
    getCommentsByPost(postId).then((foundComments) =>
      setComments(foundComments)
    );
  };

  useEffect(() => {
    getCurrentAuthor(token).then((author) => {
      setCurrentAuthorId(author[0]);
    });
  }, [token]);

  const sortedComments = comments.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  return (
    <div className="container mt-4">
      <h1 className="title is-size-4 has-text-success mb-4">
        Comments for "{post.title}"
      </h1>
      {sortedComments.map((comment) => {
        return (
          <div className="box my-3" key={`comment--${comment.id}`}>
            <div className="content">
              <p className="has-text-black">{comment.content}</p>
              <p className="is-italic is-size-7 has-text-black">
                - {comment.author?.first_name} {comment.author?.last_name}
              </p>
              <p className="is-size-7 has-text-grey">
                Created: {comment.date_created}
              </p>
              {comment.author.id === currentAuthorId.id && (
                <div className="buttons mt-2">
                  <button
                    className="button is-danger is-small mr-1"
                    onClick={(event) => {
                      deleteButton(comment, event);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="button is-primary is-small"
                    onClick={() => {
                      setShowEditForm(comment.id);
                    }}
                  >
                    Edit
                  </button>
                </div>
              )}
              {showEditForm === comment.id && (
                <CommentEditForm
                  comment={comment}
                  postId={postId}
                  token={token}
                  onClose={() => setShowEditForm(null)}
                  refreshPage={refreshPage}
                />
              )}
            </div>
          </div>
        );
      })}
      <button
        className="button is-success mt-3"
        onClick={() => {
          navigate(`/commentform/${postId}`);
        }}
      >
        Add Comment
      </button>
    </div>
  );
};
