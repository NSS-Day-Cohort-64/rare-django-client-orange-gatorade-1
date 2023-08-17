export const GetAllReactions = () => {
  return fetch(`http://localhost:8000/reactions`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
  }).then((res) => res.json());
};

export const CreateReaction = (reaction) => {
  return fetch(`http://localhost:8000/reactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
    },
    body: JSON.stringify(reaction),
  }).then((res) => res.json());
};
