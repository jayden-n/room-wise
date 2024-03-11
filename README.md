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


##  Running End-to-End Tests

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

