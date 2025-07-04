# 💬 Add Comment（留言系統）功能開發練習紀錄 - 加上 Update Message 功能

## 🧠 開發重點與學習收穫

---

### 1️⃣ HTML 原生 form 與 fetch/axios 的差異

#### 我學到的：

我原本以為 HTTP 原生 `<form>` 和 fetch/axios 只是用法不同，可以行選擇要用哪個，但實際開發後才發現：

- HTML 原生 `<form>` 只支援 `GET` 和 `POST` 方法，**不支援 `PATCH`、`DELETE`**
- 如果要用 `PATCH`、`DELETE`，就必須使用 fetch 或 axios 手動發送請求

#### 差異對照表：

| 方法類型       | 支援的 HTTP 方法                 | 是否需手動跳轉   | 適用場景                     |
| -------------- | -------------------------------- | ---------------- | ---------------------------- |
| HTML 原生 form | GET、POST                        | ❌（自動跳頁）   | 基本表單提交                 |
| fetch/axios    | 全部（GET、POST、PATCH、DELETE） | ✅（需手動跳頁） | 複雜操作、單頁應用、API 操作 |

---

### 2️⃣ 絕對路徑與相對路徑

#### 我學到的：

當我進入 `/edit` 頁面時，發現頁面顯示「cannot find any route」，一開始以為是 API 問題，結果其實是我在引入 JS 時用錯了路徑。

解決方式：

- **絕對路徑**：從網站根目錄 `/` 開始找，**不受當前網址影響**
- **相對路徑**：會以當前網址為起點，網址不同就可能找不到

#### 正確範例（推薦用絕對路徑）：

```html
<script src="/updateComments.js" defer></script>
```

#### 差異對照表：

| 路徑類型          | 起點         | 是否受網址影響 | 適用場景                         |
| ----------------- | ------------ | -------------- | -------------------------------- |
| 絕對路徑 `/` 開頭 | 網站根目錄   | ❌ 不受影響    | JS、CSS、圖片等靜態資源          |
| 相對路徑          | 目前網址位置 | ✅ 受影響      | 僅在相同目錄下小專案可用，不建議 |

---

### 3️⃣ 使用 `method-override` 讓 form 支援 PATCH/DELETE

#### 我學到的：

因為 HTML form 只支援 GET、POST，當我需要用 PATCH 更新留言時，就必須安裝 `method-override`。

#### 設定步驟：

1. 安裝套件：

```bash
npm install method-override
```

2. 在 `server.js` 加入：

```js
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
```

3. 在 HTML form 中加上 `_method`：

```html
<form method="POST" action="/comments/123?_method=PATCH"></form>
```

#### 說明表格：

| 功能     | 說明                                      |
| -------- | ----------------------------------------- |
| 套件名稱 | method-override                           |
| 主要用途 | 讓 form 支援 PATCH、DELETE                |
| 原理     | 用 POST 提交，再用 `_method` 指定真實方法 |

---

### 4️⃣ API 資料傳遞與 res.json 的用途

#### 我學到的：

當我們用 API 串接時，流程大致如下：

1. **前端** 傳送資料給後端 API（用 fetch、axios）
2. **後端** 用 `req.body`、`req.params` 等方式接收資料，處理後決定要傳哪些資料回前端
3. 用 `res.json()` 回傳資料給前端
4. **前端** 再用 `res.data`（axios）或 `.json()`（fetch）接收並處理回傳資料

#### 重點：

- 後端可以只傳需要的欄位，不一定要全部傳回
- 也可以加驗證訊息（如 `{ message: "updated" }`）來輔助前端操作

#### 簡單範例：

```js
res.json({
  message: "updated",
  comment: updatedComment,
});
```

#### API 資料流流程圖：

| 角色 | 行為                                 |
| ---- | ------------------------------------ |
| 前端 | 送資料（fetch/axios）                |
| 後端 | 接資料（req.body、req.params）並處理 |
| 後端 | 用 res.json 回傳需要的資料 + 訊息    |
| 前端 | 接收 response 資料、更新畫面         |

---

## ✅ 總結：

這次練習我學到最重要的觀念：

- HTML form 跟 fetch/axios 在 HTTP 方法與跳轉行為上的差異
- 正確使用絕對路徑，避免路徑錯誤
- 使用 `method-override` 讓 form 支援更多 HTTP 方法
- 後端 API 負責處理資料，前端 API 負責接收結果並更新畫面，`res.json` 是雙方溝通的橋樑

---
