# React awesome app

#### Full stack app example with react, docker and yeps.

[![Build Status](https://travis-ci.org/evheniy/react-awesome-app.svg?branch=master)](https://travis-ci.org/evheniy/react-awesome-app)
[![Coverage Status](https://coveralls.io/repos/github/evheniy/react-awesome-app/badge.svg?branch=master)](https://coveralls.io/github/evheniy/react-awesome-app?branch=master)
[![Linux Build](https://img.shields.io/travis/evheniy/react-awesome-app/master.svg?label=linux)](https://travis-ci.org/evheniy/)

[![NSP Status](https://img.shields.io/badge/NSP%20status-no%20vulnerabilities-green.svg)](https://travis-ci.org/evheniy/react-awesome-app)

[![Dependency Status](https://david-dm.org/evheniy/react-awesome-app.svg)](https://david-dm.org/evheniy/react-awesome-app)
[![devDependency Status](https://david-dm.org/evheniy/react-awesome-app/dev-status.svg)](https://david-dm.org/evheniy/react-awesome-app#info=devDependencies)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/evheniy/react-awesome-app/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/evheniy/react-awesome-app.svg)](https://github.com/evheniy/react-awesome-app/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/evheniy/react-awesome-app.svg)](https://github.com/evheniy/react-awesome-app/network)
[![GitHub issues](https://img.shields.io/github/issues/evheniy/react-awesome-app.svg)](https://github.com/evheniy/react-awesome-app/issues)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/evheniy/react-awesome-app.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)

## How to install

    git clone https://github.com/evheniy/react-awesome-app.git
    cd react-awesome-app
    npm i
    
## How to run databases with docker

#### Start:
    
    npm run db:start
    
#### Stop:

    npm run db:stop
    
## How to run server 

### Node.js

#### Start ([http://localhost:3000/](http://localhost:3000/)):

    npm run server:start
    
#### Stop:

    npm run server:stop
    
### Docker

#### Build:

    npm run docker:build
    
#### Run ([http://localhost/](http://localhost/)):

    npm run docker:run

#### Stop:

    npm run docker:stop
    
### Docker Compose

#### Run ([https://localhost/](https://localhost/)):

    npm run compose:up
    
#### Stop:

    npm run compose:down

#### Clear:

    npm run compose:clear
    
### URLs to test

| Action       | Method | Path           | Request             | Response           |
|--------------|--------|----------------|---------------------|--------------------|
| Registration | POST   | /users         | { email, password } | { user, error }    |
| Login        | POST   | /tokens        | { email, password } | { token, error }   |
| User list    | GET    | /users         | { token }           | { users[], error } |
| User profile | GET    | /users/:id     | { token }           | { user, error }    |
| User editing | PATCH  | /users/:id     | { token, password } | { user, error }    |
| Logout       | DELETE | /tokens/:token | { token }           | { empty, error }   |

### GraphQL

#### URL: [/graphql](https://localhost/graphql)

## How to test

    npm t
    
## Clear docker

    npm run clear
