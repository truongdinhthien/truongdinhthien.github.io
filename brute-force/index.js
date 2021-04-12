const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3030;
const htmlPath = path.join(__dirname, 'public');
app.use(express.static(htmlPath));
app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
