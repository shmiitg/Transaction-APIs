# Getting Started
- Run `npm install` to install the required dependencis
- Create a databse named `bank`
- Inside the banks database, create a table name `users`
- Create a .env file in the root directory and put a field named `MYSQL_PASSWORD` which will be equal to your mysql password
- Run `npm start` to start the server on `localhost:5000`

# Schema

 MySQL Database
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `id` | `int` | **Required**. Id (Unique && Autofill) |
| `email` | `string` | **Required**. Email (Not Null) |
| `password` | `string` | **Required**. Password (Not Null)|
| `amount` | `double` | **Not Required**. Amount (Default 0) |


# Authorization

#### Register (User registeration)
```http
POST /user/register
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `email` | `string` | **Required**. Email |
| `password` | `string` | **Required**. Password |

#### Login (User login)
```http
POST /user/login
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `email` | `string` | **Required**. Email |
| `password` | `string` | **Required**. Password |

#### Responses

It returns the responses in json format

```javascript
{
  "success" : string,
  "error" : string,
}
```

The `success` attribute describes that the request was successful.

The `error` attribute describes that the request was not successful and some failure occured.

# Transaction
User must be logged in to make requests to the following APIs
#### View (Check current balance)
```http
GET /transaction/view
```

#### Credit (Adds amount to user account)
```http
PUT /transaction/credit
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `amount` | double | **Required**. Amount |

#### Debit (Deducts amount from user account)
```http
PUT /transaction/debit
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `amount` | double | **Required**. Amount |

#### Responses

It returns the responses in json format

```javascript
{
  "amount" : double,
  "error" : string,
}
```

The `amount` attribute describes that the request was successful and gives the amount in user's account

The `error` attribute describes that the request was not successful and some failure occured.