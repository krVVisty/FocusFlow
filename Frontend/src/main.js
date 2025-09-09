const logIn = document.getElementsByClassName("container");

logIn.addEventlistener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const focusData = new FormData(logIn);
  const focusValues = Object.fromEntries(focusData);
  console.log(focusValues);
}
