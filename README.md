# Express API w/ Typescript

Express API repo, made for experimenting with patterns and technologies.

## **Response**

```js
{
    code: number,
    message: string,
    data: any | undefined,
}
```

## **Authorized Requests**

Marked with \* are the endpoints that require auth cookie with jwt token.

## **User service endpoints**

- `POST /api/v1/users/signup`
- `POST /api/v1/users/signin`
- `DELETE /api/v1/users/signout`\*

## **Articles service endpoints**

- `GET /api/v1/articles`
- `GET /api/v1/articles/:id`
- `POST /api/v1/articles` \*
- `PATCH /api/v1/articles/:id` \*
- `DELETE /api/v1/articles/:id` \*

### Query params

- `sortBy={property asc/desc}`
- `where={property=value}`
- `page={pageNumber}&pageSize={entries}`
- `populate={property}`
- `count=true`
- `select={property}`
