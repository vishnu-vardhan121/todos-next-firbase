import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodosAction = createAsyncThunk(
  "todos/fetch",
  async (id, thunkApi) => {
    try {
      console.log("dsd", id);

      const { data } = await axios.get(`/api/todo?userId=${id}`);
      console.log("ssd", data);

      return data.todos;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
export const addTodoAction = createAsyncThunk(
  "todos/add",
  async ({ data }, thunkApi) => {
    try {
      const response = await axios.post("/api/todo", data);
      console.log("dscsdc", response);
      return response.data.todo;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const updateTodoAction = createAsyncThunk(
  "todos/update",
  async ({ updatedtodo }, thunkApi) => {
    try {
      const { data } = await axios.put(`/api/todo/`, updatedtodo);
      return data.todo;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const deleteTodoAction = createAsyncThunk(
  "todos/delete",
  async (id, thunkApi) => {
    try {
      await axios.delete(`/api/todo/${id}`);
      return id;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const handleCheckAction = createAsyncThunk(
  "todos/check",
  async ({ Id, status }, thunkApi) => {
    try {
      console.log(Id, status);

      const { data } = await axios.patch("/api/todo", {
        id: Id,
        status: !status,
      });
      return data.todo;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodoAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodoAction.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(addTodoAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTodoAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodoAction.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) =>
          todo._id === action.payload._id ? action.payload : todo
        );
        state.loading = false;
      })
      .addCase(deleteTodoAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodoAction.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      })

      .addCase(handleCheckAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleCheckAction.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo._id === action.payload._id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
        state.loading = false;
      });
  },
});

export const { setTodos } = todosSlice.actions;
export default todosSlice.reducer;
