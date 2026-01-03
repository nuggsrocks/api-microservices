# api-microservices

https://nuggsrocks-api-microservices.glitch.me/

## api endpoints:

### /api/timestamp/:date_string?
accepts optional utc format date string and returns json with unix and utc time values.


### /api/whoami
returns json with request header ip, language, and user system info


#### DEPRECATED
### /api/wiki-search?search=<search+string>
redirects to a wikipedia page matching the query string, if one exists
