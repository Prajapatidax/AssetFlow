import React, { useState } from 'react';
import { Users2, Plus, Mail, ShieldAlert, X, Trash2, Shield, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmployeeDemo {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'ASSET_MANAGER' | 'DEPARTMENT_HEAD' | 'EMPLOYEE';
  code: string;
  designation: string;
}

const INITIAL_EMPLOYEES: EmployeeDemo[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'ADMIN', code: 'EMP-01', designation: 'General Administrator' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'ASSET_MANAGER', code: 'EMP-02', designation: 'Operations Manager' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'DEPARTMENT_HEAD', code: 'EMP-03', designation: 'Engineering Lead' },
];

export const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeDemo[]>(INITIAL_EMPLOYEES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<EmployeeDemo['role']>('EMPLOYEE');
  const [designation, setDesignation] = useState('');

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !designation.trim()) return;

    const newEmp: EmployeeDemo = {
      id: String(employees.length + 1),
      code: `EMP-0${employees.length + 1}`,
      name,
      email,
      role,
      designation
    };

    setEmployees([...employees, newEmp]);
    setIsAddModalOpen(false);

    // Reset
    setName('');
    setEmail('');
    setRole('EMPLOYEE');
    setDesignation('');
  };

  const handleDeleteEmployee = (id: string) => {
    if (window.confirm("Are you sure you want to remove this employee record?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const getRoleBadge = (role: EmployeeDemo['role']) => {
    switch (role) {
      case 'ADMIN':
        return <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">Admin</span>;
      case 'ASSET_MANAGER':
        return <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">Manager</span>;
      case 'DEPARTMENT_HEAD':
        return <span className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">Dept Head</span>;
      case 'EMPLOYEE':
        return <span className="bg-secondary text-muted-foreground px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide">Employee</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-foreground">Employee Directory</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Manage personnel records, departments, and role-based clearance permissions.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-3.5 py-2 bg-primary hover:bg-primary-hover text-primary-foreground font-bold rounded-lg text-xs transition-all shadow-sm flex items-center gap-1.5 self-start md:self-auto"
        >
          <Plus className="h-4 w-4" /> Add Employee
        </button>
      </div>

      {/* Directory Table Grid */}
      <div className="bg-card border border-border rounded-xl shadow-premium overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-secondary/30 border-b border-border text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Employee ID</th>
              <th className="py-3 px-6">Role Clearance</th>
              <th className="py-3 px-6">Designation</th>
              <th className="py-3 px-6">Contact</th>
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 text-xs">
            {employees.map(emp => (
              <tr key={emp.id} className="hover:bg-secondary/35 transition-colors">
                <td className="py-3.5 px-6 font-bold text-foreground flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-secondary border border-border/60 flex items-center justify-center font-bold text-xs text-primary">
                    {emp.name[0]}
                  </div>
                  <span>{emp.name}</span>
                </td>
                <td className="py-3.5 px-6 font-mono text-[11px] font-semibold text-muted-foreground">{emp.code}</td>
                <td className="py-3.5 px-6">{getRoleBadge(emp.role)}</td>
                <td className="py-3.5 px-6 font-medium text-foreground">{emp.designation}</td>
                <td className="py-3.5 px-6 text-muted-foreground">
                  <span className="flex items-center gap-1.5 hover:text-primary cursor-pointer">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{emp.email}</span>
                  </span>
                </td>
                <td className="py-3.5 px-6 text-right">
                  <button 
                    onClick={() => handleDeleteEmployee(emp.id)}
                    className="p-1 hover:bg-red-50 dark:hover:bg-red-950/20 rounded text-muted-foreground hover:text-red-500 transition-colors"
                    title="Remove Employee"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-xs text-muted-foreground font-semibold">
                  No employee records registered.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- ADD EMPLOYEE MODAL --- */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsAddModalOpen(false)}
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-premium p-6 z-10 space-y-4"
            >
              <div className="flex justify-between items-center border-b border-border/40 pb-2.5">
                <h3 className="font-bold text-sm text-foreground flex items-center gap-1">
                  <User className="h-4.5 w-4.5 text-primary" /> Register Employee Record
                </h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <form onSubmit={handleCreateEmployee} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alice Cooper"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alice@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Role Clearance</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as EmployeeDemo['role'])}
                      className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-2.5 py-2 focus:outline-none"
                    >
                      <option value="EMPLOYEE">Employee</option>
                      <option value="DEPARTMENT_HEAD">Department Head</option>
                      <option value="ASSET_MANAGER">Asset Manager</option>
                      <option value="ADMIN">Admin Clearance</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Designation</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. UI/UX Designer"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-3 py-2 focus:outline-none font-semibold"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-border/40">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-3.5 py-2 bg-secondary hover:bg-secondary-foreground hover:text-secondary rounded-lg font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold shadow-sm transition-all"
                  >
                    Register Personnel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default EmployeesPage;
