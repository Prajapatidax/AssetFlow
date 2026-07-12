import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Save, User, Bell, Shield, Laptop, Check, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SettingsPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');
  
  // Success Alert State
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile Form States
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone_number || '');

  // Notifications State
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifAudit, setNotifAudit] = useState(true);
  const [notifMaintenance, setNotifMaintenance] = useState(false);

  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    // Save locally to simulate changes
    updateUser({
      ...user,
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phone
    });

    triggerSuccessAlert();
  };

  const triggerSuccessAlert = () => {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-foreground">System Settings</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Configure profile details, global configurations, notifications, and security policies.</p>
      </div>

      {/* Success Banner */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center gap-2 text-xs font-bold shadow-sm"
          >
            <Check className="h-4.5 w-4.5 shrink-0" />
            <span>Settings and preferences successfully updated.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Side: Settings Navigation Tabs */}
        <div className="space-y-1.5 shrink-0">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2.5 ${
              activeTab === 'profile' 
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20' 
                : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
            }`}
          >
            <User className="h-4 w-4" /> Profile Details
          </button>
          
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2.5 ${
              activeTab === 'notifications' 
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20' 
                : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
            }`}
          >
            <Bell className="h-4 w-4" /> Notifications
          </button>
          
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2.5 ${
              activeTab === 'security' 
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20' 
                : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground'
            }`}
          >
            <Shield className="h-4 w-4" /> Security Settings
          </button>
        </div>

        {/* Right Side: Tab Panel Content */}
        <div className="lg:col-span-3 bg-card border border-border p-6 rounded-xl shadow-premium">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                <h2 className="text-sm font-bold text-foreground">Profile Details</h2>
                
                <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">First Name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-semibold text-foreground"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-semibold text-foreground"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-semibold text-foreground"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-semibold text-foreground"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <Save className="h-4 w-4" /> Save Preferences
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                <h2 className="text-sm font-bold text-foreground">Notification Preferences</h2>
                <p className="text-[11px] text-muted-foreground font-medium">Select when and how you wish to receive updates regarding company assets.</p>

                <div className="space-y-3.5 pt-2 text-xs">
                  <div className="flex items-start justify-between p-3 bg-secondary/35 rounded-lg border border-border/50">
                    <div className="space-y-0.5">
                      <p className="font-bold text-foreground">Asset Assignment Emails</p>
                      <p className="text-[10px] text-muted-foreground">Receive notification emails when an asset is assigned or verified.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifEmail}
                      onChange={(e) => setNotifEmail(e.target.checked)}
                      className="h-4.5 w-4.5 rounded border-border text-primary focus:ring-primary/20" 
                    />
                  </div>

                  <div className="flex items-start justify-between p-3 bg-secondary/35 rounded-lg border border-border/50">
                    <div className="space-y-0.5">
                      <p className="font-bold text-foreground">Audit Cycle Alerts</p>
                      <p className="text-[10px] text-muted-foreground">Notify when department compliance audits are scheduled or due.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifAudit}
                      onChange={(e) => setNotifAudit(e.target.checked)}
                      className="h-4.5 w-4.5 rounded border-border text-primary focus:ring-primary/20" 
                    />
                  </div>

                  <div className="flex items-start justify-between p-3 bg-secondary/35 rounded-lg border border-border/50">
                    <div className="space-y-0.5">
                      <p className="font-bold text-foreground">Maintenance Updates</p>
                      <p className="text-[10px] text-muted-foreground">Receive instant notices on resolution status of filed tickets.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifMaintenance}
                      onChange={(e) => setNotifMaintenance(e.target.checked)}
                      className="h-4.5 w-4.5 rounded border-border text-primary focus:ring-primary/20" 
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={triggerSuccessAlert}
                      className="px-3.5 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <Save className="h-4 w-4" /> Save Alerts Setup
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-4"
              >
                <h2 className="text-sm font-bold text-foreground">Security Settings</h2>
                
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!currentPassword.trim() || !newPassword.trim()) return;
                    triggerSuccessAlert();
                    setCurrentPassword('');
                    setNewPassword('');
                  }} 
                  className="space-y-3.5 text-xs"
                >
                  <div className="space-y-1">
                    <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Current Password</label>
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-foreground"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">New Password</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-secondary/50 border border-border focus:border-primary rounded-lg px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-foreground"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <Save className="h-4 w-4" /> Save Security Keys
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
