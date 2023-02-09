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
    </li>
  );
};

export default Todo;
