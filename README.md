# myMovie Client UI

Front End application for User interface with movie-API.

## Project Description

Using React and Parcel, build the client-side for an app called myMovie allowing users to interact with the data stored in the existing server-side code.

## How to get the project running

Development:

- Navigate to root folder in terminal
- Run the following: `$ parcel src/index.html`
- In browser, navigate to http://localhost:1234

Production:

- Navigate to following URL in any browser:
  https://mymovieapp-brettranieri.netlify.app/

- Create your own account on Signup page or use the following credentials:
  - Username: tester
  - Password: password

## Development Dependencies

- "@parcel/transformer-sass": "^2.8.3"
- "parcel": "^2.8.3"

## Project Dependencies

- "bootstrap": "^5.2.3",
- "prop-types": "^15.8.1",
  - "react": "^18.2.0",
  - "react-bootstrap": "^2.7.0",
  - "react-dom": "^18.2.0",
  - "react-router": "^6.8.1",
  - "react-router-dom": "^6.8.1"

## Tools and Features to Highlight

- Users can sign up to create a new account
- Users can log in and log out
- Users can update their account information
- Users can delete their account
- Responsive design for all screen sizes
- App communicates with movie API to exchange data in JSON format. Allowing users to view and even update information stored in database.
- Search feature on Home page filters all movies and returns only titles that match to search parameters.
- Favorite button can be clicked in any view and update the list of favorite movies that is displayed in profile view.
- Similar movies are displayed in movie view based on genre of currently selected movie.
