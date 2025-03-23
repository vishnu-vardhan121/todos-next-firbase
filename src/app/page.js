"use client";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addTodo,
  logOut,
  removeTodo,
  setTodos,
  updateTodo,
} from "./redux/features/userSlice";
import { IoIosLogOut } from "react-icons/io";

import axios from "axios";
import { persistor } from "./redux/store";
import { useRouter } from "next/navigation";
import {
  addTodoAction,
  deleteTodoAction,
  fetchTodosAction,
  handleCheckAction,
  updateTodoAction,
} from "./redux/features/todosSlice";
import { Triangle } from "react-loader-spinner";
import TodoItem from "./components/TodoItem";
import LogoutButton from "./components/LogoutButton";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export default function TodoApp() {
  const [state, setState] = useState({
    formData: { title: "", description: "" },
    editId: null,
    search: "",
    notFound: false,
  });

  const { user, todos } = useSelector((s) => s);

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    if (!user.user._id) {
      router.push("/login");
    }

    const fetchTodos = async () => {
      await fetchTodosAction(user.user._id);
    };
    fetchTodos();
  }, [user.user]);
  const handleChange = (e) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, [e.target.name]: e.target.value },
    }));
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!state.formData.title || !state.formData.description)
        return toast.info("pleaase fill all fields");

      if (state.editId !== null) {
        // update in DB
        await dispatch(
          updateTodoAction({
            updatedtodo: {
              todo: state.formData,
              id: state.editId,
            },
          })
        );

        setState((pre) => ({
          ...pre,
          formData: { title: "", description: "" },
          editId: null,
        }));
      } else {
        await dispatch(
          addTodoAction({ data: { ...state.formData, user: user.user._id } })
        );
        setState((pre) => ({
          ...pre,
          formData: { title: "", description: "" },
          editId: null,
        }));
      }
    },
    [state, dispatch, user.user._id]
  );

  const handleEdit = useCallback(
    (Id) => {
      const edidd = todos.todos.find((todo) => todo._id === Id);
      if (!edidd) return;

      setState((prev) => ({
        ...prev,
        editId: Id,
        formData: edidd,
      }));
    },
    [todos.todos]
  );

  const handleRemove = async (id) => {
    try {
      await dispatch(deleteTodoAction(id));
      toast.success("Todo deleted successfully!");
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Failed to delete todo!");
    }
  };

  const handleCheck = async (Id, status) => {
    await dispatch(handleCheckAction({ Id, status }));
  };

  const handleLogout = () => {
    persistor.purge();
    dispatch(logOut());
    router.push("/login");
  };

  const handleCancel = () =>
    setState((prev) => ({
      ...prev,
      editId: null,
      formData: { title: "", description: "" },
    }));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {" "}
      <LogoutButton onLogout={handleLogout} />
      <p className="text-5xl font-bold text-gray-800 bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-lg shadow-md">
        To-Do App
      </p>
      <p className="text-2xl bg-clip-text text-transparent font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 ">
        Hi.. {user.user.name}
      </p>
      {/* Form */}
      <TodoForm
        state={state}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelEdit={handleCancel}
      />
      {todos.loading ? (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
          />
        </div>
      ) : (
        <TodoList
          todos={todos.todos}
          handleCheck={handleCheck}
          handleEdit={handleEdit}
          handleRemove={handleRemove}
        />
      )}
    </div>
  );
}
