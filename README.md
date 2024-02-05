# Ramadan Dishes Project

## About The Project
A nodejs with [Express](https://expressjs.com/) api to search for ramadan dishes given the ingredient, also estimating the cooktime required for a dish according to prayers times given a specific day of ramadan and suggest a dish to make with its cooktime given a day.

## Getting started

### 1. Installation
To start the project clone the repository from GitHub and install the dependencies.

```
$ git clone https://github.com/Mujmondo/ramadan-dishes-project.git ./yourProjectName
$ cd yourProjectName
$ npm install
```

### 2. Starting the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can now run the API requests, e.g. [`http://localhost:3000/suggest?day=14`](http://localhost:3000/suggest?day=14).

## Using the REST API

You can access the REST API of the server using the following endpoints:

### `GET`

- `/cooktime?ingredient={ingredient}&day={day}`: Fetch all the dishes provided in the #### **`./utils/dishes.json`** file with the given `ingredient` on a specific ramadan `day`
  - Query Parameters
    - `ingredient` (required): This filters dishes by an ingredient that they contain
    > NOTE: You can find all the dishes with their ingredients array inside the **`./utils/dishes.json`** file
    - `day` (required): This specifies the ramadan day to in which you want to prepare the dishes
- `/suggest?day={day}`: Fetch a random dish to make on a ramdan day  
  - Query Parameters
    - `day` (required): This specifies the ramadan day to in which you want to prepare the dishes


## Running Unit Tests
All generated endpoints come with complete test suits, I encourage you to update the tests as you extend the logic
```
npm test
```