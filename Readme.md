# [React awesome app](https://medium.com/@evheniybystrov/full-stack-react-app-from-scratch-part-1-9086cacc59ac)

Full stack app example with redis, docker, node.js, YEPS, react, redux, rxjs with redux-observable.

Quality tools: eslint, mocha, chai, sinon, enzyme.

## How to install

    git clone https://github.com/evheniy/react-awesome-app.git
    cd react-awesome-app
    npm i
    
## How to work with docker

### Redis

To start redis server:
    
    npm run db:start
    
To stop it:

    npm run db:stop
    
## How to run server

Start ([http://localhost:3000](http://localhost:3000)):

    npm run server:start
    
Stop:

    npm run server:stop
    
### Docker

Build:

    npm run docker:build
    
Run ([http://localhost:80](http://localhost:80)):

    npm run docker:run

Stop:

    npm run docker:stop
    
## Docker compose

Don't forget to stop db server.

Run ([http://localhost:80](http://localhost:80)):

    npm run compose:up
    
Stop:

    npm run compose:down

## How to test

    npm t
    

