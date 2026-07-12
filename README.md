# AssetFlow - Enterprise Asset & Resource Management ERP

AssetFlow is a production-ready, highly scalable, and modular ERP system designed for enterprise-grade asset lifecycle management, resource bookings, audit compliance, and maintenance scheduling. Inspired by the workspace efficiencies of Odoo and modernized with a premium, responsive UI/UX.

---

## Key Features

- **Robust Authentication & Roles:** RBAC permissions supporting Admin, Asset Manager, Department Head, and Employee.
- **Asset Directory & Categories:** Track asset locations, specs, depreciation, digital passports, and historical allocation.
- **Resource Bookings:** Interactive booking system with collision checking for physical assets, meeting rooms, and shared vehicles.
- **Maintenance & Workflows:** Ticket queues, approval gates, cost calculations, and Kanban-style lifecycle tracking.
- **Audit Cycles:** Set custom schedule frequencies, generate audit forms, and record verification checks.
- **Analytics & Exports:** Health score gauges, cost trackers, utilization charts, with PDF, Excel, and CSV report downloading.
- **QR Code Passport:** Instantly generate and scan QR codes for quick digital check-ins and asset metadata access.

---

## Tech Stack

### Backend
- **Django REST Framework (DRF) 5.x & Python 3.11** - Main REST API Layer
- **Django Channels & Redis** - Real-time notifications and system logs
- **Celery** - Background workers for reporting, audit updates, and emails
- **drf-spectacular** - OpenAPI 3.0 / Swagger API schema generator
- **PostgreSQL** - Production relational database

### Frontend
- **React 19 & TypeScript** - UI core
- **Vite** - High-speed frontend build tool
- **Tailwind CSS & Shadcn UI** - Styling and UI component system
- **TanStack Query (React Query)** - Cache & data fetching state
- **Framer Motion** - Sleek enterprise-level animations
- **Recharts & Lucide React** - Data visualizations and modern iconography

---

## Installation & Getting Started

### Option 1: Docker Compose (Recommended)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/AssetFlow.git
   cd AssetFlow
   ```
2. Copy environmental variables:
   ```bash
   cp .env.example .env
   ```
3. Boot the environment:
   ```bash
   docker-compose up --build
   ```
4. Access the apps:
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:8000
   - **Swagger Docs:** http://localhost:8000/api/schema/swagger-ui/

### Option 2: Local Manual Setup

#### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Seed initial data:
   ```bash
   python manage.py seed_data
   ```
6. Start the server:
   ```bash
   python manage.py runserver
   ```

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```

---

## Project Structure

```
d:/DAX/AssetFlow/
├── backend/                  # Django backend
│   ├── core/                 # Settings, base URLs, wsgi, channels
│   ├── apps/                 # Django Apps (auth, assets, bookings, audits...)
│   └── Dockerfile
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── api/              # Axios and query clients
│   │   ├── components/       # Global UI tokens
│   │   ├── features/         # Modular feature UI & hooks
│   │   └── layouts/          # Dashboard framing
│   └── Dockerfile
└── docker-compose.yml
```

---

## License

This project is licensed under the [MIT License](file:///d:/DAX/AssetFlow/LICENSE).
