import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function TodoItem({
  todo,
  handleCheck,
  handleEdit,
  handleRemove,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo._id });

  const style = {
    transform: CSS.Transform.toString(transform) || "none",
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center border-l-4 border-blue-500 cursor-grab active:cursor-grabbing"
    >
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{todo.title}</h3>
        <p className="text-gray-600">{todo.description}</p>
      </div>
      <div className="flex space-x-3">
        <input
          type="checkbox"
          checked={todo.status}
          className="w-7 h-7 cursor-pointer accent-blue-500"
          onPointerDown={(e) => e.stopPropagation()}
          onChange={() => handleCheck(todo._id, todo.status)}
        />
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(todo._id);
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
            handleRemove(todo._id);
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
