# User Management App

A React + TypeScript web application to manage users.  
Built with Tailwind CSS, React Context + useReducer, and fully responsive on desktop and mobile.  
Includes CRUD operations, loading/error states, and unit tests with Vitest + React Testing Library.

## Live Demo

[User Management App on Vercel](https://user-management-app-pearl-three.vercel.app/)

## Features

- List users fetched from JSONPlaceholder API  
- View user details in a modal  
- Add new users  
- Edit existing users  
- Delete users  
- Loading and error handling states  
- Fully responsive design  
- Random user profile pictures via Picsum Photos  

# Notes

- This project uses the JSONPlaceholder API to fetch and manage user data—perfect for testing without setting up a real backend.
- User profile pictures are randomly generated with Picsum Photos, so every user looks unique!
- When adding a new user, you only need to fill in name, username, email, phone, and website—keeping it simple and quick for testing.

## Tech Stack

- React 19 + TypeScript  
- Tailwind CSS  
- React Context + useReducer for state management  
- Vitest + React Testing Library for unit tests  
- Vercel for deployment  

## Installation
Clone the repository:

```bash
git clone https://github.com/18mson/user-management-app.git
cd user-management-app
```

Install dependencies:

```bash
npm install
```

## Run the Application

Run the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Test the application:

```bash
npm run test
```

run test in watch mode:

```bash
npm run test:watch
```

Generate test coverage report:

```bash
npm run test:cover
```
the project currenly has 80% ++ test coverage

linting for checking error:

```bash
npm run lint
```
ESLint + Prettier are configured for consistent code style.

project Structure:

```
src/
├── components/     # Reusable components
│   ├── __tests__/  # Unit tests for components
│   ├── Pages/      # Page components (e.g., UserList)
├── context/        # React Context for state management
│   ├── __tests__/  # Unit tests for components
├── types/          # TypeScript type definitions
├── App.tsx         # Main application component
├── index.css       # Global styles
```

## Contributing

- Fork the repo
- Create a branch (`git checkout -b feature/your-feature`)
- Commit your changes (`git commit -m 'Add feature'`)
- Push to branch (`git push origin feature/your-feature`)
- Open a Pull Request
