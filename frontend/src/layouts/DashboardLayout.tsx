import React, { useState, useEffect, useRef } from 'react';
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
  ChevronLeft,
  Search,
  Settings,
  Activity,
  User as UserIcon,
  Sparkles,
  ChevronDown,
  Star,
  Plus,
  Compass,
  CheckSquare,
  MessageSquare
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
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Collapsible Sidebar state persisted in localStorage
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('sidebar_collapsed') === 'true';
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState('HQ Operations');

  const workspaces = ['HQ Operations', 'Engineering Division', 'Marketing & Sales', 'Main Warehouse'];

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

  // Keyboard shortcut Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('sidebar_collapsed', String(next));
      return next;
    });
  };

  // Filter routes based on user roles
  const filteredNav = navigationItems.filter(item => user && item.roles.includes(user.role));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(x => x);
    if (paths.length === 0) return ['Dashboard'];
    return paths.map(p => p.charAt(0).toUpperCase() + p.slice(1));
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="min-h-screen bg-secondary/35 flex flex-col md:flex-row transition-colors duration-200">
      
      {/* --- DESKTOP SIDEBAR --- */}
      <aside 
        className={`hidden md:flex flex-col bg-card border-r border-border shrink-0 transition-all duration-300 relative ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Toggle Collapse Button */}
        <button
          onClick={toggleCollapse}
          className="absolute -right-3 top-8 bg-card border border-border rounded-full p-1 text-muted-foreground hover:text-foreground hover:bg-secondary shadow-sm z-50 transition-colors"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>

        {/* Sidebar Brand Header */}
        <div className="h-16 flex items-center px-5 border-b border-border gap-2.5 overflow-hidden shrink-0">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shrink-0 shadow-sm shadow-primary/20">
            <Boxes className="h-5 w-5" />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-base tracking-tight text-foreground select-none">
              AssetFlow <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded ml-1 uppercase">ERP</span>
            </span>
          )}
        </div>

        {/* Workspace Switcher */}
        <div className="px-3 py-4 border-b border-border/60 shrink-0">
          <div className="relative">
            <button
              onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
              className={`w-full flex items-center gap-2 p-2 hover:bg-secondary rounded-lg border border-border/40 transition-colors text-left ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title="Switch Workspace"
            >
              <Building2 className="h-4 w-4 text-primary shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="text-xs font-semibold truncate flex-1">{activeWorkspace}</span>
                  <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0" />
                </>
              )}
            </button>

            <AnimatePresence>
              {isWorkspaceOpen && !isCollapsed && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsWorkspaceOpen(false)}></div>
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 right-0 mt-1.5 bg-card border border-border rounded-lg shadow-premium z-40 py-1"
                  >
                    {workspaces.map((ws) => (
                      <button
                        key={ws}
                        onClick={() => {
                          setActiveWorkspace(ws);
                          setIsWorkspaceOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-secondary transition-colors ${
                          activeWorkspace === ws ? 'text-primary bg-primary/5 font-semibold' : 'text-muted-foreground'
                        }`}
                      >
                        {ws}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Navigation Section */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {filteredNav.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all relative ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={item.name}
              >
                <item.icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                {!isCollapsed && <span>{item.name}</span>}
                {isActive && !isCollapsed && (
                  <div className="absolute right-3 h-1.5 w-1.5 bg-primary rounded-full"></div>
                )}
              </Link>
            );
          })}

          {/* Favorites List section (shown only when expanded) */}
          {!isCollapsed && (
            <div className="pt-6 space-y-2">
              <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest px-3 block">Favorites</span>
              <div className="space-y-0.5">
                <Link to="/assets" className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/40">
                  <Star className="h-3 w-3 text-amber-500 fill-amber-500 shrink-0" />
                  <span className="truncate">Assets Directory</span>
                </Link>
                <Link to="/maintenance" className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/40">
                  <Star className="h-3 w-3 text-amber-500 fill-amber-500 shrink-0" />
                  <span className="truncate">Maintenance Logs</span>
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* User Footer */}
        <div className="p-3 border-t border-border flex flex-col gap-2 shrink-0">
          <div className={`flex items-center gap-2.5 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-sm shrink-0">
              {user?.first_name ? user.first_name[0] : 'U'}
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate text-foreground">{user?.first_name} {user?.last_name}</p>
                <p className="text-[10px] text-muted-foreground truncate font-medium capitalize">{user?.role?.replace('_', ' ').toLowerCase()}</p>
              </div>
            )}
            {!isCollapsed && (
              <button
                onClick={handleLogout}
                className="p-1.5 hover:bg-destructive/5 rounded-md text-muted-foreground hover:text-destructive transition-colors shrink-0"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
          {isCollapsed && (
            <button
              onClick={handleLogout}
              className="w-full py-1.5 flex justify-center hover:bg-destructive/5 rounded-md text-muted-foreground hover:text-destructive transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </aside>

      {/* --- MOBILE NAV BAR --- */}
      <header className="md:hidden h-16 bg-card border-b border-border flex items-center justify-between px-6 z-30 shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
            <Boxes className="h-5 w-5" />
          </div>
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            AssetFlow
          </span>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 hover:bg-secondary rounded-lg border border-border"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            <nav className="flex-1 px-6 py-6 space-y-1.5 overflow-y-auto">
              {filteredNav.map((item) => {
                const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
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
                  <p className="text-sm font-bold">{user?.first_name} {user?.last_name}</p>
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
        
        {/* Sticky Header */}
        <header className="hidden md:flex h-16 bg-card/85 backdrop-blur-md border-b border-border items-center justify-between px-8 sticky top-0 z-30 shadow-sm">
          {/* Left Side: Breadcrumb & Workspace Selector */}
          <div className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
            <span className="text-primary hover:underline cursor-pointer" onClick={() => navigate('/')}>AssetFlow</span>
            <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb}>
                {idx > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground/60" />}
                <span className={`${idx === breadcrumbs.length - 1 ? 'text-foreground font-bold' : 'hover:underline cursor-pointer'}`} onClick={() => idx < breadcrumbs.length - 1 && navigate(location.pathname.split('/').slice(0, idx + 2).join('/'))}>
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Right Side: Global controls */}
          <div className="flex items-center gap-4">
            
            {/* Keyboard Shortcuts Global Search */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Global search... (Ctrl+K)"
                className="w-full bg-secondary/80 border border-border hover:border-muted-foreground/30 focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/10 rounded-lg pl-9 pr-12 py-1.5 text-xs focus:outline-none transition-all placeholder:text-muted-foreground/75"
              />
              <span className="absolute right-2 top-2 px-1.5 py-0.5 text-[9px] font-mono font-bold text-muted-foreground bg-secondary border border-border rounded">
                Ctrl+K
              </span>
            </div>

            {/* Quick Create Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsQuickCreateOpen(!isQuickCreateOpen)}
                className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Quick Create</span>
                <ChevronDown className="h-3 w-3" />
              </button>

              <AnimatePresence>
                {isQuickCreateOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsQuickCreateOpen(false)}></div>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-premium z-20 py-1"
                    >
                      <button
                        onClick={() => { setIsQuickCreateOpen(false); navigate('/assets'); }}
                        className="w-full text-left px-4 py-2 text-xs hover:bg-secondary text-foreground font-semibold flex items-center gap-2"
                      >
                        <Boxes className="h-3.5 w-3.5 text-primary" /> New Asset
                      </button>
                      <button
                        onClick={() => { setIsQuickCreateOpen(false); navigate('/bookings'); }}
                        className="w-full text-left px-4 py-2 text-xs hover:bg-secondary text-foreground font-semibold flex items-center gap-2"
                      >
                        <CalendarRange className="h-3.5 w-3.5 text-emerald-500" /> New Booking
                      </button>
                      <button
                        onClick={() => { setIsQuickCreateOpen(false); navigate('/maintenance'); }}
                        className="w-full text-left px-4 py-2 text-xs hover:bg-secondary text-foreground font-semibold flex items-center gap-2"
                      >
                        <Wrench className="h-3.5 w-3.5 text-amber-500" /> Maintenance Ticket
                      </button>
                      <button
                        onClick={() => { setIsQuickCreateOpen(false); navigate('/audits'); }}
                        className="w-full text-left px-4 py-2 text-xs hover:bg-secondary text-foreground font-semibold flex items-center gap-2 border-t border-border/50"
                      >
                        <ClipboardCheck className="h-3.5 w-3.5 text-indigo-500" /> Start Audit Cycle
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Dark Mode Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-secondary rounded-lg border border-border transition-colors text-muted-foreground hover:text-foreground"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 hover:bg-secondary rounded-lg border border-border transition-colors text-muted-foreground hover:text-foreground relative"
                title="Notifications"
              >
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full"></span>
              </button>
              
              {/* Premium Notification Dropdown */}
              <AnimatePresence>
                {isNotifOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsNotifOpen(false)}></div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-premium z-20 py-1"
                    >
                      <div className="px-4 py-2.5 border-b border-border flex justify-between items-center bg-secondary/30">
                        <span className="font-bold text-xs">Notifications</span>
                        <span className="text-[10px] text-primary font-bold cursor-pointer hover:underline">Mark all read</span>
                      </div>
                      <div className="max-h-72 overflow-y-auto divide-y divide-border/40">
                        <div className="px-4 py-3 hover:bg-secondary/40 text-xs cursor-pointer transition-colors">
                          <div className="flex justify-between items-start">
                            <p className="font-bold text-foreground">Asset Allocated</p>
                            <span className="text-[9px] text-muted-foreground">5m ago</span>
                          </div>
                          <p className="text-muted-foreground mt-0.5 text-[11px] leading-snug">MacBook Pro 16" (AST-2026-001) has been successfully verified.</p>
                        </div>
                        <div className="px-4 py-3 hover:bg-secondary/40 text-xs cursor-pointer transition-colors">
                          <div className="flex justify-between items-start">
                            <p className="font-bold text-foreground">New Maintenance Ticket</p>
                            <span className="text-[9px] text-muted-foreground">2h ago</span>
                          </div>
                          <p className="text-muted-foreground mt-0.5 text-[11px] leading-snug">HVAC Periodic Filter Change requested by Engineering Division.</p>
                        </div>
                        <div className="px-4 py-3 hover:bg-secondary/40 text-xs cursor-pointer transition-colors">
                          <div className="flex justify-between items-start">
                            <p className="font-bold text-foreground">Compliance Target</p>
                            <span className="text-[9px] text-muted-foreground">1d ago</span>
                          </div>
                          <p className="text-muted-foreground mt-0.5 text-[11px] leading-snug">Q3 IT Assets Audit is currently at 72% progress.</p>
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
                className="flex items-center gap-2 p-1 hover:bg-secondary rounded-lg border border-border transition-all shadow-sm"
              >
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-[10px] text-primary">
                  {user?.first_name ? user.first_name[0] : 'U'}
                </div>
                <span className="text-xs font-bold text-foreground pr-1 shrink-0">{user?.first_name}</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0" />
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
                      <div className="px-4 py-2 border-b border-border/40 bg-secondary/20">
                        <p className="text-xs font-bold text-foreground leading-tight truncate">{user?.first_name} {user?.last_name}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
                      </div>
                      <Link
                        to="/settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      >
                        <UserIcon className="h-3.5 w-3.5" />
                        My Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      >
                        <Settings className="h-3.5 w-3.5" />
                        System Settings
                      </Link>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          handleLogout();
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-xs font-bold text-destructive hover:bg-destructive/5 transition-colors border-t border-border/50"
                      >
                        <LogOut className="h-3.5 w-3.5" />
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
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
