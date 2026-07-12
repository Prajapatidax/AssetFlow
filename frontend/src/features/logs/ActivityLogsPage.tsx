import React from 'react';
import { Activity, Clock } from 'lucide-react';

export const ActivityLogsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">System Activity Logs</h1>
        <p className="text-muted-foreground mt-1">Audit log database tracking configuration modifications and user activity.</p>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-premium overflow-hidden">
        <div className="p-4 bg-secondary/50 border-b border-border font-semibold text-sm">
          System-Wide Audit Trails
        </div>
        <div className="divide-y divide-border/60 text-sm">
          <div className="p-4 flex items-start gap-4">
            <div className="p-2 bg-primary/10 text-primary rounded-lg mt-0.5">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-foreground">User login successful</p>
              <p className="text-xs text-muted-foreground mt-0.5">Admin user (admin) authenticated via local JWT token.</p>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1">
                <Clock className="h-3 w-3" /> Today, 10:15 AM • IP: 127.0.0.1
              </span>
            </div>
          </div>

          <div className="p-4 flex items-start gap-4">
            <div className="p-2 bg-primary/10 text-primary rounded-lg mt-0.5">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Asset registered: AST-2026-005</p>
              <p className="text-xs text-muted-foreground mt-0.5">Development Test Server added to IT department by Admin.</p>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1">
                <Clock className="h-3 w-3" /> Yesterday, 4:30 PM • IP: 127.0.0.1
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
