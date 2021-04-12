const express = require('express');
const app = express();
const port = process.env.PORT || 3030;

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
