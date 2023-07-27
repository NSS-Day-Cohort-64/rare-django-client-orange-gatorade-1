import { useEffect, useState } from "react"
import { getPosts } from "../../managers/posts"
import { getUsers } from "../../managers/users"
import { getCategories } from "../../managers/categories"

export const PostList = () => {
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getPosts().then(postsData => setPosts(postsData))
        getUsers().then(usersData => setUsers(usersData))
        getCategories().then(categoriesData => setCategories(categoriesData))
    }, [])

    return (
        <div style={{ margin: "0rem 3rem" }}>
            <h1>Posts</h1>
            <article className="posts">
                {
                    posts.map(post => {
                        const user= users.find(user => user.id === post.user_id) || []
                        const category = categories.find(category => category.id === post.category_id) || []
                        return <section className="post">
                            <div>==============================</div>
                            <div>Post Title: {post.title}</div>
                            <div>Author: {user.first_name} {user.last_name}</div>
                            <div>Category: {category.label}</div>
                        </section>
                    })
                }
            </article>
        </div>
    )


}