import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Boxes, Mail, Lock, AlertCircle, ArrowRight, ShieldCheck, Key } from 'lucide-react';

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

  const quickFill = (role: string) => {
    setValue('username', role.toLowerCase());
    setValue('password', 'password123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-secondary via-background to-primary/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-card border border-border rounded-2xl shadow-premium p-8 space-y-6"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          <div className="h-11 w-11 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/20">
            <Boxes className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-foreground tracking-tight">Sign in to AssetFlow</h2>
            <p className="text-xs text-muted-foreground mt-1">Enterprise Resource & Asset Management Platform</p>
          </div>
        </div>

        {/* Form Error Alert */}
        {error && (
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-lg flex items-start gap-2.5 text-xs font-semibold"
          >
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <p>{error}</p>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Username</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/60" />
              <input
                type="text"
                placeholder="Enter username"
                {...register('username')}
                className="w-full bg-secondary/50 border border-border focus:border-primary text-foreground rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/50 font-medium"
              />
            </div>
            {errors.username && <p className="text-[10px] text-destructive mt-1 font-semibold">{errors.username.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/60" />
              <input
                type="password"
                placeholder="Enter password"
                {...register('password')}
                className="w-full bg-secondary/50 border border-border focus:border-primary text-foreground rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/50 font-medium"
              />
            </div>
            {errors.password && <p className="text-[10px] text-destructive mt-1 font-semibold">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-bold py-2.5 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            {loading ? (
              <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Quick Fill Accounts (for development speed & testing) */}
        <div className="pt-4 border-t border-border space-y-2.5">
          <p className="text-[10px] text-center text-muted-foreground font-bold uppercase tracking-wider flex items-center justify-center gap-1">
            <Key className="h-3.5 w-3.5 text-primary" /> Test Accounts
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => quickFill('admin')}
              className="bg-secondary hover:bg-secondary-foreground hover:text-secondary border border-border/80 text-foreground py-1.5 px-3 rounded-lg transition-all text-center font-bold text-[11px]"
            >
              🔒 Admin
            </button>
            <button
              onClick={() => quickFill('manager')}
              className="bg-secondary hover:bg-secondary-foreground hover:text-secondary border border-border/80 text-foreground py-1.5 px-3 rounded-lg transition-all text-center font-bold text-[11px]"
            >
              💼 Manager
            </button>
            <button
              onClick={() => quickFill('head')}
              className="bg-secondary hover:bg-secondary-foreground hover:text-secondary border border-border/80 text-foreground py-1.5 px-3 rounded-lg transition-all text-center font-bold text-[11px]"
            >
              🏢 Dept Head
            </button>
            <button
              onClick={() => quickFill('employee')}
              className="bg-secondary hover:bg-secondary-foreground hover:text-secondary border border-border/80 text-foreground py-1.5 px-3 rounded-lg transition-all text-center font-bold text-[11px]"
            >
              👤 Employee
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
