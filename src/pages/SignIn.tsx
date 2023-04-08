import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import api from '../api/ApiController';

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

  //로그인 여부에 따라 리다이렉트
  if (localStorage.getItem('accessToken')) return <Navigate to='/todo' />;
  return (
    <div className='container'>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          data-testid='email-input'
          type='email'
          name='email'
          placeholder='이메일'
          value={userInfo.email}
          onChange={handleChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          data-testid='password-input'
          type='password'
          name='password'
          placeholder='비밀번호'
          value={userInfo.password}
          onChange={handleChange}
        />
        <button
          data-testid='signin-button'
          className='bg-blue-400 disabled:bg-slate-400'
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default SignIn;
