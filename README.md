# playpoint
an app where you can review games, add friends and see their reviews


# Game Reviewer

Game Reviewer is a simple web application that allows users to review and rate video games. It provides a platform for gamers to share their opinions and experiences about their favorite (or least favorite) games.

## Features

- **User Registration:** Users can sign up for an account to access all features of the application.

- **Game Search:** Users can search for their favorite games and view reviews and ratings from other users.

- **Write Reviews:** Logged-in users can write reviews for games they have played, sharing their thoughts and opinions with the community.

- **Rating System:** Users can rate games on a scale of 1 to 5 stars, helping others gauge the overall quality of a game.

- **Commenting:** Users can leave comments on reviews, sparking discussions and interactions within the community.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** pgAdmin
- **Authentication:** JSON Web Tokens (JWT)
- **API Integration:** [OpenCritic API](https://rapidapi.com/opencritic-opencritic-default/api/opencritic-api) for retrieving game information

## Setup Instructions

1. Clone the repository:
git clone https://github.com/cfriedman2156/playpoint
2. Install dependencies:
cd playpoint
npm install
3. Set up environment variables:
Create a `.env` file in the root directory and add the following variables:
DB_NAME='playpoint_db'
DB_USER='postgres'
DB_PASSWORD=''
DB_URL='localhost'
RAPIDAPI_KEY=''
4. Start the server:
npm start
5. Access the application:
Open your web browser and navigate to `http://localhost:3001`

## Contributing

Contributions are welcome! If you have any ideas for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.