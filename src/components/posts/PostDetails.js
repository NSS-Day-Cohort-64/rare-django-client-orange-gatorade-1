import { useNavigate, useParams } from "react-router-dom"
import { getPostById } from "../../managers/posts"
import { useEffect, useState } from "react"
import { getUsers } from "../../managers/users"
import { getCategories } from "../../managers/categories"
import { Link } from "react-router-dom"


export const PostDetails = ({token}) => {
    const { postId } = useParams()
    const [ post, setPost ] = useState({})
    const [ users, setUsers ] = useState([])
    const [ categories, setCategories ] = useState([])
    const [ author, setAuthor ] = useState({})
    const [ postCategory, setPostCategory ] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getUsers().then(usersData => setUsers(usersData))
        getCategories().then(categoriesData => setCategories(categoriesData))
    }, [])


    useEffect(() => {
        if (postId) {
            getPostById(token, postId).then(PostDetails => setPost(PostDetails))
        }
    }, [postId])

    useEffect(() => {
        if (post.title) {
            const user = users.find(user => user.id === post.user_id)
            setAuthor(user)
            const category = categories.find(category => category.id === post.category_id)
            setPostCategory(category)
        }
    }, [post, users, categories])



    return (
        <div style={{ margin: "0rem 3rem" }}>
            <h1>{post?.title}</h1>
            <article className="postDetails">
                <div>Author: <Link to={`/users/${author?.id}`}>{author?.first_name} {author?.last_name}</Link></div>
                <div>Category: {postCategory?.label}</div>
                <div>Date: {post?.publication_date}</div>
                <img src={post?.image_url} />
                <div>{post?.content}</div>
            </article>
            <button onClick = {()=> {navigate(`/comments/${postId}`)}}>View Comments</button>
            <button onClick = {()=> {navigate(`/commentform/${postId}`)}}>Add Comment</button>
        </div>
    )
}