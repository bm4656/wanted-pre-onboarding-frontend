import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const result = await axios.post('/auth/signin', userInfo, config);
      localStorage.setItem('accessToken', result.data.access_token);
      alert('로그인이 완료 되었습니다.');
      navigate('/todo');
    } catch (err: any) {
      alert(
        `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
      );
    }
  };
  return (
    <div className='container'>
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
          data-testid='signup-button'
          className='bg-blue-400 disabled:bg-slate-400'
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default SignIn;
