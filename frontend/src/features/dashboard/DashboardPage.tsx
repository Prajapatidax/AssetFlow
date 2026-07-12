import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
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
  AlertCircle,
  TrendingDown,
  Building2,
  Users2
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data for analytics
  const healthTrendData = [
    { name: 'Jan', health: 85 },
    { name: 'Feb', health: 87 },
    { name: 'Mar', health: 86 },
    { name: 'Apr', health: 90 },
    { name: 'May', health: 89 },
    { name: 'Jun', health: 93 },
  ];

  const departmentData = [
    { name: 'Engineering', count: 42, color: '#875A7B' },
    { name: 'Marketing', count: 24, color: '#A7869D' },
    { name: 'Operations', count: 32, color: '#3B82F6' },
    { name: 'HR', count: 18, color: '#22C55E' },
    { name: 'Finance', count: 12, color: '#F59E0B' },
  ];

  const statusData = [
    { name: 'Active', value: 750, color: '#22C55E' },
    { name: 'Allocated', value: 430, color: '#875A7B' },
    { name: 'Maintenance', value: 80, color: '#F59E0B' },
    { name: 'Disposed', value: 20, color: '#EF4444' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
  };

  const kpis = [
    { title: 'Total Registered Assets', value: '1,280', change: '+12% this month', positive: true, icon: Boxes, color: 'text-primary bg-primary/10' },
    { title: 'Resource Bookings Today', value: '14', change: '8 active now', positive: true, icon: CalendarDays, color: 'text-emerald-500 bg-emerald-500/10' },
    { title: 'Pending Maintenance', value: '6', change: '2 critical priority', positive: false, icon: Wrench, color: 'text-amber-500 bg-amber-500/10' },
    { title: 'Compliance Progress', value: '92%', change: 'Target: 100% Friday', positive: true, icon: ShieldCheck, color: 'text-indigo-500 bg-indigo-500/10' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-foreground">Welcome back, {user?.first_name}!</h1>
          <p className="text-xs text-muted-foreground mt-0.5">AssetFlow Overview: Current status, active operations, and alerts.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/assets')}
            className="px-3.5 py-2 bg-primary hover:bg-primary-hover text-primary-foreground font-bold rounded-lg text-xs transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>Assets Management</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="bg-card border border-border p-5 rounded-xl shadow-premium hover:shadow-premium-hover transition-all duration-300 flex items-center justify-between"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{kpi.title}</span>
              <p className="text-2xl font-bold tracking-tight text-foreground">{kpi.value}</p>
              <span className="text-[10px] flex items-center gap-1 font-semibold">
                {kpi.positive ? (
                  <TrendingUp className="h-3 w-3 text-emerald-500 shrink-0" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-amber-500 shrink-0" />
                )}
                <span className={kpi.positive ? 'text-emerald-500' : 'text-amber-500'}>{kpi.change}</span>
              </span>
            </div>
            <div className={`p-3 rounded-lg ${kpi.color} shrink-0`}>
              <kpi.icon className="h-5 w-5" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts & Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Area Chart: Asset Health Trend */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-card border border-border rounded-xl p-5 shadow-premium space-y-4"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Asset Health Progress</h3>
              <p className="text-sm font-bold text-foreground mt-0.5">Global Reliability Index (%)</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">
              Average: 89.5%
            </span>
          </div>
          
          <div className="h-56 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#875A7B" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#875A7B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#6B7280" opacity={0.6} tickLine={false} />
                <YAxis stroke="#6B7280" opacity={0.6} tickLine={false} domain={[50, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))', 
                    borderRadius: '8px', 
                    fontSize: '11px',
                    color: 'hsl(var(--foreground))' 
                  }} 
                />
                <Area type="monotone" dataKey="health" stroke="#875A7B" strokeWidth={2.5} fillOpacity={1} fill="url(#colorHealth)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Donut Chart: Asset Status Breakdown */}
        <motion.div
          variants={itemVariants}
          className="bg-card border border-border rounded-xl p-5 shadow-premium space-y-4 flex flex-col justify-between"
        >
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Status Breakdown</h3>
            <p className="text-sm font-bold text-foreground mt-0.5">Asset Availability Distribution</p>
          </div>
          
          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))', 
                    borderRadius: '8px', 
                    fontSize: '11px',
                    color: 'hsl(var(--foreground))' 
                  }} 
                />
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
            {statusData.map((d, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: d.color }}></span>
                <span className="text-muted-foreground truncate">{d.name}:</span>
                <span className="text-foreground">{d.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Row 2: Department Bar Chart + Activity Timeline & Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bar Chart: Allocations by Department */}
        <motion.div
          variants={itemVariants}
          className="bg-card border border-border rounded-xl p-5 shadow-premium space-y-4"
        >
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Department Shares</h3>
            <p className="text-sm font-bold text-foreground mt-0.5">Allocations by Department</p>
          </div>

          <div className="h-56 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#6B7280" opacity={0.6} tickLine={false} />
                <YAxis stroke="#6B7280" opacity={0.6} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))', 
                    borderRadius: '8px', 
                    fontSize: '11px',
                    color: 'hsl(var(--foreground))' 
                  }} 
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Timeline Activities */}
        <motion.div
          variants={itemVariants}
          className="bg-card border border-border rounded-xl p-5 shadow-premium space-y-4"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Live Logs</h3>
              <p className="text-sm font-bold text-foreground mt-0.5">Asset Operations Timeline</p>
            </div>
            <button 
              onClick={() => navigate('/logs')}
              className="text-[10px] text-primary font-bold hover:underline"
            >
              System Logs
            </button>
          </div>

          <div className="relative border-l border-border pl-4 ml-2 space-y-4 text-xs">
            <div className="relative">
              <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 bg-primary rounded-full border border-card"></div>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-semibold">
                <Clock className="h-3 w-3" /> Today, 09:40 AM
              </div>
              <p className="font-bold mt-0.5 text-foreground">Asset Assigned</p>
              <p className="text-muted-foreground text-[10px] mt-0.5">MacBook Pro 16" (AST-2026-001) assigned to Ananya Mehta.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 bg-emerald-500 rounded-full border border-card"></div>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-semibold">
                <Clock className="h-3 w-3" /> Yesterday, 04:15 PM
              </div>
              <p className="font-bold mt-0.5 text-foreground">Resource Booked</p>
              <p className="text-muted-foreground text-[10px] mt-0.5">Conference Room B booked by Human Resources Team.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 bg-amber-500 rounded-full border border-card"></div>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-semibold">
                <Clock className="h-3 w-3" /> Yesterday, 11:00 AM
              </div>
              <p className="font-bold mt-0.5 text-foreground">Maintenance Ticket</p>
              <p className="text-muted-foreground text-[10px] mt-0.5">Water cooling system leakage reported in Server Room A.</p>
            </div>
          </div>
        </motion.div>

        {/* Pending Actions */}
        <motion.div
          variants={itemVariants}
          className="bg-card border border-border rounded-xl p-5 shadow-premium space-y-4"
        >
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Action Required</h3>
            <p className="text-sm font-bold text-foreground mt-0.5">Pending Approvals & Verification</p>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-secondary/35 rounded-lg border border-border/50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded">Transfer Gate</span>
                <span className="text-[9px] text-muted-foreground">1h ago</span>
              </div>
              <p className="font-bold text-[11px]">Transfer Request: Dell XPS 15</p>
              <p className="text-muted-foreground text-[10px]">Marketing division → Sales division</p>
              <div className="flex gap-2 pt-1">
                <button className="flex-1 py-1 bg-primary hover:bg-primary-hover text-primary-foreground rounded text-[10px] font-bold transition-all">Approve</button>
                <button className="flex-1 py-1 bg-secondary border border-border text-muted-foreground hover:text-foreground rounded text-[10px] font-bold transition-all">Decline</button>
              </div>
            </div>

            <div className="p-3 bg-secondary/35 rounded-lg border border-border/50 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-indigo-600 bg-indigo-500/10 px-1.5 py-0.5 rounded">Asset Audit</span>
                <span className="text-[9px] text-muted-foreground">3h ago</span>
              </div>
              <p className="font-bold text-[11px]">Quarterly IT Assets Review</p>
              <p className="text-muted-foreground text-[10px]">42 hardware items require scan verification.</p>
              <button 
                onClick={() => navigate('/audits')}
                className="w-full py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded text-[10px] font-bold transition-all"
              >
                Scan Verification
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default DashboardPage;
