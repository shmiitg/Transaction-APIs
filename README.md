# Schema

 MySQL Database
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `email` | `string` | **Required**. Email |
| `password` | `string` | **Required**. Password |
| `amount` | `double` | **Default**. 0 |


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
| `amount` | int | **Required**. Amount |

#### Debit (Deducts amount from user account)
```http
PUT /transaction/debit
```
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `amount` | int | **Required**. Amount |

#### Responses

It returns the responses in json format

```javascript
{
  "amount" : string,
  "error" : string,
}
```

The `amount` attribute describes that the request was successful and gives the amount in user's account

The `error` attribute describes that the request was not successful and some failure occured.