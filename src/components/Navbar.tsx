import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='flex justify-around p-2 bg-slate-200 text-blue-500 text-lg'>
      <Link to='/' className='focus:text-purple-500'>
        Intro
      </Link>
      <Link to='/signup' className='focus:text-purple-500'>
        SignUp
      </Link>
      <Link to='/signin' className='focus:text-purple-500'>
        SignIn
      </Link>
      <Link to='/todo' className='focus:text-purple-500'>
        TodoList
      </Link>
    </nav>
  );
};

export default Navbar;
