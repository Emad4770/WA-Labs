# API Design

Each API endpoint is described as follows:

- HTTP Method
- URL, optionally with parameter(s)
- Brief description of what this API is doing
- Sample request, with body (if any)
- Sample response, with body (if any)
- Error response(s), if any

## Retrieve the list of all the available films

`GET /films`

**Request Body:** None

**Response Body:**

```json
[
  {"id": 1, "title": "Film Title 1"},
  {"id": 2, "title": "Film Title 2"},
  ...
]
{
    "error" : "No films in the database"
}

## All the favorite films.
GET /films/favorites
list of favorite films
response:
[
{id, title, watchdate, score},{id, title, watchdate, score}, ...
]
err:
{
err : no favorite films
}

# All the best films (i.e., those rated 5 out of 5).
GET /films/tops
list of movies rated 5/5
response:
[
{id, title, watchdate, score}, {id, title, watchdate, score}
]
err:
{
err: no best films present
}

#All the films seen in the last month
GET /films/latest
list of films seen in the last month
response:
[
{id, title, watchdate, score}
]
err:
{
err: no movies seen in last month
}

#All the unseen films (i.e., the films without a specified “watchDate”)
GET /films/notwatched
list of movies not yet watched
res:
[
{id, title}
]
err:
{
err: all films have been watched
}

#Retrieve a specific film, i.e., given its “id”.
GET /films/:id
res:
{id,title,isfavorite,watchdate,score,userid}
err:
{
err: no movies found with this id
}

#Create a new film, by providing all its information– except the “id” that will
be automatically assigned by the back-end.
POST /films
req:
{
title,
isfavorite,
watchdate,
score,
userid
}

the server will assing and ID
res:
{
film object
}
err:
{ user id not found
}

#Update an existing film, by providing its information, i.e., all the properties except the “id”
PUT /films/:id
req:{
film object
}
res:
{
id,
title,
isfavorite,
watchdate,
score,
userid
}
err:
1-
{
err: no films found with this id or user id
}

#Update the rating of a specific film.
PUT /films/:id/rating
req:
{
score
}
res:
{
id,
title,
score
}
err:
{
err: film doesnt exist
}

{
err: invalid score value, should be between 0 - 5
}

#Mark an existing film as favorite/unfavorite.
PUT films/:id/favorite
req:
{
isfavorite
}
res:
{
id,
title,
isfavorite
}
err:
{
err: film doesnt exist
}

#Delete a specific film, i.e., given its “id”.
GET /films/:id/delete
res:
{
id,
title,
}
err:
{
err: no films found with this id
}
```
