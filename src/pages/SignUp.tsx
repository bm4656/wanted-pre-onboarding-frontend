import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../api/ApiController';

const SignUp = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [isEnable, setIsEnable] = useState(true);

  //유효성 검사로 버튼 활성화 설정
  useEffect(() => {
    const isEmailValid = userInfo.email.includes('@');
    const isPasswordValid = userInfo.password.length >= 8;
    isEmailValid && isPasswordValid ? setIsEnable(false) : setIsEnable(true);
  }, [userInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api
      .post('/auth/signup', userInfo)
      .then(res => {
        alert('회원가입이 완료 되었습니다.');
        navigate('/signin');
      })
      .catch(err => {
        alert(
          `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.response.data.message}`
        );
      });
  };
  //로그인 여부에 따라 리다이렉트
  if (localStorage.getItem('accessToken')) return <Navigate to='/todo' />;
  return (
    <div className='flex flex-col justify-center items-center h-[100vh] w-[500px]'>
      <div className='!z-5 relative rounded-[20px] max-w-[300px] md:max-w-[400px] bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full !p-6 3xl:p-![18px] bg-white'>
        <div className='relative flex flex-row justify-between'>
          <h4 className='text-xl font-bold text-navy-700 mb-3'>✋ 회원가입</h4>
        </div>
        <form onSubmit={handleSubmit} className='mb-3'>
          <label htmlFor='email' className='text-sm text-navy-700 font-bold'>
            Email
          </label>
          <input
            data-testid='email-input'
            type='email'
            name='email'
            placeholder='이메일(@ 필수입니다.)'
            value={userInfo.email}
            onChange={handleChange}
            className='mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200'
          />

          <label htmlFor='password' className='text-sm text-navy-700 font-bold'>
            Password
          </label>
          <input
            data-testid='password-input'
            type='password'
            name='password'
            placeholder='비밀번호(8자 이상 입력해주세요.)'
            value={userInfo.password}
            onChange={handleChange}
            className='mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200'
          />
          <button
            data-testid='signup-button'
            disabled={isEnable}
            className='mt-3 flex h-10 w-full items-center justify-center rounded-xl border bg-green-500 p-3  text-white font-bold disabled:opacity-70'
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
