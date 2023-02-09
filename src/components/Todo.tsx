import React from 'react';

const Todo = ({ id, todo, isCompleted, onUpdate, onDelete }: any) => {
  const handleUpdate = (e: any) => {
    const isCompleted = e.target.checked;
    onUpdate(id, todo, isCompleted);
  };
  const handleDelete = (e: any) => {
    onDelete(id);
  };
  return (
    <li>
      <input
        id={id}
        type='checkbox'
        checked={isCompleted}
        onChange={handleUpdate}
      />
      <label htmlFor={id}>
        <span>{todo}</span>
      </label>
      <button data-testid='modify-button' className='rounded bg-slate-300'>
        수정
      </button>
      <button
        data-testid='delete-button'
        className='rounded bg-red-300'
        onClick={handleDelete}
      >
        삭제
      </button>
    </li>
  );
};

export default Todo;
