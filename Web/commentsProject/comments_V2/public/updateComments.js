// 從 URL path 中擷取 id，例如 /comments/abc123/edit
const pathParts = window.location.pathname.split("/"); // ['', 'comments', 'abc123', 'edit']
const id = pathParts[2];

const form = document.querySelector(".updateForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const comment = form.comment.value.trim();
  fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ comment }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.message);
      window.location.href = "/comments";
    })
    .catch((err) => {
      console.log("error", err);
    });
});
