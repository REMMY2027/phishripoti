import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ITLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        form,
        { timeout: 30000 }
      );
      login(response.data.token, response.data.manager);
      navigate('/it/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: '#0a0d0a' }}>
      <div className="flex h-1 w-full absolute top-0">
        <div className="flex-1 bg-red-700"></div>
        <div className="flex-1 bg-black"></div>
        <div className="flex-1 bg-green-800"></div>
      </div>

      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L4 6v6c0 5 3.5 9.3 8 10.4C16.5 21.3 20 17 20 12V6L12 2z" fill="#BB0000"/>
          </svg>
          <span className="text-white font-bold text-xl">PhishRipoti</span>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-white font-bold text-2xl mb-1">IT Manager Portal</h2>
          <p className="text-gray-500 text-sm">Sign in to access the security dashboard</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-xs font-medium mb-2">Email address</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
              placeholder="your@email.com"
              className="w-full bg-gray-900 border border-gray-800 rounded-lg text-gray-300 px-4 py-3 text-sm outline-none focus:border-red-800"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-medium mb-2">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
              placeholder="••••••••"
              className="w-full bg-gray-900 border border-gray-800 rounded-lg text-gray-300 px-4 py-3 text-sm outline-none focus:border-red-800"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm p-3 rounded-lg border border-red-900"
              style={{ background: 'rgba(187,0,0,0.1)' }}>
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white text-sm transition-all"
            style={{ background: loading ? '#555' : '#BB0000', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Access restricted to authorised IT security personnel only
        </p>
      </div>
    </div>
  );
};

export default ITLogin;
