# DungeonFactory
##### Instead of Java objects, this factory makes Dungeons and Dragons characters!
Dungeon Factory is a character creator for Dungeons and Dragons 5th Edition. Utilizing a React front end and a Spring Boot backend we are able provide the user with a UI for creation and management of these characters. User and character information is stored within a database using Spring ORM with retrieval of the information through a RESTful API. Data used to create these characters is retrieved from the [dnd5e API](http://www.dnd5eapi.co/).

## Features
###### Currently
- Access to characters based on login
- Creation of characters
    - Name
    - Race & Class
    - Attributes
    - Background (Flaws, Ideals, Bonds, Alignment)
    - Features & Traits
    - Equipment
- Management of created characters
    - Viewing
    - Deleting
- Easily spin up this application locally

###### Future Plans
- Updating/Leveling characters
- Simulated rolling of stats
- Publication/Privatization of characters
- Further improvement to the UI
- Change from single CORS location to a web filter
- Add more customization to ports and ability to deploy on web

## To Deploy
*This guide assumes you have maven, JDK >=8, node >=14.7, Docker and Docker-Compose >=version 3*
##### 1: Docker setup
Clone this repo then navigate to the `./DungeonFactory` directory. From there enter `scripts/buildDocker.sh`. This will compile both the Spring Boot application and build the React site then create two docker images. One will be running our frontend with nginx and the other will run our rest API.
##### 2: Setting up your `<docker-compose.yml>`
Your docker-compose.yml will contain your information for connection to a database. In future releases you will also be able to specify ports you wish to host the React application on and swap which type of database you wish to use. For now you are only able to use a PostgreSQL database.
*replace any fields in curly braces with your information*
```
version: "3"
services:
    rest:
        image: dungeonfactory/rest
        environment: 
            DB_URL: {JDBC URL}
            DB_USERNAME: {USERNAME}
            DB_PASSWORD: {PASSWORD}
        ports:
            - "8080:8080"

    frontend:
        image: dungeonfactory/frontend
        ports: 
            - "3000:80"
```
Place this file within the `./DungeonFactory` directory.
##### 3: Deploying
Entering `docker-compose up` within the `./DungeonFactory` directory will now spin up this application. By going to `http://localhost:3000` you will be able to access the frontend and create an account and characters. 

## Technologies Used
- Backend
    - Java
    - Spring Boot
    - JUnit
    - Lombok
    - jBCrypt
- Frontend
    - React
    - CSS
    - Fetch
- Deployment
    - Docker
    - Docker-Compose
    - Shell Scripting
- PostgreSQL
- [dnd5e API](http://www.dnd5eapi.co/)

## Created by
- Derek Dinh
- Frank Aurori
- Frederick Brandon Thornton