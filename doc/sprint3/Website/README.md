# FlashForge Project Website

Welcome to the FlashForge Website Repository.

## Directory Structure

The project consists of the following main directories:

```
.
└── Website          # Main directory for the Next.js application
    ├── components   # React components used throughout the application
    ├── lib          # Library files for custom logic and utilities
    ├── node_modules # Dependencies installed by npm
    ├── pages        # Next.js pages for the application
    └── styles       # Stylesheets for the application
```

## Requirements

Before you begin, make sure you have the following software installed:

- **Node.js**: Version 14.x or later. You can download it from [Node.js official website](https://nodejs.org/).
- **npm**: This package manager is included with Node.js and is required for installing dependencies.

## Setting Up the Project

Follow these steps to set up the project on your local machine:

1. **Clone the Repository**

   Start by cloning the repository to your local machine. This creates a copy of the project files.

   ```bash
   git clone https://github.com/EECS3311F24/project-flashforge.git
   cd project-flashforge/doc/sprint1/Website
   ```

2. **Install Project Dependencies**

   Navigate to the `Website` directory (if not already there) and run the following command to install all necessary dependencies:

   ```bash
   npm install
   ```

3. **Start the Development Server**

   To launch the development server, run the command below. This will compile the project and start a local server.

   ```bash
   npm run dev
   ```

   Once the server starts, you should see output indicating that it's running, including the local URL for your site.

4. **Access the Website**

   Open your web browser and navigate to:

   ```
   http://localhost:3000
   ```

   The website should now be live on your local server.

## Additional Information

- Ensure that no other services are running on port 3000 to avoid conflicts.
- If you wish to stop the server, return to your terminal and press `Ctrl + C`.

---