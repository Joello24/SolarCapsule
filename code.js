const CAPSULE_COUNT = 100;

function init() {
    const capsuleContainer = document.getElementById("capsules");
    let html = "";
    for (let i = 0; i < CAPSULE_COUNT; i++) {
        html += `<div>
            <span id="capsuleLabel${i + 1}" class="badge badge-pill badge-danger">Capsule #${i + 1}</span>
            &nbsp;<span id="guest${i + 1}">Unoccupied</span>
        </div>`
    }
    capsuleContainer.innerHTML = html;
    const bookForm = document.getElementById("book");
    const checkoutForm = document.getElementById("checkout");
    bookForm.addEventListener("submit", handleSubmitBook);
    checkoutForm.addEventListener("submit", handleSubmitCheckout);
}

function handleSubmitBook() {
    event.preventDefault();
    event.stopPropagation();
    const name = document.getElementById("guest").value;
    const capsule = document.getElementById("bookingCapsule").value;

    // if (capsule === undefined || name === "") {
    //     alert("Please select a capsule");
    //     return;
    // }

    checkIfBookedCapsule(capsule);
}
function handleSubmitCheckout(){
    event.preventDefault();
    event.stopPropagation();
    const checkoutCapsule = document.getElementById("checkOutCapsule").value;

    // check out of bounds of capsule <100
    if (checkoutCapsule > CAPSULE_COUNT) {
        alert("Please select a capsule between 1 and 100");
        return;
    }
    checkIfBookedCapsule(checkoutCapsule);
}

function checkIfBookedCapsule(capsule) {
    const checkCapsule = document.getElementById(`capsuleLabel${capsule}`);
    if (checkCapsule.classList.contains("badge-success")) {
        checkOutCapsule(capsule);
    } else {
        bookCapsule(capsule);
    }
}
function checkOutCapsule(capsuleToCheckOut) {
    const capsuleLabel = document.getElementById(`capsuleLabel${capsuleToCheckOut}`);
    const guestName = document.getElementById("guest").value;

    capsuleLabel.classList.remove("badge-success");
    capsuleLabel.classList.add("badge-danger");
    capsuleLabel.innerHTML = `Capsule #${capsuleToCheckOut}`;

    const guestLabel = document.getElementById(`guest${capsuleToCheckOut}`);
    guestLabel.innerHTML = "Unoccupied";
}

function bookCapsule(capsuleToBook){
    const capsuleLabel = document.getElementById(`capsuleLabel${capsuleToBook}`);
    const guestName = document.getElementById("guest").value;
    capsuleLabel.classList.add("badge-success");
    capsuleLabel.classList.remove("badge-danger");
    capsuleLabel.classList.add("badge-success");
    capsuleLabel.innerHTML = `${guestName}`;
    document.getElementById("guest").value = "";

    const guestLabel = document.getElementById(`guest${capsuleToBook}`);
    guestLabel.innerHTML = "Occupied";
}

init();