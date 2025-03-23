import { closestCorners, DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import TodoItem from "./TodoItem";
import { useState } from "react";
import { setTodos } from "../redux/features/todosSlice";
import { useDispatch } from "react-redux";

export default function TodoList({
  todos,
  handleCheck,
  handleEdit,
  handleRemove,
}) {
  if (!todos || todos.length === 0) {
    return <p className="text-center text-gray-500">No tasks added yet.</p>;
  }
  const dispatch = useDispatch();

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = todos.findIndex((todo) => todo._id === active.id);
    const newIndex = todos.findIndex((todo) => todo._id === over.id);

    // Reorder array using arrayMove utility
    dispatch(setTodos(arrayMove(todos, oldIndex, newIndex)));
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="mt-6 w-full max-w-xl space-y-4">
        <SortableContext
          items={todos.map((todo) => todo._id)}
          strategy={verticalListSortingStrategy}
        >
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              handleCheck={handleCheck}
              handleEdit={handleEdit}
              handleRemove={handleRemove}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
