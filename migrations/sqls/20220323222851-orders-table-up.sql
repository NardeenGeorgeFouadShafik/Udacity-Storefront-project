CREATE TYPE branch AS ENUM ('Alexandria','cairo', 'USA');

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    date DATE,
    branch_order branch NOT NULL
);