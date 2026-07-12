import React, { useState } from 'react';
import { ClipboardCheck, Plus, CheckCircle, ArrowRight, X, Trash2, Calendar, Target, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

interface AuditDemo {
  id: string;
  name: string;
  startDate: string;
  progress: number;
  status: 'IN_PROGRESS' | 'COMPLETED';
}

const INITIAL_AUDITS: AuditDemo[] = [
  { id: '1', name: 'Q3 IT Assets Audit', startDate: 'July 01, 2026', progress: 72, status: 'IN_PROGRESS' },
  { id: '2', name: 'Operations Furniture Audit', startDate: 'June 20, 2026', progress: 100, status: 'COMPLETED' },
];

export const AuditsPage: React.FC = () => {
  const { user } = useAuth();
  const [audits, setAudits] = useState<AuditDemo[]>(INITIAL_AUDITS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [cycleName, setCycleName] = useState('');
  const [startDateStr, setStartDateStr] = useState('');

  const handleCreateAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cycleName.trim() || !startDateStr) return;

    // Formatting date
    const dateObj = new Date(startDateStr);
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const newAudit: AuditDemo = {
      id: String(audits.length + 1),
      name: cycleName,
      startDate: formattedDate,
      progress: 0,
      status: 'IN_PROGRESS'
    };

    setAudits([newAudit, ...audits]);
    setIsAddModalOpen(false);

    // Reset
    setCycleName('');
    setStartDateStr('');
  };

  const handleCompleteAudit = (id: string) => {
    setAudits(audits.map(a => a.id === id ? { ...a, status: 'COMPLETED', progress: 100 } : a));
  };

  const handleDeleteAudit = (id: string) => {
    if (window.confirm("Delete this audit cycle history?")) {
      setAudits(audits.filter(a => a.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-foreground">Compliance Audits</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Audit cycles, physical verification tracking, and compliance logs.</p>
        </div>
        {(user?.role === 'ADMIN' || user?.role === 'ASSET_MANAGER') && (
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 bg-primary hover:bg-primary-hover text-primary-foreground font-bold rounded-lg text-xs transition-all shadow-sm flex items-center gap-1.5 self-start md:self-auto"
          >
            <Plus className="h-4 w-4" /> Create Audit Cycle
          </button>
        )}
      </div>

      {/* Audits Card Wrapper */}
      <div className="bg-card border border-border rounded-xl shadow-premium p-5 space-y-4">
        <h2 className="text-sm font-bold text-foreground flex items-center gap-1.5">
          <ClipboardCheck className="h-4.5 w-4.5 text-primary" /> Active Audit Cycles
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {audits.map(audit => (
            <div 
              key={audit.id} 
              className={`border border-border rounded-xl p-5 space-y-4 transition-all relative ${
                audit.status === 'COMPLETED' ? 'opacity-80 bg-secondary/10' : 'hover:border-primary/30'
              }`}
            >
              {/* Header Title */}
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-bold text-sm text-foreground">{audit.name}</h3>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Calendar className="h-3 w-3" /> Started: {audit.startDate}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                    audit.status === 'COMPLETED' 
                      ? 'bg-emerald-500/10 text-emerald-600' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {audit.status === 'COMPLETED' ? 'Completed' : 'In Progress'}
                  </span>
                  {user?.role === 'ADMIN' && (
                    <button 
                      onClick={() => handleDeleteAudit(audit.id)}
                      className="text-muted-foreground hover:text-red-500 p-0.5 rounded hover:bg-secondary transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Progress Index */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
                  <span className="flex items-center gap-0.5"><Target className="h-3 w-3 text-muted-foreground" /> Progress index:</span>
                  <span className="text-foreground">{audit.progress}% verified</span>
                </div>
                <div className="w-full bg-secondary border border-border/40 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      audit.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-primary'
                    }`} 
                    style={{ width: `${audit.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="flex gap-2 pt-1">
                {audit.status === 'IN_PROGRESS' ? (
                  (user?.role === 'ADMIN' || user?.role === 'ASSET_MANAGER') ? (
                    <>
                      <button 
                        onClick={() => handleCompleteAudit(audit.id)}
                        className="flex-1 py-1.5 bg-secondary hover:bg-secondary-foreground hover:text-secondary border border-border rounded text-[10px] font-bold transition-all"
                      >
                        Mark Complete
                      </button>
                      <button className="flex-1 py-1.5 bg-primary hover:bg-primary-hover text-white rounded text-[10px] font-bold transition-all flex items-center justify-center gap-1">
                        <span>Resume Scan</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </>
                  ) : (
                    <span className="text-[10px] text-muted-foreground font-semibold px-2 py-1 text-center w-full bg-secondary/30 rounded">Verification in Progress</span>
                  )
                ) : (
                  <button className="w-full py-1.5 bg-secondary border border-border hover:bg-secondary-foreground hover:text-secondary rounded text-[10px] font-bold transition-all flex items-center justify-center gap-1">
                    <Award className="h-3.5 w-3.5 text-emerald-500" /> View Compliance Certificate
                  </button>
                )}
              </div>
            </div>
          ))}
          {audits.length === 0 && (
            <div className="col-span-full py-8 text-center text-xs text-muted-foreground/60 font-semibold border border-dashed border-border rounded-xl">
              No compliance audit cycles registered.
            </div>
          )}
        </div>
      </div>

      {/* --- CREATE AUDIT MODAL --- */}
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
                <h3 className="font-bold text-sm text-foreground">Create Compliance Audit Cycle</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <form onSubmit={handleCreateAudit} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Audit Cycle Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Q4 Furniture & General Inventory"
                    value={cycleName}
                    onChange={(e) => setCycleName(e.target.value)}
                    className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDateStr}
                    onChange={(e) => setStartDateStr(e.target.value)}
                    className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                  />
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
                    Launch Cycle
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

export default AuditsPage;
