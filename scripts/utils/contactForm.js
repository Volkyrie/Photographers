const formValidation = document.getElementById("formID");

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

formValidation.addEventListener('submit', (event) => {
    event.preventDefault();
    closeModal();
});