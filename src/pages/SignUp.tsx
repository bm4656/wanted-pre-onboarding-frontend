import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [isEnable, setIsEnable] = useState(true);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  //유효성 검사로 버튼 활성화 설정
  useEffect(() => {
    const isEmailValid = userInfo.email.includes('@');
    const isPasswordValid = userInfo.password.length >= 8;
    isEmailValid && isPasswordValid ? setIsEnable(false) : setIsEnable(true);
  }, [userInfo]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(userInfo);

    try {
      const result = await axios.post('/auth/signup', userInfo, config);
      console.log(result);
      alert('회원가입이 완료 되었습니다.');
      navigate('/signin');
    } catch (err: any) {
      alert(
        `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
      );
    }
  };
  //로그인 여부에 따라 리다이렉트
  if (localStorage.getItem('accessToken')) return <Navigate to='/todo' />;
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          data-testid='email-input'
          type='email'
          name='email'
          placeholder='이메일(@ 필수)'
          value={userInfo.email}
          onChange={handleChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          data-testid='password-input'
          type='password'
          name='password'
          placeholder='비밀번호(8자 이상)'
          value={userInfo.password}
          onChange={handleChange}
        />
        <button
          data-testid='signup-button'
          className='bg-blue-400 disabled:bg-slate-400'
          disabled={isEnable}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;
