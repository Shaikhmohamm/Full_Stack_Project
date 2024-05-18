# Entertainment App

The Entertainment App is an app for users to get the trending movies and series. Also based on their liking user can add the movies and series to bookmark. Hence its a user centric app user can 
navigate to movies and series page also user can search the respective movies and series.

## Features

- **User Authentication**: Utilizes JWT for secure login and registration, ensuring user data protection.
- **Media Exploration**: Allows users to discover trending movies and TV shows, with detailed views available for each media item.
- **Bookmarks**: Enables users to bookmark their favorite media, creating a personalized list of favorites accessible at any time.
- **Detailed Media Information**: Provides in-depth details about movies and TV shows, including description, genres, ratings,  and more.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB instance (local or remote)
- React.js

### Backend Setup

1. **Clone the Repository**: Start by cloning the Entertainment App repository to your local machine.
   ```bash
   git clone https://github.com/Shaikhmohamm/Full_Stack_Project.git
   ```
   
2. **Navigate to the Backend Directory**: Move into the `backend` directory of the project.
   ```bash
   cd backend
   ```

3. **Install Dependencies**: Install the necessary dependencies using npm.
   ```bash
   npm install
   ```

4. **Configure Environment Variables**: Create a `.env` file based on the provided `.env.example` file. Provide your MongoDB URI and TMDB API key in the `.env` file.
   ```bash
    SECRET_TOKEN="Your key"
    PORT="Your port"
    MONGO_URL="Your Mongo URL"


   ```

5. **Start the Server**: Run the backend server.
   ```bash
   node createDataBase.js && nodemon index.js/ node index.js
   ```

6. **Verify Backend Setup**: Confirm that the backend server is running without any errors.

### Frontend Setup

1. **Navigate to the Frontend Directory**: Move into the `frontend` directory of the project.
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**: Install the necessary dependencies using npm.
   ```bash
   npm install
   ```


3. **Start the Application**: Run the frontend application.
   ``` change the base URL in axiosInstace.js to the backend URL
   ```bash
   npm run start
   ```

5. **Access the Application**: Open your web browser and navigate to the specified URL (default: `http://localhost:3000`) to access the Entertainment App.

By following these steps, you should have both the backend server and frontend application running locally, allowing you to explore the features of the Entertainment App.
## Project Structure

### Backend

- **Controllers**: Contains logic for handling API requests, such as `media.controller.js` for fetching detailed media information.
- **Models**: Defines the schema for database collections, including Users, movies and tvseries.
- **Routes**: API routes for handling requests to different endpoints.
- **Middleware**: Includes middleware for authentication and error handling.


### Frontend

- **Components**: Reusable UI components like `SingleCard` and `DetailsPage` for displaying media information.
- **Pages**: React components representing pages (`Home.jsx`, `Login.jsx`, `SignUp.jsx`), utilizing hooks like `useParams` and services (`TmdbService.js`) for fetching media details.
- **Services**: Functions for making API requests, including user authentication (`UserService.js`).
- **Store**: Redux setup for state management, including slices like `detailSlice.js` and `searchSlice.js` for managing bookmarks.
- **Utils**: Utility functions such as `customToast.js` for displaying toast notifications.

### Deployment
- **Frontend** : https://full-stack-project-eosin.vercel.app/
- **Backend** : https://full-stack-project-entertainment-app.onrender.com

### API Documentation
You can visit API documentation from [here]()

### Database Design
You can visit Database Design from [here]()


## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

