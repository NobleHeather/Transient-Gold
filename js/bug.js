import { getRandomBug } from "./allBugs.js";

const currentBug = getRandomBug();

const bug = document.querySelector(".wandering-bug");
const bugLayer = document.querySelector(".bug-layer");
const bugToggle = document.querySelector(".bug-toggle");

const bugText = bugToggle.querySelector(".bug-toggle__text");
const bugIcon = bugToggle.querySelector(".bug-toggle__icon");
const bugTooltip = document.querySelector(".bug-tooltip");
const bugTooltipName = document.querySelector(".bug-tooltip__name");
const bugTooltipDescription = document.querySelector(
    ".bug-tooltip__description",
);
const bugTooltipBiome = document.querySelector(".bug-tooltip__biome");
const bugTooltipStatus = document.querySelector(".bug-tooltip__status");

let tooltipTimeout;

/* On applique l'insecte choisi */
bug.style.backgroundImage = `url("${currentBug.sprite}")`;

bug.style.width = `${currentBug.frameWidth}px`;
bug.style.height = `${currentBug.frameHeight}px`;

bug.style.backgroundSize = `${currentBug.frameWidth * currentBug.frames}px ${currentBug.frameHeight}px`;
bugTooltipName.textContent = currentBug.name;
bugTooltipDescription.textContent = currentBug.description;
bugTooltipBiome.innerHTML = `<em>Biome: ${currentBug.biome}</em>`;
bugTooltipStatus.innerHTML = `<em>Status: ${currentBug.status}</em>`;
/* Configuration */
const SCALE = currentBug.scale;

const SPEED = currentBug.speed;

const FRAME_WIDTH = currentBug.frameWidth;

const FRAME_COUNT = currentBug.frames;
const FRAME_DURATION = 200;

const MIN_PAUSE = currentBug.pause.min;
const MAX_PAUSE = currentBug.pause.max;

const SAFE_MARGIN = 40;
const BUG_RADIUS = 38;
let forbiddenZones = [];

/* État du scarabée */
let x = 80;
let y = 250;

let targetX = 600;
let targetY = 500;

let currentAngle = 0;
let currentFrame = 0;
let isPaused = false;

/* Restaure le choix anti-insecte */
const bugsAreHidden = localStorage.getItem("hide-wandering-bug") === "true";

if (bugsAreHidden) {
    bugLayer.classList.add("is-hidden");

    bugText.hidden = true;
    bugIcon.hidden = false;

    bugToggle.setAttribute("aria-pressed", "true");
    bugToggle.setAttribute("aria-label", "Bring bug back");
}

// interdit des zones au bug
function updateForbiddenZones() {
    forbiddenZones = [];

    document
        .querySelectorAll(".page-hero, .page-content, .site-footer")
        .forEach((element) => {
            const rect = element.getBoundingClientRect();

            forbiddenZones.push({
                left: rect.left - SAFE_MARGIN,
                right: rect.right + SAFE_MARGIN,
                top: rect.top - SAFE_MARGIN,
                bottom: rect.bottom + SAFE_MARGIN,
            });
        });
}

function pointIsForbidden(x, y) {
    const outsideViewport =
        x < BUG_RADIUS ||
        x > window.innerWidth - BUG_RADIUS ||
        y < BUG_RADIUS ||
        y > window.innerHeight - BUG_RADIUS;

    if (outsideViewport) {
        return true;
    }

    return forbiddenZones.some((zone) => {
        return (
            x + BUG_RADIUS >= zone.left &&
            x - BUG_RADIUS <= zone.right &&
            y + BUG_RADIUS >= zone.top &&
            y - BUG_RADIUS <= zone.bottom
        );
    });
}

/* Choisit une destination provisoire dans la fenêtre */
function chooseNewTarget() {
    const margin = 80;

    do {
        targetX = margin + Math.random() * (window.innerWidth - margin * 2);

        targetY = margin + Math.random() * (window.innerHeight - margin * 2);
    } while (pointIsForbidden(targetX, targetY));
}

