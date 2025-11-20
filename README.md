# LumaLife

**Personalized Health Intelligence at Your Fingertips.**

LumaLife is a comprehensive mobile application designed to empower individuals with actionable insights into their health and well-being. By integrating diverse health data and leveraging advanced AI analysis, LumaLife helps users understand their current health status, identify trends, and make informed decisions for a healthier future.

---


## Problem Statement

In an increasingly health-conscious world, individuals often collect a vast amount of personal health data across various devices and applications—from fitness trackers and sleep monitors to nutritional logging apps. However, this data frequently remains fragmented, siloed, and difficult to interpret holistically. Users struggle to connect the dots between their daily activities, nutrition, sleep patterns, and stress levels, making it challenging to understand the deeper implications for their long-term health. The core problem is a lack of integrated, personalized, and actionable intelligence that transforms raw data into meaningful insights and proactive health strategies. Without this, users are left with data overload rather than empowerment, often leading to disengagement and missed opportunities for preventive care.

---

## Solution Overview

LumaLife addresses these challenges by acting as a central hub for personal health data. It aggregates information from various health metrics (activity, nutrition, sleep, stress) and processes it through an intelligent backend equipped with AI-driven analysis capabilities. The application provides users with a unified view of their health, generating personalized insights and projections based on their unique data patterns. This approach moves beyond simple data logging, offering predictive analytics and actionable recommendations that empower users to understand the "why" behind their health trends and make proactive lifestyle adjustments. The intuitive mobile interface ensures that complex health information is presented clearly and engagingly, fostering consistent engagement and improved health outcomes.

---

## Key Features

*   **Holistic Health Tracking**: Monitor and log essential health metrics including:
    *   **Activity**: Track physical exertion and movement patterns.
    *   **Nutrition**: Log meals and dietary intake, with detailed nutritional breakdowns.
    *   **Sleep**: Analyze sleep cycles, duration, and quality.
    *   **Stress**: Record and understand stress levels and their potential triggers.
*   **AI-Powered Health Analysis**: Leverage sophisticated algorithms and machine learning to analyze aggregated health data, identifying subtle correlations and trends that human observation might miss.
*   **Personalized Insights**: Receive tailored feedback and recommendations based on individual health profiles and data, helping users understand the impact of their lifestyle choices.
*   **Health Projections**: Gain foresight into potential future health trajectories, enabling proactive interventions and goal setting.
*   **Intuitive Mobile Interface**: A clean, user-friendly design built for seamless navigation and easy data input on mobile devices.
*   **Meal Management System**: Dedicated section for detailed meal planning and tracking, including a form for custom meal entries.

---

## Tech Stack

### Frontend

*   **React Native**: Core framework for building native mobile applications, chosen for its cross-platform capabilities and developer efficiency.
*   **Expo**: A set of tools and services built on top of React Native, streamlining development, building, and deployment processes. We utilize Expo Router for declarative routing and easy navigation management.
*   **TypeScript**: A superset of JavaScript providing static type checking, enhancing code quality, maintainability, and scalability.
*   **NativeWind**: A utility-first CSS framework (Tailwind CSS for React Native) used for rapid UI development and consistent styling across the application. Chosen for its efficiency in styling components and reducing custom CSS.

### Backend

*   **Node.js**: Asynchronous event-driven JavaScript runtime, ideal for building scalable network applications.
*   **Express.js**: A fast, unopinionated, minimalist web framework for Node.js, used for building robust APIs.
*   **MongoDB**: A NoSQL document database, selected for its flexibility in handling diverse health data schemas and its horizontal scalability.
*   **OpenAI API (or similar LLM)**: Utilized for advanced natural language processing and generating insightful health analysis based on user data, powered by the `prompts` and `analysisService`. This allows for dynamic, context-aware feedback.
*   **Cron/Task Scheduler (Conceptual)**: For running background jobs like `analyzeHealthData.js` at regular intervals to process accumulated health data and update insights.

---

## Technical Challenges & Solutions

Developing a comprehensive health intelligence platform like LumaLife presented several non-trivial technical challenges. Here's a breakdown of the most significant ones and how they were addressed:

