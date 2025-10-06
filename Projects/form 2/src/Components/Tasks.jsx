import Task from "./Task";
function Tasks({ items, handleDelete, handleFinish }) {
  return (
    <>
      {items.map((item) => {
        return (
          <Task
            item={item}
            key={item.id}
            handleDelete={handleDelete}
            handleFinish={handleFinish}
          />
        );
      })}
    </>
  );
}
export default Tasks;