/* Arrête le scarabée, puis lui choisit une nouvelle destination */
function startPause() {
    isPaused = true;

    const pauseDuration = MIN_PAUSE + Math.random() * (MAX_PAUSE - MIN_PAUSE);

    setTimeout(() => {
        chooseNewTarget();
        isPaused = false;
    }, pauseDuration);
}

/* Affiche les informations de l'insecte à sa position actuelle */
function showBugTooltip() {
    clearTimeout(tooltipTimeout);

    const bugRect = bug.getBoundingClientRect();
    const tooltipMargin = 12;

    bugTooltip.hidden = false;

    /*
     * On affiche d'abord le tooltip pour pouvoir mesurer
     * ses dimensions réelles.
     */
    const tooltipRect = bugTooltip.getBoundingClientRect();

    let tooltipX = bugRect.left + bugRect.width / 2;
    let tooltipY = bugRect.bottom + tooltipMargin;

    /*
     * Le tooltip est centré sous l'insecte.
     */
    tooltipX -= tooltipRect.width / 2;

    /*
     * Empêche le tooltip de sortir horizontalement de l'écran.
     */
    tooltipX = Math.max(
        tooltipMargin,
        Math.min(
            tooltipX,
            window.innerWidth - tooltipRect.width - tooltipMargin,
        ),
    );

    /*
     * S'il n'y a pas assez de place dessous,
     * il apparaît au-dessus de l'insecte.
     */
    if (tooltipY + tooltipRect.height > window.innerHeight - tooltipMargin) {
        tooltipY = bugRect.top - tooltipRect.height - tooltipMargin;
    }

    bugTooltip.style.left = `${tooltipX}px`;
    bugTooltip.style.top = `${tooltipY}px`;

    requestAnimationFrame(() => {
        bugTooltip.classList.add("is-visible");
    });

    tooltipTimeout = setTimeout(() => {
        bugTooltip.classList.remove("is-visible");

        setTimeout(() => {
            if (!bugTooltip.classList.contains("is-visible")) {
                bugTooltip.hidden = true;
            }
        }, 160);
    }, 3000);
}

/* Bouton anti-insecte */
bugToggle.addEventListener("click", () => {
    const isHidden = bugLayer.classList.toggle("is-hidden");

    bugText.hidden = isHidden;
    bugIcon.hidden = !isHidden;

    bugToggle.setAttribute("aria-pressed", String(isHidden));
    bugToggle.setAttribute(
        "aria-label",
        isHidden ? "Bring bug back" : "Hide wandering bug",
    );

    localStorage.setItem("hide-wandering-bug", String(isHidden));
});

bug.addEventListener("mouseenter", showBugTooltip);

/* Déplacement et orientation */
function updateBug() {
    if (!isPaused) {
        const dx = targetX - x;
        const dy = targetY - y;
        const distance = Math.hypot(dx, dy);

        if (distance > SPEED) {
            const nextX = x + (dx / distance) * SPEED;
            const nextY = y + (dy / distance) * SPEED;

            if (pointIsForbidden(nextX, nextY)) {
                chooseNewTarget();
            } else {
                x = nextX;
                y = nextY;

                const angle = Math.atan2(dy, dx);
                currentAngle = (angle * 180) / Math.PI + 90;
            }
        } else {
            x = targetX;
            y = targetY;

            startPause();
        }
    }

    bug.style.transform = `
        translate(${x}px, ${y}px)
        rotate(${currentAngle}deg)
        scale(${SCALE})
    `;

    requestAnimationFrame(updateBug);
}

updateForbiddenZones();
chooseNewTarget();
updateBug();

/* Animation des pattes */
setInterval(() => {
    if (isPaused) {
        return;
    }

    currentFrame = (currentFrame + 1) % FRAME_COUNT;

    bug.style.backgroundPositionX = `${-currentFrame * FRAME_WIDTH}px`;
}, FRAME_DURATION);

window.addEventListener("scroll", updateForbiddenZones);
window.addEventListener("resize", updateForbiddenZones);
