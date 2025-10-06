# 📝 React TodoList — 常見錯誤與備忘筆記

這份文件是我在做 TodoList（React 練習專案）時整理的常見問題與心得筆記。  
每當我 Debug 太久、或某個錯誤重複發生時，我就會記在這裡。  
（越寫越完整，未來面試或教別人時也超好用 💪）

---

## 🧩 1. `.map()` 忘記 `return`

### ❌ 錯誤寫法

```jsx
items.map((item) => {
  <div>{item.name}</div>; // 沒 return，這樣什麼都不會顯示
});
```

### ✅ 正確寫法

```jsx
items.map((item) => {
  return <div>{item.name}</div>;
});
```

或用簡寫：

```jsx
items.map((item) => <div>{item.name}</div>);
```

### 💡 小提醒

> 使用大括號 `{}` 時必須手動 `return`。  
> 使用小括號 `()` 時會自動回傳（更常用在 JSX）。

---

## 🎨 2. `style` 寫法老是搞錯

### ❌ 錯誤寫法

```jsx
<div style="color: green;">文字</div> // 像 HTML 寫法，錯
<div style={{style:"green"}}>文字</div> // 錯
```

### ✅ 正確寫法

```jsx
<div style={{ color: "green" }}>文字</div>
```

### 💡 小提醒

> React 的 `style` 要放一個 **JavaScript 物件**：
>
> - 第一層 `{}` → 插入 JS
> - 第二層 `{}` → 物件本身
> - CSS 屬性用「駝峰式」命名（例如 `backgroundColor`）

---

## 🔗 3. 傳很多層的 props

### ❌ 錯誤示範

每一層都解構會超亂：

```jsx
function Child({ user, onDelete, onUpdate, index }) {
  // 太多 props，後面維護超痛苦
}
```

### ✅ 正確建議

先整包傳下去，到「**需要用**」的那一層再解構：

```jsx
function Parent() {
  return <Child data={userData} />;
}

function Child({ data }) {
  const { name, email } = data; // 在這裡再解構就好
  return <p>{name}</p>;
}
```

### 💡 小提醒

> - 「提早解構」會讓 props 看起來亂。
> - 「在用的那一層再解構」可讓程式更乾淨。
> - 若層數太多可考慮用 Context 或 props drilling 優化。

---

## 🧠 4. `.map()` / `.filter()` / `.find()` 傻傻分不清

| 方法        | 用途                     | 回傳值                      | 常見用途           |
| ----------- | ------------------------ | --------------------------- | ------------------ |
| `.map()`    | 對每個元素做處理         | **新陣列**（長度相同）      | 顯示畫面、更新項目 |
| `.filter()` | 過濾符合條件的元素       | **新陣列**（可能變短）      | 刪除項目、篩選清單 |
| `.find()`   | 找出第一個符合條件的元素 | **單一物件** 或 `undefined` | 尋找單一目標項     |

### 範例：

```js
// map：轉換每個元素
todos.map((todo) => ({ ...todo, done: true }));

// filter：移除已完成項目
todos.filter((todo) => !todo.done);

// find：找出特定 id 的項目
todos.find((todo) => todo.id === 3);
```

### 💡 小提醒

> - **map**：要「改變內容」或「顯示用」
> - **filter**：要「刪掉或篩掉」
> - **find**：只想「找到一個」

---

## 🧭 額外建議

- ⚙️ React state 不可直接改，要用 `setState`
- 💚 想要切換布林值：`setFinish(prev => !prev)`
- 🧩 想要改陣列中的特定項目：用 `.map()` 回傳新陣列
- 🧹 當不確定為什麼畫面沒更新 → 檢查是不是少了 `setXXX(...)`

---

## ✅ 總結

> 「寫 React 就是練腦邏輯 + 熟悉資料流」
>
> - 改變畫面 → 改 state
> - 改 state → 一定要回傳新值
> - 有條件的樣式 → 用三元運算子
> - props 傳太多 → 延後解構
