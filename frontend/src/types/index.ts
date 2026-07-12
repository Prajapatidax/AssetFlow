export type UserRole = 'ADMIN' | 'ASSET_MANAGER' | 'DEPARTMENT_HEAD' | 'EMPLOYEE';

export interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  phone_number?: string;
  is_active?: boolean;
  date_joined?: string;
}

export interface Organization {
  id: string;
  name: string;
  code: string;
  logo?: string;
  address?: string;
  website?: string;
  phone_number?: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

export interface Department {
  id: string;
  organization: string;
  name: string;
  code: string;
  manager?: string;
  manager_detail?: User;
  parent_department?: string;
  parent_name?: string;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: string;
  user: string;
  username: string;
  employee_id: string;
  department?: string;
  department_name?: string;
  designation: string;
  date_of_joining?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  bio?: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  phone_number?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}
