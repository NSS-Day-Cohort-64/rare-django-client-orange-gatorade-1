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