import React from 'react';
import { Users2, Plus, Mail, ShieldAlert } from 'lucide-react';

export const EmployeesPage: React.FC = () => {
  const employees = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'ADMIN', code: 'EMP-01', designation: 'General Administrator' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'ASSET_MANAGER', code: 'EMP-02', designation: 'Operations Manager' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'DEPARTMENT_HEAD', code: 'EMP-03', designation: 'Engineering Lead' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Employee Directory</h1>
          <p className="text-muted-foreground mt-1">Manage personnel records, departments, and role-based clearance permissions.</p>
        </div>
        <button className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg text-sm transition-all shadow-md flex items-center gap-2 self-start md:self-auto">
          <Plus className="h-4 w-4" /> Add Employee
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-premium overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-secondary/50 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <th className="py-4 px-6">Name</th>
              <th className="py-4 px-6">Employee ID</th>
              <th className="py-4 px-6">Role Clearance</th>
              <th className="py-4 px-6">Designation</th>
              <th className="py-4 px-6">Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 text-sm">
            {employees.map(emp => (
              <tr key={emp.id} className="hover:bg-secondary/30 transition-colors">
                <td className="py-4 px-6 font-semibold">{emp.name}</td>
                <td className="py-4 px-6 font-mono text-xs">{emp.code}</td>
                <td className="py-4 px-6">
                  <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-semibold uppercase">{emp.role.replace('_', ' ')}</span>
                </td>
                <td className="py-4 px-6">{emp.designation}</td>
                <td className="py-4 px-6 flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" /> {emp.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
