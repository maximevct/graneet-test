# graneet-test

## Application

To launch the application, you must have a postgresql instance running with these parameters :

```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "postgres",
  "database": "graneet",
}
```

To launch such an instance, just use this command :

```bash
$> docker run --rm -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=graneet -p 5432:5432 postgres
```

Or you can modify the file `server/ormconfig.json` to match with your configuration.

To launch the server :

```bash
$> cd server
$> npm install
$> npm run start
```

To fill the server with zip codes :

```bash
$> npm run migrate:up
```

To launch the client:

```bash
$> cd client
$> npm install
$> npm run start
```

Server is laucnh on port 3000, client is launch on port 4000.
