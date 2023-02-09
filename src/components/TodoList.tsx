import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddTodo from './AddTodo';
import Todo from './Todo';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  };
  const handleAdd = async (todo: any) => {
    try {
      const result = await axios.post('/todos', todo, config);
      getTodos();
    } catch (err: any) {
      console.log(err);
    }
  };
  const handleUpdate = async (
    id: number,
    todo: string,
    isCompleted: boolean
  ) => {
    try {
      const result = await axios.put(
        `/todos/${id}`,
        {
          todo,
          isCompleted,
        },
        config
      );
      getTodos();
    } catch (err: any) {
      console.log(err);
    }
  };
  const handleDelete = async (id: number) => {
    try {
      const result = await axios.delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      getTodos();
    } catch (err: any) {
      console.log(err);
    }
  };
  const getTodos = async () => {
    try {
      const result = await axios.get('/todos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setTodos(result.data);
      console.log(todos);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  return (
    <>
      <AddTodo onAdd={handleAdd} />
      <ul>
        {todos &&
          todos?.map((item: any) => (
            <Todo
              key={item.id}
              id={item.id}
              todo={item.todo}
              isCompleted={item.isCompleted}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
      </ul>
    </>
  );
};

export default TodoList;
