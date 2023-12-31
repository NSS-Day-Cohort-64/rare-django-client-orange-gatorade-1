export const getCommentsByPost = (postId) => {
  return fetch(`http://localhost:8000/comments?post_id=${postId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};

export const postComment = (comment) => {
  return fetch(`http://localhost:8000/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(comment),
  }).then((response) => response.json());
};

export const updateComment = (comment) => {
  return fetch(`http://localhost:8000/comments/${comment.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(comment),
  });
};
