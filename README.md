<div align="center">
  <h1>Workforce</h1>
  <p><strong>Find Your Dream Career Today</strong></p>
  <p>A modern, full-stack job board platform connecting talented professionals with great opportunities.</p>
</div>

---

## ✨ Features

- **Modern UI/UX**: Premium dark theme with glassmorphism effects, built from scratch with Vanilla CSS.
- **Role-Based Access**: Specialized portals and registration flows for Job Seekers, Clients, and Contractors.
- **Job Discovery**: Advanced search and filtering (by city, district, recency) to find the perfect role.
- **One-Click Apply**: Seamless application process for registered users.
- **Company Tools**: Employers can easily post new job listings, set requirements, and manage vacancies.
- **User Profiles**: Comprehensive user profiles with portfolio and document upload capabilities.
- **Responsive Design**: Flawless experience across desktop, tablet, and mobile devices.

## 🛠️ Technology Stack

**Frontend**
- React 18
- Vite
- React Router DOM
- Vanilla CSS (Custom Design System)
- Lucide React (Icons)

**Backend**
- Python 3.12
- Django 5.0
- Django REST Framework
- SQLite
- Token Authentication

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.10+)

### Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd jobfinder
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
5. Start the Django development server:
   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install NPM dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and visit `http://localhost:5173/` to view the application.

## 📁 Project Structure

```text
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI & Layout components
│   │   ├── context/        # React Context (Auth State)
│   │   ├── pages/          # Full page views (Home, Jobs, Auth, etc)
│   │   ├── services/       # API integration functions
│   │   └── index.css       # Global design system variables & utilities
│   └── vite.config.js      # Vite configuration (incl. API proxy)
│
├── jobfinder/              # Django backend application
│   ├── authentication/     # Auth flows, OTP, login view
│   ├── company/            # Company and organization models
│   ├── jobs/               # Job listings and application views
│   ├── users/              # User profiles and portfolios
│   └── jobfinder/          # Core Django settings and routing
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
