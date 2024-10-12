# RepoX - Git Surfer

RepoX-Git Surfer is a powerful tool that allows users to explore Git repositories, view commit histories, analyze contributor activity, and inspect repository details such as issues and README files. This platform provides a user-friendly interface for accessing key repository insights and user information from GitHub.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Features

### User and Repository Exploration
- **User Search**: Search for GitHub users and retrieve their profile details.
- **Repository Search**: Search for repositories associated with a user.
- **Repository Details**: Access detailed information about a specific repository.
- **Contributors**: View the list of contributors for a specific repository.

### Commit & Activity Insights
- **Commit History**: View the full commit history of a repository.
- **Commit Activity**: Analyze commit activity trends over time.

### Repository Insights
- **Issues Tracking**: Fetch open and closed issues for a repository.
- **Repository README**: Retrieve and display the README file from a repository.

## Technologies Used
- **Frontend**:
  - React.js (for building the user interface)
  - Axios (for API calls)
  - CSS (for styling)

- **Backend**:
  - Node.js (for backend development)
  - Express.js (for API routing)
  - GitHub API (for fetching GitHub repository data)

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/axdityax/Repox-Git-Surfer.git
   cd Repox-Git-Surfer
   ```

2. **Set up the Backend**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install the necessary dependencies:
     ```bash
     npm install
     ```
   - Make `.env` file in the `backend` directory, add the following environment variables (replace the placeholders with your actual values):
     ```plaintext
     GITHUB_TOKEN=""
     ```
   - Start the backend server:
     ```bash
     npm run server
     ```
   - Ensure the backend server is running successfully before proceeding to the frontend.

3. **Set up the Frontend**:
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Install the necessary dependencies:
     ```bash
     npm install
     ```
   - Start the frontend application:
     ```bash
     npm run dev
     ```
## Usage
To use RepoX-Git Surfer, follow these steps:
### 1. Search for Users
- Navigate to the `/search` endpoint or use the frontend interface to search for a GitHub user by username.
- The platform will display a list of users matching the search term along with their profile details.

### 2. Get User Information
- Use the `/user` endpoint or frontend to fetch detailed information about a specific GitHub user.
- This will include the user’s public profile data, such as their name, repositories, and bio.

### 3. List Repositories of a User
- Access the `/listrepos` endpoint to fetch all repositories owned by a specific user.
- The repositories will be listed with details such as name, description, and stars.

### 4. Get Repository Details
- Use the `/repo` endpoint to view the details of a specific repository, such as the number of forks, stars, and open issues.
- This information helps you understand the activity and popularity of the repository.

### 5. View Commit History
- Navigate to the `/repo/commits` endpoint to retrieve the commit history of a repository.
- Each commit will display details like the commit message, author, and timestamp.

### 6. Analyze Commit Activity
- Use the `/repo/commitsactivity` endpoint to analyze the commit activity trends over time.
- This will show data on the frequency of commits over a specified period, helping you assess the development progress.

### 7. View Repository Contributors
- Access the `/repo/contributors` endpoint to retrieve the list of contributors to a specific repository.
- This will show the contributors along with their contributions, helping you see the key contributors to a project.

### 8. Track Issues in a Repository
- Use the `/repo/issues` endpoint to fetch open and closed issues in a repository.
- Th
