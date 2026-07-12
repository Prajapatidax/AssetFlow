import React from 'react';
import { CalendarDays, Plus, Clock, Search, MapPin } from 'lucide-react';

export const BookingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Resource Bookings</h1>
          <p className="text-muted-foreground mt-1">Reserve physical assets, conference rooms, and company vehicles.</p>
        </div>
        <button className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg text-sm transition-all shadow-md flex items-center gap-2 self-start md:self-auto">
          <Plus className="h-4 w-4" /> New Booking
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-premium space-y-6">
        <h2 className="text-lg font-bold">Upcoming Bookings Schedule</h2>
        
        <div className="divide-y divide-border/60">
          <div className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/5 text-primary rounded-xl">
                <CalendarDays className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Conference Room A</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Clock className="h-3 w-3" /> Today, 2:00 PM - 3:30 PM
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full">Confirmed</span>
              <span className="text-xs text-muted-foreground">Booked by Jane Doe</span>
            </div>
          </div>

          <div className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 last:pb-0">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/5 text-primary rounded-xl">
                <CalendarDays className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Test Lab Rack #3</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Clock className="h-3 w-3" /> July 14, 9:00 AM - 5:00 PM
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full">Confirmed</span>
              <span className="text-xs text-muted-foreground">Booked by Alex Chen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
