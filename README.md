# Karlskrona-Parkering

Contains functions to communicate with the "Parkera i Karlskrona" API server just like the app on various platforms.

## Lousy Example

```javascript
var parking = require('karlskrona-parking');

parking.login('0701234567', '1234', function(err, body) {
  if(err) { return; }
  parking.checkSession(function(err, data) {
    if(err) { return; }
    parking.getZoneItems(function(err, data) {
      console.log(data);
    });
  });
});
```

Although the code and the project was created in mid 2016, I felt it was time to publish it instead of simply having it lay around.
