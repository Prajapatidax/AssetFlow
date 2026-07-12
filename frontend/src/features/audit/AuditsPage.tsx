import React from 'react';
import { ClipboardCheck, Plus, CheckCircle, ArrowRight } from 'lucide-react';

export const AuditsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Compliance Audits</h1>
          <p className="text-muted-foreground mt-1">Audit cycles, physical verification tracking, and compliance logs.</p>
        </div>
        <button className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg text-sm transition-all shadow-md flex items-center gap-2 self-start md:self-auto">
          <Plus className="h-4 w-4" /> Create Audit Cycle
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-premium p-6 space-y-6">
        <h2 className="text-lg font-bold">Active Audit Cycles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-base">Q3 IT Assets Audit</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Started on July 01, 2026</p>
              </div>
              <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">In Progress</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground font-medium">
                <span>Verification progress:</span>
                <span>72% completed</span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>

            <button className="w-full py-2 bg-secondary border border-border hover:bg-secondary/80 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2">
              Resume Audits <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="border border-border rounded-xl p-5 space-y-4 opacity-75">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-base">Operations Furniture Audit</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Ended on June 20, 2026</p>
              </div>
              <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full">Completed</span>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground font-medium">
                <span>Verification progress:</span>
                <span>100% completed</span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <button className="w-full py-2 bg-secondary border border-border hover:bg-secondary/80 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2">
              View Audit Report <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
