# myFlix Client

myFlix Client is the front-end application for the myFlix project, a web-based movie database that allows users to browse movies, view details, and manage their favorite films. This project is built using React and communicates with the myFlix API.

## Features
- User registration and login.
- Browse a list of movies.
- View detailed information about movies, directors, and genres.
- Add or remove movies from a list of favorites.
- Update user profile information.
- **Filter movies**:
  - Search movies by title, genre, or director using a single search bar.
- **Responsive design**:
  - Optimized for various screen sizes using Bootstrap.

## Technologies Used
- React
- React Router
- Axios
- Bootstrap
- HTML5 & CSS3

## Prerequisites
- Node.js and npm installed on your machine.
- Access to the [myFlix API](https://github.com/grumongi/movie_api).

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/myFlix-client.git
   ```
2. Navigate to the project directory:
   ```bash
   cd myFlix-client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Usage
- Open your browser and navigate to `http://localhost:1234` to access the application.
- Register or log in to browse the movie database.
- Use the search bar on the movies page to filter movies by title, genre, or director.

## Deployment
To deploy the application, build the project and host it on a platform like Netlify, Vercel, or GitHub Pages:
```bash
npm run build
```

## API Documentation
For detailed API endpoint documentation, including request/response formats, authentication requirements, and example usage, please refer to the [myFlix API Repository](https://github.com/grumongi/movie_api).

The API provides endpoints for:
- User authentication and registration
- Movie data retrieval
- User profile management
- Favorite movie management

## API Integration 
This project communicates with the [myFlix API](https://github.com/grumongi/movie_api). Ensure the API is running and accessible before using the client.

## Link to Client App
https://my-amazing-flix-2025.netlify.app

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License.

## Documentation

This project uses JSDoc for code documentation. To generate the documentation:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Generate documentation:
   ```bash
   npm run docs
   ```

3. View documentation:
   Open `docs/index.html` in your browser to view the generated documentation.

The documentation includes:
- Component descriptions and usage
- Function parameters and return types
- Code examples and implementation details
