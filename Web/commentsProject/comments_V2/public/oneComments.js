const ul = document.querySelector(".comment");
const pathParts = window.location.pathname.split("/");
// /comments/2 → ["", "comments", "2"]
const id = pathParts[pathParts.length - 1];
fetch(`/api/comments/${id}`)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Cannot find comment");
    }
    return res.json(); //要記得return
  })
  .then((comment) => {
    const li = document.createElement("li");
    li.innerHTML = `<p>${comment.username} : ${comment.comment}</p>
                    <a href="http://localhost:3000/comments/${comment.id}/edit">Edit Comment!</a>
    `;
    ul.appendChild(li);
  })
  .catch((err) => {
    console.log("error : ", err);
  });
