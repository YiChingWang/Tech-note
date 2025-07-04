//如果我們今天要自己傳送form，那我們就要用fetch然後我們就要用e.preventdefault(),然後
//我們還要手動將頁面導回window.location.href = "/comments"; // 送出後回到留言列表頁
//但這樣就不需要redirect去跳回首頁

const form = document.querySelector(".commentform");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = form.username.value.trim();
  const comment = form.comment.value.trim();

  if (!username || !comment) return;
  fetch("/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, comment }),
  })
    .then((res) => res.json())
    .then((newComment) => {
      // 不要 addCommentToDOM，因為這個頁面沒有 ul
      window.location.href = "/comments"; // 送出後回到留言列表頁
    })
    .catch((err) => {
      console.log("error : ", err);
    });
});
