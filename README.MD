# Welcome To FranchiseCricketApp

by [Abhishek Kumar](https://abhishekdipu.tech/)

![FCA](https://ibb.co/T1QXDS3)

Purpose : **For managing franchise cricket events.**

- to add a team to event
- to add a player to event
- to make a auction, buy a player

- This app can be used by 3 kind of users (other than admin)

  1. Manager of a team.
  2. Manager of a player.
  3. Cricket Fan (default).

- only admin can view/delete any register users
- only Team Manager will have access to create/update/delete a team
- only Player Manager will have access to create/update/delete a player
- every registered/unregistered user will have access to view players, team, auctions

### Flow Example:

- **endpoint :** https://franchisecricket.herokuapp.com

1. POST: /api/users -> Register user1 with teamManager role.
2. POST: /api/login -> login with user1 and get the response (jsonwebtoken)
3. POST: /api/teams -> Create a team1 (pass token as header for role validation eg. x-auth-token : 123xyz)
4. POST: /api/users -> Register user2 with playerManager role.
5. POST: /api/login -> login with user2 and get the response (jsonwebtoken)
6. POST: /api/player -> Create a player1 (pass token as header for role validation eg. x-auth-token : 123xyz)
7. POST: /api/auction -> Make an auction to buy player1 to team1(pass teamManger token as header for role validation eg. x-auth-token : 123xyz)

## USERS:

#### CreateAnUser POST: /api/users

```json
Description : This method will create an user.
- Any user can access this endpoint

- Schema:
    {
         "name" : "string",
         "email" : "string",
         "password":"string",
         "role" : "string"
    }

- Mandatory Fields
    - name is required field.
    - email is required field.
    - password is required field.

Business Rules:
    - "role" field will set as "fan" when no role or fan is provided.
```

#### GetCurrentUser GET: /api/users/me

```json
Description : This method will return current user's detail.
- Any register user can access this endpoint

Business Rules:
    - return valid error message if no/invalid token is supplied in header.
```

#### GetAllUser GET: /api/users

```json
Description : This method will return all the users.
- only admin can access this endpoint

Business Rules:
    - return empty response if no user is present in the system.

```

#### GetAllUser DELETE: /api/users/{id}

```json
Description : This method will delete the user with given id.
- only admin can access this endpoint

Business Rules:
    - return valid error message if the id not present in the system.
```

## LOGIN

#### CreateAnUser POST: /api/login

```json
Description : This method will return jsonwebtoken.
- Any registered user can access this endpoint

- Schema:
    {
         "email" : "string",
         "password":"string",
    }

- Mandatory Fields
    - email is required field.
    - password is required field.

Business Rules:
    - return valid error message if user is not registered.
```

## PLAYERS:

#### AddAPlayer POST: /api/players

```json
Description : This method will create a player.
- only playerManager can access this endpoint

- Schema:
    {
         "name" : "string",
         "country" : "string",
         "email" : "string",
         "isAvailable" : "boolean"
    }

- Mandatory Fields
    - name is required field.
    - country is required field.
    - email is required field.

Business Rules:
    - "isAvailable" field will set to false when the player is bought in auction by any team
```

#### GET : GetAllPlayers: /api/players

```json
Description: This method will return all the listed player
- any user can access this endpoint

Business Rules:
    - return empty array if no player is added to system.
```

#### GET : GetPlayerById: /api/players/{id}

```json
Description: This method will return the player with given id.

Business Rules:
    - return valid error message if the id not present in the system.

```

#### PUT: UpdateAPlayer: /api/players/{id}

```json
Description : This method will update a player's detail.
- only playerManager can access this endpoint

- Schema:
    {
         "name" : "string",
         "country" : "string",
         "email" : "string",
         "isAvailable" : "boolean"
    }

- Mandatory Fields
    - name is required field.
    - country is required field.
    - email is required field.

Business Rules:
    - return valid error message if the id not present in the system.
```

#### DELETE : DeleteAPlayer: /api/players/{id}

```json
Description: This method will delete the player with given id.
- only playerManager can access this endpoint

Business Rules:
    - return valid error message if the id not present in the system.
```

## TEAMS:

#### CreateATeam POST: /api/teams

```json
Description : This method will create a team.
- only teamManager can access this endpoint

- Schema:
    {
         "name" : "string",
         "owner" : "string",
         "email" : "string"
    }

- Mandatory Fields
    - name is required field.
    - owner is required field.
    - email is required field.

```

#### GET : GetAllPlayers : /api/teams

```json
Description: This method will return all the listed player


Business Rules:
    - return empty array if no team is added to system.
```

#### GET : GetTeamById: /api/teams/{id}

```json
Description: This method will return the player with given id.
- any user can access this endpoint

Business Rules:
    - return valid error message if the id not present in the system.

```

#### PUT: UpdateATeam: /api/teams/{id}

```json
Description : This method will update a team.
- only teamManager can access this endpoint

- Schema:
    {
         "name" : "string",
         "owner" : "string",
         "email" : "string"
    }

- Mandatory Fields
    - name is required field.
    - owner is required field.
    - email is required field.
```

#### DELETE : DeleteATeam: /api/players/{id}

```json
Description: This method will delete the team with given id.
- only teamManager can access this endpoint

Business Rules:
    - return valid error message if the id not present in the system.

```

## AUCTIONS:

#### MakeAnAuction POST: /api/auction

```json
Description : This method with create an auction and add a player to the team.
- only teamManager can access this endpoint

- Schema:
    {
         "playerId" : "string",
         "teamId" : "string",
    }

- Mandatory Fields
    - playerId is required field.
    - teamId is required field.

Business Rules:
    - "isAvailable" field will set to false after success.
```

#### GET : GetAllAuction: /api/auction

```json
Description: This method will return all the auction details.
- any user can access this endpoint.

Business Rules:
    - return empty array if no auction is happened.
```
