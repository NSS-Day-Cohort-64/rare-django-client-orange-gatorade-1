import { useNavigate, useParams } from "react-router-dom";
import { postComment } from "../../managers/comments";
import { useEffect, useState } from "react";
import { getPostById } from "../../managers/posts";

export const CommentForm = ({ token }) => {
    const { postId } = useParams()
    const [ comment, setComment ] = useState({
        post_id: 0,
        author_id: 0,
        content: ""
    })
    const [post, setPost] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        if (postId) {
            getPostById(postId).then(PostDetails => setPost(PostDetails))
        }
    }, [postId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const commentToSendToAPI = {
            post_id: post.id,
            author_id: parseInt(token),
            content: comment.content
        }
        postComment(commentToSendToAPI)
            .then(() => {
                navigate(`/comments/${postId}`);
            });
    };


    return (
        <form className="commentForm">
            <h2 className="commentFormHeader">Leave a comment for "{post.title}"</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="commentHTML" className="commentContent">Comment:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Tell us what you really think"
                        value={comment.content}
                        onChange={(evt) => {
                            const copy = {...comment}
                            copy.content = evt.target.value
                            setComment(copy)
                        }}
                    />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => { handleSaveButtonClick(clickEvent) }}
                className="btn btn-primary"
            >
                Submit
            </button>
        
        </form>
    )
}