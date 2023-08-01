import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCommentsByPost } from "../../managers/comments"
import { getPostById } from "../../managers/posts"

export const PostComments = ({ token }) => {
    const { postId } = useParams()
    const [ comments, setComments ] = useState([])
    const [post, setPost] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        if (postId) {
            getCommentsByPost(postId).then(foundComments => setComments(foundComments))
            getPostById(postId).then(PostDetails => setPost(PostDetails))
        }
    }, [postId])

    const deleteButton = (comment) => {
        return (
          <button
            onClick={() => {
              fetch(`http://localhost:8088/comments/${comment.id}`, {
                method: "DELETE"
              }).then(() => {
                getCommentsByPost(postId).then(foundComments => setComments(foundComments));
              });
            }}
            className="submission__delete small-button"
          >
            Delete
          </button>
        );
      }


    return (
        <div style={{ margin: "0rem 3rem" }}>
            <h1>Comments for "{post.title}"</h1>
            {
                comments.map(comment => {
                    return <section className="comment" key={`comment--${comment.id}`}>
                    <div>==============================</div>
                    <div>Comment: {comment.content}</div>
                    <div>User: {comment.user.first_name} {comment.user.last_name}</div>
                    {comment.author_id === parseInt(token) ? (
                        deleteButton(comment)
                    )
                    : (<div></div>)}
                </section>
                })
            }
            <button onClick = {()=> {navigate(`/commentform/${postId}`)}}>Add Comment</button>

        </div>
    )


}
