# Apollo Server with GraphQL

 
##### Stack of technologies:
* [Node.JS](https://nodejs.org)
* [Express.JS](https://expressjs.com)
* [Mocha](https://mochajs.org)
* [Sequelize](http://docs.sequelizejs.com/)
* [MySQL](https://www.mysql.com/)
* [Apollo server](https://www.apollographql.com/docs/apollo-server/)


## Installation
* You need Node.JS, MySQL and Docker installed on your server 
* Install dependencies: `npm install`
* If you need special environment variables: rename the file `.env-example` to `.env` and set them there

## Starting App
```
npm start
```

## Running Tests
```
npm test
```

## Query examples

### Register:

* *Method*: POST
* *Headers*:
```
"Content-Type": "application/graphql"
```
* *Body*:
```
mutation { 
  register (user: {
    email: "jack.smith@example.com",
	password: "secret",
	firstName: "Jack",
	lastName: "Smith"
  }) {
    success
  }
}
```

### Login:

* *Method*: POST
* *Headers*:
```
"Content-Type": "application/graphql"
```
* *Body*:
```
query { 
  login (user: {
    email: "jack.smith@example.com",
	password: "secret",
  }) {
    success,
    message
  }
}
```

## Docker installation
* Docker instruction for [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
* Docker post-installation steps for [Linux](https://docs.docker.com/install/linux/linux-postinstall/)
* Docker-compose [instruction](https://docs.docker.com/compose/install/)

