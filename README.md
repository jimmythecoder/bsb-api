# BSB search API 

A simple NodeJS API to search and retrieve Australian banks BSB number details. 

## Routes
 - GET /api/v1/bsb/:bsbNumber
```javascript
{
    "bsbNumber":"012-990",
    "bankCode":"ANZ",
    "bankName":"Taiwan Cooperative Bank Ltd",
    "address":"Suit 101  Level 1  50 Carrington St",
    "suburb":"Sydney",
    "postcode":"2000",
    "state":"NSW",
    "payments":"EH"
}
```
Where :bsbNumber is a 6 digit code with an optional hypen seperator. e.g. 123-456

## Setup 
Run cmd:
`npm install && npm start` 

## Server
- PM2 for node process management
- express 4x server
- helmet for security hardening the server
- sqlite3 database
