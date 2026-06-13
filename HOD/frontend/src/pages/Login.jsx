import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
  
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Connect to the backend - now only HOD endpoint
      const url = 'http://localhost:5000/api/hod/login';
        
      const response = await axios.post(url, formData);

      const { token } = response.data;
      localStorage.setItem('hod_token', token);
      localStorage.setItem('user_role', 'hod');
      window.location.href = '/dashboard';
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Unable to reach the server. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md animate-fade-in animate-slide-up">
      <div className="card glass p-8 md:p-10 rounded-3xl relative overflow-hidden shadow-2xl transition-colors duration-300">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 dark:opacity-10"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-600 rounded-full mix-blend-multiply filter blur-2xl opacity-20 dark:opacity-10"></div>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 mb-6 shadow-inner transform -rotate-3 transition-colors duration-300">
              <Lock className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white mb-2">
              HOD Portal
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase text-xs">
              Head of Department Login
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 rounded-xl text-sm font-semibold animate-fade-in shadow-sm flex items-start transition-colors duration-300">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[11px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em] mb-2.5 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-500 transition-all duration-300">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-base pl-14 pr-4 py-4 bg-gray-50/50 dark:bg-slate-800/40 border-gray-100 dark:border-slate-700/50 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em] mb-2.5 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-brand-500 transition-all duration-300">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-base pl-14 pr-4 py-4 bg-gray-50/50 dark:bg-slate-800/40 border-gray-100 dark:border-slate-700/50 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link to="/forgot-password" name="forgot-password-link" className="text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center h-14 border border-transparent rounded-2xl shadow-xl text-base font-bold text-white bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-500/20 transition-all ${loading ? 'opacity-75 cursor-not-allowed scale-[0.98]' : 'hover:-translate-y-1 active:scale-95'}`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-6 w-6" />
                  Authenticating...
                </>
              ) : (
                <>
                  Access Portal
                  <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
