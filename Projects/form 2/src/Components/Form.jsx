import { useState } from "react";
import { v4 as uuid } from "uuid";
import Tasks from "./Tasks";
function Form() {
  const [text, setText] = useState("");
  const [click, setClick] = useState(false);
  const [items, setItems] = useState([]);
  const handleText = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };
  const handleClick = () => {
    setClick(true);
    setItems([...items, { text: text, id: uuid(), finish: false }]);
    setText("");
  };
  const handleDelete = (itemId) => {
    const updateItems = items.filter((item) => {
      return itemId !== item.id;
    });
    setItems(updateItems);
  };
  const handleFinish = (itemId) => {
    //找到finish的id然後去改他的style
    const updateItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, finish: !item.finish };
      } else {
        return item;
      }
    });
    setItems(updateItems);
  };

  return (
    <>
      <input type="text" value={text} required onChange={handleText}></input>
      <button type="button" onClick={handleClick}>
        Add
      </button>
      {click ? (
        <Tasks
          items={items}
          handleDelete={handleDelete}
          handleFinish={handleFinish}
        />
      ) : (
        ""
      )}
    </>
  );
}
export default Form;
