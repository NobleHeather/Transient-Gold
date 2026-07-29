const leonAvatar = document.querySelector("#leon-avatar");
const leonOverlay = document.querySelector("#leon-overlay");
const leonOverlayImage = leonOverlay?.querySelector(".image-overlay__image");
const leonOverlayClose = leonOverlay?.querySelector(".image-overlay__close");

function openLeonOverlay() {
    if (!leonOverlay) {
        return;
    }

    leonOverlay.hidden = false;
    document.body.classList.add("has-open-overlay");

    leonOverlayClose?.focus();
}

function closeLeonOverlay() {
    if (!leonOverlay) {
        return;
    }

    leonOverlay.hidden = true;
    document.body.classList.remove("has-open-overlay");

    leonAvatar?.focus();
}

leonAvatar?.addEventListener("click", openLeonOverlay);

leonOverlayClose?.addEventListener("click", closeLeonOverlay);

leonOverlay?.addEventListener("click", (event) => {
    if (event.target === leonOverlay) {
        closeLeonOverlay();
    }
});

leonOverlayImage?.addEventListener("click", (event) => {
    event.stopPropagation();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !leonOverlay?.hidden) {
        closeLeonOverlay();
    }
});
