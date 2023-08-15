import { useNavigate, useParams } from "react-router-dom"
import { getPostById } from "../../managers/posts"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCurrentAuthor } from "../../managers/users"


export const PostDetails = ({token}) => {
    const { postId } = useParams()
    const [post, setPost] = useState({})
    const [currentAuthor, setCurrentAuthor] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (postId) {
            getPostById(parseInt(postId)).then(PostDetails => setPost(PostDetails))
        }
    }, [])

    useEffect(() => {
        getCurrentAuthor().then(data => setCurrentAuthor(data[0]))
    }, [])



    return (
        <div style={{ margin: "0rem 3rem" }}>
            <h1>{post.title}</h1>
            <article className="postDetails">
                <img src={post.image_url} />
                <div>{post.content}</div>
                <div>Date: {post.publication_date}</div>
                <div>Author: <Link to={`/users/${post.author?.id}`}>{post.author?.username}</Link></div>
            </article>
            <button onClick={() => { navigate(`/comments/${postId}`) }}>View Comments</button>
            <button onClick={() => { navigate(`/commentform/${postId}`) }}>Add Comment</button>
        </div>
    )
}