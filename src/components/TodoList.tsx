import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddTodo from './AddTodo';
import Todo from './Todo';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const handleAdd = async (todo: any) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    };
    try {
      const result = await axios.post('/todos', todo, config);
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
          todos?.map((item: any) => <Todo key={item.id} todo={item.todo} />)}
      </ul>
    </>
  );
};

export default TodoList;
