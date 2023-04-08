import React, { useState } from 'react';

interface Props {
  onAdd: (params: { todo: string }) => void;
}
const AddTodo = ({ onAdd }: Props) => {
  const [text, setText] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  //새로운 TODO 추가하기
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim().length === 0) return;
    onAdd({ todo: text });
    setText('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        data-testid='new-todo-input'
        placeholder='Add Todo'
        value={text}
        onChange={handleChange}
      />
      <button data-testid='new-todo-add-button'>추가하기</button>
    </form>
  );
};

export default AddTodo;
