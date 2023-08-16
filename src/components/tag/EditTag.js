import { useEffect, useState } from "react"
import { editTags } from "../../managers/TagManager";

export const EditTag = ({ tag, updateShowEditForm, tagList, updateTags }) => {
    const [editedTag, updateEditedTag] = useState({ label: "" });
    const [tagId, setTagId] = useState()

    useEffect(() => {
        const copy = { ...editedTag }
        copy.label = tag.label
        updateEditedTag(copy)
        setTagId(tag.id)
    }, [])


    const handleSaveTag = (e) => {
        e.preventDefault()

        // Check if the tag is already in database
        const alreadyAdded = tagList.some(existingTag => existingTag.label === editedTag.label)

        if (!alreadyAdded && editedTag.label.length > 0) {
            editTags(tagId, editedTag)
                .then(() => {
                    updateTags()
                    updateShowEditForm(0)
                })
                .catch((error) => {
                    console.error("An error occurred:", error)
                    window.alert("Something went wrong")
                })
        } else if (alreadyAdded) {
            window.alert("Tag already in database")
        } else {
            window.alert("Please enter a tag name")
        }
    }

    return <>
        <div className="editTag">
            <div>
                <input
                    type="text"
                    className="input is-small is-responsive"
                    placeholder="Enter your tag"
                    id="editTag_input"
                    value={editedTag.label}
                    onChange={
                        (changeEvent) => {
                            const copy = { ...editedTag }
                            copy.label = changeEvent.target.value
                            updateEditedTag(copy) // Updating new tag with value of copy
                        }
                    } />
            </div>
        </div>
        <button className="button is-small is-dark is-responsive is-success"
            onClick={(click) => handleSaveTag(click)}
        >Save</button>

        <button className="button is-small is-info is-dark is-responsive"
            onClick={(e) => {
                e.preventDefault()
                updateShowEditForm(0)
            }}
        >Cancel</button>
    </>
}