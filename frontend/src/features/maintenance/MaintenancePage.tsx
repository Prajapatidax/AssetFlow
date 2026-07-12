import React from 'react';
import { Wrench, Plus, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export const MaintenancePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Maintenance Logs</h1>
          <p className="text-muted-foreground mt-1">Schedule and monitor maintenance logs and tickets.</p>
        </div>
        <button className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg text-sm transition-all shadow-md flex items-center gap-2 self-start md:self-auto">
          <Plus className="h-4 w-4" /> New Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kanban mock col 1 */}
        <div className="bg-secondary/20 border border-border p-4 rounded-xl space-y-4">
          <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">New requests (1)</h3>
          <div className="bg-card border border-border p-4 rounded-lg shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded">High Priority</span>
              <span className="text-[10px] text-muted-foreground font-mono">#MNT-89</span>
            </div>
            <h4 className="font-semibold text-sm">HVAC Periodic Filter Change</h4>
            <p className="text-xs text-muted-foreground">Office building Server Room B air conditioner filter replacement scheduled.</p>
          </div>
        </div>

        {/* Kanban mock col 2 */}
        <div className="bg-secondary/20 border border-border p-4 rounded-xl space-y-4">
          <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">In Progress (1)</h3>
          <div className="bg-card border border-border p-4 rounded-lg shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">Medium Priority</span>
              <span className="text-[10px] text-muted-foreground font-mono">#MNT-72</span>
            </div>
            <h4 className="font-semibold text-sm">Office Router Calibration</h4>
            <p className="text-xs text-muted-foreground">Network stability checks for primary Cisco routing units on floor 3.</p>
          </div>
        </div>

        {/* Kanban mock col 3 */}
        <div className="bg-secondary/20 border border-border p-4 rounded-xl space-y-4">
          <h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Completed (1)</h3>
          <div className="bg-card border border-border p-4 rounded-lg shadow-sm space-y-2 opacity-80">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded">Routine check</span>
              <span className="text-[10px] text-muted-foreground font-mono">#MNT-61</span>
            </div>
            <h4 className="font-semibold text-sm">Conference Projector Bulb</h4>
            <p className="text-xs text-muted-foreground">Replaced standard DLP projection assembly and verified color levels.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
