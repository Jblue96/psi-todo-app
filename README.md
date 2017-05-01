# TODO App
App to track todo items.

## TABLE CREATE QUERY

```SQL
CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"description" VARCHAR(200) NOT NULL,
	"completed" BOOLEAN DEFAULT FALSE,
	"published" TIMESTAMP DEFAULT NOW()
);
```

## TASK LIST
- [x] Setup node
- [x] Add folder structure and files
- [x] Create a form to take input
- [x] jQuery POST request

**Server**

- [x] Create POST route
- [x] Create the database table
- [x] Create INSERT query
- [x] Connect the query to the POST route
- [x] SELECT statement
- [x] Create GET route (test route)

**Client**

- [x] jQuery GET request
- [x] Display that information on the screen
- [ ] Add delete and complete buttons
- [ ] jQuery for delete

**Server**

- [ ] Create our DELETE route, query
