# FlashForge

Welcome to the Flashforge repository! This project serves as a study tool designed to help users create, manage, and utilize flashcards across various subjects, with a focus on computer science and software engineering majors. The goal is to enhance learning and knowledge retention through customizable decks and active recall techniques while promoting collaboration and sharing.

## Motivation

Flashforge addresses the need for a centralized study platform for students in software-related fields, making studying more efficient and interactive.

## Directory Structure

This repository contains two main components:

- **Website**: The main application built with Next.js.
- **Documentation**: Resources and guides related to the project.

## Subdirectory READMEs

For detailed instructions on how to set up and run specific parts of the project, please refer to the following READMEs:

- [FlashForge Project Website](./doc/sprint1/Website/README.md): Instructions for setting up and running the Next.js application.

## Installation

### Prerequisites

Before you begin, ensure you have the following software installed:

- **Node.js**: Version 14.x or above.
- **npm**: This package manager is included with Node.js.
- **Git**: For version control.

### Setting Up MongoDB Atlas

If you haven't installed MongoDB locally, you can use MongoDB Atlas, a cloud database solution. Here’s how to set it up:

1. **Sign Up/Log In:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account or log in if you already have one.

2. **Create a New Cluster:**
   - Follow the prompts to create a new cluster. You can choose a free tier to get started.

3. **Configure Database Access:**
   - After creating a cluster, add a new database user with the necessary privileges (e.g., read and write).
   - Make sure to whitelist your IP address or allow access from anywhere (0.0.0.0/0) for development purposes.

4. **Get the Connection String:**
   - In the Atlas dashboard, navigate to your cluster, and click on the "Connect" button to get your connection string.
   - Make sure to replace `<password>` with the password for the user you created.

5. **Add a `.env.local` File:**
   - In the root directory of your project, create a `.env.local` file and add your MongoDB URI:
     ```
     MONGODB_URI=your_mongodb_connection_string
     ```

### Steps to Set Up the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/EECS3311F24/project-flashforge.git
   ```

2. Navigate to the project folder:

   ```bash
   cd project-flashforge
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the project in development mode:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Contribution Guidelines

We follow the guidelines below for contributions:

- **Git Flow**: Use `git flow`. Work on features in `feature/your-feature-name` branches and bug fixes in `fix/your-fix-name` branches.
- **Branches**:
  - Main branch: `main`
  - Development branches follow the naming convention `dev/[name]` or `dev/[name0]`
- **Pull Requests**: Once a development branch is complete, create a pull request to merge into the `main` branch.
- **Issue Tracking**: We use GitHub Issues for tracking bugs and feature requests.

## Technology Stack

- **Frontend**: Next.js (React framework)
- **Backend**: MongoDB for database management (via MongoDB Atlas)
- **State Management**: React Hooks, Context API
- **Styling**: Tailwind CSS

## Additional Information

- Ensure that no other services are running on port 3000 to avoid conflicts.
- If you wish to stop the server, return to your terminal and press `Ctrl + C`.

---