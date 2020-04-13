const express = require('express');
const app = express();
const requestLogMiddleware = require('request-logging-module');

const port = 8080;

app.listen(port, () => console.log('server is running at http://localhost:' + port + '...'));

app.use((req, res, next) => requestLogMiddleware(req, res, next));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => res.send('Hello World'));

app.route('/api/timestamp/:date_string?')
    .get((req, res) => {
        let input = req.params.date_string;
        if (input === undefined) {
            let date = new Date().toUTCString();
            res.json({'date': date});
        } else {
            let date = new Date(input);
            if (date.toString().search('Invalid Date') !== -1) {
                res.json({'error': date.toString()});
            } else {
                let body = {'unix': Date.parse(date.toUTCString()), 'utc': date.toUTCString()};
                res.json(body);
            }
        }
    });