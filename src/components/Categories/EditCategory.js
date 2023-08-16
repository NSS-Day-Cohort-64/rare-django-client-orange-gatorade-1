import { useEffect, useState } from "react"
import { editCategory, getCategories, getCategory, postCategories } from "../../managers/categories"

export const EditCategory = ({ categoryId, updateShowEditForm, categoryList, updateCategories }) => {
    const [category, updateCategory] = useState({})

    useEffect(() => {
        getCategory(categoryId)
            .then((categoryToEdit) => {
                updateCategory(categoryToEdit)
            })
    }, [])


    const handleSubmitCategory = async (e) => {
        e.preventDefault()

        // Check if the category is already in database
        const alreadyAdded = categoryList.some(existingCategory => existingCategory.label === category.label)

        if (!alreadyAdded && category.label.length > 0) {
            await editCategory(category)
            updateCategories()
            updateShowEditForm(0)
        } else if (alreadyAdded) {
            window.alert("Category already in database")
        } else {
            window.alert("Please enter a category name")
        }
    }

    return <>
        <div className="addCategory">
            <label htmlFor="addCategory_input">Edit Category:</label>
            <div>
                <input
                    type="text"
                    className="category__input"
                    placeholder="Enter your category"
                    id="addCategory_input"
                    defaultValue={category.label}
                    onChange={
                        (changeEvent) => {
                            const copy = { ...category }
                            copy.label = changeEvent.target.value
                            updateCategory(copy) // Updating new category with value of copy
                        }
                    } />
            </div>
        </div>
        <button className="btn-secondary btn-group-left"
            onClick={(click) => handleSubmitCategory(click)}
        >Submit Edit</button>

        <button className="btn-secondary btn-group-right"
            onClick={(e) => {
                e.preventDefault()
                updateShowEditForm(0)
            }}
        >Cancel</button>
    </>
}