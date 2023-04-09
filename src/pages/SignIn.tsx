import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/ApiController';
import useIsLogin from '../hooks/useIsLogin';

const SignIn = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api
      .post('/auth/signin', userInfo)
      .then(res => {
        localStorage.setItem('accessToken', res.data.access_token);
        alert('로그인이 완료 되었습니다.');
        navigate('/todo');
      })
      .catch(err => {
        alert(
          `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.response.data.message}`
        );
      });
  };
  useIsLogin();
  return (
    <div className='flex flex-col justify-center items-center h-[100vh] w-[500px]'>
      <div className='!z-5 relative rounded-[20px] max-w-[300px] md:max-w-[400px] bg-clip-border shadow-3xl shadow-shadow-500 flex flex-col w-full !p-6 3xl:p-![18px] bg-white'>
        <div className='relative flex flex-row justify-between'>
          <h4 className='text-xl font-bold mb-3'>👏 로그인</h4>
        </div>
        <form onSubmit={handleSubmit} className='mb-3'>
          <label htmlFor='email' className='text-sm font-bold'>
            Email
          </label>
          <input
            data-testid='email-input'
            type='email'
            name='email'
            placeholder='이메일'
            value={userInfo.email}
            onChange={handleChange}
            className='mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200'
          />
          <label htmlFor='password' className='text-sm  font-bold'>
            Password
          </label>
          <input
            data-testid='password-input'
            type='password'
            name='password'
            placeholder='비밀번호'
            value={userInfo.password}
            onChange={handleChange}
            className='mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200'
          />
          <button
            data-testid='signin-button'
            className='mt-3 flex h-10 w-full items-center justify-center rounded-xl border bg-blue-500 p-3  text-white font-bold hover:bg-blue-700'
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
