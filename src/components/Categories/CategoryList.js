import { useEffect, useState } from "react";
import { getCategories } from "../../managers/categories";
import { CreateCategory } from "./CreateCategory";
import { useNavigate } from "react-router-dom";
import { EditCategory } from "./EditCategory";

export const CategoryList = () => {
  const [categoryList, setList] = useState([]);
  const [showForm, updateShowForm] = useState(false)
  const [showEditForm, updateShowEditForm] = useState(0)
  const navigate = useNavigate()

  const updateCategories = () => {
    getCategories().then((categoryList) => {
      setList(categoryList);
    });
  };

  useEffect(() => {
    getCategories().then((categoryList) => {
      setList(categoryList);
    });
  }, []);

  const deleteButton = (id, event) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmation) {
      fetch(`http://localhost:8000/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
      }).then(() => {
        updateCategories();
      });
    }
  };

  return (
    <article className="is-flex is-justify-content-space-evenly">
      <section className="categories">
        <h2 className="categoryList">List of Categories</h2>
        {categoryList
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((list) => (
            <section className="category" key={list.id}>
              <div className="categoryName">{list.label}</div>
              <section className="editCategory">
                {showEditForm === list.id ? (
                  <EditCategory
                    categoryId={list.id}
                    updateShowEditForm={updateShowEditForm}
                    categoryList={categoryList}
                    updateCategories={updateCategories}
                  />
                ) : (
                  <button
                    className="showCreateCategory"
                    onClick={(click) => updateShowEditForm(list.id)}
                  >
                    Edit
                  </button>
                )}
              </section>
              <button
                className="deleteButton"
                onClick={(event) => deleteButton(list.id, event)}
              >
                Delete
              </button>
            </section>
          ))}
      </section>
      <section className="createCategory">
        {showForm ? (
          <CreateCategory
            updateShowForm={updateShowForm}
            categoryList={categoryList}
            updateCategories={updateCategories}
          />
        ) : (
          <button
            className="showCreateCategory"
            onClick={(click) => updateShowForm(!showForm)}
          >
            Create New
          </button>
        )}
      </section>

    </article>
  );
};
