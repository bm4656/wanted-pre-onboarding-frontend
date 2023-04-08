import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Todo from '../components/Todo';
import AddTodo from '../components/AddTodo';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  };
  const handleAdd = async (added: { todo: string }) => {
    await axios
      .post('/todos', added, config)
      .then(res => {
        getTodos();
      })
      .catch(err => console.log(err));
  };
  const handleUpdate = async (updated: {
    id: number;
    todo: string;
    isCompleted: boolean;
  }) => {
    await axios
      .put(`/todos/${updated.id}`, updated, config)
      .then(res => {
        getTodos();
      })
      .catch(err => console.log(err));
  };
  const handleDelete = async (id: number) => {
    await axios
      .delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then(res => {
        getTodos();
      })
      .catch(err => console.log(err));
  };
  const getTodos = async () => {
    await axios
      .get('/todos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getTodos();
  }, []);
  //로그인 여부에 따라 리다이렉트
  if (!localStorage.getItem('accessToken')) return <Navigate to='/signin' />;
  return (
    <>
      <div>투두 페이지</div>
      <AddTodo onAdd={handleAdd} />
      <ul>
        {todos &&
          todos?.map((item: any) => (
            <Todo
              key={item.id}
              item={item}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
      </ul>
    </>
  );
};

export default TodoPage;
