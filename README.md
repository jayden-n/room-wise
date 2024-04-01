# Room Wise 

> [!NOTE]
> A full-stack hotel booking web app utilizing Express.js with TypeScript to architect a RESTful API server,
facilitating data flow and integration between front-end React application and MongoDB back-end

---
<img width="1726" alt="room-wise-showcase-2" src="https://github.com/jayden-n/room-wise/assets/94060508/77ffe24b-066f-41ee-9152-a4fbe193e31e">

<img width="1727" alt="room-wise-showcase" src="https://github.com/jayden-n/room-wise/assets/94060508/92f55dcb-5be5-416c-b8ad-0af54423fb05">
<img width="1728" alt="Screenshot 2024-03-28 at 12 45 33 PM" src="https://github.com/jayden-n/room-wise/assets/94060508/cb43b267-74ab-4ea0-8ab9-6c356c127c51">


---

## Table of Contents

- [Cloning the repository](#cloning-the-repository)
- [Back-end configuration](#back-end-configuration)
- [Front-end configuration](#front-end-configuration)
- [Start the application](#start-the-application)
- [Running Docker](#running-docker) 🐳
- [Running End-to-End test suite](#running-end-to-end-test-suite) 🧪
- [Technologies](#technologies) 🧩
- [Features (What problems can this application solve?)](#features-what-problems-can-this-application-solve) 🔍
- [Time taken](#time-taken) ⏳
- [Optimizations](#optimizations) 📈
- [Contributing](#contributing)



---

## Cloning the repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/jayden-n/room-wise.git
cd room-wise
```

**[Back to top](#table-of-contents)**

---

## Back-end configuration

1. **Environment Files**: Navigate to the `backend` folder and create two files: `.env` and `.env.e2e`. Add the following contents to both files:

    ```plaintext
    MONGODB_CONNECTION_STRING=

    JWT_SECRET_KEY=
    FRONTEND_URL=

    # Cloudinary Variables
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=

    # Stripe
    STRIPE_API_KEY=
    ```

2. **MongoDB Setup**: 
    - Sign up for an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
    - Create a new cluster and follow the instructions to set up a new database.
    - Once set up, obtain your MongoDB connection string and add it to the `MONGODB_CONNECTION_STRING` variable in your `.env` files.
    - For the `.env.e2e` setup see "running automated tests" below

3. **Cloudinary Setup**:
    - Create an account at [Cloudinary](https://cloudinary.com/).
    - Navigate to your dashboard to find your cloud name, API key, and API secret.
    - Add these details to the respective `CLOUDINARY_*` variables in your `.env` files.

4. **Stripe Setup**:
    - Sign up for a Stripe account at [Stripe](https://stripe.com/).
    - Find your API keys in the Stripe dashboard.
    - Add your Stripe API key to the `STRIPE_API_KEY` variable in your `.env` files.
  
5. **JWT_SECRET_KEY**:
    - This just needs to be any long, random string (one ideal option is google "secret key generator").

7. **Frontend URL**:
    - The `FRONTEND_URL` should point to the URL where your frontend application is running (typically `http://localhost:5173` if you're running it locally).


**[Back to top](#table-of-contents)**

  
---
## Front-end configuration

1. **Environment Files**: Navigate to the `frontend` folder and create a file: `.env`:

    ```plaintext
    VITE_API_BASE_URL=
    VITE_STRIPE_PUB_KEY=
    ```

5. **VITE_API_BASE_URLL**:
    - The `VITE_API_BASE_URL` should point to the URL where your backend application is running (typically `http://localhost:8000` if you're running it locally).


**[Back to top](#table-of-contents)**

---
## Start the application

1. **Backend**:
    - Navigate to the `backend` directory
    - Install dependencies: `npm install`
    - Start the server: `npm run dev`
    - Start the e2e database by `npm run e2e` (Only if you want to run e2e tests)

2. **Frontend**:
    - Open a new terminal and navigate to the `frontend` directory
    - Install dependencies: `npm install`
    - Start the frontend application: `npm run dev`
    - The application should now be running on `http://localhost:5173` but verify this in your command line terminal  

**[Back to top](#table-of-contents)**

---

## Running Docker 

Build Docker images and run them as Docker containers

```bash
docker-compose -f docker-compose.yaml -p room-wise up -d
```

**[Back to top](#table-of-contents)**

---

##  Running End-to-End test suite 

### MongoDB Setup:

To ensure a stable testing environment, create a dedicated MongoDB database for end-to-end tests. Follow these steps:

1. Sign up for a MongoDB Atlas account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new project (e.g., "e2e tests").
3. Establish a new cluster following the provided instructions.
4. Once set up, retrieve the MongoDB connection string and incorporate it into the `MONGODB_CONNECTION_STRING` variable within your `.env.e2e` file.

### Importing Test Data into MongoDB:

Utilize the provided JSON files in the `/e2e-tests/data` folder to import test user and hotel data into MongoDB:

#### Test User Data:

1. Locate the test user file (e.g., `test-user.json`) in the `data` folder.
2. Open MongoDB Compass and connect to your database.
3. Select the database used for automated tests (created in step 1).
4. Import user data:
   - Navigate to the `users` collection (create it if necessary).
   - Click "Add Data" and choose "Import File."
   - Select the `test-user.json` file, choose JSON as the format, and click "Import."
   - The test user data will be added to the `users` collection.
   - Sample user login: `test@test.com/password123`

#### Test Hotel Data:

1. Locate the test hotel file (e.g., `test-hotel.json`) in the `data` folder.
2. Navigate to the `hotels` collection in your database (create it if necessary).
3. Repeat the import process, selecting the `test-hotel.json` file.
4. Ensure the file format is set to JSON and click "Import."
5. The test hotel data will be added to the `hotels` collection.

### Running Tests:

Follow these steps to execute end-to-end tests:

1. Install the [Playwright extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) in Visual Studio Code.
2. Navigate to the `e2e-tests` directory.
3. Install dependencies: `npm install`.
4. Start the frontend and backend servers as outlined above.
5. Refer to [Using the Playwright extension to run the tests](https://playwright.dev/docs/getting-started-vscode#running-tests) for guidance on executing tests using the Playwright extension.


**[Back to top](#table-of-contents)**

---
## Technologies 

- **Front-end:**
  
    - [React](https://react.dev) for building UI out of components
    - [TypeScript](https://www.typescriptlang.org) for ensuring a self-documenting & type-safe codebase
    - [React Context API](https://react.dev/reference/react/useContext) for handling app state management
    - [React-hook-form](https://react-hook-form.com) for efficiently creating and managing forms data in React
    - [React-router-dom](https://reactrouter.com/en/main) for managing client-side routing strategies
    - [TanStack Query (F.K.A React Query)](https://tanstack.com/query/latest) for data feching, caching, synchronizing and updating server state
    - [Framer-motion](https://www.framer.com/motion) for integrating interactive animations
    - [TailwindCSS](https://tailwindcss.com) for responsive web design

- **Back-end:**
  
    - [Express.js](https://expressjs.com/) & [Node.js](https://nodejs.org/en) for developing RESTful API endpoints, handling HTTP methods (CRUD operations) with layered validations
    - [MongoDB](https://www.mongodb.com/) for Cloud Database (data storage)
    - [Cloudinary](https://cloudinary.com/) for uploading & storing hotel images
    - [Multer](https://www.npmjs.com/package/multer) for hotel images uploading & file validation
    - [bcrypt.js](https://www.npmjs.com/package/bcrypt) for secure hashing of user passwords
    - [JSON Web Token (JWT)](https://jwt.io/) for securely authenticating & authorizing user login/register through HTTP Cookies
    - [Stripe](https://stripe.com/en-ca) for securely handling online booking transactions

- **E2E Testing:**

    - [Playwright](https://expressjs.com/) for achieving 99% test coverage through a comprehensive End-to-End test suite, accurately simulating diverse real-world scenarios based on end-user behavior


**[Back to top](#table-of-contents)**

---

## Features (What problems can this application solve?) 

- `Fully-Functional Web App`: Developed using MERN Stack with TypeScript, facilitating seamless hotel room booking


- `CRUD Operations`: Users can add, update, delete, and book rooms with ease
  
- `RESTful API`: Adhering to RESTful principles for designing API endpoints, ensuring interoperability, scalability, and ease of integration with external systems

- `Filtering and Sorting Options`: Users can filter and sort hotels based on price and hotel types, enhancing their browsing experience and enabling them to find the perfect accommodation easily

- `Secure Transactions`: Integration with Stripe API ensures secure online booking transactions

- `JWT Authentication`: Integrating JSON Web Tokens (JWT) for robust user authentication, enhancing security with stateless, token-based authorization

- `Data Integrity`: Multi-layered validation system within API endpoints ensures the integrity of user data

- `Persistent Booking Records`: User accounts store booking history for future reference

- `Codebase Quality`: Achieved 100% test coverage through an extensive End-to-End test suite using Playwright

- `Real-world Simulation`: Playwright accurately simulates diverse scenarios based on end-user behavior

- `Containerization with Docker`: Dockerizing application components for streamlined deployment and scalability across diverse computing environments


**[Back to top](#table-of-contents)**


---

## Time taken

> [!NOTE]
> 2 months, and counting...

**[Back to top](#table-of-contents)**

---

## Optimizations:

Future improvements will aim for optimization in:
      
- [ ] managing all hotel rooms through an ADMIN panel, which performs CRUD operations on hotel rooms for USERS' booking conveniences

- [ ] controlling & limiting the rate of incoming requests from a set of IP addresses in order to protect the Server from potential brute-force attacks

**[Back to top](#table-of-contents)**

---

## Contributing

If you're interested in improving Room Wise, here's how you can get involved:

### Getting Started

1. `Fork the repository` to your own GitHub account.

2. Clone the forked repository to your local machine:

    ```sh
    git clone https://github.com/your-username/room-wise.git
    ```

3. Create a new branch for your contributions:

    ```sh
    git checkout -b feature/your-feature-name
    ```

### Making Changes

1. Implement your changes and improvements on the new branch.

2. Test your changes thoroughly to ensure they work as expected.

3. Commit your changes with meaningful commit messages:

    ```sh
    git commit -m "Add your detailed commit message here"
    ```

### Pushing Changes

Once you're satisfied with your changes, push your branch to your forked repository:

```sh
git push origin feature/your-feature-name
```
### Opening a Pull Request

1. Visit your forked repository on GitHub.

2. Create a Pull Request (PR) from your feature branch to the original repository's `development` branch.

3. Provide a detailed description of your changes in the PR.

4. `Your PR will be reviewed`, and any necessary feedback will be provided.

### Thank You!

Thank you for contributing to Room Wise. Pull requests are welcomed and highly appreciated.

If you have any questions or need assistance, feel free to open an issue and start a discussion.

Happy Coding! 🚀

**[Back to top](#table-of-contents)**

