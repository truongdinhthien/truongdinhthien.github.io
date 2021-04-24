const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const { login, logout } = require('./controllers');

const app = express();
const port = process.env.PORT || 3030;

const publicPath = path.join(__dirname, 'public');
const viewPath = path.join(__dirname, 'views');

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: { maxAge: 60000 },
  })
);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', viewPath);
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  if (req.session.User) return res.redirect('/success');
  return res.render('index', {
    errorMsg: null,
  });
});
app.post('/', login);

app.post('/logout', logout);
app.get('/success', (req, res) => {
  if (!req.session.User) return res.redirect('/');
  res.render('success', { username: req.session.User.username });
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
