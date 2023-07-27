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
    <>
        <div className="labels">
          {
            tags.map(tag => <Tag key={tag.id} tag={tag} />)
          }
        </div>
    </>
  )
}
