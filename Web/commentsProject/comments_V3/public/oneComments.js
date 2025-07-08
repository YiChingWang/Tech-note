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
    li.innerHTML = `
                    <h1>Comment ID : ${comment.id}</h1>
                    <p>${comment.username} : ${comment.comment}</p>
                    <a href="http://localhost:3000/comments/${comment.id}/edit">Edit Comment!</a>
                    <button class="delete_button">Delete Comment!</button>
    `;
    ul.appendChild(li);
    const deleteBTN = li.querySelector(".delete_button");
    console.log(deleteBTN);

    deleteBTN.addEventListener("click", () => {
      fetch(`/api/comments/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Delete", data);
          window.location.href = "/comments";
        })
        .catch((err) => {
          console.log("Error", err);
        });
    });
  })
  .catch((err) => {
    console.log("error : ", err);
  });
