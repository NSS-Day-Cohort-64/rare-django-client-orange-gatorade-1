import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTags } from "../../managers/TagManager";


export const ManagePostTags = ({ token, postId, currentPost, originalTagsOnPost, updateEditTags, fetchPostDetails  }) => {

    // Default state for all tags to list on form
    const [tagList, setTagList] = useState([])
    // Track state for tags being added to post
    const [tagsOnPost, updateTagsOnPost] = useState([])
    const [postTagsFetched, updatePostTagsFetched] = useState(false)


    const [post, update] = useState({
        author_id: currentPost.author.id,
        category_id: currentPost.category.id,
        title: currentPost.title,
        image_url: currentPost.image_url,
        content: currentPost.content
    });

    useEffect(
        () => {
            getTags(token)
                .then(tagData => setTagList(tagData))
            if (!postTagsFetched) {
                const arrayOfTagIds = originalTagsOnPost.map(t => t.id)
                updateTagsOnPost(arrayOfTagIds)
                updatePostTagsFetched(true)
            }
        },
        []
    )

    const navigate = useNavigate();

    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const postBody = {
            author: post.author_id,
            category: post.category_id,
            title: post.title,
            image_url: post.image_url,
            content: post.content,
            tags: tagsOnPost,
            approved: true
        };

        fetch(`http://localhost:8000/posts/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify(postBody)
        })
            .then(() => {
                updateEditTags(false)
                fetchPostDetails()
                navigate(`/posts/${postId}`)
            });
    };

    const addOrRemoveTag = (e) => {
        const checkedTagId = parseInt(e.target.value)
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
        <article className="manageTagForm">

            <fieldset>
                <h3 className="is-size-5 has-text-weight-bold mt-3">Add Or Remove Tags</h3>
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
                Submit Changes
            </button>

            <button onClick={() => updateEditTags(false)}>Cancel</button>

        </article>
    );
};
