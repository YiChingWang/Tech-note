function Task({ item, handleDelete, handleFinish }) {
  return (
    <>
      <li>
        <button type="button" onClick={() => handleDelete(item.id)}>
          X
        </button>
        <p style={item.finish ? { color: "green" } : {}}>{item.text}</p>
        <button type="button" onClick={() => handleFinish(item.id)}>
          V
        </button>
      </li>
    </>
  );
}
export default Task;
