import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Intro from './pages/Intro';
import NotFound from './pages/NotFound';
import Root from './pages/Root';
import SignUp from './pages/SignUp';
import TodoPage from './pages/TodoPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Intro /> },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/signin',
        element: <SignUp />,
      },
      {
        path: '/todo',
        element: <TodoPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
