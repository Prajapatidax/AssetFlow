import React, { useState } from 'react';
import { CalendarDays, Plus, Clock, Search, MapPin, X, User, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingDemo {
  id: string;
  resource: string;
  timeSlot: string;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  user: string;
}

const INITIAL_BOOKINGS: BookingDemo[] = [
  { id: '1', resource: 'Conference Room A', timeSlot: 'Today, 2:00 PM - 3:30 PM', status: 'CONFIRMED', user: 'Sunita Rao' },
  { id: '2', resource: 'Test Lab Rack #3', timeSlot: 'July 14, 9:00 AM - 5:00 PM', status: 'CONFIRMED', user: 'Amit Singh' },
];

export const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<BookingDemo[]>(INITIAL_BOOKINGS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Form state
  const [resource, setResource] = useState('Conference Room A');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [bookedBy, setBookedBy] = useState('');

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookedBy.trim() || !date) return;

    const newBooking: BookingDemo = {
      id: String(bookings.length + 1),
      resource,
      timeSlot: `${date}, ${startTime} - ${endTime}`,
      status: 'CONFIRMED',
      user: bookedBy
    };

    setBookings([newBooking, ...bookings]);
    setIsAddModalOpen(false);

    // Reset Form
    setResource('Conference Room A');
    setDate('');
    setStartTime('');
    setEndTime('');
    setBookedBy('');
  };

  const getStatusBadge = (status: BookingDemo['status']) => {
    switch (status) {
      case 'CONFIRMED':
        return <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded text-[10px] font-bold">Confirmed</span>;
      case 'PENDING':
        return <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-0.5 rounded text-[10px] font-bold">Pending</span>;
      case 'CANCELLED':
        return <span className="bg-red-500/10 text-red-500 px-2.5 py-0.5 rounded text-[10px] font-bold">Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-foreground">Resource Bookings</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Reserve physical assets, conference rooms, and company vehicles.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-3.5 py-2 bg-primary hover:bg-primary-hover text-primary-foreground font-bold rounded-lg text-xs transition-all shadow-sm flex items-center gap-1.5 self-start md:self-auto"
        >
          <Plus className="h-4 w-4" /> New Booking
        </button>
      </div>

      {/* Bookings Card */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-premium space-y-4">
        <h2 className="text-sm font-bold text-foreground flex items-center gap-1.5">
          <CalendarDays className="h-4.5 w-4.5 text-primary" /> Upcoming Bookings Schedule
        </h2>
        
        <div className="divide-y divide-border/40">
          {bookings.map((booking) => (
            <div key={booking.id} className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-foreground">{booking.resource}</h3>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Clock className="h-3 w-3" /> {booking.timeSlot}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                  <User className="h-3.5 w-3.5 text-muted-foreground/60" />
                  <span>Booked by <strong className="text-foreground">{booking.user}</strong></span>
                </div>
                {getStatusBadge(booking.status)}
              </div>
            </div>
          ))}
          {bookings.length === 0 && (
            <div className="py-6 text-center text-xs text-muted-foreground font-semibold">
              No upcoming resource bookings scheduled.
            </div>
          )}
        </div>
      </div>

      {/* --- NEW BOOKING MODAL --- */}
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
                <h3 className="font-bold text-sm text-foreground">Schedule Resource Booking</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <form onSubmit={handleCreateBooking} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Resource / Asset</label>
                  <select
                    value={resource}
                    onChange={(e) => setResource(e.target.value)}
                    className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-2.5 py-2 focus:outline-none"
                  >
                    <option>Conference Room A</option>
                    <option>Conference Room B</option>
                    <option>Test Lab Rack #3</option>
                    <option>Company Vehicle (Tesla Model 3)</option>
                    <option>Developer Laptop Stack</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-3 py-2 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Start Time</label>
                    <input
                      type="time"
                      required
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-3 py-2 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">End Time</label>
                    <input
                      type="time"
                      required
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-3 py-2 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Your Name / Booked By</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunita Rao"
                    value={bookedBy}
                    onChange={(e) => setBookedBy(e.target.value)}
                    className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-3 py-2 focus:outline-none font-semibold"
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
                    Confirm Booking
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

export default BookingsPage;
