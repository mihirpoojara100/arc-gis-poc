# ArcGIS POC

This repository demonstrates a practical implementation of the ArcGIS Core package within a React-based frontend. It also showcases the integration capabilities with ArcGIS Enterprise. The application allows users to **view**, **add**, and **edit** geographic locations in the form of points and multiple types of polygons.

The project is structured into two main directories:
- **Backend**: Contains the server-side code for handling data processing and API interactions.
- **Frontend**: Contains the React-based user interface for interacting with the geographic data.

## Features

- **View geographic locations**: Visualize points and polygons on a map.
- **Add new geographic data**: Users can add points and polygons to the map.
- **Edit existing data**: Users can edit previously added points and polygons.
- **ArcGIS Enterprise integration**: The application can connect to ArcGIS Enterprise to pull data or push updates.
- **Interactive map**: Using ArcGIS Core and React, users can interact with the map for real-time updates.

## Prerequisites

Before getting started, ensure that you have the following installed on your local machine:

- **Node.js** (v20 or higher)
- **npm** (v6 or higher)
- **ArcGIS API for JavaScript** (v4.x)
- **ArcGIS Enterprise** (for backend integration)

## Project Structure
```bash
backend
├── config
├── controllers
├── migration
├── models
├── migrations
├── routes
├── utils
├── .sequelizeerc
└── server.js


frontend
├── public
│ ├── index.html
└── src
├── App.js 
├── App.css
├── components 
├── icons
└── utils
```
## Setup and Installation
### 1. Clone the repository

```bash
git clone https://github.com/mihirpoojara100/arc-gis-poc.git
cd arc-gis-poc
```

### 2. Backend Setup
Navigate to the backend folder.

Install the required dependencies:

```bash
cd backend
npm install
```

#### Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
Navigate to the frontend folder.

Install the required dependencies:

```bash
cd frontend
npm install

```
#### Start the React application:
```bash
npm start
```

The frontend should now be running locally on **http://localhost:3000** and should be able to communicate with the backend.

### Contributions
Fork this repository.

Create a new branch for your feature (git checkout -b feat/your-feature).

Commit your changes (git commit -am 'feat: Add new feature').

Push to the branch (git push origin feat/your-feature).

Create a new pull request.

### License
This project is licensed under the MIT License - see the LICENSE file for details.
