import React from 'react';

const Todo = ({ id, todo, isCompleted, onUpdate }: any) => {
  const handleChange = (e: any) => {
    const isCompleted = e.target.checked;
    onUpdate(id, todo, isCompleted);
  };
  return (
    <li>
      <input
        id={id}
        type='checkbox'
        checked={isCompleted}
        onChange={handleChange}
      />
      <label htmlFor={id}>
        <span>{todo}</span>
      </label>
      <button data-testid='modify-button' className='rounded bg-slate-300'>
        수정
      </button>
      <button data-testid='delete-button' className='rounded bg-red-300'>
        삭제
      </button>
    </li>
  );
};

export default Todo;
