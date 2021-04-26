const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const { login, logout } = require('./controllers');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 3030;

const publicPath = path.join(__dirname, 'public');
const viewPath = path.join(__dirname, 'views');

var ExpressBrute = require('express-brute');

var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
var bruteforce = new ExpressBrute(store, {
  freeRetries: 5,
  minWait: 5*60*1000, // 5 minutes
  maxWait: 60*60*1000, // 1 hour,
  failCallback: (req, res, next, nextValidRequestDate) => {
    const nextValid = moment(nextValidRequestDate).format('DD/MM/YYYY hh:mm:ss');
    return res.status(429).render('index', {
      errorMsg: 'Login quá nhiều lần rồi đành khóa bạn lại. Mở khóa lượt chơi vào lúc ' + nextValid,
    });
  }
});

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
app.post('/', bruteforce.prevent, login);

app.post('/logout', logout);
app.get('/success', (req, res) => {
  if (!req.session.User) return res.redirect('/');
  res.render('success', { username: req.session.User.username });
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
