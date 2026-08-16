Terminology Translation

| SQL Concept (Relational) | NoSQL Concept (Document-Based) | Description                                     |
| ------------------------ | ------------------------------ | ----------------------------------------------- |
| Database                 | Database                       | The top-level container for your data.          |
| Table                    | Collection                     | A category or grouping of data records.         |
| Row / Record             | Document                       | An individual data entry or object.             |
| Column / Field           | Field / Key                    | A specific attribute or property of that entry. |
| Table Join               | Embedding / Referencing        | How data from different places is connected.    |

### 1. Document (The "Row")

A document is a single record. It is written in JSON or BSON format. It holds data in key: value pairs enclosed in curly braces {}.

```json
{
  "_id": "usr_98721",
  "name": "Sarah Connor",
  "email": "sarah@cyberdyne.com",
  "age": 29,
  "isActive": true
}
```

### 2. Field / Key (The "Column")

A field is a specific attribute inside a document. In the example above, "name" is the key (or field name), and "Sarah Connor" is the value.

Unlike SQL, fields can store complex data types like arrays (lists) or other nested objects.

### 3. Collection (The "Table")

A collection is a group of related documents. Notice how the documents inside this single users collection do not have to look exactly the same:

```json
// This is the "users" collection
[
  {
    "_id": "usr_98721",
    "name": "Sarah Connor",
    "email": "sarah@cyberdyne.com"
  },
  {
    "_id": "usr_98722",
    "name": "John Doe",
    "email": "john@doe.com",
    "phoneNumber": "+1-555-0199", // A completely new field
    "roles": ["admin", "editor"] // An array field SQL tables can't easily hold
  }
]
```

### 4. Embedding (Instead of a "Join")

Instead of making a separate table for addresses and linking them with an ID, NoSQL embeds the related data directly inside the main document.

```json
{
  "_id": "usr_98721",
  "name": "Sarah Connor",
  "address": {
    "street": "123 Resistance Way",
    "city": "Los Angeles",
    "zip": "90001"
  }
}
```

### 5. Reference (An Alternative to "Join")

If a document gets too large, you can reference another document by storing its unique ID. This is the closest NoSQL equivalent to a SQL Foreign Key.

```json
// An item in the "orders" collection referencing a user ID
{
  "_id": "ord_112233",
  "totalPrice": 45.99,
  "userId": "usr_98721"
}
```

# The Embedding Approach (One Document)

Use embedding if you always want to load the author's details and their posts together on a single screen. The entire blog database lives inside a single authors collection.

```json
// Collection: authors
{
  "_id": "auth_4411",
  "authorName": "Jane Doe",
  "bio": "Tech writer and software engineer.",
  "posts": [
    {
      "postId": "post_001",
      "title": "Introduction to NoSQL",
      "content": "NoSQL is flexible...",
      "datePublished": "2026-03-15"
    },
    {
      "postId": "post_002",
      "title": "Mastering Embedding",
      "content": "Embedding data speeds up reads...",
      "datePublished": "2026-05-20"
    }
  ]
}
```

# The Referencing Approach (Two Collections)

If an author is going to write hundreds of long posts, or if you need to look up posts independently (like on a "Recent Global Posts" homepage), you should split them up and use a Reference.json

```json
// Collection: authors
{
  "_id": "auth_4411",
  "authorName": "Jane Doe",
  "bio": "Tech writer and software engineer.",
}
```

```json
// Collection: posts
[
  {
    "_id": "post_001",
    "authorId": "auth_4411", 
    "title": "Introduction to NoSQL",
    "content": "NoSQL is flexible..."
  },
  {
    "_id": "post_002",
    "authorId": "auth_4411", 
    "title": "Mastering Embedding",
    "content": "Embedding data speeds up reads..."
  }
]
```
