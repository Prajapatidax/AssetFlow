import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Boxes, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';

const loginSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFields = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFields) => {
    setLoading(true);
    setError(null);
    try {
      await login(data.username, data.password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper to quickly fill credentials for debugging/local test
  const quickFill = (role: string) => {
    setValue('username', role.toLowerCase());
    setValue('password', 'password123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-primary/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-8 space-y-6"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Boxes className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Welcome to AssetFlow</h2>
          <p className="text-sm text-slate-400">Enterprise Resource & Asset Management</p>
        </div>

        {/* Form Error Alert */}
        {error && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg flex items-center gap-3 text-sm"
          >
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{error}</p>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Username</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-5 w-5 text-slate-500" />
              <input
                type="text"
                placeholder="Enter username"
                {...register('username')}
                className="w-full bg-slate-950/50 border border-slate-800 text-white rounded-lg pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-slate-600"
              />
            </div>
            {errors.username && <p className="text-xs text-red-400 mt-1">{errors.username.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-5 w-5 text-slate-500" />
              <input
                type="password"
                placeholder="Enter password"
                {...register('password')}
                className="w-full bg-slate-950/50 border border-slate-800 text-white rounded-lg pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all placeholder:text-slate-600"
              />
            </div>
            {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-foreground text-white font-semibold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                Sign In <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Fill Accounts (for development speed & testing) */}
        <div className="pt-4 border-t border-slate-850 space-y-2">
          <p className="text-xs text-center text-slate-500 font-medium">Quick sign-in for testing:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => quickFill('admin')}
              className="bg-slate-950/30 hover:bg-slate-950/60 border border-slate-800 text-slate-300 py-1.5 px-3 rounded-md transition-colors text-left font-medium"
            >
              🔑 Admin
            </button>
            <button
              onClick={() => quickFill('manager')}
              className="bg-slate-950/30 hover:bg-slate-950/60 border border-slate-800 text-slate-300 py-1.5 px-3 rounded-md transition-colors text-left font-medium"
            >
              💼 Manager
            </button>
            <button
              onClick={() => quickFill('head')}
              className="bg-slate-950/30 hover:bg-slate-950/60 border border-slate-800 text-slate-300 py-1.5 px-3 rounded-md transition-colors text-left font-medium"
            >
              🏢 Dept Head
            </button>
            <button
              onClick={() => quickFill('employee')}
              className="bg-slate-950/30 hover:bg-slate-950/60 border border-slate-800 text-slate-300 py-1.5 px-3 rounded-md transition-colors text-left font-medium"
            >
              👤 Employee
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
