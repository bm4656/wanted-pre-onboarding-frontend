import React, { useState } from 'react';

interface Props {
  item: { id: number; todo: string; isCompleted: boolean };
  onUpdate: (params: {
    id: number;
    todo: string;
    isCompleted: boolean;
  }) => void;
  onDelete: (id: number) => void;
}

const Todo = ({ item, onUpdate, onDelete }: Props) => {
  const { id, todo, isCompleted } = item;
  const [modify, setModify] = useState(false);
  const [text, setText] = useState('');

  //TODO 체크박스 완료 여부 체크하기
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...item, isCompleted: e.target.checked });
  };
  //TODO 삭제하기
  const handleDelete = () => {
    onDelete(id);
  };
  //TODO 수정하기
  const handleModify = () => {
    onUpdate({ ...item, todo: text });
    setModify(false);
  };
  return (
    <li>
      <input
        id={String(id)}
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
            onChange={e => {
              setText(e.target.value);
            }}
          />
          <button data-testid='submit-button' onClick={handleModify}>
            제출
          </button>
          <button data-testid='cancel-button' onClick={() => setModify(false)}>
            취소
          </button>
        </>
      ) : (
        <>
          <label htmlFor={String(id)}>
            <span>{todo}</span>
          </label>
          <button
            data-testid='modify-button'
            className='rounded bg-slate-300'
            onClick={() => setModify(true)}
          >
            수정
          </button>
          <button
            data-testid='delete-button'
            className='rounded bg-red-300'
            onClick={handleDelete}
          >
            삭제
          </button>
        </>
      )}
    </li>
  );
};

export default Todo;
