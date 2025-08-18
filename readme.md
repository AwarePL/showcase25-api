# Pet Store API Tests

## 1. 💡 Introduction & Core Idea

This project contains a suite of automated API tests for the Swagger Petstore API (`https://petstore.swagger.io/v2`). The primary goal is to validate the functionality of the API endpoints related to pets, the store, and users.

The tests are designed to ensure that the API behaves as expected under various conditions, covering creation, retrieval, updating, and deletion of data (CRUD operations), as well as handling of invalid data. The project utilizes `vitest` as the testing framework and `ofetch` for making HTTP requests.

## 2. 📁 Project Structure

The project is organized into the following main directories:

```
.
├── .github/workflows/  # Contains CI/CD configuration (GitHub Actions)
├── src/                # Source code, including test data and utilities
│   ├── data/           # Mock data for tests (pets, store, user)
│   └── utils/          # Helper functions for tests
└── tests/              # Contains all the test files (specs)
    ├── generic.spec.ts # Generic API health checks
    ├── pets.spec.ts    # Tests for the /pet endpoint
    ├── store.spec.ts   # Tests for the /store endpoint
    └── user.spec.ts    # Tests for the /user endpoint
```

- **`src/data/`**: Holds predefined data structures used to create requests in the tests.
- **`src/utils/`**: Includes utility functions, such as `retry` logic for handling transient network issues.
- **`tests/`**: Contains the actual test suites, separated by API resource (`pet`, `store`, `user`).
- **`.github/workflows/`**: Defines a GitHub Action that automatically runs the tests on every push to the repository.

## 3. 📚 Libraries and Technologies Used

This project relies on several key libraries:

| Library               | Version  | Description                                                                                              |
| :-------------------- | :------- | :------------------------------------------------------------------------------------------------------- |
| **Vitest**            | `^1.6.0` | A blazing fast unit test framework powered by Vite. Used for writing and running the test suites.        |
| **Ofetch**            | `^1.4.1` | A better fetch API. A lightweight, promise-based HTTP client for making requests.                        |
| **TypeScript**        | `^5.2.2` | A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. |
| **@faker-js/faker**   | `^8.4.1` | A library for generating massive amounts of fake data. Used for creating unique test data.               |
| **ESLint & Prettier** | -        | Used for code linting and formatting to maintain consistent code style.                                  |

## 4. 🚀 Setup and Usage

To get the project up and running, follow these steps:

**Prerequisites:**

- Node.js (v18 or higher)
- Yarn package manager

**1. Clone the repository:**

```bash
git clone https://github.com/AwarePL/showcase25-api.git
```

**2. Install dependencies:**

```bash
yarn install
```

_This command will install all the necessary packages defined in `package.json`._

**3. Set up environment variables:**
The project requires a `.env` file with the base URL of the API. You can create one by copying the example file:

```bash
cp example-env .env
```

The `.env` file should contain:

```
BASE_URL=https://petstore.swagger.io/v2
```

**4. Run the tests:**
Execute the following command to run all the test suites:

```bash
yarn test
```

## 5. 🔄 Continuous Integration (CI)

This project uses **GitHub Actions** for Continuous Integration. The workflow, defined in `.github/workflows/apiTests.yml`, is triggered on every `push` to the repository. It consists of two main jobs:

**Job 1: Test Execution (`test`)**

This job runs the test suite in parallel to speed up the process.

1.  **Parallel Execution**: The job is configured to run on 4 parallel instances (shards). This significantly reduces the total execution time.
2.  **Setup**: It checks out the code, sets up Node.js, and installs dependencies.
3.  **Environment Configuration**: It securely creates a `.env` file using secrets stored in GitHub.
4.  **Run Sharded Tests**: Each parallel instance runs a fraction of the test suite (`yarn test --shard=...`).
5.  **Generate Reports**: Each instance generates a JUnit XML report for its subset of tests.
6.  **Upload Artifacts**: The generated JUnit reports are uploaded as artifacts, making them available for the next job.

**Job 2: Reporting (`report`)**

This job runs after all the `test` shards are complete, even if some of them failed.

1.  **Download Artifacts**: It downloads and merges all the JUnit reports from the parallel test jobs.
2.  **Publish GitHub Report**: It uses the merged reports to generate a detailed test summary directly in the GitHub Actions UI.
3.  **Upload to TestBeats**: The same reports are sent to **TestBeats**, an external test reporting and analytics service.

## 6. 📊 Results Analysis & Reporting

Test results are available in two places after the CI pipeline completes:

**1. GitHub Actions Summary**

A summary of the test run is published directly on the GitHub Actions page for the specific workflow run. This provides a quick overview of which tests passed or failed.

- **PASS**: Indicates that the API endpoint responded as expected.
- **FAIL**: Indicates a problem. The report will include details about the failure, such as incorrect status codes or response bodies.

**2. TestBeats Dashboard**

For more in-depth analysis and historical tracking, results are sent to **TestBeats**. This platform provides:

- **Historical Data**: Track the success and failure rate of tests over time.
- **Performance Metrics**: Analyze the duration of test runs to identify performance regressions.
- **Flakiness Detection**: Identify tests that are unstable (sometimes passing, sometimes failing).
- **Centralized Dashboard**: A single place to view and analyze test results across all runs.

This dual-reporting approach provides both immediate feedback within the development workflow and long-term insights into the health and stability of the API.
