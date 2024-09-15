# New CMS

This is a **Content Management System (CMS)** application built using Node.js, Express.js, MongoDB, and a suite of additional libraries. It allows users to perform CRUD operations, manage content, handle authentication, upload files, and send email notifications. This project implements modern web development best practices for security, performance, and scalability.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Dependencies](#dependencies)
- [Scripts](#scripts)
- [License](#license)

## Features

- **User Authentication**: Password encryption using `bcrypt` to securely store user credentials.
- **Session Management**: User sessions are handled using `express-session` to maintain user state across requests.
- **File Uploads**: `multer` is used for uploading files like images, documents, etc.
- **Email Notifications**: `nodemailer` is used to send email notifications for actions like user registration, password resets, etc.
- **Templating**: `ejs` is used for rendering dynamic HTML pages.
- **Database Integration**: MongoDB is used as the database to store user data, CMS content, and other resources. Managed via `mongoose`.
- **Form Handling and Validation**: Basic form submission and validation are handled server-side.
- **Security**: Uses `dotenv` for managing environment variables and `bcrypt` for hashing passwords.
  
## Prerequisites

Ensure the following software is installed on your system before running the project:

- **Node.js** (version >= 14.x)
- **MongoDB** (version >= 4.x) - either installed locally or use MongoDB Atlas for a cloud database.

You will also need to set up a `.env` file (details provided in the Environment Variables section).

## Installation

1. **Clone this repository**:
   ```bash
   git clone https://github.com/your-username/new-cms.git


2. **Navigate to the project directory**:
   ```bash
   cd new-cms

3. **Run the application:**:
   ```bash
   npm start

4. **Open your browser and visit:**
   ```bash
    [npm start] (http://localhost:5000)
