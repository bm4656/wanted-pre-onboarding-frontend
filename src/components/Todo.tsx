import React, { useState } from 'react';

const Todo = ({ id, todo, isCompleted, onUpdate, onDelete }: any) => {
  const [modify, setModify] = useState(false);
  const [text, setText] = useState('');
  const handleChecked = (e: any) => {
    const isCompleted = e.target.checked;
    onUpdate(id, todo, isCompleted);
  };
  const handleDelete = (e: any) => {
    onDelete(id);
  };
  const onModify = () => {
    setModify(true);
  };
  const handleModify = (e: any) => {
    setText(e.target.value);
  };
  const handleUpdate = () => {
    todo = text;
    onUpdate(id, todo, isCompleted);
    setModify(false);
  };
  const handleCancel = () => {
    setModify(false);
  };
  return (
    <li>
      <input
        id={id}
        type='checkbox'
        checked={isCompleted}
        onChange={handleChecked}
      />
      {modify ? (
        <>
          <input
            data-testid='modify-input'
            defaultValue={todo}
            type='text'
            onChange={handleModify}
          />
          <button data-testid='submit-button' onClick={handleUpdate}>
            제출
          </button>
          <button data-testid='cancel-button' onClick={handleCancel}>
            취소
          </button>
        </>
      ) : (
        <>
          <label htmlFor={id}>
            <span>{todo}</span>
          </label>
          <button
            data-testid='modify-button'
            className='rounded bg-slate-300'
            onClick={onModify}
          >
            수정
          </button>
        </>
      )}

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
