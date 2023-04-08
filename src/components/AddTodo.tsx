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
    <form onSubmit={handleSubmit} className='flex p-1 items-center gap-2 mt-2'>
      <input
        type='text'
        data-testid='new-todo-input'
        placeholder='Add Todo'
        value={text}
        onChange={handleChange}
        className='w-full items-center justify-center rounded-xl border bg-white/0 p-1 text-sm outline-none border-gray-500'
      />
      <button
        data-testid='new-todo-add-button'
        className='ml-auto font-semibold w-20 bg-blue-500 border p-1 rounded-xl text-white text-sm'
      >
        추가
      </button>
    </form>
  );
};

export default AddTodo;
