import { useState, useEffect } from "react";
import { getTags } from "../../managers/TagManager";
import { CreateTag } from "./CreateTag";

export const TagList = ({ token }) => {
  const [tags, setTags] = useState([]);
  const [showForm, updateShowForm] = useState(false);

  const updateTags = () => {
    getTags(token).then((tagData) => setTags(tagData));
  };

  useEffect(() => {
    getTags(token).then((tagData) => setTags(tagData));
  }, []);

  const deleteButton = (id, event) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tag?"
    );
    if (confirmDelete) {
      fetch(`http://localhost:8000/tags/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("auth_token")}`,
        },
      }).then(() => {
        updateTags();
      });
    }
  };

  const editButton = () => {
    return <button> Edit</button>;
  };

  return (
    <article className="is-flex is-justify-content-space-evenly">
      <div style={{ margin: "0rem 3rem" }} className="column is-two-thirds">
        <h1>Tags</h1>

        <div className="tags column is-full is-justify-content-space-evenly">
          {tags.map((tag) => (
            <section className="tag" key={tag.id}>
              <div className="tagLabel">{tag.label}</div>
              <button className="editButton" onClick={editButton}>
                Edit
              </button>
              <button
                className="deleteButton"
                onClick={(event) => deleteButton(tag.id, event)}
              >
                Delete
              </button>
            </section>
          ))}
        </div>
      </div>

      <section className="createTag column">
        {showForm ? (
          <CreateTag
            token={token}
            updateShowForm={updateShowForm}
            tagList={tags}
            updateTags={updateTags}
          />
        ) : (
          <button
            className="showCreateTag"
            onClick={(click) => updateShowForm(!showForm)}
          >
            Create New
          </button>
        )}
      </section>
    </article>
  );
};
