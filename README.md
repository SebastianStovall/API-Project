# AirStay

AirStay is an online marketplace and hospitality platform that connects people seeking accommodations with those offering lodging, allowing travelers to book stays and experiences

- Check out [AirStay](https://air-stay.onrender.com/) here
- Connect With Me - [LinkedIn](https://www.linkedin.com/in/sebastian-stovall-a17a8a211/)

## Technologies Used

### Backend

- Node.js
- Express
- PostgresSQL

### Frontend

- React
- Redux
- HTML
- CSS

## Home Page

![AirStay Splash Page](https://sebastianstovallportfolio.netlify.app/images/airstay-thumbnail.png)

## Spot Details

![Airstay Spot Details](https://i.imgur.com/eCG6rcP.png)

## Features

### Spots
 * Logged in AND logged out users can view a spot's details
 * Logged in users can create a new spot
 * Logged in users can edit their own spots
 * Logged in users can delete their own spots

### Reviews
 * Logged in AND logged out users can view a user's reviews on a spot
 * Logged in users can create a new review
 * Logged in users can edit their own reviews
 * Logged in users can delete their own reviews

### Bookings
 * Logged in AND logged out users can view a spot's current bookings
 * Logged in users can create a new booking for a spot
 * Logged in users can edit their own bookings
 * Logged in users can delete their own bookings


## Endpoints

|  Request                                      | Purpose                                           | Response
|  --------                                     | --------                                          | -----------------------
|  GET /api/users                               | Returns the information for one user              | { <br> "user": { <br>"id": 1, <br> "firstName": "Demo1", <br> "lastName": "User1", <br> "email": "demo@user.io", <br> "username": "Demo-lition"} <br> }
|  GET /api/users/:id                           |  Returns the information for all users            | [{ <br> "user": { <br>"id": 1, <br> "firstName": "Demo1", <br> "lastName": "User1", <br> "email": "demo@user.io", <br> "username": "Demo-lition"} <br> }, <br> {...}]
### Sessions
|  Request                                      | Purpose                                           | Response
|  -------------------------------------------  |  ------------------------------------------------ | ----------------------
|  GET /api/auth                                |  Returns the information for the logged in user   | { <br> "user": { <br>"id": 1, <br> "firstName": "Demo1", <br> "lastName": "User1", <br> "email": "demo@user.io", <br> "username": "Demo-lition"} <br> }
|  POST /api/auth/signup                        |  Signs a new user up                              | { <br> "user": { <br>"id": 1, <br> "firstName": "Demo1", <br> "lastName": "User1", <br> "email": "demo@user.io", <br> "username": "Demo-lition"} <br> }
|  POST /api/auth/login                         |   Logs in a user                                  | { <br> "user": { <br>"id": 1, <br> "firstName": "Demo1", <br> "lastName": "User1", <br> "email": "demo@user.io", <br> "username": "Demo-lition"} <br> }
|  DELETE /api/auth                             |   Logs out a user                                 | { message: 'success' }
### Spots
|  Request                                      | Purpose                                           | Response
|  -------------------------------------------  |  ------------------------------------------------ | ---------------------
|  GET /api/spots/                              |  View all spots                                   | { <br> "Spots": [ <br> {"id": 1, <br> "ownerId: 1, <br> "address": "123 Main St", <br> "city": "Austin", "state": "TX", <br> "country": "United States", <br> "lat": 30.2672, <br> "lng": 97.7431, "name": "FakeNameOne", <br> "description": "Welcome to Austin, Texas. This charming residence offers a comfortable and inviting atmosphere, perfect for a relaxing getaway.", <br> "price": 200, <br> "avgRating": 5, <br>  "previewImage": "https://fakepreviewimg.jpg" } ] <br>}
|  POST /api/spots/                             | Create new spot                                   | { <br>"ownerId": 1, <br> "address": "123 fake street", <br> "city": "Austin", <br> "state": "TX", <br> "country": "United States", <br> "lat": -12.92, <br> "lng": 34.93, <br> "name": "FakeSpot", <br> "description": "fake description", <br> "price": 123.34 <br>}
|  PUT /api/spots/:spotId                       | Edit a spot's details                             | { <br>"ownerId": 1, <br> "address": "123 fake street", <br> "city": "Austin", <br> "state": "TX", <br> "country": "United States", <br> "lat": -12.92, <br> "lng": 34.93, <br> "name": "FakeSpot", <br> "description": "fake description", <br> "price": 123.34 <br>}
|  DELETE /api/spots/:spotId                    | Delete a spot                                     | { message: 'success' }
### Reviews
|  Request                                      | Purpose                                           | Response
|  -------------------------------------------  |  ------------------------------------------------ | ---------------------------
|  GET /api/reviews/current                     |    Get all of a signed in user's reviews          | { <br> "Reviews": [ <br> { "id": 1, <br> "userId": 1, <br> "spotId": 1, <br> "review": "It has okay but had a leaky roof. oh well guess thats fine...", <br> "stars": 5, <br> "createdAt": "2023-08-23T22:58:01.426Z", <br> "updatedAt": "2023-08-25T00:12:05.908Z", <br> "User": { <br> "id": 1, <br> "firstName": "Demo1", <br> "lastName": "User1"  <br>}, <br> "Spot": { <br> "id": 1, <br> "ownerId": 1, <br> "address": "123 Main St", <br> "city": "Austin", <br> "state": "TX", <br> "country": "United States", <br> "lat": 30.2672, <br> "lng": 97.7431, <br> "name": "FakeNameOne", <br> "price": 200, <br> "previewImage": "https://www.rocketmortgage.com/resources-cmsassets/RocketMortgage.com/Article_Images/Large_Images/TypesOfHomes/types-of-homes-hero.jpg" <br> }, <br> "ReviewImages": [ <br> {  "id": 1, <br> "url": "https://interiordesign.net/wp-content/uploads/2022/02/Interior-Design-Beachhouse-Bates-Masi-and-Architects-Amagansett-idx220101_boy_Res_BeachHouse01_2-2-1024x684.jpg" } ] } ] ... <br>}
|  POST /api/spots/:spotId/reviews              |   Create a new review for a spot                  | { <br> userId: 1, <br> "spotId": 4, <br> "review": "this is a nice spot", <br> "stars": 4 <br>}
|  PUT /api/reviews/:reviewId                   |  Edit a review's details                          | { <br> userId: 1, <br> "spotId": 4, <br> "review": "this is a nice spot", <br> "stars": 4 <br>}
|  DELETE /api/reviews/:reviewId                |  Delete a review                                  | { message: 'success' }
### Bookings
|  Request                                      | Purpose                                           | Response
|  -------------------------------------------  |  ------------------------------------------------ | ---------------------------
|  GET /api/spots/:spotId/bookings              |  Get all of a spot's current bookings             | { <br> "Bookings": [ <br> { "id": 1, <br> "spotId": 1, <br> "userId": 1, <br> "startDate": "2024-06-03", <br> "guests": 1, <br> "endDate": "2024-08-09", <br> "createdAt": "2023-08-23T22:58:01.518Z", <br> "updatedAt": "2023-08-23T22:58:01.518Z", <br> "User": { <br> "id": 1, <br> "firstName": "Demo1", <br> "lastName": "User1" <br> } } ] <br> }
|  GET /api/bookings/current                    |  Get all of of the current user's bookings        | { <br> "Bookings": [ <br> { "id": 1, <br> "spotId": 1, <br> "userId": 1, <br> "startDate": "2024-06-03", <br> "guests": 1, <br> "endDate": "2024-08-09", <br> "createdAt": "2023-08-23T22:58:01.518Z", <br> "updatedAt": "2023-08-23T22:58:01.518Z", <br> "User": { <br> "id": 1, <br> "firstName": "Demo1", <br> "lastName": "User1" <br> } } ] <br> }
|  POST /api/spots/:spotId/bookings             |  Create a booking for a spot                      | { <br> spotId: 1, <br> userId: 1, <br> guests: 3, <br> startDate: 2023-08-23T22:58:01.518Z, <br> endDate: 2023-08-26T22:58:01.518Z <br> }
|  PUT /api/bookings/:bookingId                 |  Edit a booking's details                         | { <br> spotId: 1, <br> userId: 1, <br> guests: 3, <br> startDate: 2023-08-23T22:58:01.518Z, <br> endDate: 2023-08-26T22:58:01.518Z <br> }
|  DELETE /api/bookings/:bookingId              |  Delete a booking                                 | { message: 'success' }


## Future Implementation Goals

- Users can sign in with O-Auth (google, facebook, etc.)
- Integration of google maps API with create spot
