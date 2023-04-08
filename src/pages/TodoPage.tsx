import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Todo from '../components/Todo';
import AddTodo from '../components/AddTodo';
import api from '../api/ApiController';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  //TODO 추가하기 요청
  const handleAdd = async (added: { todo: string }) => {
    await api
      .post('/todos', added)
      .then(res => {
        getTodos();
      })
      .catch(err => console.log(err));
  };
  //TODO 업데이트 요청
  const handleUpdate = async (updated: {
    id: number;
    todo: string;
    isCompleted: boolean;
  }) => {
    await api
      .put(`/todos/${updated.id}`, updated)
      .then(res => {
        getTodos();
      })
      .catch(err => console.log(err));
  };
  //TODO 삭제 요청
  const handleDelete = async (id: number) => {
    await api
      .delete(`/todos/${id}`)
      .then(res => {
        getTodos();
      })
      .catch(err => console.log(err));
  };
  //TODO 리스트 가져오기 요청
  const getTodos = async () => {
    await api
      .get('/todos')
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
          todos?.map(
            (item: { id: number; todo: string; isCompleted: boolean }) => (
              <Todo
                key={item.id}
                item={item}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            )
          )}
      </ul>
    </>
  );
};

export default TodoPage;
