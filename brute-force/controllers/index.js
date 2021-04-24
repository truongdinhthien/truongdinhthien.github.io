const DEAFAULT_USER = [
  {
    username: 'thien',
    password: 'abcd1234',
  },
  {
    username: 'admin',
    password: 'admin1',
  },
  {
    username: 'demo',
    password: 'demo',
  },
];

exports.login = (req, res) => {
  const { password, username } = req.body;
  const result = DEAFAULT_USER.find(
    (value) => value.password === password && value.username === username
  );
  console.log(req.body)
  if (!result)
  {
    return res.status(400).render('index', {
      errorMsg: 'Sai tên đăng nhập hoặc password',
    });
  }
  req.session.User = {
    username,
    password,
  };
  return res.redirect('/success');
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
