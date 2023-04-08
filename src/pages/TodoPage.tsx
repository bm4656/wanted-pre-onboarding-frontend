import React from 'react';
import { Navigate } from 'react-router-dom';

const TodoPage = () => {
  //로그인 여부에 따라 리다이렉트
  if (!localStorage.getItem('accessToken')) return <Navigate to='/signin' />;
  return <div>투두 페이지</div>;
};

export default TodoPage;
