const strengthMeter = document.getElementById("strength-meter");
const passwordInput = document.getElementById("password-input");
const reasonsContainer = document.getElementById("reasons");

passwordInput.addEventListener("input", updateStrengthMeter);
updateStrengthMeter();
function updateStrengthMeter() {
  const weaknesses = calculatePasswordStrength(passwordInput.value);

  let strength = 100;

  reasonsContainer.innerHTML = "";

  weaknesses.forEach((weakness) => {
    const messageElement = document.createElement("div");
    if (weakness == null) return;
    strength -= weakness.deduction;
    messageElement.innerText = weakness.message;
    reasonsContainer.appendChild(messageElement);
  });
  strengthMeter.style.setProperty("--strength", strength);

  if (strength == 100) {
    const messageElement = document.createElement("div");
    messageElement.innerText =
      "Your pass is already too complex, better take note of it XD";
    reasonsContainer.appendChild(messageElement);
  }
}

function calculatePasswordStrength(password) {
  const weaknesses = [];
  weaknesses.push(lenghtWeakness(password));
  weaknesses.push(lowerCaseWeakness(password));
  weaknesses.push(upperCaseWeakness(password));
  weaknesses.push(numberWeakness(password));
  weaknesses.push(specialCharWeakness(password));
  weaknesses.push(repeatCharWeakness(password));
  return weaknesses;
}

function upperCaseWeakness(password) {
  return characterTypeWeakness(password, /[A-Z]/g, "upper case characters");
}

function lowerCaseWeakness(password) {
  return characterTypeWeakness(password, /[a-z]/g, "lower case characters");
}

function numberWeakness(password) {
  return characterTypeWeakness(password, /[0-9]/g, "numbers");
}

function specialCharWeakness(password) {
  return characterTypeWeakness(
    password,
    /[^0-9a-zA-Z\s]/g,
    "special characters"
  );
}

function lenghtWeakness(password) {
  const length = password.length;

  if (length <= 5) {
    return {
      message: "your password is too short ",
      deduction: 40,
    };
  }

  if (length <= 10) {
    return {
      message: "your password could be longer",
      deduction: 15,
    };
  }
}

function characterTypeWeakness(password, regex, type) {
  const matches = password.match(regex) || [];

  if (matches.length === 0) {
    return {
      message: `Your password has no ${type}`,
      deduction: 20,
    };
  }
  if (matches.length <= 2) {
    return {
      message: `Your password could use more ${type} `,
      deduction: 5,
    };
  }
}

function repeatCharWeakness(password) {
  const matches = password.match(/(.)\1/g) || [];
  if (matches.length > 0) {
    return {
      message: "Your password has repeat characters",
      deduction: matches.length * 10,
    };
  }
}
