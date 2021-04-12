const form = document.getElementById("form");

const DEAFAULT_USER = [
  {
    username: "thien",
    password: "abcd1234",
  },
  {
    username: "admin",
    password: "admin1",
  },
  {
    username: "demo",
    password: "demo",
  },
];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const result = DEAFAULT_USER.find(
    (value) => value.password === password && value.username === username
  );

  if (!result) {
    const errorDiv = document.getElementById("error");
    errorDiv.innerText = "Sai tên đăng nhập hoặc password";
    errorDiv.className = "alert alert-danger";
    return;
  }
  window.location.href = "./success.html";
});
