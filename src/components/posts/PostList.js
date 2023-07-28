import { useEffect, useState } from "react"
import { getPosts, getPostsByCategory } from "../../managers/posts"
import { getUsers } from "../../managers/users"
import { getCategories } from "../../managers/categories"
import { Link} from "react-router-dom"

export const PostList = () => {
    const [posts, setPosts] = useState([])
    const [ filteredPosts, setFilteredPosts ] = useState([])
    const [users, setUsers] = useState([])
    const [categories, setCategories] = useState([])


    useEffect(() => {
        getPosts().then(postsData => setPosts(postsData))
        getUsers().then(usersData => setUsers(usersData))
        getCategories().then(categoriesData => setCategories(categoriesData))
    }, [])

    useEffect(() => {
        if(posts.length != 0) {
            setFilteredPosts(posts)
        }
    }, [posts])

    const handleInputChange = (event) => {
        const categoryId = event.target.value
        if(categoryId != 0) {
            getPostsByCategory(event.target.value).then(data => setFilteredPosts(data))
        }
        else {
            setFilteredPosts(posts)
        }
    }

    return (
        <div style={{ margin: "0rem 3rem" }}>
            <h1>Posts</h1>
            <div className="form-group">
                <label htmlFor="category">Category: </label>
                <select name="category" className="form-control"
                    onChange={handleInputChange}>
                    <option value="0">Select a category</option>
                    {
                    categories.map(category => (
                        <option key={category.id} value={category.id}>
                        {category.label}
                        </option>
                    ))
                    }
                </select>
            </div>
            <article className="posts">
                {
                    filteredPosts.map(post => {
                        const user= users.find(user => user.id === post.user_id) || []
                        const category = categories.find(category => category.id === post.category_id) || []
                        return <section className="post">
                            <div>==============================</div>
                            <div>Post Title: 
                                <Link to={`/posts/${post.id}`} className="link">{post.title}</Link>
                            </div>
                            <div>Author: <Link to={`/users/${user.id}`}>{user.first_name} {user.last_name}</Link></div>
                            <div>Category: {category.label}</div>
                        </section>
                    })
                }
            </article>
        </div>
    )


}