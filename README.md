# DungeonFactory
##### Instead of Java objects, this factory makes Dungeons and Dragons characters!
Dungeon Factory is a character creator for Dungeons and Dragons 5th Edition. Utilizing a React front end and a Spring Boot backend we are able provide the user with a UI for creation and management of these characters. User and character information is stored within a database using Spring ORM with retrival of the information through a RESTful API. Data used to create these characters is retrieved from the [dnd5e API](http://www.dnd5eapi.co/).

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

###### Future Plans
- Updating/Leveling characters
- Simulated rolling of stats
- Publication/Privatization of characters
- Futher improvement to the UI

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
- PostgreSQL
- [dnd5e API](http://www.dnd5eapi.co/)

## Created by
- Derek Dinh
- Frank Aurori
- Frederick Brandon Thornton