const express = require('express')
const app = express()
const port = 3000
const path = require('path');
app.use(express.static('./'));
app.get('/', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: './' });
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
