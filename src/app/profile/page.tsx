// File: src/app/profile/page.tsx
// Test page for user signup and login forms

'use client';

import { useState } from 'react';

export default function ProfilePage() {
  const [signupData, setSignupData] = useState({ username: '', password: '', name: '' });
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, form: 'signup' | 'login') => {
    const { name, value } = e.target;
    if (form === 'signup') {
      setSignupData((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle signup form submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupData),
    });
    const result = await res.json();
    if (res.ok) {
      setMessage('Signup successful!');
    } else {
      setMessage(`Signup failed: ${result.error}`);
    }
  };

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });
    const result = await res.json();
    if (res.ok) {
      setMessage(`Login successful! Token: ${result.token}`);
    } else {
      setMessage(`Login failed: ${result.error}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      {message && <div className="mb-4 p-2 bg-gray-200">{message}</div>}
      
      <div className="mb-8">
        <h2 className="text-xl font-bold">Signup Form</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={signupData.name}
            onChange={(e) => handleInputChange(e, 'signup')}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={signupData.username}
            onChange={(e) => handleInputChange(e, 'signup')}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signupData.password}
            onChange={(e) => handleInputChange(e, 'signup')}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold">Login Form</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={loginData.username}
            onChange={(e) => handleInputChange(e, 'login')}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => handleInputChange(e, 'login')}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
