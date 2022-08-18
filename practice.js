import { useState } from "./useState.js";
import Todo from "./todo.js";
import InputTodo from "./inputTodo.js";

const state = new useState({ userName: "Dan", todo: "Learn React" });

const todo = new Todo(document.querySelector("#todo"), state);

const inputTodo = new InputTodo(
  document.querySelector("#input-todo"),
  (todo) => {
    state.setState({ ...state.getState(), todo });
  }
);

state.listen(() => {
  todo.render(state);
});
