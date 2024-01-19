import { useEffect, useReducer } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
};

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);

  const todosCount = todos.length;
  const pendingTodos = todos.filter((todo) => !todo.done).length;

  useEffect(() => {
    console.log('Mount');
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = {
      type: '[TODO] Add Todo',
      payload: todo
    };

    dispatch(action);
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: '[TODO] Remove Todo',
      payload: id
    });
  };

  const handleToggleTodo = (id) => {
    dispatch({
      type: '[TODO] Toggle Todo',
      payload: id
    });
  };

  return {
    todos,
    todosCount,
    pendingTodos,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo
  };
};