1.  ### Secure and Efficient Health Data Integration
    *   **Challenge**: Integrating with platform-specific health APIs (e.g., Apple HealthKit, Google Fit) to securely read and write sensitive user health data. This involves managing permissions, handling various data types, and ensuring data privacy compliant with strict health regulations (e.g., HIPAA principles). Additionally, efficiently fetching potentially large volumes of historical data without overwhelming the device or backend.
    *   **Solution**: We implemented a dedicated `frontend/lib/health` module.
        *   `healthPermissions.ts`: Manages requesting and verifying necessary health data permissions from the user, ensuring transparency and control.
        *   `healthFetch.ts`: Provides a standardized interface for asynchronously querying health data from underlying mobile health services. It abstracts away platform-specific implementation details and includes mechanisms for pagination or time-range fetching to manage data load.
        *   `sendHealthToBackend.ts`: Encapsulates the logic for securely transmitting aggregated and anonymized (where appropriate) health data to the backend API. This involves secure HTTPS communication and potentially data encryption in transit.
    *   **Trade-offs**: While abstracting platform-specific APIs provides cleaner code and maintainability, it requires ongoing effort to keep up with changes in health SDKs. Prioritizing privacy meant additional layers of data handling and consent flows, which added development complexity but were non-negotiable for a health application.

2.  ### Real-time/Near Real-time AI-Powered Analysis and Insight Generation
    *   **Challenge**: Processing continuous streams of incoming health data (e.g., new activity logs, meal entries, sleep data) and translating them into meaningful, personalized, and up-to-date AI-generated insights without significant latency or excessive computational cost. This involves orchestrating AI model calls, data aggregation, and result caching.
    *   **Solution**: The backend leverages a modular approach:
        *   `backend/src/jobs/analyzeHealthData.js`: A dedicated background job (designed to run periodically via a cron scheduler or similar) that processes new or updated `HealthSnapshot` data. This offloads heavy computation from real-time API requests.
        *   `backend/src/services/analysisService.js`: Contains the core logic for interacting with external AI models (like OpenAI API), crafting prompts using templates from `backend/src/prompts/healthPrompts.js`, and interpreting the model's responses into structured insights. This separation allows for easy swapping or upgrading of AI models.
        *   `backend/src/models/HealthSnapshot.js`: Stores raw and partially processed health data, serving as the input for the analysis job.
    *   **Trade-offs**: Running analysis as a background job introduces a slight delay (near real-time vs. instantaneous), but it significantly reduces the load on the main API server and ensures that complex AI computations do not block user interactions. This also helps manage API costs for external LLMs by batching requests. Balancing prompt complexity and model call frequency was crucial for cost-efficiency and response quality.

3.  ### Scalable Data Model for Diverse Health Metrics
    *   **Challenge**: Designing a flexible and scalable database schema capable of storing a wide variety of health data points (numerical, textual, temporal) from different sources, while also supporting efficient querying for analysis and user-specific insights. Traditional relational schemas can become rigid for evolving health data types.
    *   **Solution**: We opted for **MongoDB** as the primary data store and modeled health data around the `HealthSnapshot.js` schema.
        *   `HealthSnapshot.js`: Represents a snapshot of a user's health at a given time or for a specific period. It is designed to be flexible, allowing for embedding various sub-documents (e.g., `activityData: { steps: Number, calories: Number }`, `nutritionData: { meals: [...], totalCalories: Number }`). This document-oriented approach naturally accommodates the diverse and evolving nature of health metrics.
        *   **Scalability**: MongoDB's sharding capabilities offer horizontal scalability, allowing the database to grow with increasing user data volume without requiring complex refactoring.
    *   **Trade-offs**: While MongoDB offers schema flexibility and scalability, it shifts some data integrity enforcement from the database to the application layer. Careful validation in controllers and services (`backend/src/controllers`, `backend/src/services`) is essential to maintain data quality. Querying complex relationships can sometimes be less intuitive than with SQL databases, necessitating thoughtful data modeling upfront for common access patterns.

---

## Installation Guide

To set up and run LumaLife locally, follow these steps:

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or yarn
*   MongoDB instance (local or hosted)
*   Expo CLI (installed globally: `npm install -g expo-cli`)

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/TanmayAggarwal87/LumaLife.git
    cd LumaLife
    ```
2.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
4.  **Create a `.env` file** in the `backend` directory based on the `Environment Variables` section below.
5.  **Start the backend server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    The backend server will typically run on `http://localhost:5000` (or the port specified in your `.env`).

