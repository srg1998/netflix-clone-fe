import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authUser';

const SignupPage = () => {
  const { signup, isSigningUp } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(email);
  };

  return (
    <div className='h-screen w-full hero-bg'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
        <Link to='/'>
          <img src='/netflix-logo.png' alt='Netflix Logo' className='w-52' />
        </Link>
        <Link to='/login' className='text-white bg-red-600 px-4 py-2 rounded font-semibold hover:bg-red-700'>
          Sign In
        </Link>
      </header>

      <div className='flex justify-center items-center mt-20 mx-3'>
        <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
          <h1 className='text-white text-3xl font-bold mb-4'>Sign Up</h1>

          <form className='space-y-4' onSubmit={handleSignup}>
            <div>
              <input
                type='email'
                placeholder='Email address'
                className='w-full px-3 py-2 bg-[#333] placeholder-gray-500 text-white rounded border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-[#454545]'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type='password'
                placeholder='Password'
                className='w-full px-3 py-2 bg-[#333] placeholder-gray-500 text-white rounded border border-transparent focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-[#454545]'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className='w-full bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-200'
              disabled={isSigningUp}
            >
              {isSigningUp ? 'Loading...' : 'Sign Up'}
            </button>
          </form>

          <div className='text-gray-400 text-sm'>
            Already have an account?{' '}
            <Link to='/login' className='text-white hover:underline'>
              Sign in
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
