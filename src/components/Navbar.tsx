import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const isLogin = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  if (isLogin)
    return (
      <nav className='flex justify-around p-2 bg-slate-200 text-blue-500 text-lg'>
        <Link to='/' className='focus:text-purple-500'>
          Intro
        </Link>
        <Link to='/todo' className='focus:text-purple-500'>
          투두리스트
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem('accessToken');
            alert('로그아웃 되었습니다.');
            navigate('/');
          }}
        >
          로그아웃
        </button>
      </nav>
    );
  else
    return (
      <nav className='flex justify-around p-2 bg-slate-200 text-blue-500 text-lg'>
        <Link to='/' className='focus:text-purple-500'>
          Intro
        </Link>
        <Link to='/signup' className='focus:text-purple-500'>
          회원가입
        </Link>
        <Link to='/signin' className='focus:text-purple-500'>
          로그인
        </Link>
      </nav>
    );
};

export default Navbar;
