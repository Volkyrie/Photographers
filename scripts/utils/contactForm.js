//DOM elements
const formValidation = document.getElementById("formID");
const firstInput = document.getElementById("first");
const lastInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const msgInput = document.getElementById("msg");
const errorMsg = document.querySelectorAll(".error");

//RegExp
const onlyLetters = new RegExp(/[a-zA-Z-]{2,}/i);
const msgLength = new RegExp(/[a-zA-Z0-9-]{2,}/i);
let emailPattern = new RegExp(/[a-z0-9.-]+@[a-z0-9.-]+(\.[a-z0-9._-]+)/);

// launch modal form
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

// Close modal form
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// Empty errorMsg
function emptyError() {
    for (var i = 0; i < 3; i++) {
      errorMsg[i].innerText = "";
    }
}

// Validation of all inputs
formValidation.addEventListener('submit', (event) => {
    event.preventDefault();

    // Check if first name is valid
    if (!firstInput.value.match(onlyLetters)) {
        errorMsg[0].innerText = "Syntaxe du prénom incorrecte";
    }

    // Check if last name is valid
    else if(!lastInput.value.match(onlyLetters)) {
        emptyError();
        errorMsg[1].innerText = "Syntaxe du nom incorrecte";
    }

    // Check if email is valid
    else if(!emailPattern.test(emailInput.value)) {
        emptyError();
        errorMsg[2].innerText = "Syntaxe de l'email incorrecte";
    }

    // Check if message is valid
    else if (!msgInput.value.match(msgLength)) {
        errorMsg[3].innerText = "Votre message doit contenir au moins 2 lettres";
    }
    // Display validation message
    else {
        emptyError();
        closeModal();
        console.log(firstInput.value);
        console.log(lastInput.value);
        console.log(emailInput.value);
        console.log(msgInput.value);
    }
    
});