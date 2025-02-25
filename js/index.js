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
      errorMessage.textContent = "El nombre debe tener entre 3 y 8 caracteres.";
      errorMessage.style.display = "inline";
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(username)) {
      errorMessage.textContent =
        "El nombre solo puede contener letras y espacios.";
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
