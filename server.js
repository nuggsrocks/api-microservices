const express = require("express");

const app = express();

const port = 3000;

app.listen(port, () =>
  console.log("server is running at http://localhost:" + port)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => res.sendFile(__dirname + "/README.md"));

app.get("/api/timestamp{/:date_string}", (req, res) => {
  const input = req.params.date_string;
  let date;
  if (input === undefined) {
    date = new Date();
  } else {
    date = new Date(input);
  }

  if (date.toString().search("Invalid Date") !== -1) {
    res.json({ error: date.toString() });
  } else {
    const body = {
      unix: Date.parse(date.toUTCString()),
      utc: date.toUTCString(),
    };
    res.json(body);
  }
});

app.get("/api/whoami", (req, res) => {
  const ip = req.ip;
  const lang = req.get("Accept-Language");
  const software = req.get("User-Agent");
  const body = {
    ipaddress: ip,
    language: lang,
    software: software,
  };
  res.json(body);
});
