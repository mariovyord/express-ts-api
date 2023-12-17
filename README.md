# Express API w/ Typescript

Experimenting with patterns and technologies.

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
- `GET /api/v1/users/:id`\*
- `PATCH /api/v1/users/:id`\*
- `PATCH /api/v1/users/:id/password`\*

## **Articles service endpoints**

- `GET /api/v1/articles`
- `GET /api/v1/articles/:id`
- `POST /api/v1/articles` \*
- `PATCH /api/v1/articles/:id` \*
- `DELETE /api/v1/articles/:id` \*

## **Comments service endpoints**

- `GET /api/v1/comments`
- `GET /api/v1/comments/:id`
- `POST /api/v1/comments` \*
- `PATCH /api/v1/comments/:id` \*
- `DELETE /api/v1/comments/:id` \*

### Query params

- `sortBy={property asc/desc}`
- `where={property=value}`
- `page={pageNumber}&pageSize={entries}`
- `populate={property}`
- `count=true`
- `select={property}`