### Frontend Setup

1.  **Navigate back to the root and then into the frontend directory:**
    ```bash
    cd ../frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Create a `.env` file** in the `frontend` directory based on the `Environment Variables` section below.
4.  **Start the Expo development server:**
    ```bash
    npm start
    # or
    expo start
    ```
    This will open an Expo development server in your browser. You can then:
    *   Scan the QR code with your Expo Go app (iOS or Android) to open the project on your device.
    *   Run on an Android emulator (press 'a').
    *   Run on an iOS simulator (press 'i' - macOS only).
    *   Run in a web browser (press 'w').

---

## Environment Variables

LumaLife utilizes environment variables for sensitive information and configuration.

### Backend (`backend/.env`)

Create a file named `.env` in the `backend` directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lumalife_db
OPENAI_API_KEY=your_openai_api_key_here
```

*   `PORT`: The port on which the backend server will listen.
*   `MONGODB_URI`: The connection string for your MongoDB database. Replace `mongodb://localhost:27017/lumalife_db` with your actual MongoDB URI.
*   `OPENAI_API_KEY`: Your API key for accessing the OpenAI service, crucial for AI-powered analysis.

### Frontend (`frontend/.env`)

Create a file named `.env` in the `frontend` directory (or use `app.json` for Expo environment variables if preferred for client-side configuration) with the following variables:

```env
EXPO_PUBLIC_BACKEND_URL=http://localhost:5000/api
```

*   `EXPO_PUBLIC_BACKEND_URL`: The base URL for your backend API endpoints. This is prefixed with `EXPO_PUBLIC_` to make it accessible in the Expo client. Adjust `localhost` to your local machine's IP address if running on a physical device.

---

## Project Structure

The LumaLife repository is organized into two primary components: `backend` and `frontend`, representing a typical client-server architecture.

```
LumaLife/
├── backend/
│   ├── src/
│   │   ├── controllers/            # Handles incoming requests, orchestrates service calls, and sends responses.
│   │   │   └── healthController.js # API endpoints for health data.
│   │   ├── jobs/                   # Background tasks and scheduled processes.
│   │   │   └── analyzeHealthData.js# Periodically analyzes accumulated health data.
│   │   ├── models/                 # Mongoose schemas defining data structures for MongoDB.
│   │   │   └── HealthSnapshot.js   # Schema for storing user health snapshots.
│   │   ├── prompts/                # Templates and definitions for AI model prompts.
│   │   │   └── healthPrompts.js    # Standard prompts for health data analysis.
│   │   ├── routes/                 # Defines API routes and links them to controllers.
│   │   │   └── healthRoutes.js     # API routes related to health data.
│   │   └── services/               # Contains business logic and interacts with data sources/external APIs.
│   │       └── analysisService.js  # Logic for AI-driven health data analysis.
│   ├── index.js                    # Entry point for the backend server.
│   ├── package.json                # Backend dependencies and scripts.
│   └── README.md                   # Backend-specific documentation.
│
├── frontend/
│   ├── app/                        # Expo Router's app directory for routing and screen organization.
│   │   ├── (pages)/                # Stack navigator for individual health metric pages.
│   │   │   ├── _layout.tsx         # Layout for the (pages) stack.
│   │   │   ├── activity.tsx        # Screen for activity tracking.
│   │   │   ├── nutrition.tsx       # Screen for nutrition tracking.
│   │   │   ├── sleep.tsx           # Screen for sleep tracking.
│   │   │   └── stress.tsx          # Screen for stress tracking.
│   │   ├── (tabs)/                 # Tab navigator for core application sections.
│   │   │   ├── _layout.tsx         # Layout for the (tabs) navigator.
│   │   │   ├── index.tsx           # Home/Dashboard screen.
│   │   │   ├── insights.tsx        # Screen displaying AI-generated health insights.
│   │   │   ├── meals/              # Nested stack for meal management.
│   │   │   │   ├── _layout.tsx     # Layout for meal management stack.
│   │   │   │   ├── form.tsx        # Form for adding/editing meal entries.
│   │   │   │   └── index.tsx       # List of meals.
│   │   │   └── projections.tsx     # Screen displaying health projections.
│   │   ├── _layout.tsx             # Root layout for the entire application.
│   │   └── global.css              # Global styles for NativeWind.
│   ├── assets/                     # Static assets like images and local data.
│   │   ├── data/                   # Mock or static data files.
│   │   └── images/                 # Image assets.
│   ├── components/                 # Reusable UI components.
│   │   ├── progressBar.tsx         # Custom progress bar component.
│   │   └── topBar.tsx              # Custom top navigation bar component.
│   ├── lib/                        # Utility functions and shared logic.
│   │   ├── health/                 # Health data specific utilities.
│   │   │   ├── healthFetch.ts      # Functions for fetching health data from device APIs.
│   │   │   ├── healthPermissions.ts# Functions for managing health data permissions.
│   │   │   └── sendHealthToBackend.ts# Functions for sending health data to the backend.
│   │   │   └── useHealthData.ts    # React hook for managing health data.
│   ├── package.json                # Frontend dependencies and scripts.
│   ├── tailwind.config.js          # NativeWind (Tailwind CSS) configuration.
│   └── tsconfig.json               # TypeScript configuration.
│
└── todo                            # A plain text file for tracking tasks.
```

