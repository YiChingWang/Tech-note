//用 fetch 向 API /api/comments 發送請求 → 接收 JSON 格式資料
//→ 解析後渲染到 HTML 頁面上。
const ul = document.querySelector(".comments");
fetch("/api/comments")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((comment) => {
      const li = document.createElement("li");
      li.innerHTML = `<p>${comment.username} : ${comment.comment}</p>`;
      ul.appendChild(li);
    });
  })
  .catch((err) => {
    console.log("error : ", err);
  });
