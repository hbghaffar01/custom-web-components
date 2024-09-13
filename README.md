# Custom Web Components

## Note: 
Please make sure to clone repo to test the project, No .env required.

This project is a web component based application built with a modular, maintainable, and reusable approach for both the frontend and backend. The application features authentication, product management, and a responsive user interface, designed to provide a seamless user experience.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [License](#license)

## Project Overview

The Project is designed to demonstrate a clean and modular approach to building a full-stack application. The backend is implemented with Node.js and Express, featuring authentication, token management, and CRUD operations for products and user data. The frontend is built using vanilla JavaScript and web components, mimicking the reusable component structure found in frameworks like Vue and React.

## Features

### Backend

- **Authentication**: Secure user authentication using JWT, including token expiry management and handling of CORS.
- **Reusable Code**: Follows DRY principles, with a modular codebase that ensures maintainability and reusability.
- **API Endpoints**:
  - User registration and login.
  - Retrieve user data.
  - Product management: add, update, delete, and retrieve products.
  - Coupon management.
  - Cart functionality: add to cart, remove from cart, and retrieve cart products.

### Frontend

- **Web Components**: Developed with vanilla JavaScript, allowing for reusable components similar to those in Vue and React.
- **Server-Side Rendering (SSR)**: Uses EJS templates for SSR to enhance SEO and initial load performance.
- **Responsive Design**: Mobile-first approach with a responsive sidebar and interactive elements for small screens.
- **Product Carousel**: Dynamic carousel component with responsive dot navigation.
- **Modal and Error Handling**: Add product modal, buy confirmation modal with coupon application, and comprehensive error handling.
- **User Feedback**: Feedback cards displaying user reviews and feedback.
- **Authentication Management**: Handles token expiry and automatically redirects the user to the login page when the token expires.
- **Dynamic Navigation**: Responsive sidebar with a hamburger menu for easy navigation on smaller screens.

## Setup and Installation

To set up the project, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone git@github.com:hbghaffar01/custom-web-components.git
    ```

2. **Install dependencies** for both frontend and backend:
    ```bash
    npm install
    ```

3. **Run the development server** for both backend and frontend:
    ```bash
    npm run dev
    ```

4. **Build and start the application** using Node.js and Express:
    ```bash
    npm run build
    ```

## Usage

- The backend API serves as the data layer, handling requests and serving responses for authentication, product management, and cart operations.
- The frontend interacts with the backend API, dynamically rendering content and managing the user interface through vanilla JavaScript and reusable web components.

## Technology Stack

- **Backend**:
  - Node.js
  - Express
  - JWT for authentication
  - CORS handling
  - dotenv for environment variable management

- **Frontend**:
  - i had used vanilla js for this project.
  - Token handling is done and also when token is expired it automatically redirect user to to login page.
  - responsive design for side bar on small screens it show the sidebar with hamburger icon when clicked it display nav links.
  - EJS for server-side rendering
  - Responsive design with CSS
  - HTML5 and CSS3
