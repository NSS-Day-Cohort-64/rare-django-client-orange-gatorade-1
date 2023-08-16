export const getTags = () => {
  return fetch("http://localhost:8000/tags", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
})
      .then(res => res.json())
}

export const postTags = (newTag) => {
  return fetch("http://localhost:8000/tags", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Token ${localStorage.getItem("auth_token")}`
      },
      body: JSON.stringify(newTag)
  }).then(res => res.json())
}

export const postTagRelationships = (postId, tagsToPost) => {
  const postBody = [postId, tagsToPost]

  return fetch("http://localhost:8000/post_tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify(postBody)
  }).then(res => res.json())
}

export const getPostTagsByPostId = (postId) => {
  return fetch(`http://localhost:8000/post_tags?post=${postId}`, {
    headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
})
      .then(res => res.json())
}

export const deleteTagRelationships = (postTagIdArray) => {

  return fetch("http://localhost:8000/post_tags+bulk_delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify(postTagIdArray)
  })
}

export const editTags = (id, editedTag) => {
  return fetch(`http://localhost:8000/tags/${id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Token ${localStorage.getItem("auth_token")}`
      },
      body: JSON.stringify(editedTag)
  })
}