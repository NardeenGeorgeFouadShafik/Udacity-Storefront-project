## API Endpoints

#### Users
| Route                                                                | Method   | Description                                                                                                                                       |  Data    |
| :------------------------------------------------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------    |:-------- |
| `localhost:3001/api/user/list`                                       | `GET`    | get all users                                                                                                                                     |          |
| `localhost:3001/api/user/login?email=yourEmail&password=yourPassword`| `GET`    | user login that returns token that you will use in other routes                                                                                   |          |
| `localhost:3001/api/user/`                                           | `GET`    | **Token Is Required** get user by the login user, you have to login first,and take the returned token to get your details(login user details)     |          |
| `localhost:3001/api/user/`                                           | `POST`   |  create user ,**Note that:** there are two types of user `user` with role 1 && `admin` with role 2 you have at least create one user and one admin| in request body you should send this object like that ``` {first_name: 'test',last_name: 'user',password: 'password123',email: 'test5@gmail.com',role: 1,}}  ``` **all parameters are required**        |
| `localhost:3001/api/user/`                                           | `PUT`    | **Token Is Required** update user by the login user, you have to login first,and take the returned token to update your details(login user update)| in request body you should send this object like that ``` {first_name: 'test',last_name: 'user',password: 'password123',email: 'test5@gmail.com',role: 1,}}  ``` **all parameters are required**  not sending one of the parameter will return error         |
| `localhost:3001/api/user/`                                           | `DELETE` | **Token Is Required** delete user by the login user, you have to login first,and take the returned token to delete your account(login user delete)| |


#### Products
| Route                                                                | Method   | Description                                                                                                                                       |  Data    |
| :------------------------------------------------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------    |:-------- |
| `localhost:3001/api/product/list`                                    | `GET`    | get all products                                                                                                                                  |          |
| `localhost:3001/api/product/:id`                                     | `GET`    | get specific product                                                                                   |          |
| `localhost:3001/api/product/category/:category`                      | `GET`    | get all product by specific category                                                                   |          |
| `localhost:3001/api/product/`                                        | `POST`   | **Token Is Required** create product ,**Note that:** you have to login first **as admin** ,and take the returned token to create the product | in request body you should send this object like that ``` { name: 'iphone', price: '3000', category: 'phone' }  ```  **all parameters are required**     |
| `localhost:3001/api/product/:id`                                     | `PUT`    | **Token Is Required** update product ,**Note that:** you have to login first **as admin** ,and take the returned token to update the product | in request body you should send this object like that ``` { name: 'iphone', price: '3000', category: 'phone' }  ```  **all parameters are required**     |
| `localhost:3001/api/user/:id`                                           | `DELETE` | **Token Is Required** delete user by the login user, you have to login first,and take the returned token to delete your account(login user delete)| |

#### Orders
- Index [token required]: `'orders/:user_id' [GET] (token)`
- Current Order by user [token required]: `'orders/current/:user_id' [GET] (token)`
- [OPTIONAL] Completed Orders by user [token required]: `'orders/completed/:user_id' [GET] (token)`
- [ADDED] Active Orders by user [token required]: `'orders/active/:user_id' [GET] (token)`
- [ADDED] Update order's status [token required]: `'orders?status=<status>&orderId=<order id> [PUT] (token)`
- [ADDED] Delete [token required]: `'orders/:id [DELETE] (token)`

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

```
Table: Product (id:serial[primary key], name:varchar(50)[not null], price:numeric[not null], category:varchar(50))
```
#### User
- id
- firstName
- lastName
- password

```
Table: User (id:serial[primary key], firstName:varchar(50)[not null], lastName:varchar(50)[not null], password:varchar(60)[not null])
```
#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

```
Table: Orders (id:serial[primary key], product_id:integer(foreign key to products table), quantity:integer[default 1], user_id:integer(foreign key to users table), status:enum(active, complete)[not null])
```
