
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");

    window.scrollTo(0, 0);
}

const applicantForm = document.getElementById("applicantForm");

applicantForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const phone = document.getElementById("phone").value.trim();

    if (!/^\+256\d{9}$/.test(phone)) {
        alert("Enter a valid Ugandan number: +256 followed by 9 digits.");
        return;
    }

    document.getElementById("displayPhone").textContent = phone;

    showPage("packages");
});

const packageAmount = document.getElementById("packageAmount");

packageAmount.addEventListener("change", updatePackage);

function formatUGX(amount) {
    return "UGX " + amount.toLocaleString("en-US");
}

function updatePackage() {
    const amount = Number(packageAmount.value);

    document.getElementById("total").textContent =
        formatUGX(amount);

    if (amount === 1600000) {
        document.getElementById("activation").textContent =
            formatUGX(100000);

        document.getElementById("remaining").textContent =
            formatUGX(1500000);

        document.getElementById("slot").textContent =
            formatUGX(250000);

        document.getElementById("packageNotice").textContent =
            "Example breakdown: UGX 100,000 activation fee and six slots of UGX 250,000.";
    } else {
        document.getElementById("activation").textContent =
            "To be confirmed";

        document.getElementById("remaining").textContent =
            "To be confirmed";

        document.getElementById("slot").textContent =
            "To be confirmed";

        document.getElementById("packageNotice").textContent =
            "The activation fee and six-slot breakdown for this package must be published before payment.";
    }
}

function continuePayment() {
    const amount = Number(packageAmount.value);

    if (amount !== 1600000) {
        alert("Payment details for this package have not yet been configured.");
        return;
    }

    showPage("payment");
}

updatePackage();
