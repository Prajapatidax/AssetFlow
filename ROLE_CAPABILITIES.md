# AssetFlow Role Capabilities

This document summarizes what each user role can do in the current backend based on the permission checks in the Django API.

## Roles

| Role | What they can do |
| --- | --- |
| Admin | Full access across the system. Admins can manage organizations, departments, employees, assets, asset categories, maintenance tickets, bookings, audit cycles, audit verifications, and reports. Admins can also delete records where the API allows deletion, approve or reject bookings, assign or approve maintenance work, start audit cycles, allocate or deallocate assets, and cancel any booking. |
| Manager | In the codebase this role is named Asset Manager. Asset Managers can create and update assets and asset categories, allocate or deallocate assets, assign maintenance tickets, approve maintenance costs, start audit cycles, and export asset reports. They can also access the same manager-level actions as Admin because Admin is included in the manager permission checks. |
| Dept Head | In the codebase this role is named Department Head. Department Heads can approve or reject resource bookings. Outside of that explicit booking approval flow, they have the same access as any authenticated user unless they are also an Admin. |
| Employee | Employees can log in, view and update their own profile, create bookings, cancel their own bookings, and use authenticated API endpoints that are not role restricted. In the current backend, maintenance ticket creation and audit verification submission are available to authenticated users unless a specific action adds extra restrictions. |

## Shared Access Rules

- Authentication uses JWT tokens.
- The API default permission is authenticated access, so most endpoints require a logged-in user unless a view overrides that rule.
- The role names in code are Admin, Asset Manager, Department Head, and Employee.
- The public register endpoint allows a new user to sign up, and the profile endpoint lets a logged-in user read or update their own basic details.

## What Each Role Specifically Controls

### Admin

- Manage organizations and departments.
- Manage employees.
- Manage assets and asset categories.
- Delete assets where deletion is allowed.
- Approve or reject bookings.
- Cancel any booking.
- Assign maintenance tickets and approve maintenance costs.
- Complete maintenance tickets as an admin when needed.
- Create and start audit cycles.
- Review and submit audit verifications.
- Export asset reports in CSV, Excel, or PDF format.

### Asset Manager

- Create, update, and view asset categories.
- Create, update, and view assets.
- Allocate and deallocate assets to a person or department.
- Assign maintenance tickets to technicians.
- Approve maintenance cost steps.
- Start audit cycles.
- Export asset reports.

### Department Head

- Approve resource booking requests.
- Reject resource booking requests.
- View authenticated endpoints available to standard users.

### Employee

- View and update their own profile.
- Create resource bookings.
- Cancel their own bookings.
- Create maintenance tickets.
- Submit audit verification results when authenticated.

## Notes

- The backend treats Manager as Asset Manager.
- Department Head has a smaller explicit permission surface than Admin or Asset Manager in the current code.
- Some endpoints are open to all authenticated users because they do not add a role-specific permission class.
- If you want, this file can be expanded into a full module-by-module access matrix.