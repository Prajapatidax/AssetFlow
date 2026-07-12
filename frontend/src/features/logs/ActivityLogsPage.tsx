import React, { useState } from 'react';
import { Activity, Clock, Search, ShieldCheck, Database, KeyRound, Cpu, Server } from 'lucide-react';

interface LogDemo {
  id: string;
  type: 'AUTH' | 'ASSET' | 'SYSTEM' | 'SECURITY';
  event: string;
  details: string;
  time: string;
  ip: string;
}

const INITIAL_LOGS: LogDemo[] = [
  { id: '1', type: 'AUTH', event: 'User login successful', details: 'Admin user (admin) authenticated via local JWT token.', time: 'Today, 10:15 AM', ip: '127.0.0.1' },
  { id: '2', type: 'ASSET', event: 'Asset registered: AST-2026-005', details: 'Development Test Server added to IT department by Admin.', time: 'Yesterday, 4:30 PM', ip: '127.0.0.1' },
  { id: '3', type: 'SECURITY', event: 'Token refresh requested', details: 'Access token refreshed for user manager.', time: 'Yesterday, 2:15 PM', ip: '192.168.1.42' },
  { id: '4', type: 'SYSTEM', event: 'Database migration verified', details: 'System schema integrity check completed successfully.', time: '2 days ago', ip: 'localhost' },
];

export const ActivityLogsPage: React.FC = () => {
  const [logs] = useState<LogDemo[]>(INITIAL_LOGS);
  const [search, setSearch] = useState('');

  const filteredLogs = logs.filter(log => 
    log.event.toLowerCase().includes(search.toLowerCase()) ||
    log.details.toLowerCase().includes(search.toLowerCase()) ||
    log.ip.toLowerCase().includes(search.toLowerCase()) ||
    log.type.toLowerCase().includes(search.toLowerCase())
  );

  const getLogTypeIcon = (type: LogDemo['type']) => {
    switch (type) {
      case 'AUTH':
        return <KeyRound className="h-4 w-4 text-emerald-500" />;
      case 'ASSET':
        return <Database className="h-4 w-4 text-primary" />;
      case 'SECURITY':
        return <ShieldCheck className="h-4 w-4 text-red-500" />;
      case 'SYSTEM':
        return <Cpu className="h-4 w-4 text-indigo-500" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getLogTypeBadge = (type: LogDemo['type']) => {
    switch (type) {
      case 'AUTH':
        return <span className="bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded text-[9px] font-bold">Authentication</span>;
      case 'ASSET':
        return <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[9px] font-bold">Asset Registry</span>;
      case 'SECURITY':
        return <span className="bg-red-500/10 text-red-600 px-2 py-0.5 rounded text-[9px] font-bold">Security Gate</span>;
      case 'SYSTEM':
        return <span className="bg-indigo-500/10 text-indigo-600 px-2 py-0.5 rounded text-[9px] font-bold">System Log</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-foreground">System Activity Logs</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Audit log database tracking configuration modifications and user activity.</p>
        </div>

        {/* Search filter */}
        <div className="relative w-full max-w-xs self-start md:self-auto">
          <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Filter logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 rounded-lg pl-9 pr-4 py-1.5 text-xs focus:outline-none transition-all placeholder:text-muted-foreground/60 font-semibold"
          />
        </div>
      </div>

      {/* Logs Card List */}
      <div className="bg-card border border-border rounded-xl shadow-premium overflow-hidden">
        <div className="p-4 bg-secondary/30 border-b border-border font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Server className="h-4 w-4 text-primary" /> System-Wide Audit Trails
        </div>
        
        <div className="divide-y divide-border/40 text-xs">
          {filteredLogs.map(log => (
            <div key={log.id} className="p-4 flex items-start gap-4 hover:bg-secondary/20 transition-colors">
              <div className="p-2 bg-secondary border border-border/40 rounded-lg mt-0.5 shrink-0">
                {getLogTypeIcon(log.type)}
              </div>
              
              <div className="flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-bold text-foreground text-xs">{log.event}</p>
                  {getLogTypeBadge(log.type)}
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">{log.details}</p>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground/75 font-semibold">
                  <span className="flex items-center gap-0.5"><Clock className="h-3.5 w-3.5" /> {log.time}</span>
                  <span>•</span>
                  <span>IP Address: <span className="font-mono text-[9px] bg-secondary border border-border/40 px-1 py-0.2 rounded font-bold text-foreground">{log.ip}</span></span>
                </div>
              </div>
            </div>
          ))}
          {filteredLogs.length === 0 && (
            <div className="p-8 text-center text-xs text-muted-foreground/60 font-semibold">
              No matching activity log audit trails found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityLogsPage;
