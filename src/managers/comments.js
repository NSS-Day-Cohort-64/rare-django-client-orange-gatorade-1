export const getCommentsByPost = (postId) => {
    return fetch(`http://localhost:8088/comments?post_id=${postId}`)
    .then(res => res.json())
}