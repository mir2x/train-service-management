# Train Service Management System

## Description

This project is a backend system for managing train services, stations, user wallets, and ticketing. The system is built using **Node.js**, **Express**, and **MongoDB**, and uses **JWT** for authentication and **node-cron** for task scheduling.

## Features

- **User Management**: User registration, login, JWT-based authentication and authorization.

- **Train Management**: Create and manage trains with multiple stops and base fees for the next stop.

- **Station Management**: Manage train stations.

- **Wallet System**: Manage user wallets, add funds, and keep transaction history.

- **Ticketing System**: Users can purchase tickets based on dynamic fare calculation using their wallet balance.

- **Scheduling**: Notify users 1 hour before the train departs, and automatically remove tickets after departure time using cron jobs.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (v14.x or later)

- [MongoDB](https://www.mongodb.com/)

## Getting Started

### 1. Clone the repository

```bash

git  clone  https://github.com/mir2x/train-service-management.git
cd  train-service-management

```

### 2. Install dependencies

```bash
npm  install
```

### 3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```bash
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
PORT=3000
```

- `MONGO_URI`: Your MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT authentication.
- `PORT`: Port for running the server (default: 3000).

### 4. Run the application

```bash
npm start
```

### 5. Testing the APIs

Use [Postman](https://www.postman.com/) or any API testing tool to interact with the following endpoints:

#### User Management

- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Log in and receive a JWT token.

#### Station Management

- **POST /stations**: Create a new station.
- **GET /stations**: Get a list of all stations.

#### Train Management

- **POST /trains**: Create a new train with stops.
- **GET /trains**: Get a list of all trains.

#### Wallet Management

- **POST /wallet/add-funds**: Add funds to the user's wallet.
- **GET /wallet**: Get wallet balance and transaction history.

#### Ticketing System

- **POST /tickets/purchase**: Purchase a ticket using wallet balance.
- **GET /tickets**: Get a list of purchased tickets.

#### Cron Jobs

- **Notification**: Users are notified one hour before their train departs.
- **Ticket Expiration**: Tickets are automatically removed after the train departure time.
