import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCategories } from "../../managers/categories";
import { getPostById, putPost } from "../../managers/posts";
import { deleteTagRelationships, getPostTagsByPostId, getTags, postTagRelationships } from "../../managers/TagManager";



export const PostEdit = () => {
    const [categories, setCategories] = useState([])

    // Default state for all tags to list on form
    const [tagList, setTagList] = useState([])
    // Track original tags on post
    const [originalPostTags, setOriginalPostTags] = useState([])
    // Track state for tags on post
    const [tagsOnPost, updateTagsOnPost] = useState([])
    // Track state for tags being removed/added
    const [tagsToRemove, updateTagsToRemove] = useState([])
    const [tagsToAdd, updateTagsToAdd] = useState([])

    const [post, updatePost] = useState({
        user_id: 0,
        category_id: 0,
        title: "",
        publication_date: new Date().toISOString().split('T')[0],
        image_url: "",
        content: "",
        approved: 0,
        tag: []
    })

    const { postId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (postId) {
            getPostById(postId)
                .then((data) => {
                    updatePost(data)
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
        if (post && post.tags && tagList) {
            const data = tagList.filter(tag => post.tags.some(postTag => postTag.id === tag.id))
            updateTagsOnPost(data)
            setOriginalPostTags(data)
        }
    }, [post, tagList])



    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        // Format tags to add/delete for API
        const addTagsArray = tagsToAdd.map(t => t.id)
        const removeTagsArray = tagsToRemove.map(t => t.id)

        putPost(postId, post)
            .then(() => {
                if (tagsToAdd.length > 0) {
                    postTagRelationships(parseInt(postId), addTagsArray)
                    console.log(`${tagsToAdd.length} tags added`)
                }
            })
            .then(() => {
                if (tagsToRemove.length > 0) {
                    deleteTagRelationships(removeTagsArray)
                    console.log(`${tagsToRemove.length} tags removed`)
                }
            })
            .then(() => {
                navigate(`/posts/${postId}`)
                //Then they should be directed to that post's detail page with the updated information
            })

    }

    const handleEditTags = (e) => {
        const checkedTagId = parseInt(e.target.value)
        console.log("checkedTagId", checkedTagId)
        const alreadyAdded = tagsToAdd.some(t => t.id === checkedTagId)
        const alreadyDeleted = tagsToRemove.some(t => t.id === checkedTagId)
        const currentlyOnPost = tagsOnPost.some(t => t.id === checkedTagId)
        const originallyOnPost = originalPostTags.some(t => t.id === checkedTagId)

        if (currentlyOnPost) {
            // Find tag to remove
            const tagToRemove = tagsOnPost.find(t => t.id === checkedTagId)
            // Update tagsOnPost
            const updatedTags = tagsOnPost.filter(t => t.id !== checkedTagId)
            updateTagsOnPost(updatedTags)
            // Stage the post_tag for deletion
            if (originallyOnPost) {
                const copy = [...tagsToRemove]
                copy.push(tagToRemove)
                updateTagsToRemove(copy)
            }
            if (alreadyAdded) {
                // Remove tag from add list
                const updatedTags = tagsToAdd.filter(t => t.id !== checkedTagId)
                updateTagsToAdd(updatedTags)
            }
        } else { // if not currently on post
            if (alreadyDeleted) {
                // Find tag to undo delete
                const tagToUndoDelete = tagsToRemove.find(t => t.id === checkedTagId)
                const updatedTags = tagsToRemove.filter(t => t.id !== checkedTagId)
                updateTagsToRemove(updatedTags)
                // Add tag back to tagsOnPost
                const copy = [...tagsOnPost]
                copy.push(tagToUndoDelete)
                updateTagsOnPost(copy)
            } else {
                // Add a new tag to tagsOnPost
                const newPostTag = {
                    id: 0,
                    post_id: postId,
                    tag_id: checkedTagId
                }
                const tagsOnPostCopy = [...tagsOnPost]
                tagsOnPostCopy.push(newPostTag)
                updateTagsOnPost(tagsOnPostCopy)
                // stage the tag relationship to be added
                const addedCopy = [...tagsToAdd]
                addedCopy.push(newPostTag)
                updateTagsToAdd(addedCopy)
            }
        }
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

            <fieldset>
                <h3 className="is-size-5 has-text-weight-bold mt-3">Add Tags to Your Post</h3>
                <section className="py-2 px-4">
                    {
                        tagList.length > 0 &&
                        tagList.map((tag) => {
                            return <div key={`tagEditCheck--${tag.id}`}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={tag.id}
                                        checked={tagsOnPost.some(t => t.id === tag.id)}
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
        </form>
    );
};


