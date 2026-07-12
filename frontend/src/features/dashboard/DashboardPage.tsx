import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  Boxes,
  CalendarDays,
  Wrench,
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowRight,
  Activity,
  AlertCircle
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  const kpis = [
    { title: 'Total Registered Assets', value: '1,280', change: '+12% this month', icon: Boxes, color: 'text-primary bg-primary/10' },
    { title: 'Resource Bookings Today', value: '14', change: '8 active now', icon: CalendarDays, color: 'text-emerald-500 bg-emerald-500/10' },
    { title: 'Pending Maintenance Tickets', value: '6', change: '2 critical priority', icon: Wrench, color: 'text-amber-500 bg-amber-500/10' },
    { title: 'Compliance Audit Progress', value: '92%', change: 'Target: 100% by Fri', icon: ShieldCheck, color: 'text-indigo-500 bg-indigo-500/10' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Welcome back, {user?.first_name}!</h1>
          <p className="text-muted-foreground mt-1">Here is a quick overview of organization assets and compliance status.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg text-sm transition-all shadow-md">
            + Quick Action
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="bg-card border border-border p-6 rounded-xl shadow-premium hover:shadow-premium-hover transition-all duration-300 flex items-center justify-between"
          >
            <div className="space-y-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{kpi.title}</span>
              <p className="text-3xl font-bold tracking-tight">{kpi.value}</p>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                {kpi.change}
              </span>
            </div>
            <div className={`p-4 rounded-xl ${kpi.color} shrink-0`}>
              <kpi.icon className="h-6 w-6" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activities Section */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-card border border-border rounded-xl shadow-premium p-6 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold tracking-tight flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" /> Recent Activity Timeline
            </h3>
            <span className="text-xs text-primary cursor-pointer hover:underline flex items-center gap-1 font-semibold">
              View all <ArrowRight className="h-3 w-3" />
            </span>
          </div>

          <div className="relative border-l border-border pl-6 ml-3 space-y-6">
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 h-4 w-4 bg-primary rounded-full border-4 border-card"></div>
              <p className="text-xs text-muted-foreground font-semibold">Today, 09:40 AM</p>
              <p className="text-sm font-semibold mt-1">Asset Assigned</p>
              <p className="text-xs text-muted-foreground">MacBook Pro 16" (AF-0091) assigned to Sarah Jenkins (Engineering).</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 h-4 w-4 bg-emerald-500 rounded-full border-4 border-card"></div>
              <p className="text-xs text-muted-foreground font-semibold">Yesterday, 04:15 PM</p>
              <p className="text-sm font-semibold mt-1">Resource Booked</p>
              <p className="text-xs text-muted-foreground">Conference Room B booked by HR Team for interview rounds.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 h-4 w-4 bg-amber-500 rounded-full border-4 border-card"></div>
              <p className="text-xs text-muted-foreground font-semibold">Yesterday, 11:00 AM</p>
              <p className="text-sm font-semibold mt-1">Maintenance Requested</p>
              <p className="text-xs text-muted-foreground">Water cooling system leakage reported in Server Room A.</p>
            </div>
          </div>
        </motion.div>

        {/* Side Actions / Pending Approvals panel */}
        <motion.div
          variants={itemVariants}
          className="bg-card border border-border rounded-xl shadow-premium p-6 space-y-6 flex flex-col justify-between"
        >
          <div className="space-y-6">
            <h3 className="text-lg font-bold tracking-tight flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" /> Pending Action Required
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-secondary/50 rounded-lg space-y-2 border border-border/50">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded">Approval Gate</span>
                  <span className="text-[10px] text-muted-foreground">1h ago</span>
                </div>
                <p className="text-sm font-semibold">Transfer Request: Dell XPS 15</p>
                <p className="text-xs text-muted-foreground">From Department: Marketing to Sales</p>
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 py-1.5 bg-primary text-primary-foreground rounded text-xs font-semibold hover:bg-primary/95 transition-all">Approve</button>
                  <button className="flex-1 py-1.5 bg-secondary text-muted-foreground hover:text-foreground rounded text-xs font-semibold transition-all">Decline</button>
                </div>
              </div>

              <div className="p-4 bg-secondary/50 rounded-lg space-y-2 border border-border/50">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-500/10 px-2 py-0.5 rounded">Asset Audit</span>
                  <span className="text-[10px] text-muted-foreground">3h ago</span>
                </div>
                <p className="text-sm font-semibold">Quarterly IT Inventory Review</p>
                <p className="text-xs text-muted-foreground">42 assets await scan verification.</p>
                <button className="w-full py-1.5 bg-indigo-500 text-white rounded text-xs font-semibold hover:bg-indigo-600 transition-all pt-2">Start Scan</button>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};
