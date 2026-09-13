const contactLinks = document.querySelectorAll(".contact-link");

const contactDialog = document.querySelector("#contact-dialog");
const closeButton = contactDialog?.querySelector(".contact-dialog__close");

const categories = contactDialog?.querySelectorAll(".contact-category");
const confirmButtons = contactDialog?.querySelectorAll(
    ".contact-category__confirm",
);

const contactButton = contactDialog?.querySelector(".contact-dialog__contact");

const selectionText = contactDialog?.querySelector(
    ".contact-dialog__selection",
);

let emailAddress = "";
let selectedCategory = null;

/* ========================================
   OPEN / CLOSE
   ======================================== */

contactLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (href?.startsWith("mailto:")) {
        emailAddress = href.slice("mailto:".length).split("?")[0];
    }

    link.addEventListener("click", (event) => {
        event.preventDefault();

        resetContactChoice();
        contactDialog?.showModal();
    });
});

closeButton?.addEventListener("click", () => {
    contactDialog.close();
});

/* Click outside the box */

contactDialog?.addEventListener("click", (event) => {
    if (event.target === contactDialog) {
        contactDialog.close();
    }
});

/* ========================================
   CATEGORY SELECTION
   ======================================== */

categories?.forEach((category) => {
    category.addEventListener("toggle", () => {
        if (!category.open) {
            return;
        }

        /*
         * One category open at a time.
         */
        categories.forEach((otherCategory) => {
            if (otherCategory !== category) {
                otherCategory.open = false;
            }
        });

        /*
         * Opening another category cancels
         * the previous confirmation.
         */
        if (selectedCategory !== category.dataset.category) {
            clearConfirmation();
        }
    });
});

confirmButtons?.forEach((button) => {
    button.addEventListener("click", () => {
        const category = button.closest(".contact-category");

        selectedCategory = category.dataset.category;

        categories.forEach((item) => {
            item.classList.toggle("is-selected", item === category);
        });

        contactButton.disabled = false;

        selectionText.textContent = `Selected: ${selectedCategory}`;
    });
});

/* ========================================
   CONTACT
   ======================================== */

contactButton?.addEventListener("click", () => {
    if (!selectedCategory || !emailAddress) {
        return;
    }

    const subject = encodeURIComponent(`[${selectedCategory}] `);

    window.location.href = `mailto:${emailAddress}?subject=${subject}`;
});

/* ========================================
   RESET
   ======================================== */

function clearConfirmation() {
    selectedCategory = null;

    contactButton.disabled = true;
    selectionText.textContent = "";

    categories?.forEach((category) => {
        category.classList.remove("is-selected");
    });
}

function resetContactChoice() {
    clearConfirmation();

    categories?.forEach((category) => {
        category.open = false;
    });
}
