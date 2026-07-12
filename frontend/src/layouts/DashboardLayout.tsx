import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Boxes,
  CalendarRange,
  Wrench,
  ClipboardCheck,
  Users2,
  Building2,
  Bell,
  Moon,
  Sun,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Search,
  Settings,
  Activity,
  User as UserIcon,
} from 'lucide-react';

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
}

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const navigationItems: SidebarItem[] = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard, roles: ['ADMIN', 'ASSET_MANAGER', 'DEPARTMENT_HEAD', 'EMPLOYEE'] },
    { name: 'Assets', path: '/assets', icon: Boxes, roles: ['ADMIN', 'ASSET_MANAGER', 'DEPARTMENT_HEAD', 'EMPLOYEE'] },
    { name: 'Bookings', path: '/bookings', icon: CalendarRange, roles: ['ADMIN', 'ASSET_MANAGER', 'DEPARTMENT_HEAD', 'EMPLOYEE'] },
    { name: 'Maintenance', path: '/maintenance', icon: Wrench, roles: ['ADMIN', 'ASSET_MANAGER', 'DEPARTMENT_HEAD', 'EMPLOYEE'] },
    { name: 'Audits', path: '/audits', icon: ClipboardCheck, roles: ['ADMIN', 'ASSET_MANAGER', 'DEPARTMENT_HEAD'] },
    { name: 'Employees', path: '/employees', icon: Users2, roles: ['ADMIN', 'DEPARTMENT_HEAD'] },
    { name: 'Organization', path: '/organization', icon: Building2, roles: ['ADMIN'] },
    { name: 'Activity Logs', path: '/logs', icon: Activity, roles: ['ADMIN'] },
    { name: 'Settings', path: '/settings', icon: Settings, roles: ['ADMIN', 'ASSET_MANAGER', 'DEPARTMENT_HEAD', 'EMPLOYEE'] },
  ];

  // Filter routes based on user roles
  const filteredNav = navigationItems.filter(item => user && item.roles.includes(user.role));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(x => x);
    if (paths.length === 0) return 'Dashboard';
    return paths.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' / ');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row transition-colors duration-200">
      
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border gap-2">
          <Boxes className="h-6 w-6 text-primary" />
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            AssetFlow
          </span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {filteredNav.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-border flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">
            {user?.first_name ? user.first_name[0] : 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{user?.first_name} {user?.last_name}</p>
            <p className="text-xs text-muted-foreground truncate capitalize">{user?.role?.replace('_', ' ').toLowerCase()}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-secondary rounded-lg text-muted-foreground hover:text-destructive transition-colors"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* --- MOBILE NAV BAR --- */}
      <header className="md:hidden h-16 bg-card border-b border-border flex items-center justify-between px-6 z-30">
        <div className="flex items-center gap-2">
          <Boxes className="h-6 w-6 text-primary" />
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            AssetFlow
          </span>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 hover:bg-secondary rounded-lg border border-border"
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 top-16 bg-card z-20 flex flex-col md:hidden"
          >
            <nav className="flex-1 px-6 py-8 space-y-2 overflow-y-auto">
              {filteredNav.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-4 px-4 py-4 rounded-xl text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    <item.icon className="h-6 w-6" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="p-6 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {user?.first_name ? user.first_name[0] : 'U'}
                </div>
                <div>
                  <p className="font-semibold">{user?.first_name} {user?.last_name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user?.role?.replace('_', ' ').toLowerCase()}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border border-destructive/20 hover:bg-destructive/5 text-destructive rounded-lg text-sm font-semibold transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN FRAMEWORK WORKSPACE --- */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="hidden md:flex h-16 bg-card border-b border-border items-center justify-between px-8 z-10">
          <div className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
            <span>AssetFlow</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-bold">{getBreadcrumbs()}</span>
          </div>

          <div className="flex items-center gap-4">
            
            {/* Search Bar */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Global Search..."
                className="w-full bg-secondary border border-border rounded-lg pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Dark Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-secondary rounded-lg border border-border transition-colors text-muted-foreground hover:text-foreground"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 hover:bg-secondary rounded-lg border border-border transition-colors text-muted-foreground hover:text-foreground relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full"></span>
              </button>
              
              {/* Simple Notification Dropdown */}
              <AnimatePresence>
                {isNotifOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsNotifOpen(false)}></div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-premium z-20 py-2"
                    >
                      <div className="px-4 py-2 border-b border-border flex justify-between items-center">
                        <span className="font-semibold text-sm">Notifications</span>
                        <span className="text-xs text-primary cursor-pointer hover:underline">Mark all read</span>
                      </div>
                      <div className="max-h-60 overflow-y-auto py-1">
                        <div className="px-4 py-2.5 hover:bg-secondary/50 text-xs border-b border-border/50 cursor-pointer">
                          <p className="font-semibold text-foreground">New Transfer Request</p>
                          <p className="text-muted-foreground mt-0.5">Laptop allocation requires approval.</p>
                          <span className="text-[10px] text-muted-foreground/80 mt-1 block">5m ago</span>
                        </div>
                        <div className="px-4 py-2.5 hover:bg-secondary/50 text-xs cursor-pointer">
                          <p className="font-semibold text-foreground">Maintenance Approved</p>
                          <p className="text-muted-foreground mt-0.5">Server maintenance scheduled for tonight.</p>
                          <span className="text-[10px] text-muted-foreground/80 mt-1 block">2h ago</span>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1.5 hover:bg-secondary rounded-lg border border-border transition-colors"
              >
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center font-bold text-sm text-primary">
                  {user?.first_name ? user.first_name[0] : 'U'}
                </div>
                <span className="text-sm font-semibold pr-1">{user?.first_name}</span>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-premium z-20 py-1"
                    >
                      <Link
                        to="/settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      >
                        <UserIcon className="h-4 w-4" />
                        My Profile
                      </Link>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          handleLogout();
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/5 transition-colors border-t border-border/50"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

          </div>
        </header>

        {/* Content Workspace Area */}
        <main className="flex-1 overflow-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};
