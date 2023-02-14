## Running the app
### With Docker
Give execution permission for './scripts/init-environment.sh' and './scripts/rs-init.sh'

With:

```bash
$ sudo chmod +x -R ./scripts
```

Clone the file `.env.example` and rename it to `.env`.

Then run:

```bash
$ ./scripts/init-environment.sh
```

This script will run the API instance and the MongoDB instances that must run in cluster mode (this is a Prisma ORM requirement).
If you don't want to run the application on MongoDB, you can create an [Atlas](https://www.mongodb.com/atlas/database) cluster for free.

### Without Docker
Clone the file `.env.example` and rename it to `.env`.

Fill the env variables

***Remember that Prisma ORM needs the MongoDB server to be running in cluster mode for data integrity reasons.***

Then run:
```bash
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run tests
```

