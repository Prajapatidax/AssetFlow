import React, { useState } from 'react';
import { Wrench, Plus, CheckCircle, Clock, AlertTriangle, X, ShieldAlert, Tag, ArrowRight, Trash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

interface TicketDemo {
  id: string;
  code: string;
  title: string;
  description: string;
  priority: 'HIGH' | 'MEDIUM' | 'ROUTINE';
  status: 'NEW' | 'PROGRESS' | 'COMPLETED';
}

const INITIAL_TICKETS: TicketDemo[] = [
  { id: '1', code: 'MNT-89', title: 'HVAC Periodic Filter Change', description: 'Office building Server Room B air conditioner filter replacement scheduled.', priority: 'HIGH', status: 'NEW' },
  { id: '2', code: 'MNT-72', title: 'Office Router Calibration', description: 'Network stability checks for primary Cisco routing units on floor 3.', priority: 'MEDIUM', status: 'PROGRESS' },
  { id: '3', code: 'MNT-61', title: 'Conference Projector Bulb', description: 'Replaced standard DLP projection assembly and verified color levels.', priority: 'ROUTINE', status: 'COMPLETED' },
];

export const MaintenancePage: React.FC = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<TicketDemo[]>(INITIAL_TICKETS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TicketDemo['priority']>('ROUTINE');

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newTicket: TicketDemo = {
      id: String(tickets.length + 1),
      code: `MNT-${Math.floor(10 + Math.random() * 90)}`,
      title,
      description,
      priority,
      status: 'NEW'
    };

    setTickets([...tickets, newTicket]);
    setIsAddModalOpen(false);

    // Reset
    setTitle('');
    setDescription('');
    setPriority('ROUTINE');
  };

  const handleMoveTicket = (id: string, nextStatus: TicketDemo['status']) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: nextStatus } : t));
  };

  const handleDeleteTicket = (id: string) => {
    setTickets(tickets.filter(t => t.id !== id));
  };

  const getPriorityBadge = (prio: TicketDemo['priority']) => {
    switch (prio) {
      case 'HIGH':
        return <span className="text-[9px] font-bold bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded flex items-center gap-0.5"><ShieldAlert className="h-3 w-3" /> High Priority</span>;
      case 'MEDIUM':
        return <span className="text-[9px] font-bold bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded flex items-center gap-0.5"><Clock className="h-3 w-3" /> Medium Priority</span>;
      case 'ROUTINE':
        return <span className="text-[9px] font-bold bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded flex items-center gap-0.5"><CheckCircle className="h-3 w-3" /> Routine Check</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-foreground">Maintenance Logs</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Schedule, monitor, and resolve maintenance logs and support tickets.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-3.5 py-2 bg-primary hover:bg-primary-hover text-primary-foreground font-bold rounded-lg text-xs transition-all shadow-sm flex items-center gap-1.5 self-start md:self-auto"
        >
          <Plus className="h-4 w-4" /> New Ticket
        </button>
      </div>

      {/* Kanban Board Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kanban Column 1: New Requests */}
        <div className="bg-secondary/35 border border-border p-4 rounded-xl space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-border/40">
            <h3 className="font-bold text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              <span>New requests</span>
            </h3>
            <span className="text-[10px] font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded-full border border-border/60">
              {tickets.filter(t => t.status === 'NEW').length}
            </span>
          </div>

          <div className="space-y-3">
            {tickets.filter(t => t.status === 'NEW').map(ticket => (
              <div key={ticket.id} className="bg-card border border-border p-4 rounded-xl shadow-sm space-y-3 hover:border-primary/40 transition-colors relative group">
                <div className="flex justify-between items-start">
                  {getPriorityBadge(ticket.priority)}
                  <span className="text-[9px] text-muted-foreground font-mono font-bold">#{ticket.code}</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-foreground leading-snug">{ticket.title}</h4>
                  <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{ticket.description}</p>
                </div>
                <div className="flex justify-between items-center border-t border-border/40 pt-2.5">
                  {user?.role === 'ADMIN' && (
                    <button 
                      onClick={() => handleDeleteTicket(ticket.id)}
                      className="p-1 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded transition-all"
                    >
                      <Trash className="h-3.5 w-3.5" />
                    </button>
                  )}
                  {(user?.role === 'ADMIN' || user?.role === 'ASSET_MANAGER') && (
                    <button 
                      onClick={() => handleMoveTicket(ticket.id, 'PROGRESS')}
                      className="text-[10px] font-bold text-primary hover:text-primary-hover flex items-center gap-0.5 transition-colors ml-auto"
                    >
                      <span>Start Work</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {tickets.filter(t => t.status === 'NEW').length === 0 && (
              <div className="py-6 text-center text-xs text-muted-foreground/60 font-semibold border border-dashed border-border rounded-xl bg-card/45">
                No new requests.
              </div>
            )}
          </div>
        </div>

        {/* Kanban Column 2: In Progress */}
        <div className="bg-secondary/35 border border-border p-4 rounded-xl space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-border/40">
            <h3 className="font-bold text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500"></span>
              <span>In Progress</span>
            </h3>
            <span className="text-[10px] font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded-full border border-border/60">
              {tickets.filter(t => t.status === 'PROGRESS').length}
            </span>
          </div>

          <div className="space-y-3">
            {tickets.filter(t => t.status === 'PROGRESS').map(ticket => (
              <div key={ticket.id} className="bg-card border border-border p-4 rounded-xl shadow-sm space-y-3 hover:border-primary/40 transition-colors relative group">
                <div className="flex justify-between items-start">
                  {getPriorityBadge(ticket.priority)}
                  <span className="text-[9px] text-muted-foreground font-mono font-bold">#{ticket.code}</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-foreground leading-snug">{ticket.title}</h4>
                  <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{ticket.description}</p>
                </div>
                <div className="flex justify-between items-center border-t border-border/40 pt-2.5">
                  {user?.role === 'ADMIN' && (
                    <button 
                      onClick={() => handleDeleteTicket(ticket.id)}
                      className="p-1 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded transition-all"
                    >
                      <Trash className="h-3.5 w-3.5" />
                    </button>
                  )}
                  {(user?.role === 'ADMIN' || user?.role === 'ASSET_MANAGER') && (
                    <button 
                      onClick={() => handleMoveTicket(ticket.id, 'COMPLETED')}
                      className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5 transition-colors ml-auto"
                    >
                      <span>Complete</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {tickets.filter(t => t.status === 'PROGRESS').length === 0 && (
              <div className="py-6 text-center text-xs text-muted-foreground/60 font-semibold border border-dashed border-border rounded-xl bg-card/45">
                No active items.
              </div>
            )}
          </div>
        </div>

        {/* Kanban Column 3: Completed */}
        <div className="bg-secondary/35 border border-border p-4 rounded-xl space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-border/40">
            <h3 className="font-bold text-xs text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>Completed</span>
            </h3>
            <span className="text-[10px] font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded-full border border-border/60">
              {tickets.filter(t => t.status === 'COMPLETED').length}
            </span>
          </div>

          <div className="space-y-3">
            {tickets.filter(t => t.status === 'COMPLETED').map(ticket => (
              <div key={ticket.id} className="bg-card border border-border p-4 rounded-xl shadow-sm space-y-3 opacity-75 hover:opacity-100 transition-opacity relative group">
                <div className="flex justify-between items-start">
                  {getPriorityBadge(ticket.priority)}
                  <span className="text-[9px] text-muted-foreground font-mono font-bold">#{ticket.code}</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-foreground leading-snug line-through decoration-muted-foreground">{ticket.title}</h4>
                  <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{ticket.description}</p>
                </div>
                <div className="flex justify-between items-center border-t border-border/40 pt-2.5">
                  {user?.role === 'ADMIN' && (
                    <button 
                      onClick={() => handleDeleteTicket(ticket.id)}
                      className="p-1 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded transition-all"
                    >
                      <Trash className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded ml-auto">Resolved</span>
                </div>
              </div>
            ))}
            {tickets.filter(t => t.status === 'COMPLETED').length === 0 && (
              <div className="py-6 text-center text-xs text-muted-foreground/60 font-semibold border border-dashed border-border rounded-xl bg-card/45">
                No completed requests.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* --- CREATE TICKET MODAL --- */}
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
                <h3 className="font-bold text-sm text-foreground">File Maintenance Ticket</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <form onSubmit={handleCreateTicket} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Issue Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cisco Router Calibration"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Description</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe details of failure or periodic task..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-semibold resize-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Priority Clearances</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TicketDemo['priority'])}
                    className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-2.5 py-2 focus:outline-none"
                  >
                    <option value="ROUTINE">Routine check</option>
                    <option value="MEDIUM">Medium Priority</option>
                    <option value="HIGH">High Priority</option>
                  </select>
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
                    Submit Ticket
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

export default MaintenancePage;
