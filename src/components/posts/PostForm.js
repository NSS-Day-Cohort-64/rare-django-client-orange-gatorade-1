import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../managers/categories";
import { getTags } from "../../managers/TagManager";


export const PostForm = ({ token }) => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
    const [categories, setCategories] = useState([]);
    const [formError, setFormError] = useState(false);

    // Default state for all tags to list on form
    const [tagList, setTagList] = useState([])
    // Track state for tags being added to post
    const [tagsOnPost, updateTagsOnPost] = useState([])


    const [post, update] = useState({
        category_id: 0,
        title: "",
        image_url: "",
        content: ""
    });

    useEffect(() => {
        getCategories()
            .then((categoryList) => {
                setCategories(categoryList);
            });
    }, []);

    useEffect(
        () => {
            getTags(token)
                .then(tagData => setTagList(tagData))
        },
        []
    )

    const navigate = useNavigate();

    const handleSaveButtonClick = (event) => {
        event.preventDefault();
        if (!post.title || post.category_id === 0 || !post.image_url || !post.content) {
            setFormError(true);
            return;
        }
        const postBody = {
            category: post.category_id,
            title: post.title,
            image_url: post.image_url,
            content: post.content,
            tags: tagsOnPost
        };

        fetch(`http://localhost:8000/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(postBody)
        })
            .then(response => response.json())
            .then((data) => {
                const createdPostId = data.id
                console.log("New Post", data)
                navigate(`/posts/${createdPostId}`)
            });
    };

    const addOrRemoveTag = (e) => {
        const checkedTagId = parseInt(e.target.value)
        console.log("checkedTagId", checkedTagId)
        if (tagsOnPost.includes(checkedTagId)) {
            const updatedTags = tagsOnPost.filter(tagId => tagId !== checkedTagId)
            updateTagsOnPost(updatedTags)
        } else {
            const copy = [ ...tagsOnPost ]
            copy.push(checkedTagId)
            updateTagsOnPost(copy)
        }
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
                            const copy = { ...post };
                            copy.title = evt.target.value;
                            update(copy);
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
                        required 
                        type="text"
                        className="form-control"
                        value={post.image_url}
                        onChange={(evt) => {
                            const copy = { ...post };
                            copy.image_url = evt.target.value;
                            update(copy);
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content" className="contentPost">Content:</label>
                    <input
                        required 
                        type="text"
                        className="form-control"
                        value={post.content}
                        onChange={(evt) => {
                            const copy = { ...post };
                            copy.content = evt.target.value;
                            update(copy);
                        }}
                    />
                </div>
            </fieldset>

            <fieldset>
                <h3 className="is-size-5 has-text-weight-bold mt-3">Add Tags to Your Post</h3>
                <section className="py-2 px-4">
                {
                    tagList.length > 0 &&
                    tagList.map((tag) => {
                        return <div key={`tagCheck--${tag.id}`}>
                            <label>
                                <input
                                    type="checkbox"
                                    value={tag.id}
                                    checked={tagsOnPost.includes(tag.id)}
                                    onChange={(e) => addOrRemoveTag(e)}
                                />
                                {tag.label}
                            </label>
                        </div>
                    })
                }
                </section>
            </fieldset>

            <button
                onClick={(clickEvent) => { handleSaveButtonClick(clickEvent) }}
                className="btn btn-primary"
            >
                Submit
            </button>

            {formError && <div className="alert alert-danger">Please fill in all of the required fields. You will not be approved until you do so. We don't mess around here.</div>}
        </form>
    );
};
