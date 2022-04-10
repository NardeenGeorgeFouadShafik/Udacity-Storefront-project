# Udacity: Build A Storefront Backend

This is a backend API build in Nodejs for an online store.

The database schema and and API route information can be found in the [REQUIREMENT.md](REQUIREMENTS.md)

## Set up Database
### Create Databases
We shall create the dev and test database.

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user
    - `CREATE USER nardeen_george WITH PASSWORD 'password123';`
- In psql run the following to create the dev and test database
    - `CREATE DATABASE storefront;`
    - `CREATE DATABASE storefront_test;`
- Connect to the databases and grant all privileges
    - Grant for dev database
        - `\c storefront`
        - `GRANT ALL PRIVILEGES ON DATABASE storefront TO nardeen_george;`
    - Grant for test database
        - `\c storefront_test`
        - `GRANT ALL PRIVILEGES ON DATABASE storefront_test TO nardeen_george;`

### Migrate Database
Navigate to the root directory and run the command below to migrate the database

1 - `npm install`\
2 - `npm run dev-up` 

####NOTE : make sure that after run `npm run dev` the tables are created in DB.




## Environmental Variables Set up
**Create .env file and put those variables into it.**\
```
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_DB=storefront
POSTGRES_DB_TEST=storefront_test
POSTGRES_USER=nardeen_george
POSTGRES_PASSWORD=password123
ENV=dev
BCRYPT_PASSWORD=udacity_storefront_secret_password
SALT_ROUND=10
JWT_SECRET=mySuperSecurePassword_FOR_UDACITY_STOREFRONT_PROJECT

```

## Start App
1 - `npm run watch`\
2 - `npm run start`

###NOTE: npm run start will build the project run the unit test , eslint and serve the project so all you need to run this script.

## Endpoint Access
All endpoints are described in the [RoutesGuide.md](RoutesGuide.md) file.

## Token and Authentication
Tokens are passed along with the http header as
```
Authorization   Bearer <token>
```
