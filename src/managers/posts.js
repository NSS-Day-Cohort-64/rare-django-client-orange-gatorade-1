export const getPosts = () => {
    return fetch("http://localhost:8088/posts")
        .then(res => res.json())
}

export const viewUserPost = ({ token }) => {
  const userId = parseInt(token);
  return fetch(`http://localhost:8088/posts?user=${userId}`)
    .then((res) => res.json());
};
