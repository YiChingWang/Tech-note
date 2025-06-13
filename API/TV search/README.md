# 🎬 TV Show Search App

這是一個使用 [TVMaze API](https://www.tvmaze.com/api) 製作的 TV Show 搜尋器，用戶可以輸入關鍵字，查詢相關影集資訊並顯示於頁面上。

## 🔧 使用技術

- HTML / CSS
- JavaScript
- Axios
- Async / Await
- DOM 操作
- try / catch 錯誤處理

## 🚀 專案功能

1. 使用者在表單中輸入關鍵字並按下 Submit。
2. 使用 JavaScript 阻止預設的 `form` submit 行為（避免頁面刷新）。
3. 透過 Axios 向 TVMaze API 發送請求，取得與關鍵字相關的 TV Show 資料。
4. 資料回傳後，用 JavaScript 依序將每一個 TV Show 的資訊更新到 DOM 上。
5. 每次搜尋前會清空 `.movielist` 容器，確保畫面只顯示最新的搜尋結果。

## 🧠 開發重點

### `preventDefault()`

- 當使用者在 HTML 的 <form> 中按下 submit 按鈕時，預設行為會導致整個頁面重新整理，這樣會讓 JavaScript 管理的狀態或畫面上的資料全部被清除，非常不方便。為了避免這種情況，我們會在 submit 時使用 preventDefault()，主動攔截這個預設行為，讓我們能夠自行用 JavaScript 控制表單送出後的處理流程，而不是交給瀏覽器自動刷新頁面。

### 關鍵字處理

- 在表單送出時，我們通常會透過以下方式取得使用者輸入的關鍵字：

```js
keyword = form.elements.query.value;
```

- 雖然有很多種方法可以讀取 input 的值，但這種寫法簡單直接，方便搭配 form 元素。

```js
let keyword = "";
```

- 因為關鍵字需要在 function 外部被使用，所以在外層先定義，內部再更新。

### Axios + Async/Await 撰寫 API function

- 在撰寫與 API 互動的程式時，我使用了 axios 搭配 async/await 和 try/catch 來進行錯誤處理。因為拿到 API 的資料之後，我還需要在其他 function 中使用它，所以這邊的 async function 一定要有 return，否則外部將無法取得資料。為了讓邏輯更清楚，我把這段撰寫成一個名為 getMovieList() 的 async function，專門負責負責發送請求並回傳資料。這樣設計讓整體架構更乾淨，也方便後續的資料處理。

```js
const getMovieList = async () => {
  try {
    return await axios.get(`https://api.tvmaze.com/search/shows?q=${keyword}`);
  } catch (e) {
    console.log("Error: ", e.response.status);
  }
};
```

### DOM 操作 function（負責把資料更新到畫面）

- 完成 API 撰寫後，我開始實作更新 DOM 的功能。由於資料量較多，我將這部分包成一個獨立的 async function，命名為 showMovieList()。這個 function 的流程如下：

  1.先呼叫 getMovieList() 並等待其回傳的資料（data）。

  2.接著在 DOM 裡預先準備一個 container（例如 .movielist），作為動態加入每筆資料的父元素。

  3.用 forEach() 迴圈遍歷資料陣列，每一筆資料都：

-- 使用 document.createElement() 建立一個新的 <div> 元素（作為卡片）。

-- 使用 innerHTML 將節目名稱、播放時間、評分、圖片等資訊加入這個 <div>。

-- 使用 appendChild() 將這個新元素加到 container 裡。

4.為了避免每次搜尋結果堆疊在上一筆資料後面，我在迴圈前加上 container.innerHTML = ""，先清空原本的內容，這樣畫面才會正確更新。

最後，將這個 showMovieList() 綁定在 form 的 submit 事件中。這樣使用者每次按下搜尋按鈕，我的程式就會串接 API 並顯示對應的 TV show 清單，整體邏輯清楚，功能也拆分得比較乾淨。

```js
const showMovieList = async () => {
  const res = await getMovieList();
  const data = res.data;

  movielist.innerHTML = ""; // 每次搜尋都清空舊資料

  data.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <h2 class="card_name">Movie name : ${movie.show.name}</h2>
      <p class="card_time">Run Time : ${movie.show.runtime}</p>
      <p class="card_score">Score : ${movie.score}</p>
      <img class="card_img" src="${movie.show.image?.medium || ""}">
    `;

    movielist.appendChild(div);
  });
};
```

## ✅ 學習到的重點

- 學會了如何使用 Axios 串接 API 並處理資料。
- 更熟悉了 `async/await` 搭配 `try/catch` 的非同步處理方式。
- 知道了 `form` 需要用 `preventDefault()` 阻止預設行為，避免重整頁面。
- 學會了如何把多筆 object 的資料逐一渲染到 DOM。
- 學到每次搜尋前要記得清空畫面，否則新的資料會直接接在舊的底下。
- 練習了如何把程式碼模組化，把 API、DOM 處理各自拆成獨立的 function，讓程式更清楚易維護。

## ✅ 心得

- 現在的我越來越能掌握使用 Axios 串接 API，也更理解如何將資料和 DOM 結合在一起，實際呈現在畫面上。我也開始習慣將功能拆成不同的 function，讓每個 function 都只處理單一任務，讓程式碼更清楚好維護。

在串接 API 的過程中，我會透過 console.log() 查看拿到的資料格式，這讓我在處理資料時更有信心。我記得一開始看到「要做搜尋功能」時其實滿緊張的，腦中充滿問號，但現在我會告訴自己：「先做就對了！」很多東西其實做了就會漸漸理解、漸漸進步。

我也學到：如果一件事情看起來很難，可以先把它拆解成幾個簡單的小步驟，先練會每一小塊，最後再整合起來。這樣一來，不只是這個專案，未來遇到更多挑戰也會越來越能應對！

## 📎 備註

API 來源：[TVMaze Search API](https://api.tvmaze.com/search/shows?q=your_query)
