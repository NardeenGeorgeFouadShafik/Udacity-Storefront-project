## API Endpoints

#### Users

| Route                                                                | Method   | Description                                                                                                                                       |  Data    |
| :------------------------------------------------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------    |:-------- |
| `localhost:3001/api/user/list`                                       | `GET`    | get all users                                                                                                                                     |          |
| `localhost:3001/api/user/login?email=yourEmail&password=yourPassword`| `GET`    | user login that returns token that you will use in other routes                                                                                   |          |
| `localhost:3001/api/user/`                                           | `GET`    | **Token Is
Required** get user by the login user, you have to login first,and take the returned token to get your details(login user details)     |          |
| `localhost:3001/api/user/`                                           | `POST`   |  create user ,**Note
that:** there are two types of user `user` with role 1 && `admin` with role 2 you have at least create one user and one admin| in request body you should send this object like that ``` {first_name: 'test',last_name: 'user',password: 'password123',email: 'test5@gmail.com',role: 1,}}  ``` **
all parameters are required**        |
| `localhost:3001/api/user/`                                           | `PUT`    | **Token Is
Required** update user by the login user, you have to login first,and take the returned token to update your details(login user update)| in request body you should send this object like that ``` {first_name: 'test',last_name: 'user',password: 'password123',email: 'test5@gmail.com',role: 1,}}  ``` **
all parameters are required**  not sending one of the parameter will return error         |
| `localhost:3001/api/user/`                                           | `DELETE` | **Token Is
Required** delete user by the login user, you have to login first,and take the returned token to delete your account(login user delete)| |

#### Products

| Route                                                                | Method   | Description                                                                                                                                       |  Data    |
| :------------------------------------------------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------    |:-------- |
| `localhost:3001/api/product/list`                                    | `GET`    | get all products                                                                                                                                  |          |
| `localhost:3001/api/product/:id`                                     | `GET`    | get specific product                                                                                   |          |
| `localhost:3001/api/product/category/:category`                      | `GET`    | get all product by specific category                                                                   |          |
| `localhost:3001/api/product/`                                        | `POST`   | **Token Is

Required** create product ,**Note that:** you have to login first **as admin** ,and take the returned token to create
the product | in request body you should send this object like
that ``` { name: 'iphone', price: '3000', category: 'phone' }  ```  **
all parameters are required**     | | `localhost:3001/api/product/:id`                                     | `PUT`
| **Token Is Required** update product ,**Note that:** you have to login first **as admin** ,and take the returned token
to update the product | in request body you should send this object like
that ``` { name: 'iphone', price: '3000', category: 'phone' }  ```  **
all parameters are required**     | | `localhost:3001/api/product/:id`                                     | `DELETE`
| **Token Is Required** delete product ,**Note that:** you have to login first **as admin** ,and take the returned token
to delete the product | |

#### Orders

| Route                                                                | Method   | Description                                                                                                                                       |  Data    |
| :------------------------------------------------------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------    |:-------- |
| `localhost:3001/api/order/list`                                      | `GET`    | get all orders by specific user, **

Token Is Required** get orders by the login user, you have to login first,and take the returned token to get your orders
| | | | | `localhost:3001/api/order/requested`                                 | `GET`    | get all requested orders(
orders with status requested) by specific user, **
Token Is Required** get orders by the login user, you have to login first,and take the returned token to get your
requested orders | | | `localhost:3001/api/order/delivered`                                 | `GET`    | get all
delivered orders(orders with status delivered) by specific user, **
Token Is Required** get orders by the login user, you have to login first,and take the returned token to get your
delivered orders | | | `localhost:3001/api/order/`                                          | `POST`   | create order **
Token Is Required** create order by the login user, you have to login first,and take the returned token to create order|
in request body you should send this object like
that ``` {product_id: 1,quantity: 11,product_status: 'requested'}  ``` **
all parameters are required**  not sending one of the parameter will return error |
| `localhost:3001/api/order?orderId=number&status=statusName`          | `PUT`    | update order status ,**Note that:**
you have to login first **as admin** ,and take the returned token to update the order | **status can only
be:** `requested` , `delivered`, `inProgress` any thing else will return error| | `localhost:3001/api/order/:id`
| `DELETE` | **Token Is Required** delete order ,**Note that:** you have to login first **as admin** ,and take the
returned token to delete the order| |

## DB schema

### Users

| column     | type   |
|:-----------|:-------|
| id         | number |
| first_name | string |
| last_name  | string |
| password   | string |
| email      | string |
| role       | number |

### Products

| column   | type    |
|:---------|:--------|
| id       | number  |
| name     | string  |
| price    | number  |
| category | string  |

### Orders

| column       | type                                |
|:-------------|:------------------------------------|
| id           | number                              |
| date         | date                                |
| branch_order | branch('Alexandria','cairo', 'USA') |

### Orders_Products

| column           | type                                          |
|:-----------------|:----------------------------------------------|
| id               | number                                        |
| product_id       | number                                        |
| quantity         | number                                        |
| user_id          | number                                        |
| order_id         | number                                        |
| product_status   | status('requested','inProgress', 'delivered') |
