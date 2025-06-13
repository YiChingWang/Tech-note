# 🪦 DEADJOKE API 小作品

## 🎯 目的

這個小專案是為了練習 JavaScript 中的非同步處理與 API 串接，包含以下技術重點：

- callback function
- Promise
- `.then()` 與 `async/await`
- try/catch 錯誤處理
- 串接外部 API 並更新 DOM

---

## 🧩 專案簡介

本專案串接 [icanhazdadjoke API](https://icanhazdadjoke.com/)，透過使用者點擊按鈕的方式，從 API 獲取一則新的笑話並顯示在畫面上。

---

## 🛠️ 使用技術

- HTML
- JavaScript
- Axios（HTTP 請求）
- async / await（非同步處理）
- try / catch（錯誤處理）

---

## 💻 展示畫面

（可在這裡放上截圖或 demo link）

---

## 🔍 實作細節

1.一開始我先用 axios 寫一個簡單的 function 測試 API 是否能成功串接。

2.接著我改用 async/await 的方式包裝 axios，並加入 try/catch 做錯誤處理。

3.原本我把 API 請求和 DOM 操作寫在同一個 async function 裡，但後來為了讓邏輯更清晰、可維護，我拆成兩個函式：

getJoke()：負責取得資料

addJoke()：負責 DOM 更新

### 程式結構拆分：

- `getJoke()`：async function，透過 axios 發送請求並取得 joke。
- `addJoke()`：async function，呼叫 `getJoke()` 並將 joke 顯示在畫面上。

## 😵‍💫 遇到的困難：

-一開始 async/await 的語法讓我有點混亂，尤其是搭配錯誤處理時常常寫到邏輯錯亂。

-寫 DOM 操作時，還在學習怎麼避免每次點擊都重複 append。

## ✅ 學到的事情 / 小發現

1.如果我只是想「呼叫」一個 async function（例如觸發事件），但不需要拿它 return 的資料來做後續處理，其實不一定要加 await，直接呼叫就可以。

```js
document.querySelector(".button").addEventListener("click", () => {
  addJoke();
});
```

2.如果我想讓畫面每次只出現一個新的 joke，而不是累積一堆段落，我可以選擇在每次 append 前先清空容器的 innerHTML。像這樣：

```js
jokes.innerHTML = "";
jokes.append(p);
```

## 📝 心得

-當我真的理解 async/await 的運作方式後，寫起來就順手很多了。這個小專案雖然不大，但讓我更有信心面對非同步流程與 API 串接。
