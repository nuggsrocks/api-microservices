const express = require('express');
const app = express();
const requestLogMiddleware = require('request-logging-module');

const port = 8080;

app.listen(port, () => console.log('server is running at http://localhost:' + port + '...'));

app.use((req, res, next) => requestLogMiddleware(req, res, next));

app.get('/', (req, res) => res.send('Hello World'));