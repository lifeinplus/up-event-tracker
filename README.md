# Event Tracker Service

This project implements a visitor activity tracking service similar to Google Analytics. It tracks user interactions on a website, such as page views and clicks, and sends this data to a backend for storage in a MongoDB database.

## Features

-   Tracks page views and button/link clicks on a website.
-   Sends activity data to the backend using a minimal number of requests.
-   Handles retries in case of network failures.
-   The backend stores the activity logs in MongoDB.

## Stack

-   **Frontend**: TypeScript
-   **Backend**: Node.js with Express
-   **Database**: MongoDB with mongoose
-   **Task Runner**: Nodemon for development

## Prerequisites

-   Node.js and npm installed on your machine.
-   MongoDB installed and running on the default port (`27017`).
-   A working MongoDB database instance.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/lifeinplus/up-event-tracker.git
    cd up-event-tracker
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Update environment variables:

    - The MongoDB connection is configured to use variables from `.env` file by default.
    - You can change the variables for your MongoDB environment in `src/config/index.ts`.

## Running the Application

1. To start the server in development mode with **Nodemon** for automatic restarts, run:

    ```bash
    npm run serve
    ```

2. The server will be running on:

    - **Frontend** (HTML Pages): `http://localhost:50000`
    - **Backend** (API): `http://localhost:8888`

3. Open the following URLs to test the service:

    - `http://localhost:50000/1.html`
    - `http://localhost:50000/2.html`
    - `http://localhost:50000/3.html`

    (These will load the same `index.html` page from the `public` directory but through different URLs.)

## Endpoints

### Tracker Script

The tracker script is served at:

```
GET http://localhost:8888/tracker
```

This is loaded in the HTML pages to track user activity.

### Track Event

The track events are sent to:

```
POST http://localhost:8888/track
```

The server expects URL-encoded data, which the tracker sends whenever a user interaction is logged.

## Folder Structure

```
├── public              # Static HTML files
│   └── index.html      # HTML file served at different URLs
├── src
│   ├── config          # Deployment-related settings
│   ├── controllers     # Express controllers for handling routes
│   ├── library         # Tracker class logic
│   ├── middleware      # Request logger logic
│   ├── models          # Mongoose models for MongoDB
│   ├── routes          # Routing logic for all endpoints
│   ├── index.ts        # Main server file
├── package.json        # Project dependencies and scripts
├── README.md           # Project documentation
├── tsconfig.json       # TypeScript compiler options
```

## Troubleshooting

-   Ensure MongoDB is running on `localhost:27017` and is accessible.
-   Check that `npm install` completes successfully without errors before running the application.
-   If you face issues with the tracker script not loading, ensure that the server is running on port `8888`.
