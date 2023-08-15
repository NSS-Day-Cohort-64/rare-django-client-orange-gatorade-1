export const getCommentsByPost = (postId) => {
  return fetch(`http://localhost:8088/comments?post_id=${postId}`).then((res) =>
    res.json()
  );
};

export const postComment = (comment) => {
  return fetch(`http://localhost:8088/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  }).then((response) => response.json());
};
