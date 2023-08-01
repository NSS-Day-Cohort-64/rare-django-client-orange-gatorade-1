export const getTags = () => {
  return fetch("http://localhost:8088/tags")
      .then(res => res.json())
}

export const postTags = (newTag) => {
  return fetch("http://localhost:8088/tags", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify(newTag)
  }).then(res => res.json())
}

export const postTagRelationships = (postId, tagsToPost) => {
  const postBody = [postId, tagsToPost]

  return fetch("http://localhost:8088/post_tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(postBody)
  }).then(res => res.json())
}

export const getPostTagsByPostId = (postId) => {
  return fetch(`http://localhost:8088/post_tags?post=${postId}`)
      .then(res => res.json())
}

export const deleteTagRelationships = (postTagIdArray) => {

  return fetch("http://localhost:8088/post_tags+bulk_delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(postTagIdArray)
  }).then(res => res.json())
}