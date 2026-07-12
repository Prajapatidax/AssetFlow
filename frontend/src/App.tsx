import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './layouts/DashboardLayout';

// Pages
import { LoginPage } from './features/auth/LoginPage';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { AssetsPage } from './features/assets/AssetsPage';
import { BookingsPage } from './features/bookings/BookingsPage';
import { MaintenancePage } from './features/maintenance/MaintenancePage';
import { AuditsPage } from './features/audit/AuditsPage';
import { EmployeesPage } from './features/employees/EmployeesPage';
import { OrganizationPage } from './features/organization/OrganizationPage';
import { ActivityLogsPage } from './features/logs/ActivityLogsPage';
import { SettingsPage } from './features/settings/SettingsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Workspace Layout Routes */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/assets" element={<AssetsPage />} />
                        <Route path="/bookings" element={<BookingsPage />} />
                        <Route path="/maintenance" element={<MaintenancePage />} />
                        
                        {/* Managerial & Admin Protected Routes */}
                        <Route
                          path="/audits"
                          element={
                            <ProtectedRoute allowedRoles={['ADMIN', 'ASSET_MANAGER', 'DEPARTMENT_HEAD']}>
                              <AuditsPage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/employees"
                          element={
                            <ProtectedRoute allowedRoles={['ADMIN', 'DEPARTMENT_HEAD']}>
                              <EmployeesPage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/organization"
                          element={
                            <ProtectedRoute allowedRoles={['ADMIN']}>
                              <OrganizationPage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/logs"
                          element={
                            <ProtectedRoute allowedRoles={['ADMIN']}>
                              <ActivityLogsPage />
                            </ProtectedRoute>
                          }
                        />

                        {/* General Protected Settings */}
                        <Route path="/settings" element={<SettingsPage />} />

                        {/* Fallback redirect */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
