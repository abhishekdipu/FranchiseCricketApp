# Welcome To FranchiseCricketApp

by [Abhishek](https://abhishekdipu.tech/)

## players:

#### POST: AddAPlayer

```json
Description : This method will create a player.

url : /api/players

- Schema:
    {
         "name" : "string",
         "country" : "string",
         "isAvailable" : "boolean"
    }

- Mandatory Fields
    - name is required field.
    - country is required field.

Business Rules:
    - "isAvailable" field will set to false when the player is bought in auction by any team
```

#### GET : GetAllPlayers

```json
Description: This method will return all the listed player

url : /api/players

Business Rules:
    - return empty array if not player is added to db.
```

#### GET : GetPlayerById

```json
Description: This method will return the player with given id.

url : /api/players/{id}

Business Rules:
    - return valid error message if the id not present in the system.

```

#### PUT: UpdateAPlayer

```json
Description : This method will update a player's detail.

url : /api/players/{id}

- Schema:
    {
         "name" : "string",
         "country" : "string",
         "isAvailable" : "boolean"
    }

- Mandatory Fields
    - name is required field.
    - country is required field.

Business Rules:
    - return valid error message if the id not present in the system.
```

#### DELETE : DeleteAPlayer

```json
Description: This method will delete the player with given id.

url : /api/players/{id}

Business Rules:
    - return valid error message if the id not present in the system.

```
