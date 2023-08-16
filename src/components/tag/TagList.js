import { useState, useEffect } from "react";
import { getTags } from "../../managers/TagManager";
import { CreateTag } from "./CreateTag";
import { EditTag } from "./EditTag";

export const TagList = ({ token }) => {
  const [tags, setTags] = useState([]);
  const [showForm, updateShowForm] = useState(false);
  const [showEditForm, updateShowEditForm] = useState(0);

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



  return (
    <article className="is-flex is-justify-content-space-evenly">
      <div style={{ margin: "0rem 3rem" }} className="column is-two-thirds">
        <h1>Tags</h1>

        <div className="tags columns column is-full is-justify-content-space-evenly mt-3">
          {tags.map((tag) => (
            <section className="tag box is-primary is-light column is-two-fifths py-5 is-justify-content-space-between" key={`editTag--${tag.id}`}>
              {showEditForm === tag.id ? (
                <EditTag
                  tag={tag}
                  updateShowEditForm={updateShowEditForm}
                  tagList={tags}
                  updateTags={updateTags}
                />
              ) : (<>
                    <div className="tagLabel pl-2">{tag.label}</div>
                    <section>
                      <button
                        className="button is-success is-light is-outlined is-small is-responsive ml-1"
                        onClick={(click) => updateShowEditForm(tag.id)}
                      >
                        Edit
                      </button>

                      <button
                        className="button is-info is-light is-small is-responsive is-outlined"
                        onClick={(event) => deleteButton(tag.id, event)}
                      >
                        Delete
                      </button>
                    </section>
              </>)}
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
