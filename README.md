# GraphQL-MongoDB-Example

All the important code is in `src/start.js`.

Install, build and run:

```
yarn install
yarn run build
yarn start
```


** Visit http://localhost:3001/graphiql and play around with it.

## ADD posts  
```
mutation {
  createPost(title:"hello", content:"world") {
    _id
    title
    content
  }
}

```

## Query posts

```
query {
  posts {
    _id
    title
    content
  }
}
```

```
query {
  post(_id:"584ebf8bee8d98127efb080c") {
    _id
    title
    content
  }
}

```