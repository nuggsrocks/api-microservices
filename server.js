const express = require('express');
const app = express();
const fetch = require('node-fetch');

const requestLogMiddleware = require('request-logging-module');

const port = 8080;

app.listen(port, () => console.log('server is running at http://localhost:' + port + '...'));

app.use((req, res, next) => requestLogMiddleware(req, res, next));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => res.sendFile(__dirname + '/README.md'));

app.route('/api/timestamp/:date_string?')
    .get((req, res) => {
        let input = req.params.date_string;
        let date;
        if (input === undefined) {
            date = new Date();
        } else {
            date = new Date(input);
        }

        if (date.toString().search('Invalid Date') !== -1) {
            res.json({'error': date.toString()});
        } else {
            let body = {'unix': Date.parse(date.toUTCString()), 'utc': date.toUTCString()};
            res.json(body);
        }
    });

app.route('/api/whoami')
    .get((req, res) => {
        let ip = req.ip;
        let lang = req.get('Accept-Language');
        let software = req.get('User-Agent');
        let body = {
            'ipaddress': ip,
            'language': lang,
            'software': software
        };
        res.json(body);
    });

app.route('/api/wiki-search/')
    .get((req, res) => {
        let search = req.query.search;
        fetch('https://en.wikipedia.org/w/api.php?action=opensearch&search=' + search)
            .then(res => res.json())
            .then(data => {
                res.redirect(data[3][0]);
            })
            .catch(e => res.send(e));
    });