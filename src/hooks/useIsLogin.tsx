import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

//로그인 여부에 따라 리다이렉트 해주는 hook
const useIsLogin = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const authUrl = ['/signup', '/signin'];

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token && authUrl.includes(pathname)) {
      navigate('/todo');
    }
    if (!token && !authUrl.includes(pathname)) {
      navigate('/signin');
    }
  }, []);
};

export default useIsLogin;
