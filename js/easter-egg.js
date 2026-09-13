// Storage.clear();
// localStorage.removeItem("transient-gold-easter-egg-ai");
// localStorage.removeItem("transient-gold-easter-egg-bel");

/* ========================================
   TEAM EASTER EGGS
   ======================================== */

const EASTER_EGG_DURATION = 60 * 60 * 1000; // 1 hour

const easterEggProfiles = {
    ai: {
        title: "ChatGPT (Ai)",
        image: "assets/images/gpt.png",
        description:
            "ChatGPT is an artificial intelligence system developed by OpenAI, used by Transient Gold for research, writing, programming, design and general problem-solving. It generates responses from patterns learned during training and has no independent existence, intentions or experiences outside its interactions with users.",
        tag: "AI",
        linkUrl:
            "https://en.wikipedia.org/wiki/Generative_pre-trained_transformer",
    },

    bel: {
        title: "Suno (Bel)",
        image: "assets/images/suno.png",
        description:
            "Suno is an AI-powered music generation platform that creates songs from text prompts and other user inputs. It can generate complete tracks including instrumentation, vocals and lyrics, allowing users to produce music without traditional composition or recording tools.",
        tag: "AI",
        linkUrl: "https://en.wikipedia.org/wiki/Suno",
    },
};

/* ========================================
   STORAGE
   ======================================== */

function getStorageKey(person) {
    return `transient-gold-easter-egg-${person}`;
}

function activateEasterEgg(person) {
    const expiresAt = Date.now() + EASTER_EGG_DURATION;

    localStorage.setItem(getStorageKey(person), String(expiresAt));
}

function easterEggIsActive(person) {
    const storedExpiration = localStorage.getItem(getStorageKey(person));

    if (!storedExpiration) {
        return false;
    }

    const expiresAt = Number(storedExpiration);

    if (!Number.isFinite(expiresAt)) {
        localStorage.removeItem(getStorageKey(person));
        return false;
    }

    if (Date.now() >= expiresAt) {
        localStorage.removeItem(getStorageKey(person));
        return false;
    }

    return true;
}

/* ========================================
   REVEAL WIKI CARD
   ======================================== */

function revealWikiCard(person) {
    const profile = easterEggProfiles[person];

    if (!profile) {
        return;
    }

    const card = document.querySelector(
        `.project-card[data-person="${person}"]`,
    );

    if (!card) {
        return;
    }

    card.classList.add("is-wiki-mode");

    card.innerHTML = `
        <div class="project-main wiki-profile">
            <h2 class="wiki-profile__title">
                ${profile.title}
            </h2>

            <img
                class="wiki-profile__image"
                src="${profile.image}"
                alt="${profile.title}'s avatar"
            >

            <p class="wiki-profile__description">
                ${profile.description}
            </p>

          
        </div>

        <a
            class="project-link wiki-profile__link"
            href="${profile.linkUrl}"
        >
            <span class="project-link__text">
                learn more
            </span>
        </a>
    `;
}

/* ========================================
   CLICK ON EXTERNAL PERSONAL SITE
   ======================================== */

document.querySelectorAll("[data-easter-egg]").forEach((link) => {
    link.addEventListener("click", () => {
        const person = link.dataset.easterEgg;

        if (!easterEggProfiles[person]) {
            return;
        }

        activateEasterEgg(person);

        /*
         * No preventDefault().
         * The external link still opens normally.
         */
    });
});

/* ========================================
   PAGE LOAD
   ======================================== */

function revealActiveEasterEggs() {
    Object.keys(easterEggProfiles).forEach((person) => {
        if (easterEggIsActive(person)) {
            revealWikiCard(person);
        }
    });
}

/* Chargement normal */
revealActiveEasterEggs();

/* Retour sur la page via l'historique du navigateur */
window.addEventListener("pageshow", () => {
    revealActiveEasterEggs();
});
