# Room Wise 

> [!NOTE]
> A full-stack hotel booking web app utilizing Express.js on Node.js to architect a RESTful API server,
facilitating data flow and integration between front-end React application and MongoDB back-end

---

## Table of Contents

- [Cloning the repository](#cloning-the-repository)
- [Running Docker](#running-docker)
- [Back-end configuration](#back-end-configuration)
- [Front-end configuration](#front-end-configuration)
- [Running the application](#running-the-application)
- [Running End-to-End test suite](#running-end-to-end-test-suite)
- [Optimizations](#optimizations)
- [Contributing](#contributing)



---

## Cloning the repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/jayden-n/room-wise.git
cd room-wise
```
---


## Running Docker

Build Docker images and run them as Docker containers

```bash
docker-compose -f docker-compose.yaml -p room-wise up -d
```
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
  
---
## Front-end configuration

1. **Environment Files**: Navigate to the `frontend` folder and create a file: `.env`:

    ```plaintext
    VITE_API_BASE_URL=
    VITE_STRIPE_PUB_KEY=
    ```

5. **VITE_API_BASE_URLL**:
    - The `VITE_API_BASE_URL` should point to the URL where your backend application is running (typically `http://localhost:8000` if you're running it locally).


---
## Running the Application

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

