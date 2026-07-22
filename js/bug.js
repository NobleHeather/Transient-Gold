import { getRandomBug } from "./allBugs.js";

const currentBug = getRandomBug();

const bug = document.querySelector(".wandering-bug");
const bugLayer = document.querySelector(".bug-layer");
const bugToggle = document.querySelector(".bug-toggle");

const bugText = bugToggle.querySelector(".bug-toggle__text");
const bugIcon = bugToggle.querySelector(".bug-toggle__icon");

/* On applique l'insecte choisi */
bug.style.backgroundImage = `url("${currentBug.sprite}")`;

bug.style.width = `${currentBug.frameWidth}px`;
bug.style.height = `${currentBug.frameHeight}px`;

bug.style.backgroundSize = `${currentBug.frameWidth * currentBug.frames}px ${currentBug.frameHeight}px`;

/* Configuration */
const SCALE = currentBug.scale;

const SPEED = currentBug.speed;

const FRAME_WIDTH = currentBug.frameWidth;

const FRAME_COUNT = currentBug.frames;
const FRAME_DURATION = 90;

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
