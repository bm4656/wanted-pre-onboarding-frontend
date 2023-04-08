import React, { useState } from 'react';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';

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
    <li className='p-2 '>
      <div className='flex items-center justify-center gap-2'>
        <input
          id={String(id)}
          type='checkbox'
          checked={isCompleted}
          onChange={handleChecked}
          className=' h-[15px] w-[15px] min-h-[15px]  min-w-[15px] '
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
              className='flex h-7 w-full items-center justify-center rounded-sm border bg-white/0 p-3 text-sm outline-none border-gray-400'
            />
            <div className='flex gap-1'>
              <button
                data-testid='submit-button'
                onClick={handleModify}
                className='text-sm w-5 bg-blue-200 text-white rounded-sm'
              >
                ✔️
              </button>
              <button
                data-testid='cancel-button'
                onClick={() => setModify(false)}
                className='text-sm w-5 bg-red-200 text-white rounded-sm'
              >
                ❌
              </button>
            </div>
          </>
        ) : (
          <>
            <label htmlFor={String(id)}>
              <span className='text-base font-bold '>{todo}</span>
            </label>
            <div className='flex gap-2 ml-auto'>
              <button
                data-testid='modify-button'
                className='text-slate-600'
                onClick={() => setModify(true)}
              >
                <FaPencilAlt />
              </button>
              <button
                data-testid='delete-button'
                className='text-slate-600'
                onClick={handleDelete}
              >
                <FaTrashAlt />
              </button>
            </div>
          </>
        )}
      </div>
    </li>
  );
};

export default Todo;
