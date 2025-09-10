const loginForm = document.getElementsByClassName("container");
const loginButton = document.getElementById("Login-Button");
const loginErrorMessage = document.getElementById("ErrorMessage");

loginButton.addEventListener("submit", (handleSubmit) => {
  handleSubmit.preventDefault();
  const username = loginForm.username.value;
  const password = loginForm.password.value;
});
