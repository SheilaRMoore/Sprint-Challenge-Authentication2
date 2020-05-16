const express = require('express');
const morgan = require('morgan')
const cors = require('cors');
const helmet = require('helmet');

const { authenticate } = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const userRouter = require('../users/user-router.js')


const server = express();

server.use(morgan("short"))
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);
server.use('/api/users', userRouter)

server.get("/", (req, res, next) => {
    res.send("<h2>Server Test</h2>")
  })
  server.use((req, res, next) => {
    res.status(404).json({ message: "This error is your fault"})
  })
  
  server.use((err, req, res, next) => {
    res.status(500).json({ message: "This error is due to the server."})
  })

module.exports = server;
