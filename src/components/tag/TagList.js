import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getTags } from "../../managers/tags"
import { Tag } from "./Tag"
import "./Tags.css"

export const TagList = () => {

  const [tags, setTags] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
      getTags()
  }, [])

  const onSearchTermChange = (value) => {
    setSearchTerm(value)
  }

  return (
    <div style={{ margin: "0rem 3rem" }}>
        <h1>Tags</h1>

        <div className="tags">
            {
            tags.map(tag => {
                return <Tag label={tag.label} />
            })
            }
        </div>
    </div>
  )
}
