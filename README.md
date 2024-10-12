# Flashforge

## Motivation
Flashforge is a study tool designed to help users create, manage, and use flashcards across various subjects. It aims to improve learning and knowledge retention through customizable decks and active recall techniques. The project was created to address the need for a streamlined, easy-to-use flashcard platform.

## Installation
### Prerequisites
- Node.js (v14.x or above)
- NPM
- MongoDB (local or MongoDB Atlas)
- Git

### Steps
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
4. Set up MongoDB:
   - Ensure MongoDB is running locally or configure a MongoDB Atlas database.
   - Add a `.env.local` file in the root directory with your MongoDB URI:
     ```
     MONGODB_URI=your_mongodb_connection_string
     ```
5. Start the project in development mode:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Contribution
We follow these guidelines for contributions:

- **Git Flow**: We use `git flow`. Work on features in `feature/your-feature-name` branches and bug fixes in `fix/your-fix-name` branches.
- **Branches**: 
  - Main branch: `main`
  - Development branches follow the naming convention `dev/[name]` or `dev/[name0]`
- **Pull Requests**: Development is done in `dev/[name]` branches. Once a development branch is complete, create a pull request to merge into the `main` branch.
- **Issue Tracking**: We use GitHub Issues for tracking bugs and features.

## Technology Stack
- **Frontend**: Next.js (React framework)
- **Backend**: MongoDB for database management
- **State Management**: React Hooks, Context API
- **Styling**: Tailwind CSS