This structure promotes a clear separation of concerns, making the codebase modular, maintainable, and easier for new contributors to navigate. The backend follows a standard MVC-like pattern (controllers, models, services), while the frontend leverages Expo Router's file-system-based routing for intuitive screen organization.

---

## Deployment Information

LumaLife is designed for a robust, scalable, and cost-effective deployment across both its mobile frontend and Node.js backend.

### Backend Deployment Strategy

*   **Platform**: **DigitalOcean Droplets / AWS EC2** (or similar IaaS providers).
*   **Why**: Given the use of Node.js with Express and MongoDB, an Infrastructure-as-a-Service (IaaS) provider offers the necessary flexibility and control.
    *   **Control**: Allows for fine-grained control over server configuration, operating system, and security hardening, which is often crucial for applications handling sensitive data.
    *   **Scalability**: While starting with a single droplet/EC2 instance, these platforms provide straightforward paths for horizontal scaling (load balancers, multiple instances) and vertical scaling (upgrading instance types) as user demand grows.
    *   **Database Management**: MongoDB can be self-hosted on a separate droplet/EC2 or integrated with a managed database service like DigitalOcean Managed Databases or AWS DocumentDB/MongoDB Atlas, providing high availability and automated backups. Choosing a managed service reduces operational overhead significantly.
    *   **Cost-Efficiency**: For initial deployment and moderate scale, IaaS can be more cost-effective than some Platform-as-a-Service (PaaS) options, especially when optimizing resource utilization.
*   **Alternative Considerations (PaaS)**: For simpler deployments without deep infrastructure customization needs, Heroku or Vercel (for serverless functions if a different architectural pattern were adopted) could be viable. However, the current setup with a persistent Node.js server and self-managed MongoDB benefits from IaaS.

### Frontend Deployment Strategy

*   **Platform**: **Expo Application Services (EAS Build)** and distribution via **Apple App Store / Google Play Store**.
*   **Why**: The frontend is built with Expo, and EAS provides a streamlined, managed workflow for building and submitting mobile applications.
    *   **Unified Builds**: EAS handles the complexities of generating native application binaries (APK for Android, IPA for iOS) from the Expo project, including code signing and provisioning profiles. This abstracts away much of the native build environment setup.
    *   **Over-the-Air (OTA) Updates**: Expo allows for deploying JavaScript and asset updates directly to users' devices without requiring a full app store submission, enabling rapid bug fixes and feature rollouts.
    *   **Developer Experience**: Integrates seamlessly with the Expo development workflow, allowing developers to focus on application logic rather than intricate native build pipelines.
    *   **App Store Compliance**: EAS builds are fully compliant with Apple and Google store submission requirements, making the final deployment process less cumbersome.

---

## Testing Approach

Maintaining the reliability and robustness of LumaLife, especially given its focus on personal health data, is paramount. Our current and planned testing approaches reflect this commitment.

### Current State

*   **Manual End-to-End Testing**: Primary testing involves manual walkthroughs of core user flows on physical devices and emulators/simulators. This includes:
    *   Data input and logging (Activity, Nutrition, Sleep, Stress).
    *   Navigation between different app sections (Tabs, Pages).
    *   Verification of UI rendering and responsiveness across different screen sizes.
    *   Basic API request/response verification through network monitors.
