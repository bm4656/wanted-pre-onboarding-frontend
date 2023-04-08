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
    <div className='flex flex-col justify-center items-center h-[80vh]'>
      <div className='!z-5 relative  rounded-[20px] max-w-[300px] min-h-[50vh] bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full !p-4 3xl:p-![18px] bg-white'>
        <div className='relative flex flex-row justify-between border-b-2 border-bl'>
          <div className='flex items-center'>
            <h4 className='ml-1 text-xl font-bold p-2'>📝 Todo</h4>
          </div>
        </div>
        <ul className='h-full w-full mt-3'>
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
        <AddTodo onAdd={handleAdd} />
      </div>
    </div>
  );
};

export default TodoPage;
