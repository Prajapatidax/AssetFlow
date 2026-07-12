import React, { useState } from 'react';
import { Building2, Plus, ArrowRight, X, Folder, FolderPlus, Compass, Link2, Globe, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DepartmentDemo {
  id: string;
  name: string;
  code: string;
  parentDeptId?: string;
}

const INITIAL_DEPARTMENTS: DepartmentDemo[] = [
  { id: '1', name: 'Corporate Headquarters (HQ)', code: 'HQ' },
  { id: '2', name: 'Engineering Department', code: 'ENG', parentDeptId: '1' },
  { id: '3', name: 'Marketing Department', code: 'MKT', parentDeptId: '1' },
  { id: '4', name: 'Quality Assurance', code: 'QA', parentDeptId: '2' },
];

export const OrganizationPage: React.FC = () => {
  const [departments, setDepartments] = useState<DepartmentDemo[]>(INITIAL_DEPARTMENTS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [parentId, setParentId] = useState('1');

  const handleCreateDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) return;

    const newDept: DepartmentDemo = {
      id: String(departments.length + 1),
      name,
      code: code.toUpperCase(),
      parentDeptId: parentId || undefined
    };

    setDepartments([...departments, newDept]);
    setIsAddModalOpen(false);

    // Reset
    setName('');
    setCode('');
    setParentId('1');
  };

  // Render root and nested children recursively
  const renderDepartmentTree = (parentId?: string, depth = 0) => {
    const levelDepts = departments.filter(d => d.parentDeptId === parentId);

    return levelDepts.map(dept => (
      <div key={dept.id} className="space-y-2">
        <div 
          className="p-3 bg-secondary/50 rounded-lg flex justify-between items-center border border-border/50 hover:border-primary/20 transition-all hover:bg-secondary"
          style={{ marginLeft: `${depth * 20}px` }}
        >
          <div className="flex items-center gap-2">
            <Folder className={`h-4 w-4 ${depth === 0 ? 'text-primary' : 'text-primary-light'}`} />
            <span className="font-bold text-xs text-foreground">{dept.name}</span>
          </div>
          <span className="text-[9px] text-muted-foreground font-mono font-bold bg-secondary px-1.5 py-0.5 rounded border border-border/40">CODE: {dept.code}</span>
        </div>
        <div className="space-y-2">
          {renderDepartmentTree(dept.id, depth + 1)}
        </div>
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-foreground">Organization & Hierarchy</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Structure offices, define nested departments, and manage structural units.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-3.5 py-2 bg-primary hover:bg-primary-hover text-primary-foreground font-bold rounded-lg text-xs transition-all shadow-sm flex items-center gap-1.5 self-start md:self-auto"
        >
          <Plus className="h-4 w-4" /> Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Hierarchy Tree Card */}
        <div className="bg-card border border-border p-5 rounded-xl shadow-premium lg:col-span-2 space-y-4">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
            <Building2 className="h-4.5 w-4.5 text-primary" /> Department Hierarchy Tree
          </h3>
          <div className="space-y-2">
            {/* Render root level departments (those without parentDeptId) */}
            {renderDepartmentTree(undefined, 0)}
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-card border border-border p-5 rounded-xl shadow-premium space-y-4">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
            <Compass className="h-4.5 w-4.5 text-primary" /> Organization Profile
          </h3>
          
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-secondary/35 rounded-lg border border-border/50 space-y-1">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Company Name</p>
              <p className="font-bold text-foreground text-xs">AssetFlow Solutions Corp</p>
            </div>
            
            <div className="p-3 bg-secondary/35 rounded-lg border border-border/50 space-y-1">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1"><MapPin className="h-3 w-3" /> Address</p>
              <p className="font-semibold text-foreground leading-relaxed">100 Tech Venture Pkwy, Suite 400<br/>San Jose, CA 95110</p>
            </div>

            <div className="p-3 bg-secondary/35 rounded-lg border border-border/50 space-y-1">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1"><Globe className="h-3 w-3" /> Website</p>
              <a 
                href="https://assetflow.example.com" 
                target="_blank" 
                rel="noreferrer"
                className="font-bold text-primary hover:underline flex items-center gap-1"
              >
                <span>https://assetflow.example.com</span>
                <Link2 className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* --- ADD DEPARTMENT MODAL --- */}
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
                <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                  <FolderPlus className="h-4.5 w-4.5 text-primary" /> Create Department
                </h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <form onSubmit={handleCreateDepartment} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Department Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Quality Assurance Division"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Department Code</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. QA"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-mono font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Parent Division</label>
                    <select
                      value={parentId}
                      onChange={(e) => setParentId(e.target.value)}
                      className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-2.5 py-2 focus:outline-none"
                    >
                      <option value="">No Parent (Root level)</option>
                      {departments.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
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
                    Create Branch
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

export default OrganizationPage;
