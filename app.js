// simple Express app
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const name = process.env.APP_NAME || 'MyNodeApp';

app.get('/', (req, res) => {
  res.send(`Hello from Node.js! App Name: ${name}\n`);
});

app.listen(port, () => {
  console.log(`${name} listening on ${port}`);
});

