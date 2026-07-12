import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Save, User, Bell, Shield, Laptop } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground mt-1">Configure profile details, global configurations, notifications, and security policies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side: Settings Navigation Tabs */}
        <div className="space-y-1">
          <button className="w-full text-left px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg text-sm transition-all flex items-center gap-2">
            <User className="h-4 w-4" /> Profile Details
          </button>
          <button className="w-full text-left px-4 py-2.5 hover:bg-secondary text-muted-foreground hover:text-foreground font-semibold rounded-lg text-sm transition-all flex items-center gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </button>
          <button className="w-full text-left px-4 py-2.5 hover:bg-secondary text-muted-foreground hover:text-foreground font-semibold rounded-lg text-sm transition-all flex items-center gap-2">
            <Shield className="h-4 w-4" /> Security Settings
          </button>
        </div>

        {/* Right Side: Profile Details form pane */}
        <div className="lg:col-span-3 bg-card border border-border p-6 rounded-xl shadow-premium space-y-6">
          <h2 className="text-lg font-bold">Profile Details</h2>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase">First Name</label>
                <input
                  type="text"
                  defaultValue={user?.first_name || ''}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Last Name</label>
                <input
                  type="text"
                  defaultValue={user?.last_name || ''}
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Email Address</label>
              <input
                type="email"
                defaultValue={user?.email || ''}
                className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Phone Number</label>
              <input
                type="text"
                defaultValue={user?.phone_number || ''}
                className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg text-sm transition-all shadow-md flex items-center gap-2"
              >
                <Save className="h-4 w-4" /> Save Preferences
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
