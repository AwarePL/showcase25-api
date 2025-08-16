# Showcase: Backend API Test Automation

This project is a showcase of a modern backend API test automation framework using TypeScript, Vitest, and best coding practices like SOLID, DRY, and AAA. It targets the public PetStore v3 API.

## ✨ Features

- **Modern Tech Stack:** TypeScript, Node.js (ESM), Vitest, **ofetch**.
- **Lightweight:** Uses `ofetch` for minimal dependency footprint.
- **Best Practices:** Follows Arrange-Act-Assert, DRY, and SOLID principles.
- **Scalable Structure:** Clear separation of concerns with clients, services, and test data.
- **Code Quality:** Enforced by ESLint and Prettier using modern "flat config".
- **CI/CD Ready:** Includes a GitHub Actions workflow for automated testing and **JUnit report generation**.
- **Advanced Reporting:** Integrated with TestBeats via JUnit report uploads.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer)
- Yarn package manager

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/showcase-backend-tests.git
    cd showcase-backend-tests
    ```

2.  **Install dependencies:**

    ```bash
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project. Add the following content:

    ```
    # TestBeats Configuration (used for uploading reports)
    TESTBEATS_API_KEY="Your_TestBeats_API_Key"
    TESTBEATS_PROJECT_ID="Your_TestBeats_Project_ID"

    # API Configuration
    API_BASE_URL="https://petstore3.swagger.io/api/v3"
    API_KEY="special-key"
    ```

---

## 🧪 Running Tests

- **Run all tests once (this will also generate `junit.xml`):**

  ```bash
  yarn test
  ```

- **Run tests in interactive watch mode:**

  ```bash
  yarn test:watch
  ```

- **Check for linting errors:**

  ```bash
  yarn lint
  ```

- **Automatically fix linting and formatting issues:**
  ```bash
  yarn lint:fix
  yarn format
  ```

---

## 📂 Project Structure

```
/
├── .github/workflows/  # GitHub Actions CI configuration
├── src/
│   ├── clients/        # Configured HTTP clients (e.g., ofetch)
│   ├── services/       # API services wrapping endpoints
│   └── data/           # Reusable test data and payloads
├── tests/              # Test files (`.spec.ts`)
├── .env                # Local environment variables (ignored by Git)
├── eslint.config.js    # Modern ESLint "flat" configuration
└── vitest.config.ts    # Vitest configuration
```
