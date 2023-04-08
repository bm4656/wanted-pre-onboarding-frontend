import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const isLogin = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  if (isLogin)
    return (
      <nav className='flex flex-row justify-end items-end w-[500px] gap-4 mt-3'>
        <Link to='/todo' className='text-m font-semibold'>
          🚀 투두리스트
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem('accessToken');
            alert('로그아웃 되었습니다.');
            navigate('/');
          }}
          className='text-m font-semibold'
        >
          ⚙️ 로그아웃
        </button>
      </nav>
    );
  else
    return (
      <nav className='flex flex-row justify-end items-end w-[500px] gap-4 mt-3'>
        <Link to='/signup' className='text-m  font-semibold'>
          🌱 회원가입
        </Link>
        <Link to='/signin' className='text-m  font-semibold'>
          🔆 로그인
        </Link>
      </nav>
    );
};

export default Navbar;
