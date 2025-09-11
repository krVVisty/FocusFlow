# Reflection

## Problem Domain

Many students struggle to keep track of their assignments, deadlines, and study sessions. This app helps users manage their tasks and study efficiently.

## Team Members

- Adam
- Aren
- Callum

## Roles

- **Front-End Development:** Aren and Callum
- **Back-End Development:** Adam

---

## Monday

- Planning stage
- Created Trello Kanban board for task management
- Brainstormed project ideas and features
- Established a Discord channel for team communication
- Set up GitHub repository

### Front-End Development

- Callum focused on preparing the **base HTML structure** of the site, laying out the foundation for further work
- Aren assisted with early design discussions and CSS styling considerations
- One of the biggest challenges was managing Git branches; there were a few instances where help from Manny, Joe, or Bertie was needed because code had been pushed directly to the main branch

---

## Tuesday

### Front-End Development

- Continued development of the **HTML layout** and started applying CSS for styling
- Aren and Callum refined the look and feel of the dashboard, ensuring visual consistency
- Minor adjustments were made to fix local notes handling and test user interaction with the UI

### Back-End Development

- Established the initial backend infrastructure
- Connected the backend securely to our Supabase database
- Laid the foundation for future frontend features

---

## Wednesday

### Front-End Development

- Further work on **HTML and CSS** refinement for the dashboard and calendar sections
- Improved responsiveness and usability of key components
- Progressed towards integrating frontend logic with backend endpoints

### Back-End Development

- Structured the project repository with clear separation: `backend` and `Frontend`
- Implemented the backend using Node.js and Express, with endpoints for tasks, calendar events, and user-specific notes
- Configured Supabase as our database solution, ensuring secure retrieval and serving of data
- Successfully deployed the backend on Render, making it continuously accessible via a public URL
- Established a workflow for collaborative development using Git branches and Pull Requests to prevent conflicts with ongoing frontend work

---

## Thursday

### Front-End Development (Aren & Callum)

- Continued improving the `dashboard.js` file, refining user interaction and data display
- Worked further on resolving persistent issues with the **calendar feature**, ensuring that data fetches correctly with `userId` as the reference key

### Back-End & Database (Adam)

- Coordinated integration between backend endpoints and the evolving frontend logic
- Resolved multiple **merge conflicts** and restructured Git branches to maintain project stability
- Pulled latest frontend changes and ensured backend compatibility with calendar operations
- Cleaned up repository inconsistencies (conflicting branches, outdated commits) to streamline collaboration
- Tested backend routes with database connections, validating correct retrieval and secure serving of data for both tasks and calendar events
- Prepared new integration branches (`frontend-backend-integration4`, `frontend-backend-integration5`, and `frontend-backend-integration6`) to manage ongoing work and prevent repository clutter
- Noted significant difficulties with **merging branches in GitHub**, requiring resets and branch cleanups to align frontend and backend progress

---

## Key Accomplishments

- Proper handling of environment variables for secure and flexible deployments
- Maintaining a clean and synchronized repository with Git workflows (branching and rebasing) for multiple contributors
- Ensuring smooth builds on cloud services like Render by paying attention to folder structure and `package.json` configuration
- Improved collaboration between frontend and backend teams, with calendar integration refined on both sides

---

## Lessons Learned

- Secure and flexible deployment relies on proper environment variable management
- Git workflows are essential to prevent conflicts and maintain code integrity
- Cloud deployment requires careful attention to project structure and configurations
- Daily integration and reflection improve team awareness of progress and challenges
- Merge conflicts are inevitable in collaborative work, but can be reduced with disciplined Git practices and frequent synchronisation
