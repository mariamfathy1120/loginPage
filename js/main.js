var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var passwordInput = document.getElementById("password");
var signUpBtn = document.getElementById("signUpBtn");
var mismatchAlert = document.querySelector(".mismatchAlert");
var fillInAlert = document.querySelector(".fillInAlert");
var fillInAlertlLogin=document.querySelector(".fillInAlertlLogin");
var loginEmailInput = document.getElementById("loginEmail");
var loginPasswordInput = document.getElementById("loginPassword");
var loginBtn = document.querySelector(".loginBtn");
var userExistAlert = document.querySelector(".userExistAlert");
var welcomeText = document.querySelector(".welcome-text");
var logoutBtn = document.querySelector(".logoutBtn");

var usersArray;

if (localStorage.getItem("usersArray")) {
  usersArray = JSON.parse(localStorage.getItem("usersArray"));
} else {
  usersArray = [];
}

if (signUpBtn) {
  signUpBtn.addEventListener("click", function (event) {
    event.preventDefault();
    addUser();
  });
}
if (loginBtn) {
  loginBtn.addEventListener("click", function (event) {
    event.preventDefault();
    checkCredentials();
  });
}
if (logoutBtn) {
  logoutBtn.addEventListener("click", function (event) {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });
}

function addUser() {
  console.log("Adding user...");
  var newUser = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };
  if (
    newUser.name.trim() === "" ||
    newUser.email.trim() === "" ||
    newUser.password.trim() === ""
  ) {
    fillInAlert.classList.remove("d-none");
    return;
  } else {
    fillInAlert.classList.add("d-none");
  }
  if (!isUserEmailExist(newUser.email)) {
    userExistAlert.classList.add("d-none");
    usersArray.push(newUser);
    localStorage.setItem("usersArray", JSON.stringify(usersArray));
    console.log(usersArray);
    console.log("going to login.html");
    window.location.href = "login.html";
  } else {
    userExistAlert.classList.remove("d-none");
  }
}
function validateAllInputs(elem) {
  var regex = {
    name: /^[a-z0-9_-]{3,15}$/,
    email: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
  };
  if (regex[elem.id].test(elem.value) == true) {
    console.log("match");
    elem.classList.add("is-valid");
    elem.classList.remove("is-invalid");
    elem.nextElementSibling.classList.replace("d-block", "d-none");
  } else {
    console.log("no match");
    elem.classList.add("is-invalid");
    elem.classList.remove("is-valid");
    elem.nextElementSibling.classList.replace("d-none", "d-block");
  }
}
function isUserEmailExist(userEmail) {
  for (var i = 0; i < usersArray.length; i++) {
    if (userEmail == usersArray[i].email) {
      return true;
    }
  }
  return false;
}
function checkCredentials() {
  if (
    loginEmailInput.value .trim() === "" ||
    loginPasswordInput.value .trim() === "" ) {
    fillInAlertlLogin.classList.remove("d-none");
    return;
  } else {
    fillInAlertlLogin.classList.add("d-none");
  }
  for (var i = 0; i < usersArray.length; i++) {
    if (
      loginEmailInput.value == usersArray[i].email &&
      usersArray[i].password == loginPasswordInput.value
    ) {
      {
        localStorage.setItem("currentUser", JSON.stringify(usersArray[i]));
        window.location.href = "home.html";
        return;
      }
    }
  }
  mismatchAlert.classList.remove("d-none");
}

