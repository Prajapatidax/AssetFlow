# Contributing to AssetFlow

Thank you for your interest in contributing to AssetFlow! We welcome contributions from developers, designers, and technical writers of all skill levels.

---

## Code of Conduct

Please read and adhere to our Code of Conduct (detailed in `CODE_OF_CONDUCT.md` at project root). We expect all contributors to maintain a respectful and welcoming environment.

---

## Development Workflow

### 1. Issue Reporting & Planning
- Before writing code, search the issues list or open a new issue describing your feature proposal or bug description.
- Align on the implementation approach with maintainers before submitting large pull requests.

### 2. Branch Naming Conventions
Follow standard naming conventions for your branch:
- `feature/your-feature-name` for new components or modules.
- `bugfix/issue-description` for bug fixes.
- `docs/updating-readme` for documentation improvements.

### 3. Coding Guidelines
- **Backend:**
  - Adhere to PEP 8 standards. Use `black` and `flake8` for formatting and linting.
  - Follow the Django App structure under `backend/apps/`.
  - Ensure all database queries utilize soft-delete logic (`deleted_at is null`) unless explicitly checking history.
- **Frontend:**
  - Use TypeScript strict mode. Ensure all properties are typed explicitly (no arbitrary `any`).
  - Structure components inside their respective `features/` folders.
  - Maintain styling using Tailwind CSS theme classes and variables, ensuring compatibility with Dark Mode.

### 4. Submitting Pull Requests
1. Fork the repository and create your branch from `main`.
2. Write unit tests for your additions (both Django backend tests and React frontend tests).
3. Ensure the project builds cleanly without warnings:
   - Backend: Run `pytest` or `python manage.py test`.
   - Frontend: Run `npm run build`.
4. Submit your Pull Request referencing the open issue.

---

## Questions?

Reach out to the maintainers by opening a discussion or commenting on an issue!
