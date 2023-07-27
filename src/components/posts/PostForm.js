import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCategories } from "../../managers/categories"


export const PostForm = ({ token }) => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [categories, setCategories] = useState([])
    const [post, update] = useState({
        user_id: 0,
        category_id: 0,
        title: "",
        publication_date: new Date().toISOString().split('T')[0],
        image_url: "",
        content: "",
        approved: false
    })

    useEffect(() => {
        getCategories()
            .then((categoryList) => {
                setCategories(categoryList);
            })

    }, []);

    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const messageToSendToAPI = {
            user_id: parseInt(token),
            category_id: post.category_id,
            title: post.title,
            publication_date: post.publication_date,
            image_url: post.image_url,
            content: post.content,
            approved: true

        }
        fetch(`http://localhost:8088/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/posts/:postId")

            })

    }

    return (
        <form className="postForm">
            <h2 className="postFormHeader">Create a Post</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="postHTML" className="postTitle">Title:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="THINK OF A FUN TITLE"
                        value={post.title}
                        onChange={(evt) => {
                            const copy = { ...post }
                            copy.title = evt.target.value
                            update(copy)


                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category" className="label-bold">Category:</label>
                    <select
                        value={post.category_id}
                        onChange={(evt) => {
                            const copy = { ...post };
                            copy.category_id = parseInt(evt.target.value);
                            update(copy);
                        }}
                        className="form-control"
                    >
                        <option value="0">Select Your Category</option>
                        {categories.map((category) => (
                            <option
                                key={`categoryType--${category.id}`}
                                value={category.id}
                            >
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="imagePost" className="imagePost">Image:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={post.image_url}
                        onChange={(evt) => {
                            const copy = { ...post }
                            copy.image_url = evt.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content" className="contentPost">Content:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={post.content}
                        onChange={(evt) => {
                            const copy = { ...post }
                            copy.content = evt.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>

            <button
                onClick={
                    (clickEvent) => { handleSaveButtonClick(clickEvent) }
                }
                className="btn btn-primary">
                Submit
            </button>
        </form>
    )
}
