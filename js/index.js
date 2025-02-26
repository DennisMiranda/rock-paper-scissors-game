// home //
if (document.getElementById("btn-start")) {
  const btnStart = document.getElementById("btn-start");
  const usernameInput = document.getElementById("username1");
  const errorMessage = document.getElementById("error-message");

  const validateAndRedirect = () => {
    const username = usernameInput.value.trim();

    if (username === "") {
      errorMessage.textContent = "Please enter your name";
      errorMessage.style.display = "inline";
      return;
    }

    if (username.length < 2 || username.length > 8) {
      errorMessage.textContent = "Enter a username between 3 and 8 characters.";
      errorMessage.style.display = "inline";
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(username)) {
      errorMessage.textContent =
        "The name can only contain letters and spaces.";
      errorMessage.style.display = "inline";
      return;
    }

    errorMessage.style.display = "none";

    window.location.href = `./pages/game.html?userName=${encodeURIComponent(
      username
    )}`;
  };

  btnStart.addEventListener("click", validateAndRedirect);

  usernameInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      validateAndRedirect();
    }
  });
}
