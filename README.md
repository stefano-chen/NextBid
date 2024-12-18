# Introduction
Hi, I'm Stefano Chen a master's degree student in Computer Engineering at the University of Trieste in Italy.\
This is a exam project for the Web Development 2024-2025 course.\
The technologies used in this project are:
* [NodeJS](https://nodejs.org/en/about)
* [MongoDB](https://www.mongodb.com/)
* [ExpressJS](https://expressjs.com/)
* [VueJS](https://vuejs.org/)
* [Docker](https://www.docker.com/)

# Assignment
We want to create a web application that acts as an auction site.\
The application will allow a registered user to put items up for auction and bid on other's
items.\
It will be possible to search for auctions of interest.\
The items up for auction will have a current bid, a listing title, a description and an auction due date.\
Bids will be valid only if received before the auction due date. The highest bid at the end will win the auction.\
You will be able to see the history of each auction with the list of accepted
bids.\
There is not need to implement a payment management system.\
To signup, an user must provide an unique username, a name, surname and password.\
The password will be used to authenticate the user.


The project will consist of two parts:
1. The server side, where the data will be stored and the
authentication/authorization is performed.
2. The client side that will interact with the server to display and manipulate the application data.

# Main Functionality
- **Listing all auctions**: You can view a list of all auctions, active or expired, and filtering with a search parameter. 
- **Create a new auction**: An authenticated user can make a new listing for an auction.\
The auction will contain: 
    - Title 
    - Description
    - Due Date
    - Starting Bid
- **View an auction details**: You will be able to see an auction detail, specially the current bid and the winning user.
- **Modify an auction**: The auction's owner can modify some information (Title and Description).
- **Delete an auction**: The auction's owner can delete the auction at any time.
- **New bid**: An authenticated user can make a new bid for an auction. The bid will be accepted only if greater than the current bid, otherwise we return an error. The bids received after the due date will not be considered.
- **Bid listing**: For each auction, the user can see all the bids
- **Bid details**: For each bid, the user can see all details
    - Who made it
    - When was made
    - The amount
- **Listing all users**: You can see the list of all users, and filtering with a search parameter. For each user you can see all the auctions won.
- **SignUp**: An user can signup by providing
    - username
    - password
    - name
    - surname

# REST Interface
| Method | API | Descripton|
|--------|-----|-----------|
| POST   |/api/auth/signup| SignUp a new user |
| POST   |/api/auth/signin| Login  |
| GET   |/api/users/?q=query| List of all users, filtering using a query |
| GET   |/api/users/:id| User's details with the given id |
| GET   |/api/auctions/?q=query| List of all auctions, filtering using a query |
| POST   |/api/auctions| Create a new auction (only authenticated users) |
| GET   |/api/auctions/:id| Auction's details with the given id |
| PUT   |/api/auctions/:id| Modify auction's detail (only the auction's owner) |
| DELETE   |/api/auctions/:id| Delete the auction (only the auction's owner) |
| GET   |/api/auctions/:id/bids| List of all bid for an auction with given id |
| POST   |/api/auctions/:id/bids| Make a new bid for an auction with given id (only authenticated users) |
| GET   |/api/bids/:id| Bid's details with the given id |
| GET   |/api/whoami| if the user is authenticated, it returns the user's detail |

# Project Deliverable
A [docker-compose](https://docs.docker.com/compose/) file to configure and deploy the web application