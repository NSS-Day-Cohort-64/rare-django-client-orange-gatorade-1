import { useNavigate, useParams } from "react-router-dom"
import { getPostById } from "../../managers/posts"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCurrentAuthor } from "../../managers/users"
import { ManagePostTags } from "./ManagePostTags"


export const PostDetails = ({token}) => {
    const { postId } = useParams()
    const [post, setPost] = useState({})
    const [postTags, setPostTags] = useState([])
    const [viewingOwnPost, setViewingOwnPost] = useState(false)
    const [editTags, updateEditTags] = useState(false)
    const navigate = useNavigate()

    const fetchPostDetails = () => {
        getPostById(parseInt(postId))
            .then((postDetails) => {
                setPost(postDetails)
                setPostTags(postDetails.tags)
            })
    }
    
    useEffect(() => {
        if (postId) {
            fetchPostDetails()
        }
    }, [postId])

    useEffect(() => {
        getCurrentAuthor().then((data) => {
            const currentAuthor = data[0]
            if (currentAuthor.id === post?.author?.id) {
                setViewingOwnPost(true)
            }
        })
    }, [post])



    return (
        post &&
        <div style={{ margin: "0rem 3rem" }}>
            <h1>{post.title}</h1>
            <article className="postDetails">
                <img src={post.image_url} />
                <div>{post.content}</div>
                <div>Date: {post.publication_date}</div>
                <div>Author: <Link to={`/users/${post.author?.id}`}>{post.author?.username}</Link></div>
            </article>
            <section>
                {
                    viewingOwnPost && !editTags &&
                    <button onClick={() => updateEditTags(true)}>Manage Tags</button>
                }
                {
                    editTags === true
                            ? <>
                                <ManagePostTags
                                    token={token}
                                    postId={postId}
                                    currentPost={post}
                                    originalTagsOnPost={postTags}
                                    updateEditTags={updateEditTags}
                                    fetchPostDetails={fetchPostDetails}
                                />
                            </>
                        : <div className="tags">
                            {
                                postTags.map((tag) => 
                                <span className="tag is-primary is-light" key={`posttag--${tag?.label}`}>{tag?.label}</span>)
                            }
                        </div>
                }
            </section>
            <button onClick={() => { navigate(`/comments/${postId}`) }}>View Comments</button>
            <button onClick={() => { navigate(`/commentform/${postId}`) }}>Add Comment</button>
        </div>
    )
}