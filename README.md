# LaPizza - Pizza Ordering App

LaPizza is a fullstack pizza ordering application built with Next.js. This app allows users to search for pizzas, filter options based on preferences, manage their cart, and place orders. The application uses PostgreSQL as the database with Prisma as the ORM for efficient data handling.

## Features

- **Pizza Search**: Find pizzas by name or description.
- **Filter Options**: Filter pizzas based on categories, ingredients, and more.
- **Cart Management**: Add, update, or remove items from the cart.
- **Order Placement**: Seamless ordering experience with real-time cart updates.

## Tech Stack

- **Frontend**: Next.js (React)
- **Backend**: Node.js with Next.js API routes
- **Database**: PostgreSQL with Prisma as the ORM

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- PostgreSQL instance (locally or via cloud provider)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/jo2611/next-lapizza.git
   cd lapizza
   ```

2. **Set up environment variables**:

   Create a `.env` file at the root of the project. Add the following variables to connect to the PostgreSQL database and set up any other configuration (e.g., Prisma database URL):

   ```plaintext
    POSTGRES_URL="postgres://[DB_USERNAME]:[DB_PASSWORD]@[DB_HOST]:[DB_PORT]/[DB_NAME]"
    NEXT_PUBLIC_API_URL=/api
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Set up the database schema**:

   Run the following Prisma command to push the schema to the database:

   ```bash
   npm run prisma:push
   ```

5. **Seed the database**:

   Populate the database with initial data:

   ```bash
   npm run prisma:seed
   ```

6. **Start the development server**:

   ```bash
   npm run dev
   ```

7. **Access the app**:

   Open your browser and go to `http://localhost:3000`.

## License

This project is licensed under the MIT License.
