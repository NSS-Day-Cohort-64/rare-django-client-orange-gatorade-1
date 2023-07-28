import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCategories } from "../../managers/categories";
import { getPostById, putPost } from "../../managers/posts";


export const PostEdit = ({ token }) => {

export const PostEdit = () => {


    const [categories, setCategories] = useState([])
    
    const [post, updatePost] = useState({
        user_id: 0,
        category_id: 0,
        title: "",
        publication_date: new Date().toISOString().split('T')[0],
        image_url: "",
        content: "",
        approved: 0

    })

    const { postId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (postId) 
        
            { getPostById(postId)    
            .then((data) => {
                updatePost(data)
            })}
    }, [postId])

    useEffect(() => {
        getCategories()
            .then((categoryList) => {
                setCategories(categoryList);
            });
    }, []);

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        putPost(postId, post)
            .then(() => 
                navigate(`/posts/${postId}`)
                //Then they should be directed to that post's detail page with the updated information

            )

    }


    return (
        <form className="postForm">
            <h2 className="postFormHeader">Edit a Post</h2>

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
                            const copy = { ...post };
                            copy.title = evt.target.value;
                            updatePost(copy);
                        }}
                    />
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
                            updatePost(copy);
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
                            const copy = { ...post };
                            copy.image_url = evt.target.value;
                            updatePost(copy);
                        }}
                    />
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
                            const copy = { ...post };
                            copy.content = evt.target.value;
                            updatePost(copy);
                        }}
                    />
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => { handleSaveButtonClick(clickEvent) }}
                className="btn btn-primary"
            >
                Save Changes
            </button>
        </form>
    );
};


