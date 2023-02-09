import React from 'react';

const Todo = ({ todo }: any) => {
  return (
    <li>
      <label>
        <input type='checkbox' />
        <span>{todo}</span>
      </label>
    </li>
  );
};

export default Todo;