*   **Postman/Insomnia for API Testing**: Direct testing of backend API endpoints is performed using tools like Postman or Insomnia to ensure individual endpoints respond correctly and handle various input scenarios.
*   **Limited Unit Testing**: Some critical utility functions and complex business logic in the backend (`analysisService.js`, `HealthSnapshot.js` model methods) might have initial unit tests to verify core functionality.

### Plans for Future Enhancement

To elevate the quality and stability of LumaLife, we plan to implement a comprehensive automated testing suite:

1.  **Backend Unit Tests**:
    *   **Framework**: Jest or Mocha with Chai.
    *   **Scope**: Focus on individual functions, modules, and services (`controllers`, `services`, `models`). Tests will verify business logic, data transformations, and error handling in isolation.
    *   **Why**: Ensure the reliability of core backend functionalities, such as health data processing, analysis algorithms, and database interactions, catching regressions early.

2.  **Backend Integration Tests**:
    *   **Framework**: Supertest (for API testing) with Jest/Mocha.
    *   **Scope**: Test interactions between different backend components, such as controllers talking to services, and services interacting with the database. This will involve making actual HTTP requests to the API.
    *   **Why**: Verify that the entire API workflow, from request reception to database operations and response generation, functions correctly as a cohesive unit.

3.  **Frontend Unit Tests**:
    *   **Framework**: Jest with React Native Testing Library.
    *   **Scope**: Test individual React Native components (`progressBar.tsx`, `topBar.tsx`) and custom hooks (`useHealthData.ts`). Focus on component rendering, state management, and event handling.
    *   **Why**: Ensure UI components behave as expected, are accessible, and handle various props and states correctly, preventing UI regressions.

4.  **Frontend End-to-End (E2E) Tests**:
    *   **Framework**: Detox or Appium.
    *   **Scope**: Simulate real user interactions across the entire application flow, from opening the app, navigating between screens, inputting data, and verifying displayed insights.
    *   **Why**: Catch critical bugs that span multiple components or screens and ensure that the complete user journey is smooth and functional, especially important before releases.

5.  **Performance Testing**:
    *   **Tools**: JMeter or k6 for backend load testing; React Native performance tools for frontend profiling.
    *   **Scope**: Evaluate backend API response times under various load conditions and monitor frontend rendering performance, memory usage, and battery consumption.
    *   **Why**: Ensure the application remains responsive and stable as the user base grows and data volume increases, identifying bottlenecks proactively.

---

## Contributing Guidelines

We love contributions from the community! Whether you're fixing a bug, adding a new feature, or improving documentation, your help makes LumaLife better for everyone.

Here's how you can get involved:

1.  **Found a Bug?**
    *   If you spot something that isn't working right, please open an issue on GitHub.
    *   Describe the bug clearly, including steps to reproduce it, what you expected to happen, and what actually happened. Screenshots or recordings are super helpful!

2.  **Have a Feature Idea?**
    *   We're always looking for ways to improve LumaLife. If you have an idea, feel free to open an issue to discuss it.
    *   Outline your idea, explain why you think it's valuable, and how it might work.

3.  **Want to Contribute Code?**
    *   **Fork the repository** and clone it to your local machine.
    *   **Create a new branch** for your changes (`git checkout -b feature/your-feature-name` or `fix/bug-description`).
    *   **Make your changes**, ensuring they follow the existing code style.
    *   **Test your changes** thoroughly. (Refer to the Testing Approach section).
    *   **Commit your changes** with clear, concise commit messages.
    *   **Push your branch** to your forked repository.
    *   **Open a Pull Request** to the `main` branch of the original repository.
    *   **Describe your changes** in detail in the PR, explaining the "why" and "what" behind them.

We appreciate your effort and look forward to collaborating with you!

---

## License Information

This project is licensed under the MIT License. You are free to use, modify, and distribute this software, provided the original copyright and license notice are included.

```
MIT License

Copyright (c) 2023 Tanmay Aggarwal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Author/Contact

**Tanmay Aggarwal**
GitHub: [@TanmayAggarwal87](https://github.com/TanmayAggarwal87)
Email: undefined

---
-- made by docify --
