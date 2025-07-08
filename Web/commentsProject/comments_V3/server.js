let express = require("express");
const { v4: uuidv4 } = require("uuid");
//因為我們要用http verb patch，所以我們需要用method-override
const methodOverride = require("method-override");
//everytime call this method we will got a new unique id
uuidv4();
let path = require("path");
let app = express();
let port = 3000;
app.use(express.static(path.join(__dirname, "public")));
//這邊也要記得寫method-override
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//fake database
let comments = [
  { id: uuidv4(), username: "Amy", comment: "lol its so funny" },
  { id: uuidv4(), username: "Ted", comment: "Sooo proud of u!!" },
  { id: uuidv4(), username: "Amenda", comment: "so pretty." },
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
  res.sendFile(path.join(__dirname, "public", "oneComments.html"));
});
app.get("/comments/:id/edit", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "updateComments.html"));
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

  const newComment = { username, comment, id: uuidv4() };
  comments.push(newComment);
  //使用 201 Created 的狀態碼，告訴前端「新增成功」
  //把新增的資料（例如留言內容）當作 JSON 傳給前端
  // res.status(201).json(newComment);

  // 伺服器控制跳轉頁面
  res.redirect("/comments");
  // res.send("successfully leave a comment!");
});

app.get("/api/comments/:id", (req, res) => {
  const { id } = req.params;
  //從params拿出得id是string
  //check id是不是數字
  // if (isNaN(id)) {
  //   return res.status(400).json({ error: "Invalid ID format" });
  // }
  const comment = comments.find((c) => c.id === id);
  if (!comment) {
    return res.status(404).json({ error: "Comment not found!" });
  }
  res.json(comment);
});

app.patch("/api/comments/:id", (req, res) => {
  //先extract id, 然後去看看現在要更新訊息的id跟這個extract出來的id是否一樣
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  if (!comment) {
    return res.status(404).json({ error: "comment not found" });
  }
  //一樣的話就拿到這個newComment然後更新comment.comment
  const newComment = req.body.comment;
  comment.comment = newComment;
  res.json({ message: "updated" });
});
app.delete("/api/comments/:id", (req, res) => {
  const { id } = req.params;
  //用filter delete specific comment 然後回傳一個新的array並把它命名為latestComments
  const latestComments = comments.filter((c) => c.id !== id);
  //當我們要把新的陣列賦值回comments時，我們的comment array在設定時就要用let不能用const
  //因為const一旦賦值後就不能做任何更改
  comments = latestComments;
  return res.json({ message: "deleted" });
});

app.get(/(.*)/, (req, res) => {
  res.send("cannot find any route!!");
});

app.listen(port, (req, res) => {
  console.log(`http://localhost:${port}`);
});
