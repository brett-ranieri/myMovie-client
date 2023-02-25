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

::Main View::

- Returns ALL movies to the user on cards (each movie card displays image, title, and genre)
- Search bar that will filter the list of moves based on search field input submitted.
- Ability to select a movie for more details
- Ability to navigate to profile view with navigation bar
- Ability to log out

::Movie View::

- Returns all data stored about selected movie (including image, title, description, director info, gennre info)
- Allows user to add a movie to favorites list with dedicated button
- Displays a list of similar movies (filtered by genre type of selected movie)

::Login View::

- Allows users to login in with username and password

::Signup View::

- Allows new users to register by filling in the following fields:
  - Username
  - Password
  - Name
  - Email
  - Birthday

::User View::

- Display user account information
- Allows users to update any field of stored information by navigating to update form
- Displays users custom favorite movies list
- Allows users to navigate to movie page of any movie on favorite list
- Allows users to remove a movie from their favorite list
- Allows users to delete their account
