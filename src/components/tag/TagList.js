import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getTags } from "../../managers/TagManager"

export const TagList = () => {
  const [tags, setTags] = useState([])
  const navigate = useNavigate()

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
    <div style={{ margin: "0rem 3rem" }}>
        <h1>Tags</h1>

        <div className="tags">
            {tags.map((tag) => (
                <section className="tag" key={tag.id}>
                  <div className="tagLabel">{tag.label}</div>
                  <footer>{deleteButton()}</footer>
                  <footer>{editButton()}</footer>
                </section>
              ))}
        </div>
    </div>
  )
}
