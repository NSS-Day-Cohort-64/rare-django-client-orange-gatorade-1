import { useEffect, useState } from "react"
import { getPosts, getPostsByCategory, getPostsByUser } from "../../managers/posts"
import { getUsers } from "../../managers/users"
import { getCategories } from "../../managers/categories"
import { Link} from "react-router-dom"

export const PostList = () => {
    const [posts, setPosts] = useState([])
    const [ filteredPosts, setFilteredPosts ] = useState([])
    const [users, setUsers] = useState([])
    const [categories, setCategories] = useState([])
    // State to track if filter options selected
    const [filterByCat, updateFilterByCat] = useState(false)
    const [filterByUser, updateFilterByUser] = useState(false)
    // State to track posts filtered by each filter option for easy toggling
    const [onlyUsersPosts, setOnlyUsersPosts] = useState([])
    const [onlyPostsByCat, setOnlyPostsByCat] = useState([])


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

    const handleCategoryChange = (event) => {
        const categoryId = parseInt(event.target.value)
        // Filter ONLY by category
        if(categoryId !== 0 && !filterByUser) {
            updateFilterByCat(true)
            getPostsByCategory(categoryId).then(data => {
                setFilteredPosts(data)
                setOnlyPostsByCat(data)})
        // Filter by category AND user
        } else if (categoryId !== 0 && filterByUser) {
            updateFilterByCat(true)
            getPostsByCategory(categoryId).then(data => {
                setOnlyPostsByCat(data)
                const filteredByBoth = onlyUsersPosts.filter(postByUser => data.some(postByCat => postByCat.id === postByUser.id))
                console.log("filteredByBoth", filteredByBoth)
                setFilteredPosts(filteredByBoth)
            })
        // When category deselected and user still selected
        } else if (categoryId === 0 && filterByUser) {
            updateFilterByCat(false)
            setFilteredPosts(onlyUsersPosts)
            setOnlyPostsByCat([])
        // Both filters deselected, Return to default
        } else {
            updateFilterByCat(false)
            setOnlyPostsByCat([])
            setFilteredPosts(posts)
        }
    }

    const handleAuthorChange = (event) => {
        const selectedUserId = parseInt(event.target.value)
        // Filter ONLY by user
        if(selectedUserId !== 0 && !filterByCat) {
            updateFilterByUser(true)
            getPostsByUser(selectedUserId).then(data => {
                setFilteredPosts(data)
                setOnlyUsersPosts(data)})
        // Filter by category AND user
        } else if (selectedUserId !== 0 && filterByCat) {
            updateFilterByUser(true)
            getPostsByUser(selectedUserId).then(data => {
                setOnlyUsersPosts(data)
                const filteredByBoth = onlyPostsByCat.filter(postByCat => data.some(postByUser => postByUser.id === postByCat.id))
                console.log("filteredByBoth", filteredByBoth)
                setFilteredPosts(filteredByBoth)
            })
        // When user deselected and category still selected
        } else if (selectedUserId === 0 && filterByCat) {
            updateFilterByUser(false)
            setOnlyUsersPosts([])
            setFilteredPosts(onlyPostsByCat)
        // Both filters deselected, Return to default
        } else {
            updateFilterByUser(false)
            setOnlyUsersPosts([])
            setFilteredPosts(posts)
        }
    }

    return (
        <div style={{ margin: "0rem 3rem" }}>
            <h1>Posts</h1>
            <div className="form-group">
                <label htmlFor="category">Category: </label>
                <select name="category" className="form-control"
                    onChange={handleCategoryChange}>
                    <option value={0}>Select a category</option>
                    {
                    categories.map(category => (
                        <option key={`catFilter--${category.id}`} value={category.id}>
                        {category.label}
                        </option>
                    ))
                    }
                </select>

                <label htmlFor="filterByUser">Category: </label>
                <select name="filterByUser" className="form-control"
                    onChange={handleAuthorChange}>
                    <option value={0}>Filter By Author</option>
                    {
                    users.map(user => (
                        <option key={`userFilter--${user.id}`} value={user.id}>
                        {user.first_name} {user.last_name}
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
                        return <section className="post" key={`postList--${post.id}`}>
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