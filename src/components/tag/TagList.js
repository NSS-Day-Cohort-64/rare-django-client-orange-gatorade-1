import { useState, useEffect } from "react"
import { getTags } from "../../managers/TagManager"
import { CreateTag } from "./CreateTag"

export const TagList = () => {
  const [tags, setTags] = useState([])
  const [showForm, updateShowForm] = useState(false)

  const updateTags = () => {
    getTags().then(tagData => setTags(tagData))
  }

  useEffect(() => {
      getTags().then(tagData => setTags(tagData))
  }, [])

    const deleteButton = () => {
        return (<button>Delete </button>)
        } 

    const editButton = () => {
        return(<button> Edit</button>)
    }

  return (
    <article className="is-flex is-justify-content-space-evenly">
    <div style={{ margin: "0rem 3rem" }} className="column is-two-thirds">
        <h1>Tags</h1>

        <div className="tags column is-full is-justify-content-space-evenly">
            {tags.map((tag) => (
                <section className="tag" key={tag.id}>
                  <div className="tagLabel">{tag.label}</div>
                  <footer>{deleteButton()}
                  {editButton()}</footer>
                </section>
              ))}
        </div>
    </div>

    <section className="createTag column">
          {
            showForm
              ? <CreateTag
                updateShowForm={updateShowForm}
                tagList={tags}
                updateTags={updateTags} />
              : <button className="showCreateTag"
                onClick={click => updateShowForm(!showForm)}
              >Create New</button>
          }
          </section>
    </article>
  )
}
