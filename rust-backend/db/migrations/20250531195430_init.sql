-- Create website_status enum
CREATE TYPE website_status AS ENUM ('Up', 'Down', 'Unknown');


-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL DEFAULT '',
    password VARCHAR(255) NOT NULL,
    verified BOOLEAN DEFAULT FALSE
);

-- Create website table
CREATE TABLE IF NOT EXISTS website (
    id UUID PRIMARY KEY,
    url TEXT NOT NULL,
    time_added TIMESTAMP(3) NOT NULL DEFAULT NOW(),
    user_id UUID NOT NULL REFERENCES users(id)
);

-- Create region table
CREATE TABLE IF NOT EXISTS region (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL
);


-- Create website_tick table
CREATE TABLE IF NOT EXISTS website_tick (
    id UUID PRIMARY KEY,
    response_time_ms INTEGER NOT NULL,
    website_status website_status NOT NULL,
    region_id UUID NOT NULL REFERENCES region(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    website_id UUID NOT NULL REFERENCES website(id) ON DELETE RESTRICT ON UPDATE CASCADE
);
