import React, { useState } from 'react';

const AddTodo = ({ onAdd }: any) => {
  const [text, setText] = useState('');
  const handleChange = (e: any) => {
    setText(e.target.value);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (text.trim().length === 0) return;
    onAdd({ todo: text });
    setText('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Add Todo'
        value={text}
        onChange={handleChange}
      />
      <button>추가하기</button>
    </form>
  );
};

export default AddTodo;
