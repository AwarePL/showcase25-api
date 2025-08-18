# Showcase: Backend API Test Automation with Code Generation

This project is a modern backend API test automation framework that demonstrates the power of generating a TypeScript client directly from an OpenAPI (Swagger) specification. It uses `openapi-typescript-codegen` to eliminate manual boilerplate code, ensuring the test suite is always in sync with the API.

The framework targets the public PetStore v3 API and follows best practices like SOLID, DRY, and the Arrange-Act-Assert pattern.

## ✨ Features

- **Zero-Boilerplate API Client**: The TypeScript API client is **100% auto-generated** from the OpenAPI spec using `openapi-typescript-codegen`.
- **Modern Tech Stack**: TypeScript, Node.js (ESM), and Vitest for a fast and reliable testing experience.
- **Always in Sync**: Regenerate the client with a single command (`yarn generate:api`) to instantly adapt to any API changes.
- **Best Practices**: Adheres to Arrange-Act-Assert, DRY, and SOLID principles for clean and maintainable tests.
- **Scalable Structure**: A clear separation of concerns with generated services, test data factories, and utility functions.
- **Code Quality**: Enforced by ESLint and Prettier using modern "flat config".
- **CI/CD Ready**: Includes a GitHub Actions workflow for automated testing and JUnit report generation.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer)
- Yarn package manager

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/AwarePL/showcase25-api.git](https://github.com/AwarePL/showcase25-api.git)
    cd showcase-backend-tests
    ```

2.  **Install dependencies:**

    ```bash
    yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the `.env.example` file. Add your API credentials:

    ```
    # API Configuration
    API_BASE_URL="[https://petstore3.swagger.io/api/v3](https://petstore3.swagger.io/api/v3)"
    API_KEY="special-key"
    ```

4.  **Generate the API Client:**
    This is a crucial first step. The command will fetch the latest OpenAPI spec and generate the entire TypeScript client in the `src/generated/api` directory.

    ```bash
    yarn generate:api
    ```

---

## 🧪 Running Tests

- **Run all tests once:**
  This command will execute the test suite and generate a `junit.xml` report.

  ```bash
  yarn test
  ```

Run tests in interactive watch mode:
This is ideal for development, as tests will re-run automatically on file changes.

yarn test:watch

Update the API Client:
If the API has changed, simply run the generation command again to update your client code.

yarn generate:api

📂 Project Structure
The project structure is designed to be lean and scalable, with a clear separation between generated code, test data, and the tests themselves.

/
├── .github/workflows/ # GitHub Actions CI configuration
├── src/
│ ├── generated/api/ # Auto-generated API client (DO NOT EDIT MANUALLY)
│ ├── data/ # Test data factories (e.g., petData.ts)
│ └── utils/ # Reusable utility functions (e.g., retry.ts)
├── tests/ # Test files (`.spec.ts`)
├── .env # Local environment variables (ignored by Git)
├── eslint.config.js # Modern ESLint "flat" configuration
└── vitest.config.ts # Vitest configuration
