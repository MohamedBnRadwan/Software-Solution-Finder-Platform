# Software Solution Finder Platform

[![CI](https://github.com/MohamedBnRadwan/Software-Solution-Finder-Platform/actions/workflows/ci.yml/badge.svg)](https://github.com/MohamedBnRadwan/Software-Solution-Finder-Platform/actions/workflows/ci.yml)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![MUI](https://img.shields.io/badge/Material--UI-9.x-007FFF?style=flat&logo=mui&logoColor=white)](https://mui.com/)
[![Framer Motion](https://img.shields.io/badge/Framer--Motion-12.x-FF00C8?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion/)

An interactive, guided software solution configurator designed to help clients identify, customize, and request the ideal technology solutions for their business. Similar to a car configurator or insurance wizard, this platform translates business needs into professional technical recommendations.

---

## 🚀 Key Features

* **Interactive Multi-Step Wizard**:
  * **Business Details**: Tailors the process for Startups, SMBs, Enterprises, Governments, and Non-profits.
  * **Industry & Niche**: Dynamically loads options for Healthcare, Education, Retail, Logistics, Real Estate, Construction, Manufacturing, Finance, and Public Services.
  * **Required Solution & Platforms**: Selects between Mobile, Web, PWA, or Desktop, including specialized apps (CRM, ERP, LMS, E-Commerce, etc.).
  * **Core Modules**: Guides users through common requirements (Auth, Dashboards, CMS, Payments, Orders).
  * **Integrations & Tech Preferences**: Integrates custom APIs, AI models (OpenAI), maps, SMS gateways, and custom tech stack wishes.
  * **Operations & Server Hosting**: Handles target traffic estimates and control panel preferences (cPanel, Plesk, Docker/CLI).
* **Smart Recommendation Engine**:
  * Calculates project complexity scores automatically.
  * Generates estimated development timelines and project phases.
  * Recommends optimal frontend, backend, database, mobile, and devops architectures based on user input.
* **RFP (Request for Proposal) Generator**:
  * Auto-generates a structured project summary.
  * Formats a formal Request for Proposal document.
* **Lead Submission Form**:
  * Allows users to submit their contact info along with their generated architecture recommendation.

---

## 🎯 Target Audiences

### 💼 For Business Owners (Non-Technical)
* Discover the exact systems you need (CRM, ERP, LMS, E-Commerce, Marketplace, Booking Systems) without needing high-level technical expertise.
* Clear, easy-to-understand options and explanations.
* Auto-generated specifications ready to hand over to software development agencies.

### 🛠️ For Developers & Technical Users
* Fine-tune configurations (Backend API-only, Frontend-only, Custom Database arrangements).
* Specify framework preferences (React, Angular, Vue, Flutter, React Native, Swift, Kotlin, Spring Boot, .NET Core, Laravel, NestJS, FastAPI).
* Plan complex enterprise architectures and deploy containerized environments.

---

## ⚙️ How to Use from the Repository

### 🖥️ Local Setup for Developers

Follow these steps to run the application locally on your machine:

#### 1. Clone the Repository
Clone the repository from GitHub using Git:
```bash
git clone https://github.com/MohamedBnRadwan/Software-Solution-Finder-Platform.git
cd Software-Solution-Finder-Platform
```

#### 2. Install Dependencies
Install all required packages using npm:
```bash
npm install
```

#### 3. Run the Development Server
Launch the local development environment:
```bash
npm run dev
```
By default, the application will run at [http://localhost:5173](http://localhost:5173). Open this address in your web browser.

#### 4. Lint and Verify Code
To run the ESLint check and ensure the codebase matches standard guidelines:
```bash
npm run lint
```

#### 5. Build for Production
To build a highly optimized, minified production build:
```bash
npm run build
```
The compiled build output will be placed in the `dist/` directory.

#### 6. Preview Production Build Locally
Verify the production build locally before deploying:
```bash
npm run preview
```

---

## 📂 Project Structure

The project follows a clean, modular structure:

```text
Software-Solution-Finder-Platform/
├── .github/workflows/      # CI/CD Workflows
│   └── ci.yml              # GitHub Actions lint & build validation
├── public/                 # Static public assets (icons, images)
├── src/
│   ├── assets/             # Images, styles, and custom fonts
│   ├── components/         # Reusable UI Components
│   │   ├── Wizard/         # Question stages, steps, and forms
│   │   ├── Summary/        # RFP output and project summary blocks
│   │   ├── Recommendation/ # Recommended tech stacks & timeline cards
│   │   └── Forms/          # Form fields and validation components
│   ├── context/            # React Context for wizard state management
│   ├── data/               # Configurator options (industries, modules, integrations)
│   ├── pages/              # Main app pages (Home, Wizard, Results, Contact)
│   ├── utils/              # recommendationEngine.js core logic
│   ├── App.css             # Main component styles
│   ├── App.jsx             # React router configuration and layout structure
│   ├── index.css           # Core styling, variables, theme overrides
│   └── main.jsx            # Application entry point
├── eslint.config.js        # ESLint rule configuration
├── index.html              # Core HTML structure
├── package.json            # Node project configuration and dependencies
└── vite.config.js          # Vite compilation settings
```

---

## 🧪 CI/CD Integration

This project uses **GitHub Actions** for Continuous Integration.
* **Workflow File**: Located at `.github/workflows/ci.yml`.
* **Triggers**: Runs on every `push` and `pull_request` targetting the `main` branch.
* **Steps Performed**:
  1. Checks out the repository.
  2. Sets up Node.js v20 with npm caching.
  3. Installs dependencies using `npm ci`.
  4. Runs code linting (`npm run lint`).
  5. Performs production-ready compilation (`npm run build`).

This ensures that all changes submitted to the repository remain functional, lint-error free, and ready to deploy.

---

## 🤝 Contribution Guidelines

We welcome contributions to make the Software Solution Finder even better!
1. **Fork the repository** on GitHub.
2. Create a new feature branch: `git checkout -b feature/amazing-feature`.
3. Commit your changes: `git commit -m "Add some amazing feature"`.
4. Push to the branch: `git push origin feature/amazing-feature`.
5. Open a **Pull Request** detailing your changes.

---

## 📄 License

This project is licensed under the MIT License - see the repository details for details.
