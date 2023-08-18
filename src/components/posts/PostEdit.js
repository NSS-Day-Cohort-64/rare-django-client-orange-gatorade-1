import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCategories } from "../../managers/categories";
import { getPostById, putPost } from "../../managers/posts";
import { getTags } from "../../managers/TagManager";



export const PostEdit = () => {
    const [categories, setCategories] = useState([])

    // Default state for all tags to list on form
    const [tagList, setTagList] = useState([])
    // Track original tags on post
    const [originalPostTags, setOriginalPostTags] = useState([])
    // Track state for tags on post
    const [tagsOnPost, updateTagsOnPost] = useState([])
    const [tagObject, setTagObject] = useState({
        id: 0,
        label: ""
    })

    const [post, updatePost] = useState({
        title: "",
        category: 0, 
        image_url: "",
        content: "",
        author: 0,
        tags: []
    });
    const [postFetched, updatePostFetched] = useState(false)

    const { postId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (postId) {
            getPostById(postId)
                .then((data) => {
                    updatePost(data)
                    updatePostFetched(true)
                })
        }
    }, [postId])

    useEffect(() => {
        getCategories()
            .then((categoryList) => {
                setCategories(categoryList);
            });
    }, []);

    useEffect(
        () => {
            getTags()
                .then(tagData => setTagList(tagData))
        },
        []
    )

    useEffect(() => {
        if (postFetched === true) {
            const data = tagList.filter(tag => post.tags.some(postTag => postTag.id === tag.id))
            updateTagsOnPost(data)
            setOriginalPostTags(data)
        }
    }, [postFetched])



    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        // Format tags to add/delete for API
        let editedPost = { ...post }
        const editedTags = [...tagsOnPost]
        editedPost.tags = editedTags.map(tag => tag.id)
        editedPost.category = editedPost.category.id
        editedPost.author = editedPost.author.id
        putPost(postId, editedPost).then(navigate(`/posts/${post.id}`))
    }

    const handleEditTags = (evt) => {
        const newTag = { ...tagObject }
        newTag.id = parseInt(evt.target.value)
        newTag.label = tagList.find(tag => tag.id === newTag.id)?.label || ''
        const copy = [...tagsOnPost]
        const updatedTag = copy.findIndex((oldTag) => oldTag.id === newTag.id)
        if (updatedTag !== -1) {
            copy.splice(updatedTag, 1)
        } else {
            copy.push(newTag)
        }
        updateTagsOnPost(copy)
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
                        value={post.category?.id}
                        onChange={(evt) => {
                            const copy = { ...post };
                            copy.category.id = parseInt(evt.target.value);
                            updatePost(copy);
                        }}
                        className="form-control"
                    >
                        <option value="0" >Select Your Category</option>
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

            <fieldset>
                <h3 className="is-size-5 has-text-weight-bold mt-3">Add Tags to Your Post</h3>
                <section className="py-2 px-4">
                    {
                        tagList.length > 0 &&
                        tagList.map((tag) => {
                            const tagOnPost = tagsOnPost.find((tagOnPost) => tagOnPost.id === tag.id);
                            const checked = tagOnPost ? true : false;
                            return <div key={`tagEditCheck--${tag.id}`}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={tag.id}
                                        checked={checked}
                                        onChange={(e) => handleEditTags(e)}
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
                Save Changes
            </button>
            <button onClick={() => (navigate(`/my-posts/`))}>
                Cancel
            </button>
        </form>
    );
};


