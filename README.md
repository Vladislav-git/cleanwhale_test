## Installation frontend

```bash

cd front
npm install
npm run start

```

## Installation backend

```bash

cd back

# Install packages
npm install

npx prisma generate

```

## Rename example.env to .env

## Local database

```bash
# Setup local mysql
docker-compose up -d

```

## Exec into container

```bash

#connect to mysql inside container
mysql -h localhost -P 5432 -u root -p

#grant permisasions
CREATE DATABASE shadow_db;
GRANT ALL PRIVILEGES ON shadow_db.* TO 'nestjs'@'%';
FLUSH PRIVILEGES;

```

## Migrate db

```bash

#create .env file with your local database credentials

# Run migration
npx prisma migrate dev

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```