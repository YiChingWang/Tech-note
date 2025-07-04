let express = require("express");
let path = require("path");
let app = express();
let port = 3000;
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//fake database
const comments = [
  { username: "Amy", comment: "lol its so funny" },
  { username: "Ted", comment: "Sooo proud of u!!" },
  { username: "Amenda", comment: "so pretty." },
];

//把某個實際存在的 HTML 檔案送給使用者（瀏覽器）顯示出來
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/comments", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "comments.html"));
});

app.get("/NewComments", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "addComments.html"));
});

app.get("/comments/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "comment.html"));
});

//api part
app.get("/api/comments", (req, res) => {
  res.json(comments);
});
app.post("/api/comments", (req, res) => {
  console.log(req.body);
  const { username, comment } = req.body;
  if (!username || !comment) {
    return res.status(400).json({ error: "no username or comment" });
  }

  const newComment = { username, comment };
  comments.push(newComment);
  //使用 201 Created 的狀態碼，告訴前端「新增成功」
  //把新增的資料（例如留言內容）當作 JSON 傳給前端
  // res.status(201).json(newComment);

  // 伺服器控制跳轉頁面
  res.redirect("/comments");
  // res.send("successfully leave a comment!");
});

app.get(/(.*)/, (req, res) => {
  res.send("cannot find any route!!");
});

app.listen(port, (req, res) => {
  console.log(`http://localhost:${port}`);
});
